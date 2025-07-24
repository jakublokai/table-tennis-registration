const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'table-tennis-registration';

// Funkcia na maskovanie emailu
function maskEmail(email) {
  if (!email || typeof email !== 'string') return email;
  
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  // Maskujeme local part (pred @)
  let maskedLocal = localPart;
  if (localPart.length > 2) {
    maskedLocal = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
  }
  
  // Maskujeme domain (po @)
  const domainParts = domain.split('.');
  let maskedDomain = domainParts[0];
  if (domainParts[0].length > 2) {
    maskedDomain = domainParts[0].charAt(0) + '*'.repeat(domainParts[0].length - 2) + domainParts[0].charAt(domainParts[0].length - 1);
  }
  
  return `${maskedLocal}@${maskedDomain}.${domainParts.slice(1).join('.')}`;
}

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
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection('registrations');
    
    const registrations = await collection.find({}).toArray();
    
    await client.close();
    
    // Maskovanie emailov pre bezpečnosť
    const maskedRegistrations = registrations.map(reg => ({
      ...reg,
      email: maskEmail(reg.email)
    }));
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json(maskedRegistrations);
  } catch (error) {
    console.error('Error in get-registrations function:', error);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 