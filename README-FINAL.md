# 🏓 Finálna verzia - Registrácia na stolný tenis

## ✅ Funkcie

- **Registrácia na 4 termíny** (29.7.2025, 12.8.2025, 19.8.2025, 26.8.2025 - všetky utorky)
- **Automatické emaily** (potvrdenie registrácie)
- **Zabezpečené odregistrovanie** (len pre registrovaných)
- **Real-time aktualizácia** počtov účastníkov
- **Responsive dizajn** pre mobilné zariadenia
- **SEO optimalizované** pre vyhľadávače

## 🔒 Odregistrovanie

### Ako to funguje:
- **Tlačidlá "Odregistrovať"** sú priamo pri každom účastníkovi v zozname
- **Jednoduché kliknutie** na tlačidlo odregistruje daného účastníka
- **Okamžitá aktualizácia** počtov a zobrazenia

### Používanie:
- Kliknite na termín v sekcii "Zoznam registrácií"
- Uvidíte všetkých registrovaných účastníkov (bez emailov)
- Kliknite "Odregistrovať" pri konkrétnom účastníkovi
- Účastník bude odstránený a dostane email o odregistrovaní

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

## 📱 Používanie aplikácie

### Pre účastníkov:

#### 1. Registrácia:
- Kliknite na termín (kartu)
- Vyplňte meno a email
- Kliknite "Registrovať sa"
- Dostanete potvrdenie emailom

#### 2. Odregistrovanie:
- Kliknite na termín v sekcii "Zoznam registrácií"
- Uvidíte všetkých registrovaných účastníkov (bez emailov)
- Kliknite "Odregistrovať" pri konkrétnom účastníkovi
- Účastník bude odstránený a dostane email o odregistrovaní

### Pre administrátorov:
- Môžete vidieť všetky registrácie v sekcii "Zoznam registrácií" (bez emailov)
- Používatelia sa odregistrujú sami cez tlačidlá pri účastníkoch

## 🎯 Výhody tohto riešenia

### Jednoduchosť:
- ✅ Tlačidlá na odregistrovanie sú priamo viditeľné
- ✅ Jednoduché kliknutie na odregistrovanie
- ✅ Okamžitá aktualizácia zobrazenia
- ✅ Ochrana súkromia - emaily nie sú zobrazované

### Technické výhody:
- ✅ Žiadny server potrebný
- ✅ EmailJS zadarmo
- ✅ Jednoduché nasadenie na Netlify

### Používateľská skúsenosť:
- ✅ Jasné inštrukcie
- ✅ Intuitívne rozhranie
- ✅ Okamžité notifikácie

## 🚀 Deployment na Netlify

### Krok 1: Príprava súborov
1. Použite `index-emailjs.html`
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

## 📊 Štatistiky a monitoring

- **Real-time počty** účastníkov
- **Kapacita termínov** v percentách
- **Email notifikácie** pre všetky akcie
- **Konzola prehlíadača** pre debugging

## 🛠️ Technológie

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Email**: EmailJS
- **Styling**: CSS Grid, Flexbox, Gradients
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Netlify

## 📞 Podpora

Pre otázky a problémy:
1. Skontrolujte EmailJS nastavenia
2. Overte konzolu prehlíadača
3. Testujte cez "Test email" tlačidlo
4. Skontrolujte EmailJS dashboard

## 🎉 Hotovo!

Aplikácia je pripravená na použitie s:
- ✅ Jednoduchým odregistrovaním priamo v zozname
- ✅ Automatickými emailmi
- ✅ Moderným dizajnom
- ✅ Mobilnou responzívnosťou
- ✅ SEO optimalizáciou 