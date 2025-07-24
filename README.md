# 🏓 Registrácia na stolný tenis - Brno

Moderná webová aplikácia pre registráciu na stolný tenis s automatickými emailmi a MongoDB databázou.

## ✨ Funkcie

- 📧 **Automatické emaily** - EmailJS integrácia
- 📅 **4 termíny** - 29.7, 12.8, 19.8, 26.8
- 🗺️ **Navigácia** - Google Maps pre kampus Bohunice
- 📱 **Responsive** - Funguje na všetkých zariadeniach
- 🎨 **Moderný dizajn** - Pekné animácie a UI
- 📊 **Zoznam účastníkov** - S možnosťou odregistrovania
- 🗄️ **MongoDB storage** - Globálne dostupné dáta
- 🚀 **Deployment na Vercel** - Serverless funkcie

## 🚀 Deployment na Vercel

### Automatické nasadenie:
1. **Forknite** tento repozitár
2. **Pripojte** k Vercel
3. **Nastavte** environment variables:
   - `MONGODB_URI`: vaša MongoDB connection string
4. **Deploy!**

### Manuálne nasadenie:
1. **Stiahnite** súbory
2. **Uploadnite** na Vercel
3. **Nastavte** environment variables
4. **Nastavte** custom domain (voliteľné)

## ⚙️ Nastavenie EmailJS

1. **Zaregistrujte sa** na [emailjs.com](https://emailjs.com)
2. **Vytvorte Email Service** (Gmail)
3. **Vytvorte Email Template** s premennými:
   - `{{to_name}}`, `{{to_email}}`
   - `{{termin_nazov}}`, `{{termin_datum}}`
   - `{{termin_cas}}`, `{{termin_miesto}}`
   - `{{calendar_start}}`, `{{calendar_end}}`
4. **Skopírujte ID** do kódu:
   - **Public Key**: `CtGw66qhSYvkYFsHF`
   - **Service ID**: `service_wlv6ddn`
   - **Template ID**: `template_q5q6pkg`

## ⚙️ Nastavenie MongoDB

1. **Vytvorte** MongoDB Atlas cluster
2. **Nastavte** Database Access a Network Access
3. **Skopírujte** connection string
4. **Pridajte** ako `MONGODB_URI` environment variable

## 📁 Súbory

- `index-emailjs.html` - Hlavná aplikácia s emailmi
- `api/` - Vercel API routes
  - `add-registration.js` - Pridanie registrácie
  - `get-registrations.js` - Získanie registrácií
  - `delete-registration.js` - Odstránenie registrácie
- `vercel.json` - Vercel konfigurácia
- `package.json` - Dependencies

## 🎯 Použitie

1. **Otvorte** aplikáciu
2. **Vyberte** termín
3. **Vyplňte** registráciu
4. **Potvrďte** - email sa odošle automaticky
5. **Zobrazte** zoznam účastníkov

## 🔧 Technológie

- **Frontend**: HTML5 + CSS3 + JavaScript
- **Backend**: Vercel Functions (Node.js)
- **Database**: MongoDB Atlas
- **Email**: EmailJS
- **Icons**: Feather Icons
- **Fonts**: Google Fonts
- **Hosting**: Vercel

## 📧 Email funkcie

- ✅ **Registrácia** - automatický email
- ✅ **Odregistrovanie** - automatický email
- ✅ **Test email** - overenie funkčnosti
- ✅ **Kalendár** - Add to Calendar linky
- ✅ **Navigácia** - Google Maps linky

## 🌐 Live demo

[Vaša Vercel URL]

---

Vytvorené s ❤️ pre stolný tenis v Brne 