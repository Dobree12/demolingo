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
- `src/data/dictionary.js` — 391 intrări `{de, ro, article?, original?, category}` + `findByDe`, `hasGermanEntry`, `searchDictionary`. (Vocabular A1 extins: corp, haine, casă, zile, luni, vreme, meserii, timp, locuri, verbe, adjective, numere 11–20, natură, mâncare; + forme conjugate — gehe, kaufe, wohne, kommt... — și funcționale — in, im, ins, nach, zu, dem, den, meine, wir, gern, viel — pentru seriile de propoziții 16–25.)
- `src/data/generator.js` — **generator determinist** (RNG seeded pe `seed`/unitId) care produce exerciții (multiChoice ambele sensuri, translate ambele, listen, speak, match, picturePick, **listenChoice, trueFalse, sortCategories**) DOAR din cuvinte aflate în dicționar → trece de verify. `sortCategories` grupează pool-ul după `category` din dicționar (via `findByDe`, sare `functionale`) și alege 2 categorii cu ≥2 cuvinte; etichete emoji în `CATEGORY_LABELS`. `generateExercises({words,pool,count,seed,types})`, `augmentExercises(base, words, factor, seed)` (marchează exercițiile generate cu `gen:true`), `TYPE_SETS` (easy/medium/hard). Noile tipuri sunt și în `AUGMENT_TYPES` → apar peste tot.
- `src/data/extraLessons.js` — **250 de lecții suplimentare** (`lp-1..lp-250`, 25 de serii) care continuă calea după cele 7 clasice, marcate cu `extra: true`: seriile 1–10 pe cuvinte (generate din dicționar, easy→medium→hard), seriile 11–15 pe propoziții scurte (`SENTENCE_GROUPS` din `sentenceBank.js`, mixul istoric de 6 tipuri — NU se schimbă, `types` are default-ul vechi), seriile 16–25 **doar propoziții cu mixul complet de 11 tipuri** (`SENTENCE_GROUPS_EXTRA` + `SENTENCE_TYPES_FULL`: sentenceBuild, match, multiChoice ambele sensuri, listenChoice, trueFalse, wordBank, fillBlank, listen, speak, translate — toate pe propoziții, cu distractori din grup). **Seriile sunt restrângibile peste tot** (`.series-toggle` → `.series-units.is-collapsed`): pe home cheia e `localStorage['ui_series_home_<s>']`, în secțiuni `['ui_series_<sectionId>_<s>']`; seriile terminate 100% pornesc restrânse implicit (preferința salvată are prioritate). Home le afișează pe **serii de 10** cu deblocare secvențială (1 deschis + 9 cu lacăt). Sunt importate și adăugate în `lessons` (`lessons.push(...extraLessons)`).

- **Router cu history** (`main.js`): fiecare ecran = intrare `pushState` cu `{screen, params}` (params trecuți prin JSON). `lesson`/`results` sunt tranzitorii (ieșirea din ele face `replaceState`), deci Înapoi nu repornește lecția; Înapoi din lecție cere confirmare. Refresh reia ecranul din `history.state` (în afară de `results`).
- **SRS** (`engine/srs.js`): cheia = `de` din dicționar, prin `srsKeyFor(exercise)` (doar tipuri pe un singur cuvânt; match/sortCategories/propoziții nu au cheie). Un singur update per exercițiu: 5 = din prima, 3 = cu indicii, 1 = greșit/sărit. `migrateSRSHistory()` curăță cheile vechi (la boot și la schimbarea profilului). `buildReviewExercises()` → sesiunea „Repetiție" din Practică.
- **Greșeli**: `addMistake` deduplică după conținutul exercițiului; `removeMistake` la răspuns corect din prima. Practică are „Repară greșelile" (ultimele 14).
- **PWA**: `public/manifest.webmanifest`, `public/sw.js` (înregistrat doar în build), iconițe generate cu `node scripts/make-icons.mjs` din `public/icon.svg`. `.htaccess` nu cachează `sw.js`/manifestul. **La schimbări de strategie în sw.js, crește `CACHE`**.
- **Backup**: `utils/backup.js` + `exportActiveProfile`/`importProfile` în `storage.js`. Setări → „Descarcă progresul"; importul creează mereu un profil NOU (și din ecranul de profiluri).

