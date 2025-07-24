const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

module.exports = async (req, res) => {
  // CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

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
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    if (registration.email !== email) {
      await client.close();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(403).json({ error: 'Email does not match' });
    }
    
    // Backup odregistrácie do lokálneho súboru
    try {
        const backupResponse = await fetch(`${req.headers.host ? `https://${req.headers.host}` : 'http://localhost:3000'}/api/backup-unregistration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registracia: registration })
        });
        
        if (!backupResponse.ok) {
            console.warn('Backup failed but registration was deleted from database');
        }
    } catch (backupError) {
        console.warn('Backup error:', backupError);
        // Pokračujeme aj keď backup zlyhá
    }
    
    // Vymazanie registrácie
    await collection.deleteOne({ id: id });
    
    await client.close();
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in delete-registration function:', error);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 