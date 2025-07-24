# 🔔 EmailJS verzia s automatickými reminder emailmi

## Ako to funguje

Táto verzia používa **EmailJS** pre odosielanie emailov a **automaticky kontroluje** pri každom načítaní stránky, či treba odoslať reminder emaily.

### Automatická kontrola reminder emailov:

1. **Pri načítaní stránky** sa spustí funkcia `kontrolovatReminderEmaily()`
2. **Kontroluje** všetky registrácie
3. **Porovnáva** dátumy termínov so zajtrajším dátumom
4. **Odošle reminder email** všetkým registrovaným na zajtrajšie termíny

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
   
   [Kalendár linky]
   [Navigácia]
   ```
4. Skopírujte **Template ID**

### Krok 4: Získanie User ID
1. Dashboard → Account → API Keys
2. Skopírujte **Public Key**

### Krok 5: Integrácia do kódu
V súbore `index-emailjs.html` nahraďte:
```javascript
emailjs.init("YOUR_USER_ID"); // Váš Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## 🔧 Ako funguje automatická kontrola

### Funkcia `kontrolovatReminderEmaily()`:
```javascript
function kontrolovatReminderEmaily() {
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
}
```

### Kedy sa spustí:
- **Pri načítaní stránky** - automaticky
- **Pri registrácii** - ak sa niekto zaregistruje na zajtrajšie
- **Manuálne** - cez tlačidlo "Test reminder"

## 📅 Termíny a reminder emaily

### Termíny:
- **Termín 1**: 29.7.2024 → Reminder 28.7.2024
- **Termín 2**: 12.8.2024 → Reminder 11.8.2024  
- **Termín 3**: 19.8.2024 → Reminder 18.8.2024
- **Termín 4**: 26.8.2024 → Reminder 25.8.2024

### Príklad reminder emailu:
```
🔔 Pripomienka: Stolný tenis zajtra!

Ahoj [Meno]!

Zajtra máš stolný tenis! Tu sú detaily:

📅 Dátum: 29.7.2024
🕐 Čas: 17:00 - 19:00
📍 Miesto: Univerzitný kampus Bohunice, Brno

[Kalendár linky]
[Navigácia]
```

## 🧪 Testovanie

### Test email:
- Kliknite "Test email"
- Zadajte email adresu
- Overte, či ste dostali email

### Test reminder:
- Kliknite "Test reminder"
- Zadajte email adresu
- Dostanete reminder email s testovacím dátumom

## ⚠️ Obmedzenia EmailJS verzie

### Výhody:
✅ **Žiadny server** potrebný  
✅ **Jednoduché nasadenie** na Netlify  
✅ **Zadarmo** (EmailJS free tier)  
✅ **Automatická kontrola** pri načítaní  

### Obmedzenia:
❌ **Reminder emaily** sa odošlú len pri načítaní stránky  
❌ **Nie je 24/7** automatické odosielanie  
❌ **Závisí od návštevnosti** stránky  

## 🚀 Odporúčania pre produkčné použitie

### Pre malé skupiny (do 50 ľudí):
- **EmailJS verzia** je dostačujúca
- Používatelia si stránku otvoria pred eventom
- Reminder emaily sa odošlú automaticky

### Pre väčšie skupiny (50+ ľudí):
- **Server verzia** s cron jobom
- 24/7 automatické odosielanie
- Spoľahlivejšie reminder emaily

## 📱 Deployment na Netlify

1. **Upload súborov** na Netlify
2. **Nastavte EmailJS** ID v kóde
3. **Testujte** funkcionalitu
4. **Zdieľajte** link s účastníkmi

## 🔍 Monitoring a logy

- **Konzola prehlíadača** - všetky email akcie
- **EmailJS dashboard** - štatistiky odoslaných emailov
- **Notifikácie** v aplikácii - úspech/chyba

## 📞 Podpora

Pre problémy:
1. Skontrolujte EmailJS nastavenia
2. Overte konzolu prehlíadača
3. Testujte cez "Test email" tlačidlo
4. Skontrolujte EmailJS dashboard 