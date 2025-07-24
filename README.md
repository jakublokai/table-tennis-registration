# 🏓 Registrácia na stolný tenis - Brno

Moderná webová aplikácia pre registráciu na stolný tenis s automatickými emailmi.

## ✨ Funkcie

- 📧 **Automatické emaily** - EmailJS integrácia
- 📅 **4 termíny** - 29.7, 12.8, 19.8, 26.8
- 🗺️ **Navigácia** - Google Maps pre kampus Bohunice
- 📱 **Responsive** - Funguje na všetkých zariadeniach
- 🎨 **Moderný dizajn** - Pekné animácie a UI
- 📊 **Zoznam účastníkov** - S možnosťou odregistrovania

## 🚀 Deployment na Netlify

### Automatické nasadenie:
1. **Forknite** tento repozitár
2. **Pripojte** k Netlify
3. **Nastavte** build settings:
   - Build command: `(prázdne)`
   - Publish directory: `.`
4. **Deploy**!

### Manuálne nasadenie:
1. **Stiahnite** súbory
2. **Uploadnite** na Netlify
3. **Nastavte** custom domain (voliteľné)

## ⚙️ Nastavenie EmailJS

1. **Zaregistrujte sa** na [emailjs.com](https://www.emailjs.com/)
2. **Vytvorte Email Service** (Gmail)
3. **Vytvorte Email Template** s premennými:
   - `{{to_name}}`, `{{to_email}}`
   - `{{termin_nazov}}`, `{{termin_datum}}`
   - `{{termin_cas}}`, `{{termin_miesto}}`
   - `{{calendar_start}}`, `{{calendar_end}}`
4. **Skopírujte ID** do kódu:
   - Public Key: `CtGw66qhSYvkYFsHF`
   - Service ID: `service_wlv6ddn`
   - Template ID: `template_q5q6pkg`

## 📁 Súbory

- `index-emailjs.html` - Hlavná aplikácia s emailmi
- `index-simple.html` - Jednoduchá verzia bez emailov
- `email-template.html` - Email template pre EmailJS
- `netlify.toml` - Netlify konfigurácia

## 🎯 Použitie

1. **Otvorte** aplikáciu
2. **Vyberte** termín
3. **Vyplňte** registráciu
4. **Potvrďte** - email sa odošle automaticky
5. **Zobrazte** zoznam účastníkov

## 🔧 Technológie

- **HTML5** + **CSS3** + **JavaScript**
- **EmailJS** - Email služba
- **Font Awesome** - Ikony
- **Google Fonts** - Typografia
- **Netlify** - Hosting

## 📧 Email funkcie

- ✅ **Registrácia** - automatický email
- ✅ **Odregistrovanie** - automatický email
- ✅ **Test email** - overenie funkčnosti
- ✅ **Kalendár** - Add to Calendar linky
- ✅ **Navigácia** - Google Maps linky

## 🌐 Live demo

[Vaša Netlify URL]

---

**Vytvorené s ❤️ pre stolný tenis v Brne** 