- **Secțiunea „Drumul spre A2"** (`id: spre-a2`, `src/data/a2Content.js`, unități `a2-1..a2-100`, 10 serii): lecțiile 1–70 = A1 din tot conținutul existent (cuvinte pe categorii + propoziții din `SENTENCE_GROUPS`+`SENTENCE_GROUPS_EXTRA` + un dialog; toate cele 13 tipuri), dificultate pe serii (1–2 ușor, 3–5 mediu, 6–7 greu). Lecțiile 71–100 = tranziție: 10 teme A2 (`A2_GROUPS`: modale, Perfekt haben/sein, acuzativ, dativ, separabile, ora, comparativ, weil/dass/aber, ordinea cuvintelor) × 3 lecții (recunoaștere → mix → tastare); proporția A2 crește liniar 40% → 100%, restul e recapitulare A1. Prima lecție a fiecărei teme are regula (`tip`) în descriere. Cuvintele A2 noi sunt în dicționar cu `category: 'a2'` (separat, ca pool-urile lecțiilor vechi să nu se schimbe). Dialoguri A2 proprii (`A2_DIALOGUES`), cu piese (wordBank) la etapa 3. Test: `scripts/smoke-a2.mjs` randează fiecare exercițiu din cele 100 de lecții.

- **Sincronizare + urmărire (un singur cursant)**: cursantul învață pe alt PC decât userul. `public/api/progress.php` (fără DB): GET cu header `X-Key` (cheia de citire sau scriere) → ultima stare; POST `{key, state, profile, force?}` cu cheia de scriere. Refuză cu 409 o stare cu mai puține `totalAttempts` decât cea salvată (browser golit ≠ progres pierdut). Cheile: `/home/wdrmopki/demolingo-config.php` (`return ['write_key'=>..., 'read_key'=>...]`, min. 16 caractere); datele: `/home/wdrmopki/demolingo-data/progress.json` + `history/AAAA-LL-ZZ.json` (instantaneu zilnic) — ambele ÎN AFARA docroot-ului, supraviețuiesc deploy-urilor. Client: `src/engine/sync.js` (activat din Setări → Sincronizare DOAR pe PC-ul cursantului; legat de profilul activ la activare; trimite după fiecare lecție, la 3 min, la ascunderea tab-ului, la revenirea online). Jurnal zilnic `state.activityLog` (`withActivity` în `progress.js`, 180 de zile). Pagina de urmărire: `progres.html` + `src/dashboard.js` (a doua intrare Vite, doar citire, cheia de citire în localStorage). SW-ul ocolește `/api/` și `/progres`.
- **Deploy**: `.cpanel.yml` copiază explicit fișierele — **orice fișier nou din `public/` trebuie adăugat acolo** (înainte de 2026-09-30 copia doar index.html/assets/.htaccess). Test sincronizare: `scripts/smoke-sync.mjs` pe `dist/` servit de `php -S` cu structura de pe server (vezi antetul scriptului).

## Decizii de design (confirmate cu userul)

- **Fără inimi** — eliminate complet; pe home apare acuratețea în loc de ❤️.
- **Hint din PRIMA greșeală**, dezvăluire progresivă (~35% → ~85% → răspuns complet). Numărul de etape e dinamic: `computeMaxAttempts()` — cuvânt scurt 3, cuvânt lung 4, frază 5, propoziție lungă 6.
- După etapa finală apare butonul **„Treci peste →"** (greșeala rămâne la Practică).
- XP scade cu reîncercările: 10 → 8 → 6 → 4 → 2 → 1.
- Emoji la opțiunile multiChoice **doar dacă toate opțiunile au unul** (altfel ar trăda răspunsul).
- Principii: intuitiv, ușor, motivant, vizual (emoji peste tot unde se poate).

## Conținut

