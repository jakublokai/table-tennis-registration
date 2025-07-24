# 🚀 Nastavenie automatických reminder emailov

## Krok 1: Nastavenie Gmail App Password

1. **Prihláste sa do Gmail** na https://gmail.com
2. **Zapnite 2FA** (ak ešte nemáte):
   - Nastavenia → Zabezpečenie → 2-krokové overenie
3. **Vytvorte App Password**:
   - Nastavenia → Zabezpečenie → Heslá aplikácií
   - Vyberte "Pošta" a "Windows počítač"
   - Skopírujte vygenerované heslo (16 znakov)

## Krok 2: Konfigurácia servera

1. **Premenujte config.example.js na config.js**:
   ```bash
   copy config.example.js config.js
   ```

2. **Upravte config.js**:
   ```javascript
   module.exports = {
       email: {
           user: 'vas.email@gmail.com',    // Váš Gmail
           pass: 'vas.app.password'        // App password z kroku 1
       },
       port: 3000
   };
   ```

## Krok 3: Inštalácia závislostí

```bash
npm install
```

## Krok 4: Spustenie servera

```bash
npm start
```

## Krok 5: Testovanie

1. **Otvorte aplikáciu**: http://localhost:3000
2. **Zaregistrujte sa** na termín
3. **Testujte reminder** (pre testovanie môžete zmeniť dátum v server.js)

## Ako to funguje

- **Cron job** sa spustí každý deň o 9:00
- **Kontroluje** registrácie na zajtrajšie termíny
- **Odošle reminder email** všetkým registrovaným účastníkom
- **Email obsahuje**: detaily eventu, navigáciu, kalendár linky

## Príklad reminder emailu

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

## Deployment na server

Pre produkčné nasadenie odporúčam:
- **Heroku** (zadarmo)
- **Railway** (zadarmo)
- **DigitalOcean** (platené)

Nezabudnite nastaviť environment variables na serveri! 