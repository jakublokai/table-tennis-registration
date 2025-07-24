const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection('registrations');
    
    const registrations = await collection.find({}).toArray();
    
    await client.close();
    
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error in get-registrations function:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 