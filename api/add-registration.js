const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const registration = req.body;
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection('registrations');
    
    // Pridanie timestamp
    registration.created_at = new Date();
    registration.id = Date.now().toString();
    
    await collection.insertOne(registration);
    
    await client.close();
    
    res.status(200).json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Error in add-registration function:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 