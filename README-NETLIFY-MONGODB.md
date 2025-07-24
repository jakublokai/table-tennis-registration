# Table Tennis Registration - Netlify + MongoDB Setup

## 🚀 **Kompletné riešenie s globálnym prístupom**

### ✅ **Čo máme:**
- **Netlify Functions** - 3 serverless funkcie
- **MongoDB Atlas** - cloud databáza (ZADARMO)
- **EmailJS** - automatické emaily
- **Globálny prístup** - funguje z akéhokoľvek zariadenia
- **Bezpečnosť** - emaily sa neukladajú v kóde

---

## 📋 **Kroky pre nastavenie:**

### **1. MongoDB Atlas Setup (ZADARMO)**
1. Choď na [mongodb.com/atlas](https://mongodb.com/atlas)
2. Vytvor účet (ZADARMO tier)
3. Vytvor nový cluster (M0 - Free)
4. Vytvor databázu `table-tennis-registration`
5. Vytvor collection `registrations`
6. Skopíruj connection string

### **2. Netlify Environment Variables**
1. V Netlify dashboard choď do **Site settings** → **Environment variables**
2. Pridaj premennú:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://username:password@cluster.mongodb.net/table-tennis-registration?retryWrites=true&w=majority`

### **3. Deploy na Netlify**
1. Nahraj celý priečinok `terminy-registracia-simple` do Netlify
2. Netlify automaticky rozpozná Functions v `/netlify/functions/`
3. Aplikácia bude dostupná na `https://your-site.netlify.app`

---

## 🔧 **Súbory:**
- `index-emailjs.html` - hlavná aplikácia
- `netlify/functions/get-registrations.js` - získanie registrácií
- `netlify/functions/add-registration.js` - pridanie registrácie
- `netlify/functions/delete-registration.js` - odstránenie registrácie
- `package.json` - dependencies

---

## 🎯 **Funkcie:**
- ✅ **Registrácia** - s email potvrdením
- ✅ **Odregistrovanie** - s email notifikáciou
- ✅ **Globálny prístup** - z akéhokoľvek zariadenia
- ✅ **Admin panel** - heslo: `admin123`
- ✅ **SK/EN prepínač** - dvojjazyčnosť
- ✅ **Realtime synchronizácia** - všetci vidia rovnaké dáta

---

## 🔒 **Bezpečnosť:**
- Emaily sa neukladajú v kóde
- MongoDB je bezpečne chránená
- Admin prístup len s heslom
- CORS nastavené pre Netlify

---

## 📧 **EmailJS Setup:**
1. Účet na [emailjs.com](https://emailjs.com)
2. Service ID: `service_wlv6ddn`
3. Template ID: `template_q5q6pkg`
4. User ID: `CtGw66qhSYvkYFsHF`

---

## 🎉 **Výsledok:**
Aplikácia funguje globálne, dáta sa synchronizujú v reálnom čase, emaily sa odosielajú automaticky a všetko je bezpečné! 