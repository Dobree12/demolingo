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
- Tipuri de exerciții: multiChoice, translate_ro_de/de_ro, match, fillBlank, listen, speak, wordBank, picturePick, **dialogue** (bule de chat animate + TTS secvențial, replica lipsă din word-bank sau variante; `src/exercises/dialogue.js`), **listenChoice** (auzi germana prin TTS, alegi sensul RO — fără tastare), **trueFalse** („der Hund = pisică?" → ✅/❌), **sortCategories** (atingi cuvinte și le pui în 2 coșuri pe categorii; plasare greșită doar scutură, ca la match), **sentenceBuild** („Scrie asta": construiești o propoziție germană din piese; comparația iartă punctuația).
- `src/engine/storage.js` — **multi-profil**: registru `invatam_germana_users` + stare per user `invatam_germana::<id>`. Starea veche (`invatam_germana`) se migrează automat la primul profil, cu backup în `invatam_germana_backup_v1`. `saveState` e no-op fără profil activ.
- `src/engine/timeTracker.js` — heartbeat: +0.5 min la 30s doar dacă tab-ul e vizibil și a existat interacțiune în ultimele 90s; alimentează `totalMinutes` + obiectivul zilnic. NU mai există numărare de timp în `finishLesson`/`beforeunload` (ar dubla).
- `src/data/dictionary.js` — 359 intrări `{de, ro, article?, original?, category}` + `findByDe`, `hasGermanEntry`, `searchDictionary`. (Vocabular A1 extins: corp, haine, casă, zile, luni, vreme, meserii, timp, locuri, verbe, adjective, numere 11–20, natură, mâncare.)
- `src/data/generator.js` — **generator determinist** (RNG seeded pe `seed`/unitId) care produce exerciții (multiChoice ambele sensuri, translate ambele, listen, speak, match, picturePick, **listenChoice, trueFalse, sortCategories**) DOAR din cuvinte aflate în dicționar → trece de verify. `sortCategories` grupează pool-ul după `category` din dicționar (via `findByDe`, sare `functionale`) și alege 2 categorii cu ≥2 cuvinte; etichete emoji în `CATEGORY_LABELS`. `generateExercises({words,pool,count,seed,types})`, `augmentExercises(base, words, factor, seed)` (marchează exercițiile generate cu `gen:true`), `TYPE_SETS` (easy/medium/hard). Noile tipuri sunt și în `AUGMENT_TYPES` → apar peste tot.
- `src/data/extraLessons.js` — **100 de lecții suplimentare** (`lp-1..lp-100`) care continuă calea de lecții după cele 7 clasice. Generate determinist din dicționar, dificultate crescătoare (easy→medium→hard), marcate cu `extra: true`. Home le afișează pe **serii de 10** cu deblocare secvențială (1 deschis + 9 cu lacăt; termini 10 → apare următoarea serie). Sunt importate și adăugate în `lessons` (`lessons.push(...extraLessons)`).

## Decizii de design (confirmate cu userul)

- **Fără inimi** — eliminate complet; pe home apare acuratețea în loc de ❤️.
- **Hint din PRIMA greșeală**, dezvăluire progresivă (~35% → ~85% → răspuns complet). Numărul de etape e dinamic: `computeMaxAttempts()` — cuvânt scurt 3, cuvânt lung 4, frază 5, propoziție lungă 6.
- După etapa finală apare butonul **„Treci peste →"** (greșeala rămâne la Practică).
- XP scade cu reîncercările: 10 → 8 → 6 → 4 → 2 → 1.
- Emoji la opțiunile multiChoice **doar dacă toate opțiunile au unul** (altfel ar trăda răspunsul).
- Principii: intuitiv, ușor, motivant, vizual (emoji peste tot unde se poate).

## Conținut

- `src/data/lessons.js` — 7 lecții clasice (salutari → animale) + **100 suplimentare** din `extraLessons.js` (total 107 în `lessons`). Exercițiile autoreate ale celor 7 sunt **augmentate la ~10x** (pool 120–150/lecție); `resolveUnit` în `content.js` eșantionează **max 14/sesiune** (păstrează autoreatele la început, completează cu generate aleatorii → primul exercițiu stabil, varietate la reluare). Cele 100 suplimentare au câte ~5–7 exerciții (sub cap, rulează integral).
- Home (`home.js`): cele 7 clasice sunt **restrânse implicit** sub butonul „📖 Lecții de bază" (toggle `#btn-toggle-classic`, clasa `.classic-map.is-collapsed`, preferință persistată în `localStorage['ui_classicOpen']`, `'1'`=deschis); cele 100 (`extra`) sub titlul **„🏆 Provocări"** pe serii de 10 cu deblocare secvențială (doar seria atinsă vizibilă + card-teaser cu lacăt). Stiluri `.series-header`/`.series-teaser`/`.home-extra-title` în `styles/screens.css`.
- `src/data/sections.js` — 4 secțiuni: **Cuvinte uzuale** (3 unități, augmentate 10x), **Propoziții scurte** (2 unități: word-bank + dialoguri, neaugmentate), **Despre mine** (📝, **112 unități / 12 serii de 10**; 2 unități autorate — prezentare personalizată Paula — + 10 unități tematice ×10 propoziții casual din `aboutMeContent.js`: cumpărături, restaurant, hobby, familie, rutină, telefon, weekend, sănătate, direcții, opinii = 100 propoziții, + `buildAboutMeSeriesUnits(100,'dmg')` = încă 100 unități `dmg-*` care REUTILIZEAZĂ propozițiile, eșantion de 6/temă. `buildAboutMeUnits(prefix,startIndex)`/`makeSentenceExercise` produc banca de piese automat: tokenii răspunsului + 3 distractori determinist dintr-un pool), **Imagini și cuvinte** (12 galerii tematice; quiz pe loc în `themeGallery.js`).
- `scripts/verify-vocab.mjs`: la `multiChoice`, direcția se decide cu `germanPhrasePasses(correct) && !looksRomanian(correct)` și sare opțiunile care `looksRomanian` — altfel cuvinte ro care coincid cu intrări de (ex. „august", „elefant", lunile) erau raportate fals ca germane necunoscute. Tipuri noi: `listenChoice` verifică `word`, `trueFalse` verifică `de`, `sortCategories` verifică fiecare `item.de`; **`sentenceBuild` e exceptat intenționat** (propoziții autoreate care pot folosi cuvinte din afara dicționarului).

## Verificare / testare

```powershell
npm run verify     # gard de vocabular (rulat automat și în npm run build)
npm run build      # verify + vite build
# Smoke tests (Playwright instalat cu --no-save; reinstalează la nevoie):
npm i -D playwright --no-save
npm run dev        # într-un terminal separat
node scripts/smoke-test.mjs       # 13 fluxuri principale
node scripts/smoke-dialogue.mjs   # exercițiul de dialog
node scripts/smoke-newtypes.mjs   # tipurile noi: sentenceBuild + listenChoice/trueFalse/sortCategories
```

## Limitări actuale + planul de viitor

Client-side intenționat (decizie din 2026-06-11): profilurile sunt locale per browser/dispozitiv, fără sync, fără chei API.
**Hostico are „Setup Node.js App"** (Passenger) → când se dorește sync între dispozitive / progres vizibil de la distanță: un mic API Express + MySQL (inclus în cPanel), frontend-ul rămâne static. Structura per-profil din `storage.js` e deja formatul care s-ar sincroniza. Singurul criteriu hard: aplicația rămâne publică pe subdomeniul propriu.
