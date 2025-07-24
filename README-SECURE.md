# 🔒 Zabezpečená verzia - Odregistrovanie len pre registrovaných

## Ako to funguje

V tejto verzii môže používateľ odregistrovať **len sám seba** pomocou emailu, ktorý použil pri registrácii.

### Bezpečnostné opatrenia:

1. **Email ako identifikátor** - používateľ musí zadať presne ten istý email
2. **Osobná sekcia** - odregistrovanie je v samostatnej sekcii
3. **Overenie identity** - systém kontroluje, či email existuje v registráciách
4. **Osobný prístup** - každý vidí len svoje vlastné registrácie

## Kroky pre používateľa:

### 1. Registrácia
- Klikne na termín
- Vyplní meno a email
- Potvrdí registráciu
- Dostane potvrdenie emailom

### 2. Odregistrovanie
- Prejde do sekcie "Odregistrovanie"
- Zadá svoj email (rovnaký ako pri registrácii)
- Klikne "Nájsť moje registrácie"
- Uvidí svoje registrácie
- Klikne "Odregistrovať" pri konkrétnej registrácii

## Výhody tohto riešenia:

✅ **Bezpečné** - nikto iný nemôže odregistrovať iného používateľa
✅ **Jednoduché** - používateľ potrebuje len svoj email
✅ **Prehľadné** - vidí všetky svoje registrácie na jednom mieste
✅ **Flexibilné** - môže sa odregistrovať z viacerých termínov

## Príklad použitia:

```
1. Používateľ sa zaregistruje na Termín 1 a 3
2. Chce sa odregistrovať z Termínu 1
3. Zadá svoj email v sekcii odregistrovania
4. Uvidí obe svoje registrácie
5. Klikne "Odregistrovať" pri Termíne 1
6. Zostane mu len registrácia na Termín 3
```

## Technické detaily:

- **Validácia emailu** - kontroluje sa formát a existencia
- **Duplicitné registrácie** - nie sú povolené
- **Automatické emaily** - potvrdenie registrácie aj odregistrovania
- **Real-time aktualizácia** - počty sa aktualizujú okamžite

## Súbory:

- `index-secure.html` - zabezpečená verzia aplikácie
- `index-emailjs.html` - pôvodná verzia (admin môže všetko)
- `server.js` - backend pre automatické reminder emaily 