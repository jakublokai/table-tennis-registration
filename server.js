const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

// Načítanie konfigurácie
let config;
try {
    config = require('./config.js');
} catch (error) {
    console.log('⚠️  config.js nenájdený, používam config.example.js');
    config = require('./config.example.js');
}

const app = express();
const PORT = config.port || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Email transporter (Gmail)
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

// Dáta termínov (rovnaké ako v frontend)
const terminy = [
    {
        id: 1,
        nazov: "Termín 1",
        datum: "2024-07-29",
        cas: "17:00 - 19:00",
        miesto: "Univerzitný kampus Bohunice, Brno",
        max_ucastnikov: 24,
        aktualne_ucastnikov: 0
    },
    {
        id: 2,
        nazov: "Termín 2", 
        datum: "2024-08-12",
        cas: "17:00 - 19:00",
        miesto: "Univerzitný kampus Bohunice, Brno",
        max_ucastnikov: 24,
        aktualne_ucastnikov: 0
    },
    {
        id: 3,
        nazov: "Termín 3",
        datum: "2024-08-19", 
        cas: "17:00 - 19:00",
        miesto: "Univerzitný kampus Bohunice, Brno",
        max_ucastnikov: 24,
        aktualne_ucastnikov: 0
    },
    {
        id: 4,
        nazov: "Termín 4",
        datum: "2024-08-26",
        cas: "17:00 - 19:00", 
        miesto: "Univerzitný kampus Bohunice, Brno",
        max_ucastnikov: 24,
        aktualne_ucastnikov: 0
    }
];

// Simulované registrácie (v reálnej aplikácii by boli v databáze)
let registracie = [];

// Funkcia na odoslanie reminder emailu
async function odoslatReminderEmail(registracia, termin) {
    const eventDate = new Date(termin.datum);
    const [startHour, startMinute] = termin.cas.split(' - ')[0].split(':');
    const [endHour, endMinute] = termin.cas.split(' - ')[1].split(':');
    
    const startDate = new Date(eventDate);
    startDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(parseInt(endHour), parseInt(endMinute), 0);
    
    const formatCalendarDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const mailOptions = {
        from: config.email.user,
        to: registracia.email,
        subject: '🔔 Pripomienka: Stolný tenis zajtra!',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .event-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
                .calendar-buttons { text-align: center; margin: 20px 0; }
                .btn { display: inline-block; padding: 12px 24px; margin: 5px; text-decoration: none; border-radius: 6px; font-weight: bold; }
                .btn-google { background: #4285f4; color: white; }
                .btn-outlook { background: #0078d4; color: white; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏓 Pripomienka: Stolný tenis zajtra!</h1>
                    <p>Ahoj ${registracia.meno}!</p>
                </div>
                <div class="content">
                    <p>Zajtra máš stolný tenis! Tu sú detaily:</p>
                    
                    <div class="event-info">
                        <h3>${termin.nazov}</h3>
                        <p><strong>📅 Dátum:</strong> ${new Date(termin.datum).toLocaleDateString('sk-SK')}</p>
                        <p><strong>🕐 Čas:</strong> ${termin.cas}</p>
                        <p><strong>📍 Miesto:</strong> ${termin.miesto}</p>
                    </div>
                    
                    <div class="calendar-buttons">
                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Stolný tenis&dates=${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}&details=${termin.miesto}&location=${termin.miesto}" class="btn btn-google">
                            📅 Pridať do Google Calendar
                        </a>
                        <a href="https://outlook.live.com/calendar/0/deeplink/compose?subject=Stolný tenis&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&location=${termin.miesto}&body=${termin.miesto}" class="btn btn-outlook">
                            📅 Pridať do Outlook
                        </a>
                    </div>
                    
                    <p><strong>Navigácia:</strong></p>
                    <p>📍 <a href="https://maps.google.com/?q=Univerzitný+kampus+Bohunice+Brno">Otvoriť v Google Maps</a></p>
                    <p>🚌 <a href="https://www.dpmb.cz/">Jízdné řády DPMB</a></p>
                    
                    <p style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 6px; border-left: 4px solid #4caf50;">
                        <strong>💡 Tip:</strong> Nezabudni si vziať športové oblečenie a vodu!
                    </p>
                </div>
                <div class="footer">
                    <p>Ak sa nemôžeš zúčastniť, kontaktuj nás.</p>
                    <p>© 2024 Stolný tenis Brno</p>
                </div>
            </div>
        </body>
        </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reminder email odoslaný na: ${registracia.email} pre termín ${termin.nazov}`);
    } catch (error) {
        console.error(`❌ Chyba pri odosielaní reminder emailu:`, error);
    }
}

// Cron job - spustí sa každý deň o 9:00
cron.schedule('0 9 * * *', async () => {
    console.log('🕐 Spúšťam kontrolu reminder emailov...');
    
    const dnes = new Date();
    const zajtra = new Date(dnes);
    zajtra.setDate(dnes.getDate() + 1);
    
    // Kontrola registrácií na zajtrajšie termíny
    registracie.forEach(registracia => {
        const termin = terminy.find(t => t.id === registracia.termin_id);
        if (termin) {
            const terminDate = new Date(termin.datum);
            if (terminDate.toDateString() === zajtra.toDateString()) {
                odoslatReminderEmail(registracia, termin);
            }
        }
    });
});

// API endpointy
app.get('/api/terminy', (req, res) => {
    res.json(terminy);
});

app.get('/api/registracie', (req, res) => {
    res.json(registracie);
});

app.post('/api/registracie', (req, res) => {
    const { termin_id, meno, email } = req.body;
    
    // Kontrola duplicity
    const existujuca = registracie.find(r => r.termin_id === termin_id && r.email === email);
    if (existujuca) {
        return res.status(400).json({ error: 'Už ste registrovaní na tento termín' });
    }
    
    const novaRegistracia = {
        id: registracie.length + 1,
        termin_id,
        meno,
        email,
        datum_registracie: new Date().toISOString()
    };
    
    registracie.push(novaRegistracia);
    
    // Aktualizácia kapacity
    const termin = terminy.find(t => t.id === termin_id);
    if (termin) {
        termin.aktualne_ucastnikov++;
    }
    
    res.json({ success: true, registracia: novaRegistracia });
});

app.delete('/api/registracie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const registracia = registracie.find(r => r.id === id);
    
    if (!registracia) {
        return res.status(404).json({ error: 'Registrácia nenájdená' });
    }
    
    // Odstránenie registrácie
    registracie = registracie.filter(r => r.id !== id);
    
    // Aktualizácia kapacity
    const termin = terminy.find(t => t.id === registracia.termin_id);
    if (termin) {
        termin.aktualne_ucastnikov--;
    }
    
    res.json({ success: true });
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-emailjs.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server beží na porte ${PORT}`);
    console.log(`📧 Reminder emaily sa odosielajú každý deň o 9:00`);
}); 