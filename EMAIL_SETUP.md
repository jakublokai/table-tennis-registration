# Nastavenie emailu pre aplikáciu stolného tenisu

## 🚀 Rýchle nastavenie

### 1. Nainštalujte závislosti
```bash
npm install
```

### 2. Nastavte email údaje
Otvorte súbor `server.js` a upravte tieto riadky:

```javascript
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'vas-email@gmail.com',    // ← Tu zadajte svoj Gmail
        pass: 'vaso-heslo-aplikacie'    // ← Tu zadajte heslo aplikácie
    }
});
```

A tiež upravte tieto riadky v email funkciách:
```javascript
from: 'vas-email@gmail.com', // ← Tu zadajte svoj Gmail
```

### 3. Spustite server
```bash
npm start
```

### 4. Otvorte aplikáciu
Navigujte na `http://localhost:3000`

## 📧 Nastavenie Gmail

### Pre Gmail musíte použiť "heslo aplikácie":

1. **Prihláste sa do Google účtu**
2. **Prejdite na** [Google Account Settings](https://myaccount.google.com/)
3. **Kliknite na "Security" (Bezpečnosť)**
4. **Zapnite "2-Step Verification"** (ak nie je zapnutá)
5. **Kliknite na "App passwords"**
6. **Vyberte "Mail"** ako aplikáciu a **"Other"** ako zariadenie
7. **Zadajte názov** (napr. "Stolny Tenis App")
8. **Kliknite "Generate"**
9. **Skopírujte 16-znakové heslo**

### Príklad nastavenia:
```javascript
auth: {
    user: 'mojemail@gmail.com',
    pass: 'abcd efgh ijkl mnop'  // 16-znakové heslo aplikácie
}
```

## 🔧 Testovanie

1. **Spustite server:** `npm start`
2. **Otvorte aplikáciu** v prehliadači
3. **Zaregistrujte sa** na termín
4. **Skontrolujte email** - mal by prísť okamžite
5. **Skontrolujte konzolu** servera pre logy

## ❌ Riešenie problémov

### "Invalid login"
- Skontrolujte či používate heslo aplikácie, nie bežné heslo
- Uistite sa, že máte zapnutú 2FA

### "Less secure app access"
- Pre Gmail použite heslo aplikácie

### Email sa neodosiela
- Skontrolujte firewall
- Skontrolujte logy v konzole servera

## 📱 Funkcie aplikácie

✅ **Registrácia na 4 termíny stolného tenisu**
✅ **Okamžité odoslanie emailu po registrácii**
✅ **Zoznam všetkých účastníkov**
✅ **Možnosť odregistrovania s emailom**
✅ **Automatická aktualizácia kapacity**

## 🎯 Termíny

- **29. júla 2024** - 17:00-19:00
- **12. augusta 2024** - 17:00-19:00
- **19. augusta 2024** - 17:00-19:00
- **26. augusta 2024** - 17:00-19:00

**Miesto:** Univerzitný kampus Bohunice, Bratislava
**Kapacita:** 24 účastníkov na termín 