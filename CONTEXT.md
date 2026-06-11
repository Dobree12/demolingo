# CONTEXT — Învățăm Germană (demolingo)

Notițe de referință pentru reluarea lucrului. Actualizat: 2026-06-11.

## Ce este

Aplicație tip Duolingo pentru vorbitori de română care învață germană (A1).
Vite + vanilla JS (fără framework), 100% client-side, stare în localStorage.
Live pe **https://demolingo.dobre-paloti.ro/** (hosting Hostico, cPanel).

## Deploy

```powershell
.\deploy.ps1        # build + push pe branch-ul `production` (git worktree)
```
Apoi **manual în cPanel**: Git Version Control → *Update from Remote* → *Deploy HEAD Commit*.
Branch-ul `main` se push-uiește separat (`git push origin main`).

## Convenții importante

- **Germana se scrie în ASCII**: `a o u ss` în loc de `ä ö ü ß` (tastaturi US). Forma originală e păstrată în câmpul `original` din dicționar.
- UI-ul e integral în română; mesajele motivaționale sunt în `src/data/messages.js`.
- Comparațiile de răspunsuri trec prin `src/utils/normalize.js` (iartă umlauts + diacritice românești); folosit și de app, și de scriptul Node.
- **Orice cuvânt german nou trebuie adăugat în `src/data/dictionary.js`** (verificat cu PONS/dexonline) și, dacă e vizual, în `src/data/wordAssets.js` (emoji). Altfel build-ul pică.

## Arhitectură

- `src/main.js` — router simplu (`navigate(screen, params)` + două switch-uri: render și attach events). Ecrane: home, lesson, results, profile, settings, practice, cognates, **users, section, themeGallery, dictionary**.
- `src/screens/lesson.js` — **motorul unic de exerciții**. Rulează lecții clasice, unități de secțiune și quiz-uri generate, prin `resolveUnit(params)` din `src/data/content.js` (acceptă `{lessonId}` / `{sectionId, unitId}` / `{exercises, title, icon, unitId}`).
- Tipuri de exerciții: multiChoice, translate_ro_de/de_ro, match, fillBlank, listen, speak, wordBank, picturePick, **dialogue** (bule de chat animate + TTS secvențial, replica lipsă din word-bank sau variante; `src/exercises/dialogue.js`).
- `src/engine/storage.js` — **multi-profil**: registru `invatam_germana_users` + stare per user `invatam_germana::<id>`. Starea veche (`invatam_germana`) se migrează automat la primul profil, cu backup în `invatam_germana_backup_v1`. `saveState` e no-op fără profil activ.
- `src/engine/timeTracker.js` — heartbeat: +0.5 min la 30s doar dacă tab-ul e vizibil și a existat interacțiune în ultimele 90s; alimentează `totalMinutes` + obiectivul zilnic. NU mai există numărare de timp în `finishLesson`/`beforeunload` (ar dubla).
- `src/data/dictionary.js` — 162 intrări `{de, ro, article?, original?, category}` + `findByDe`, `hasGermanEntry`, `searchDictionary`.

## Decizii de design (confirmate cu userul)

- **Fără inimi** — eliminate complet; pe home apare acuratețea în loc de ❤️.
- **Hint din PRIMA greșeală**, dezvăluire progresivă (~35% → ~85% → răspuns complet). Numărul de etape e dinamic: `computeMaxAttempts()` — cuvânt scurt 3, cuvânt lung 4, frază 5, propoziție lungă 6.
- După etapa finală apare butonul **„Treci peste →"** (greșeala rămâne la Practică).
- XP scade cu reîncercările: 10 → 8 → 6 → 4 → 2 → 1.
- Emoji la opțiunile multiChoice **doar dacă toate opțiunile au unul** (altfel ar trăda răspunsul).
- Principii: intuitiv, ușor, motivant, vizual (emoji peste tot unde se poate).

## Conținut

- `src/data/lessons.js` — 7 lecții clasice (salutari → animale), ~91 exerciții.
- `src/data/sections.js` — 3 secțiuni: **Cuvinte uzuale** (3 unități, doar exerciții vizuale ușoare), **Propoziții scurte** (2 unități: word-bank + dialoguri), **Imagini și cuvinte** (6 galerii tematice stil beverage.png; quiz-urile se generează pe loc în `themeGallery.js`).

## Verificare / testare

```powershell
npm run verify     # gard de vocabular (rulat automat și în npm run build)
npm run build      # verify + vite build
# Smoke tests (Playwright instalat cu --no-save; reinstalează la nevoie):
npm i -D playwright --no-save
npm run dev        # într-un terminal separat
node scripts/smoke-test.mjs       # 13 fluxuri principale
node scripts/smoke-dialogue.mjs   # exercițiul de dialog
```

## Limitări actuale + planul de viitor

Client-side intenționat (decizie din 2026-06-11): profilurile sunt locale per browser/dispozitiv, fără sync, fără chei API.
**Hostico are „Setup Node.js App"** (Passenger) → când se dorește sync între dispozitive / progres vizibil de la distanță: un mic API Express + MySQL (inclus în cPanel), frontend-ul rămâne static. Structura per-profil din `storage.js` e deja formatul care s-ar sincroniza. Singurul criteriu hard: aplicația rămâne publică pe subdomeniul propriu.
