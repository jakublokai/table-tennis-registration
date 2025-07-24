# 🏓 Kompletný systém registrácie na stolný tenis

## 📋 Prehľad funkcií

✅ **Registrácia na 4 termíny** (29.7, 12.8, 19.8, 26.8)  
✅ **Automatické emaily** (potvrdenie registrácie)  
✅ **Automatické reminder emaily** (den pred eventom)  
✅ **Zabezpečené odregistrovanie** (len pre registrovaných)  
✅ **Real-time aktualizácia** počtov účastníkov  
✅ **Responsive dizajn** pre mobilné zariadenia  
✅ **SEO optimalizované** pre vyhľadávače  

## 🚀 Dostupné verzie

### 1. **Základná verzia** (`index-emailjs.html`)
- Registrácia cez EmailJS (bez servera)
- Admin môže odregistrovať kohokoľvek
- Jednoduché nasadenie na Netlify

### 2. **Zabezpečená verzia** (`index-secure.html`)
- Odregistrovanie len pre registrovaných používateľov
- Email ako identifikátor
- Osobná sekcia pre správu registrácií

### 3. **Server verzia** (`server.js`)
- Automatické reminder emaily den pred eventom
- Cron job každý deň o 9:00
- Gmail SMTP pre odosielanie

## 📧 Nastavenie EmailJS

### Krok 1: Vytvorenie účtu
1. Choďte na https://www.emailjs.com/
2. Zaregistrujte sa (zadarmo)
3. Overte email

### Krok 2: Vytvorenie Email Service
1. Dashboard → Email Services
2. "Add New Service"
3. Vyberte "Gmail"
4. Prihláste sa do Gmail
5. Skopírujte **Service ID**

### Krok 3: Vytvorenie Email Template
1. Dashboard → Email Templates
2. "Create New Template"
3. Vytvorte template s premennými:
   ```
   To: {{to_name}} <{{to_email}}>
   Subject: {{message}}
   
   Ahoj {{to_name}}!
   
   {{termin_nazov}}
   Dátum: {{termin_datum}}
   Čas: {{termin_cas}}
   Miesto: {{termin_miesto}}
   ```
4. Skopírujte **Template ID**

### Krok 4: Získanie User ID
1. Dashboard → Account → API Keys
2. Skopírujte **Public Key**

### Krok 5: Integrácia do kódu
V HTML súbore nahraďte:
```javascript
emailjs.init("YOUR_USER_ID"); // Váš Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## 🔧 Nastavenie automatických reminder emailov

### Krok 1: Gmail App Password
1. Gmail → Nastavenia → Zabezpečenie
2. Zapnite 2FA
3. Heslá aplikácií → Vytvorte nové
4. Skopírujte 16-znakové heslo

### Krok 2: Konfigurácia servera
```bash
# Premenujte config.example.js na config.js
copy config.example.js config.js

# Upravte config.js
{
    email: {
        user: 'vas.email@gmail.com',
        pass: 'vas.app.password'
    },
    port: 3000
}
```

### Krok 3: Inštalácia a spustenie
```bash
npm install
npm start
```

## 🌐 Deployment na Netlify

### Krok 1: Príprava súborov
1. Použite `index-emailjs.html` alebo `index-secure.html`
2. Nahraďte EmailJS ID v kóde
3. Pridajte `netlify.toml` (už je v súbore)

### Krok 2: Upload na Netlify
1. Choďte na https://netlify.com/
2. "New site from Git" alebo "Drag and drop"
3. Upload súbory
4. Nastavte doménu

### Krok 3: Nastavenie domény
- Netlify automaticky vytvorí subdoménu
- Môžete nastaviť vlastnú doménu
- HTTPS je automaticky zapnuté

## 📱 Používanie aplikácie

### Pre účastníkov:
1. **Registrácia**: Kliknite na termín → vyplňte údaje → potvrďte
2. **Odregistrovanie**: Sekcia "Odregistrovanie" → zadajte email → nájdite registrácie → odregistrujte sa

### Pre administrátorov:
1. **Základná verzia**: Môžete odregistrovať kohokoľvek
2. **Zabezpečená verzia**: Používatelia sa odregistrujú sami
3. **Server verzia**: Automatické reminder emaily

## 🔒 Bezpečnosť

### Základná verzia:
- Admin má plný prístup
- Vhodné pre malé skupiny

### Zabezpečená verzia:
- Email overenie
- Osobný prístup k registráciám
- Vhodné pre verejné použitie

### Server verzia:
- Gmail SMTP zabezpečenie
- Cron job na serveri
- Environment variables

## 📊 Štatistiky a monitoring

- **Real-time počty** účastníkov
- **Kapacita termínov** v percentách
- **Email notifikácie** pre všetky akcie
- **Logy servera** pre debugging

## 🛠️ Technológie

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Email**: EmailJS (frontend) / Nodemailer (backend)
- **Styling**: CSS Grid, Flexbox, Gradients
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Netlify / Heroku / Railway

## 📞 Podpora

Pre otázky a problémy:
1. Skontrolujte EmailJS nastavenia
2. Overte Gmail App Password
3. Skontrolujte konzolu prehlíadača
4. Overte server logy

## 🎯 Ďalšie vylepšenia

Možné rozšírenia:
- **Databáza** (MongoDB, PostgreSQL)
- **Autentifikácia** (JWT, OAuth)
- **Admin panel** pre správu
- **Analytics** a štatistiky
- **Push notifikácie**
- **Kalendár integrácia** 