- `src/data/lessons.js` — 7 lecții clasice (salutari → animale) + **250 suplimentare** din `extraLessons.js` (total 257 în `lessons`). Exercițiile autoreate ale celor 7 sunt **augmentate la ~10x** (pool 120–150/lecție); `resolveUnit` în `content.js` eșantionează **max 14/sesiune** (păstrează autoreatele la început, completează cu generate aleatorii → primul exercițiu stabil, varietate la reluare). Cele suplimentare au câte ~5–7 exerciții (sub cap, rulează integral).
- Home (`home.js`): cele 7 clasice sunt **restrânse implicit** sub butonul „📖 Lecții de bază" (toggle `#btn-toggle-classic`, clasa `.classic-map.is-collapsed`, preferință persistată în `localStorage['ui_classicOpen']`, `'1'`=deschis); cele 100 (`extra`) sub titlul **„🏆 Provocări"** pe serii de 10 cu deblocare secvențială (doar seria atinsă vizibilă + card-teaser cu lacăt). Stiluri `.series-header`/`.series-teaser`/`.home-extra-title` în `styles/screens.css`.
- `src/data/sections.js` — 4 secțiuni: **Cuvinte uzuale** (3 unități, augmentate 10x), **Propoziții scurte** (2 unități: word-bank + dialoguri, neaugmentate), **Despre mine** (📝, **162 unități / 17 serii de 10**; 2 unități autorate — prezentare personalizată Paula — + 10 unități tematice ×10 propoziții casual din `aboutMeContent.js`: cumpărături, restaurant, hobby, familie, rutină, telefon, weekend, sănătate, direcții, opinii = 100 propoziții, + `buildAboutMeSeriesUnits(100,'dmg')` = 100 unități `dmg-*` care REUTILIZEAZĂ propozițiile, + `buildAboutMeExtraUnits(50,'dmg2')` = 5 serii `dmg2-*` cu 50 propoziții NOI (vremea, călătorii, muncă, treburi casnice, haine) — același tip sentenceBuild. Toate prin `buildSeriesFrom(themes,count,prefix)`, eșantion de 6/temă. `makeSentenceExercise` produce banca automat: tokenii răspunsului + 3 distractori determinist), **Imagini și cuvinte** (12 galerii tematice; quiz pe loc în `themeGallery.js`).
- `scripts/verify-vocab.mjs`: la `multiChoice`, direcția se decide cu `germanPhrasePasses(correct) && !looksRomanian(correct)` și sare opțiunile care `looksRomanian` — altfel cuvinte ro care coincid cu intrări de (ex. „august", „elefant", lunile) erau raportate fals ca germane necunoscute. Tipuri noi: `listenChoice` verifică `word`, `trueFalse` verifică `de`, `sortCategories` verifică fiecare `item.de`; **`sentenceBuild` e exceptat intenționat** (propoziții autoreate care pot folosi cuvinte din afara dicționarului).

## Verificare / testare

```powershell
npm run verify     # gard de vocabular (rulat automat și în npm run build)
npm run build      # verify + vite build
# Smoke tests (playwright e în devDependencies; `npx playwright install chromium` o dată):
npm run dev        # într-un terminal separat
npm run smoke      # rulează toate suitele de mai jos
node scripts/smoke-test.mjs       # 13 fluxuri principale
node scripts/smoke-practice.mjs   # repetiție SRS, repară greșelile, history/refresh, export
node scripts/smoke-dialogue.mjs   # exercițiul de dialog
node scripts/smoke-newtypes.mjs   # tipurile noi: sentenceBuild + listenChoice/trueFalse/sortCategories
node scripts/smoke-home-collapse.mjs  # butonul „Lecții de bază" (restrâns implicit)
node scripts/smoke-series-collapse.mjs # dropdown pe serii în secțiuni
node scripts/smoke-home-series.mjs     # dropdown pe seriile de provocări de pe home
```

## Limitări actuale + planul de viitor

Client-side intenționat (decizie din 2026-06-11): profilurile sunt locale per browser/dispozitiv, fără sync, fără chei API.
**Hostico are „Setup Node.js App"** (Passenger) → când se dorește sync între dispozitive / progres vizibil de la distanță: un mic API Express + MySQL (inclus în cPanel), frontend-ul rămâne static. Structura per-profil din `storage.js` e deja formatul care s-ar sincroniza. Singurul criteriu hard: aplicația rămâne publică pe subdomeniul propriu.
