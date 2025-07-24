const fs = require('fs').promises;
const path = require('path');

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
        const { registracia } = req.body;
        
        if (!registracia) {
            return res.status(400).json({ error: 'Registration data is required' });
        }

        // Vytvorenie backup súboru
        const backupDir = path.join(process.cwd(), 'backup');
        const backupFile = path.join(backupDir, 'registrations-backup.json');
        
        // Vytvorenie priečinka ak neexistuje
        try {
            await fs.mkdir(backupDir, { recursive: true });
        } catch (error) {
            // Priečinok už existuje
        }

        // Načítanie existujúcich registrácií
        let existingRegistrations = [];
        try {
            const fileContent = await fs.readFile(backupFile, 'utf8');
            existingRegistrations = JSON.parse(fileContent);
        } catch (error) {
            // Súbor neexistuje alebo je prázdny, začneme s prázdnym poľom
        }

        // Pridanie timestamp pre backup
        const backupEntry = {
            ...registracia,
            backup_timestamp: new Date().toISOString(),
            backup_type: 'registration'
        };

        // Pridanie novej registrácie
        existingRegistrations.push(backupEntry);

        // Zápis do súboru
        await fs.writeFile(backupFile, JSON.stringify(existingRegistrations, null, 2));

        // Vytvorenie aj textového logu
        const logFile = path.join(backupDir, 'registrations-log.txt');
        const logEntry = `[${new Date().toISOString()}] REGISTRATION: ${registracia.meno} (${registracia.email}) - Termín: ${registracia.termin_id}\n`;
        
        try {
            await fs.appendFile(logFile, logEntry);
        } catch (error) {
            // Ak sa nepodarí zapísať log, pokračujeme
        }

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        res.status(200).json({ 
            success: true, 
            message: 'Registration backed up successfully',
            backupCount: existingRegistrations.length
        });

    } catch (error) {
        console.error('Backup error:', error);
        
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        res.status(500).json({ error: 'Backup failed' });
    }
}; 