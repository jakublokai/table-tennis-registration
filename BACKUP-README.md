# Backup System

Tento systém automaticky zálohuje všetky registrácie a odregistrácie do lokálnych súborov.

## Súbory

- `backup/registrations-backup.json` - Kompletný JSON backup všetkých akcií
- `backup/registrations-log.txt` - Textový log všetkých akcií

## API Endpoints

- `POST /api/backup-registrations` - Zálohuje novú registráciu
- `POST /api/backup-unregistration` - Zálohuje odregistráciu  
- `GET /api/get-backup` - Zobrazí backup dáta

## Použitie

1. **Automatické zálohovanie**: Každá registrácia/odregistrácia sa automaticky zálohuje
2. **Zobrazenie backup**: Kliknite na zelené "Backup" tlačidlo v aplikácii
3. **Štatistiky**: Zobrazia sa počty registrácií, odregistrácií a posledný backup

## Formát dát

### JSON Backup
```json
{
  "id": "1234567890",
  "termin_id": "termin1",
  "meno": "Ján Novák",
  "email": "jan@example.com",
  "datum_registracie": "2024-01-15T10:30:00.000Z",
  "backup_timestamp": "2024-01-15T10:30:05.000Z",
  "backup_type": "registration"
}
```

### Textový log
```
[2024-01-15T10:30:05.000Z] REGISTRATION: Ján Novák (jan@example.com) - Termín: termin1
[2024-01-15T11:45:12.000Z] UNREGISTRATION: Ján Novák (jan@example.com) - Termín: termin1
```

## Bezpečnosť

- Backup súbory sa necommitujú do Git (`.gitignore`)
- Dáta obsahujú timestamp pre audit
- Systém pokračuje aj keď backup zlyhá 