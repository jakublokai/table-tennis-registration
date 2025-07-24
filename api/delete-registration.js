const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, email } = req.body;
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection('registrations');
    
    // Najprv nájdeme registráciu a overíme email
    const registration = await collection.findOne({ id: id });
    
    if (!registration) {
      await client.close();
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    if (registration.email !== email) {
      await client.close();
      return res.status(403).json({ error: 'Email does not match' });
    }
    
    // Vymazanie registrácie
    await collection.deleteOne({ id: id });
    
    await client.close();
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in delete-registration function:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 