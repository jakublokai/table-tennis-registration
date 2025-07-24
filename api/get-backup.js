const fs = require('fs').promises;
const path = require('path');

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
        const backupDir = path.join(process.cwd(), 'backup');
        const backupFile = path.join(backupDir, 'registrations-backup.json');
        const logFile = path.join(backupDir, 'registrations-log.txt');
        
        let backupData = [];
        let logData = '';
        
        // Načítanie JSON backup súboru
        try {
            const fileContent = await fs.readFile(backupFile, 'utf8');
            backupData = JSON.parse(fileContent);
        } catch (error) {
            // Súbor neexistuje alebo je prázdny
        }
        
        // Načítanie textového logu
        try {
            logData = await fs.readFile(logFile, 'utf8');
        } catch (error) {
            // Súbor neexistuje alebo je prázdny
        }
        
        // Štatistiky
        const stats = {
            totalEntries: backupData.length,
            registrations: backupData.filter(entry => entry.backup_type === 'registration').length,
            unregistrations: backupData.filter(entry => entry.backup_type === 'unregistration').length,
            lastBackup: backupData.length > 0 ? backupData[backupData.length - 1].backup_timestamp : null
        };
        
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        res.status(200).json({
            success: true,
            backupData: backupData,
            logData: logData,
            stats: stats
        });
        
    } catch (error) {
        console.error('Get backup error:', error);
        
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        res.status(500).json({ error: 'Failed to retrieve backup data' });
    }
}; 