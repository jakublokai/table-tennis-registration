# 🚀 Nasadenie aplikácie - Stolný tenis TESCAN

## 📋 Prehľad
Aplikácia pre registráciu na stolný tenis s automatickými emailmi cez EmailJS.

## 🌐 Možnosti nasadenia

### 1. **Netlify (Odporúčané)**
**Výhody:** Zadarmo, automatické nasadenie, SSL, CDN

#### Kroky:
1. **Vytvorte účet na [netlify.com](https://netlify.com)**
2. **Nahrajte súbory:**
   - Drag & drop priečinok `terminy-registracia-simple` na Netlify
   - Alebo pripojte GitHub repozitár
3. **Nastavenia:**
   - Build command: `(prázdne)`
   - Publish directory: `.`
4. **Doména:** Automaticky dostanete `https://your-app-name.netlify.app`

### 2. **GitHub Pages**
**Výhody:** Zadarmo, integrácia s GitHub

#### Kroky:
1. **Vytvorte GitHub repozitár**
2. **Nahrajte súbory**
3. **Nastavte GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

### 3. **Vercel**
**Výhody:** Rýchle, automatické nasadenie

#### Kroky:
1. **Vytvorte účet na [vercel.com](https://vercel.com)**
2. **Importujte projekt**
3. **Automatické nasadenie**

## ⚙️ Nastavenia pred nasadením

### EmailJS konfigurácia:
1. **Service ID:** `service_wlv6ddn`
2. **Template ID:** `template_q5q6pkg`
3. **User ID:** `CtGw66qhSYvkYFsHF`

### Email template:
- Súbor: `email-template.html`
- Nastavte v EmailJS dashboard

## 🔧 Testovanie

### Lokálne testovanie:
```bash
# Otvorte súbor v prehliadači
open index-emailjs.html
```

### Test email funkcie:
1. Kliknite na "Test email" tlačidlo
2. Zadajte testovací email
3. Overte doručenie

## 📱 Funkcie aplikácie

### ✅ Implementované:
- [x] Registrácia na 4 termíny
- [x] Automatické emaily cez EmailJS
- [x] Overenie emailu pri odregistrácii
- [x] Navigačné odkazy (Google Maps, Apple Maps)
- [x] Kalendárové odkazy (Google, iOS, Outlook)
- [x] Responzívny dizajn
- [x] TESCAN branding

### 📧 Email funkcie:
- [x] Potvrdenie registrácie
- [x] Odregistrovanie
- [x] Test email
- [x] Moderný dizajn s TESCAN brandingom

## 🎯 Produkčné nasadenie

### 1. **Vyberte hosting:**
   - **Netlify** (odporúčané pre jednoduchosť)
   - **GitHub Pages** (ak máte GitHub)
   - **Vercel** (pre pokročilé funkcie)

### 2. **Nastavte doménu:**
   - Použite automatickú doménu
   - Alebo nastavte vlastnú doménu

### 3. **Otestujte:**
   - Registráciu
   - Emaily
   - Navigáciu
   - Kalendáre

## 🔒 Bezpečnosť

### Implementované:
- CSP headers
- XSS protection
- Frame options
- Content type options

### EmailJS bezpečnosť:
- Verejné API kľúče (bezpečné pre frontend)
- Rate limiting
- Template validácia

## 📞 Podpora

### Kontakt:
- **Jiří Fiala** - jiri.fiala@tescan.com
- **Tomáš Hrnčíř** - tomas.hrncir@tescan.com

### Technická podpora:
- EmailJS dokumentácia
- Netlify dokumentácia
- GitHub Issues

---

**© 2025 Stolný tenis - TESCAN**  
*in electrons, we trust* 