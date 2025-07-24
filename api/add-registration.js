const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

module.exports = async (req, res) => {
  // CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

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
    
    // Backup registrácie do lokálneho súboru
    try {
        const backupResponse = await fetch(`${req.headers.host ? `https://${req.headers.host}` : 'http://localhost:3000'}/api/backup-registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registracia: registration })
        });
        
        if (!backupResponse.ok) {
            console.warn('Backup failed but registration was saved to database');
        }
    } catch (backupError) {
        console.warn('Backup error:', backupError);
        // Pokračujeme aj keď backup zlyhá
    }
    
    await client.close();
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Error in add-registration function:', error);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 