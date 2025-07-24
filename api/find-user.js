const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

module.exports = async (req, res) => {
  // CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { meno, datum } = req.query;
    
    if (!meno) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(400).json({ error: 'Meno je povinné' });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection('registrations');
    
    // Vytvoríme filter
    let filter = { meno: { $regex: meno, $options: 'i' } }; // case-insensitive search
    
    // Ak je zadaný dátum, pridáme ho do filtra
    if (datum) {
      const startDate = new Date(datum);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      filter.datum_registracie = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    // Hľadáme záznamy
    const registrations = await collection.find(filter)
      .sort({ "_id": -1 }) // Najnovšie najprv
      .limit(5) // Zobrazíme max 5 výsledkov
      .toArray();
    
    await client.close();
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json({ 
      success: true,
      count: registrations.length,
      registrations: registrations
    });
  } catch (error) {
    console.error('Error in find-user function:', error);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 