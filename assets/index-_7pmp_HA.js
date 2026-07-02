(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`invatam_germana_users`,t=`invatam_germana`,n=`invatam_germana_backup_v1`,r=e=>`invatam_germana::${e}`,i={xp:0,level:1,streak:0,lastActiveDate:null,dailyGoalMinutes:10,dailyMinutesToday:0,dailyGoalCompleted:!1,lessonsCompleted:{},exerciseHistory:[],wordsLearned:[],wordsMastered:[],badges:[],totalCorrect:0,totalWrong:0,totalLessonsCompleted:0,totalAttempts:0,totalMinutes:0,theme:`light`,createdAt:null,mistakes:[]};function a(){try{let t=localStorage.getItem(e);if(t)return JSON.parse(t)}catch(e){console.error(`Failed to read user registry:`,e)}return null}function o(t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`Failed to save user registry:`,e)}}function s(){let e=a();if(e)return e;e={version:1,activeUserId:null,users:[]};let i=localStorage.getItem(t);if(i){let a={id:`u_`+Date.now(),name:`Profilul meu`,avatar:`🙂`,createdAt:new Date().toISOString(),lastActiveAt:new Date().toISOString()};localStorage.setItem(r(a.id),i),localStorage.setItem(n,i),localStorage.removeItem(t),e.users.push(a),e.activeUserId=a.id}return o(e),e}function c(){return s().users}function l(){let e=s();return e.users.find(t=>t.id===e.activeUserId)||null}function u(e,t){let n=s(),r={id:`u_`+Date.now()+`_`+Math.floor(Math.random()*1e3),name:(e||`Profil nou`).trim().slice(0,24),avatar:t||`🙂`,createdAt:new Date().toISOString(),lastActiveAt:new Date().toISOString()};return n.users.push(r),n.activeUserId=r.id,o(n),_({...i,createdAt:new Date().toISOString()}),r}function d(e){let t=s(),n=t.users.find(t=>t.id===e);return n?(t.activeUserId=e,n.lastActiveAt=new Date().toISOString(),o(t),n):null}function f(e,t){let n=s(),r=n.users.find(t=>t.id===e);r&&(r.name=(t||r.name).trim().slice(0,24),o(n))}function p(e){let t=s();t.users=t.users.filter(t=>t.id!==e),localStorage.removeItem(r(e)),t.activeUserId===e&&(t.activeUserId=t.users.length?t.users[0].id:null),o(t)}function m(e){try{let t=localStorage.getItem(r(e));if(t)return{...i,...JSON.parse(t)}}catch(e){console.error(`Failed to peek user state:`,e)}return{...i}}function h(){let e=s();return e.activeUserId?r(e.activeUserId):null}function g(){try{let e=h();if(!e)return{...i};let t=localStorage.getItem(e);if(!t){let e={...i,createdAt:new Date().toISOString()};return _(e),e}return{...i,...JSON.parse(t)}}catch(e){return console.error(`Failed to load state:`,e),{...i}}}function _(e){try{let t=h();if(!t)return;localStorage.setItem(t,JSON.stringify(e))}catch(e){console.error(`Failed to save state:`,e)}}function v(e){let t={...g(),...e};return _(t),t}function ee(){let e=h();return e&&localStorage.removeItem(e),g()}var te=50,ne=30,re=[0,100,250,500,850,1300,1900,2600,3500,4500,6e3,8e3,10500,13500,17e3],ie=[`Începător`,`Începător`,`Începător Avansat`,`Elementar`,`Elementar`,`Elementar Avansat`,`Intermediar`,`Intermediar`,`Intermediar Avansat`,`Avansat`,`Avansat`,`Expert`,`Expert`,`Maestru`,`Maestru Suprem`];function ae(e){let t=1;for(let n=re.length-1;n>=0;n--)if(e>=re[n]){t=n+1;break}return t}function oe(e){return ie[Math.min(e-1,ie.length-1)]}function se(e,t){let n=re[t-1]||0,r=re[t]||n+1e3;return{current:e-n,needed:r-n,percent:Math.min(100,(e-n)/(r-n)*100)}}function ce(e){let t=g(),n=t.level,r=t.xp+e,i=ae(r),a=i>n;return v({xp:r,level:i}),{xp:r,level:i,leveledUp:a,xpGained:e}}function le(){let e=g(),t=new Date().toDateString(),n=e.lastActiveDate;if(n===t)return e.streak;let r=new Date;r.setDate(r.getDate()-1);let i;return i=n===r.toDateString()?e.streak+1:1,v({streak:i,lastActiveDate:t,dailyMinutesToday:n===t?e.dailyMinutesToday:0,dailyGoalCompleted:!1}),i}function ue(e){let t=g(),n=t.dailyMinutesToday+e,r=n>=t.dailyGoalMinutes;return v({dailyMinutesToday:n,dailyGoalCompleted:r}),{minutes:n,goal:t.dailyGoalMinutes,completed:r}}function de(e){v({dailyGoalMinutes:e})}function fe(e,t,n){let r=g(),i=t>=90?3:t>=70?2:1,a=r.lessonsCompleted[e],o=!a||!a.completed;v({lessonsCompleted:{...r.lessonsCompleted,[e]:{completed:!0,stars:Math.max(i,a?.stars||0),bestScore:Math.max(t,a?.bestScore||0),completedAt:new Date().toISOString()}},totalLessonsCompleted:r.totalLessonsCompleted+ +!!o});let s=ne;t===100&&(s+=te);let c=ce(s),l=ye();return{stars:i,score:t,bonusXP:s,xpResult:c,newBadges:l,isNew:o}}function y(e){return g().lessonsCompleted[e]?.completed||!1}function pe(e,t){if(e===t[0]?.id)return!0;let n=t.findIndex(t=>t.id===e);return n<=0?!0:y(t[n-1].id)}function me(e){let t=g();t.wordsLearned.includes(e)||v({wordsLearned:[...t.wordsLearned,e]})}function he(e){let t=g();v({mistakes:[e,...t.mistakes].slice(0,50),totalWrong:t.totalWrong+1})}function ge(){v({totalCorrect:g().totalCorrect+1})}function _e(){v({totalAttempts:(g().totalAttempts||0)+1})}var ve=[{id:`first_lesson`,icon:`🎓`,name:`Prima lecție`,description:`Ai completat prima ta lecție!`,check:e=>e.totalLessonsCompleted>=1},{id:`streak_3`,icon:`🔥`,name:`3 zile la rând`,description:`Serie de 3 zile consecutive!`,check:e=>e.streak>=3},{id:`streak_7`,icon:`🔥`,name:`O săptămână!`,description:`Serie de 7 zile consecutive!`,check:e=>e.streak>=7},{id:`streak_30`,icon:`💎`,name:`O lună!`,description:`Serie de 30 de zile consecutive!`,check:e=>e.streak>=30},{id:`words_10`,icon:`📚`,name:`Primele 10 cuvinte`,description:`Ai învățat 10 cuvinte noi!`,check:e=>e.wordsLearned.length>=10},{id:`words_50`,icon:`📖`,name:`50 de cuvinte`,description:`Ai învățat 50 de cuvinte!`,check:e=>e.wordsLearned.length>=50},{id:`words_100`,icon:`🏆`,name:`100 de cuvinte`,description:`Ai învățat 100 de cuvinte! Ești un campion!`,check:e=>e.wordsLearned.length>=100},{id:`xp_500`,icon:`⭐`,name:`500 XP`,description:`Ai acumulat 500 de puncte de experiență!`,check:e=>e.xp>=500},{id:`xp_1000`,icon:`🌟`,name:`1000 XP`,description:`O mie de puncte XP! Incredibil!`,check:e=>e.xp>=1e3},{id:`perfect`,icon:`💯`,name:`Perfecțiune`,description:`Ai terminat o lecție cu scor perfect!`,check:e=>Object.values(e.lessonsCompleted).some(e=>e.bestScore===100)},{id:`lessons_5`,icon:`🎯`,name:`5 lecții complete`,description:`Ai terminat 5 lecții! Continui excelent!`,check:e=>e.totalLessonsCompleted>=5},{id:`level_5`,icon:`🏅`,name:`Nivel 5`,description:`Ai ajuns la nivelul 5!`,check:e=>e.level>=5}];function ye(){let e=g(),t=[];for(let n of ve)!e.badges.includes(n.id)&&n.check(e)&&t.push(n);return t.length>0&&v({badges:[...e.badges,...t.map(e=>e.id)]}),t}function be(){let e=g();return ve.map(t=>({...t,earned:e.badges.includes(t.id)}))}function xe(){let e=g();return{xp:e.xp,level:e.level,levelName:oe(e.level),streak:e.streak,wordsLearned:e.wordsLearned.length,totalCorrect:e.totalCorrect,totalWrong:e.totalWrong,accuracy:e.totalCorrect+e.totalWrong>0?Math.round(e.totalCorrect/(e.totalCorrect+e.totalWrong)*100):0,totalLessonsCompleted:e.totalLessonsCompleted,totalAttempts:e.totalAttempts||0,totalMinutes:e.totalMinutes||0,dailyMinutes:Math.round(e.dailyMinutesToday),dailyGoal:e.dailyGoalMinutes,dailyGoalCompleted:e.dailyGoalCompleted,xpProgress:se(e.xp,e.level)}}var Se=3e4,Ce=9e4,we=4,Te=Date.now(),b=0,Ee=0,De=!1;function Oe(){Te=Date.now()}function ke(){b<=0||(v({totalMinutes:(g().totalMinutes||0)+b}),ue(b),b=0,Ee=0)}function Ae(){De||(De=!0,document.addEventListener(`pointerdown`,Oe,{passive:!0}),document.addEventListener(`keydown`,Oe,{passive:!0}),setInterval(()=>{document.visibilityState===`visible`&&Date.now()-Te<Ce&&(b+=.5,Ee++,Ee>=we&&ke())},Se),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&ke()}),window.addEventListener(`pagehide`,ke))}function x(e){return String(e||``).toLowerCase().replace(/ä/g,`a`).replace(/ö/g,`o`).replace(/ü/g,`u`).replace(/ß/g,`ss`).replace(/[.,!?;:„"”«»()]/g,``).replace(/\s+/g,` `).trim()}function je(e){return x(e).replace(/ă/g,`a`).replace(/â/g,`a`).replace(/î/g,`i`).replace(/ș|ş/g,`s`).replace(/ț|ţ/g,`t`)}function S(e){return je(e)}var Me={hallo:`👋`,tschuss:`👋`,"auf wiedersehen":`🤝`,"guten morgen":`🌅`,"guten tag":`☀️`,"guten abend":`🌆`,"gute nacht":`🌙`,danke:`🙏`,bitte:`🙏`,ja:`✅`,nein:`❌`,entschuldigung:`🙇`,ich:`🙋`,du:`👉`,wir:`👥`,sie:`👨‍👩‍👧`,mann:`👨`,frau:`👩`,kind:`🧒`,freund:`🧑‍🤝‍🧑`,familie:`👨‍👩‍👧‍👦`,mutter:`👩`,vater:`👨`,bruder:`👦`,schwester:`👧`,eins:`1️⃣`,zwei:`2️⃣`,drei:`3️⃣`,vier:`4️⃣`,funf:`5️⃣`,sechs:`6️⃣`,sieben:`7️⃣`,acht:`8️⃣`,neun:`9️⃣`,zehn:`🔟`,wasser:`💧`,milch:`🥛`,tee:`🍵`,kaffee:`☕`,saft:`🧃`,bier:`🍺`,wein:`🍷`,cola:`🥤`,orangensaft:`🍊`,apfelsaft:`🍎`,brot:`🍞`,kase:`🧀`,butter:`🧈`,ei:`🥚`,eier:`🥚`,fleisch:`🥩`,fisch:`🐟`,huhn:`🍗`,wurst:`🌭`,apfel:`🍎`,banane:`🍌`,orange:`🍊`,erdbeere:`🍓`,kartoffel:`🥔`,tomate:`🍅`,salat:`🥗`,suppe:`🍲`,pizza:`🍕`,pasta:`🍝`,kuchen:`🍰`,schokolade:`🍫`,reis:`🍚`,nudeln:`🍜`,hund:`🐕`,katze:`🐈`,vogel:`🐦`,"fisch ":`🐠`,pferd:`🐎`,kuh:`🐄`,schwein:`🐖`,schaf:`🐑`,maus:`🐁`,bar:`🐻`,lowe:`🦁`,elefant:`🐘`,rot:`🟥`,blau:`🟦`,grun:`🟩`,gelb:`🟨`,schwarz:`⬛`,weiss:`⬜`,"orange ":`🟧`,lila:`🟪`,braun:`🟫`,rosa:`💗`,grau:`🩶`,heute:`📅`,morgen:`🌅`,gestern:`⏪`,jetzt:`⌛`,montag:`1️⃣`,dienstag:`2️⃣`,mittwoch:`3️⃣`,donnerstag:`4️⃣`,freitag:`5️⃣`,samstag:`6️⃣`,sonntag:`7️⃣`,sonne:`☀️`,mond:`🌙`,stern:`⭐`,wolke:`☁️`,regen:`🌧️`,schnee:`❄️`,wind:`💨`,baum:`🌳`,blume:`🌸`,gras:`🌱`,meer:`🌊`,berg:`🏔️`,haus:`🏠`,schule:`🏫`,universitat:`🎓`,arbeit:`💼`,buro:`🏢`,krankenhaus:`🏥`,restaurant:`🍽️`,café:`☕`,bahnhof:`🚉`,flughafen:`✈️`,stadt:`🏙️`,land:`🏞️`,park:`🌳`,kino:`🎬`,museum:`🏛️`,kirche:`⛪`,auto:`🚗`,bus:`🚌`,zug:`🚆`,fahrrad:`🚲`,flugzeug:`✈️`,schiff:`🚢`,taxi:`🚕`,"u-bahn":`🚇`,essen:`🍽️`,trinken:`🥤`,schlafen:`😴`,arbeiten:`💼`,lernen:`📚`,lesen:`📖`,schreiben:`✍️`,sprechen:`🗣️`,horen:`👂`,sehen:`👀`,gehen:`🚶`,laufen:`🏃`,kommen:`🚶‍♂️`,fahren:`🚗`,kaufen:`🛒`,spielen:`⚽`,gut:`👍`,schlecht:`👎`,gross:`⬆️`,klein:`⬇️`,schon:`✨`,hasslich:`😬`,alt:`👴`,jung:`👶`,neu:`🆕`,heiss:`🔥`,kalt:`🧊`,warm:`☀️`,mude:`😴`,glucklich:`😄`,traurig:`😢`,rumanien:`🇷🇴`,deutschland:`🇩🇪`,osterreich:`🇦🇹`,schweiz:`🇨🇭`,frankreich:`🇫🇷`,italien:`🇮🇹`,spanien:`🇪🇸`,england:`🇬🇧`,usa:`🇺🇸`,kopf:`🗣️`,auge:`👁️`,ohr:`👂`,nase:`👃`,mund:`👄`,hand:`✋`,fuss:`🦶`,herz:`❤️`,"freut mich":`😊`,"wie heisst du":`❓`,"wie geht es dir":`🤔`,"ich heisse":`👋`,"ich komme aus":`🌍`,haar:`💇`,bein:`🦵`,arm:`💪`,zahn:`🦷`,finger:`👆`,gesicht:`😐`,hemd:`👔`,hose:`👖`,schuh:`👟`,jacke:`🧥`,kleid:`👗`,mantel:`🧥`,mutze:`🧢`,socke:`🧦`,hut:`🎩`,rock:`👗`,pullover:`🧶`,zimmer:`🛋️`,kuche:`🍳`,bad:`🛁`,tisch:`🪵`,stuhl:`🪑`,bett:`🛏️`,tur:`🚪`,fenster:`🪟`,lampe:`💡`,sofa:`🛋️`,schrank:`🗄️`,garten:`🌷`,wetter:`🌤️`,sturm:`🌩️`,nebel:`🌫️`,himmel:`🌌`,sommer:`🏖️`,winter:`⛄`,fruhling:`🌸`,herbst:`🍂`,lehrer:`👨‍🏫`,arzt:`👨‍⚕️`,student:`🧑‍🎓`,koch:`👨‍🍳`,kellner:`🧑‍🍳`,polizist:`👮`,bauer:`👨‍🌾`,fahrer:`🚕`,verkaufer:`🛍️`,monat:`📆`,jahr:`🗓️`,zeit:`⏰`,stunde:`🕐`,minute:`⏱️`,uhr:`⌚`,woche:`📅`,wochenende:`🎉`,supermarkt:`🛒`,strasse:`🛣️`,markt:`🏪`,wald:`🌲`,fluss:`🏞️`,see:`🛶`,insel:`🏝️`,strand:`🏖️`,feld:`🌾`,stein:`🪨`,erde:`🌍`,gemuse:`🥦`,obst:`🍏`,zucker:`🍬`,salz:`🧂`,tiger:`🐅`,affe:`🐒`,wolf:`🐺`,schnell:`🏃`,langsam:`🐢`,teuer:`💰`,billig:`🪙`,lang:`📏`,kurz:`📐`,stark:`💪`,leer:`🈳`},Ne=e=>x(e).replace(/^(der|die|das|ein|eine|einen)\s+/,``),Pe=(()=>{let e=new Map;for(let t of Object.keys(Me))e.set(Ne(t),Me[t]);return e})();function C(e){if(!e)return null;let t=Ne(e);if(Pe.has(t))return Pe.get(t);let n=t.split(/\s+/).filter(Boolean);for(let e of n)if(Pe.has(e))return Pe.get(e);return null}function Fe(e){return C(e)!==null}var w=[{de:`Hallo`,ro:`Bună`,category:`salutari`},{de:`Guten Morgen`,ro:`Bună dimineața`,category:`salutari`},{de:`Guten Tag`,ro:`Bună ziua`,category:`salutari`},{de:`Guten Abend`,ro:`Bună seara`,category:`salutari`},{de:`Gute Nacht`,ro:`Noapte bună`,category:`salutari`},{de:`Tschuss`,ro:`Pa`,original:`Tschüss`,category:`salutari`},{de:`Auf Wiedersehen`,ro:`La revedere`,category:`salutari`},{de:`Danke`,ro:`Mulțumesc`,category:`salutari`},{de:`Bitte`,ro:`Te rog`,category:`salutari`},{de:`Ja`,ro:`Da`,category:`salutari`},{de:`Nein`,ro:`Nu`,category:`salutari`},{de:`Entschuldigung`,ro:`Scuze`,category:`salutari`},{de:`Freut mich`,ro:`Îmi pare bine`,category:`expresii`},{de:`Wie heisst du?`,ro:`Cum te cheamă?`,original:`Wie heißt du?`,category:`expresii`},{de:`Wie geht es dir?`,ro:`Ce mai faci?`,category:`expresii`},{de:`Mir geht es gut`,ro:`Mă simt bine`,category:`expresii`},{de:`Ich komme aus`,ro:`Vin din`,category:`expresii`},{de:`ich`,ro:`eu`,category:`functionale`},{de:`du`,ro:`tu`,category:`functionale`},{de:`Sie`,ro:`dumneavoastră`,category:`functionale`},{de:`es`,ro:`el / ea (neutru)`,category:`functionale`},{de:`mir`,ro:`mie / îmi`,category:`functionale`},{de:`mich`,ro:`pe mine / mă`,category:`functionale`},{de:`dir`,ro:`ție / îți`,category:`functionale`},{de:`dich`,ro:`pe tine / te`,category:`functionale`},{de:`der`,ro:`articol hotărât (masculin)`,category:`functionale`},{de:`die`,ro:`articol hotărât (feminin)`,category:`functionale`},{de:`das`,ro:`articol hotărât (neutru) / asta`,category:`functionale`},{de:`ein`,ro:`un`,category:`functionale`},{de:`eine`,ro:`o`,category:`functionale`},{de:`einen`,ro:`un (acuzativ)`,category:`functionale`},{de:`mein`,ro:`al meu`,category:`functionale`},{de:`wie`,ro:`cum`,category:`functionale`},{de:`was`,ro:`ce`,category:`functionale`},{de:`wo`,ro:`unde`,category:`functionale`},{de:`woher`,ro:`de unde`,category:`functionale`},{de:`aus`,ro:`din`,category:`functionale`},{de:`mit`,ro:`cu`,category:`functionale`},{de:`und`,ro:`și`,category:`functionale`},{de:`oder`,ro:`sau`,category:`functionale`},{de:`nicht`,ro:`nu (negație)`,category:`functionale`},{de:`sehr`,ro:`foarte`,category:`functionale`},{de:`bin`,ro:`sunt`,category:`verbe`},{de:`bist`,ro:`ești`,category:`verbe`},{de:`ist`,ro:`este`,category:`verbe`},{de:`sind`,ro:`sunt (plural)`,category:`verbe`},{de:`habe`,ro:`am`,category:`verbe`},{de:`heisse`,ro:`mă numesc`,original:`heiße`,category:`verbe`},{de:`heisst`,ro:`te numești`,original:`heißt`,category:`verbe`},{de:`komme`,ro:`vin`,category:`verbe`},{de:`kommst`,ro:`vii`,category:`verbe`},{de:`geht`,ro:`merge`,category:`verbe`},{de:`gibt`,ro:`dă`,category:`verbe`},{de:`essen`,ro:`a mânca`,category:`verbe`},{de:`esse`,ro:`mănânc`,category:`verbe`},{de:`trinken`,ro:`a bea`,category:`verbe`},{de:`trinke`,ro:`beau`,category:`verbe`},{de:`trinkst`,ro:`bei`,category:`verbe`},{de:`mochte`,ro:`aș dori`,original:`möchte`,category:`verbe`},{de:`mochtest`,ro:`ai dori`,original:`möchtest`,category:`verbe`},{de:`mochten`,ro:`ați dori`,original:`möchten`,category:`verbe`},{de:`spielt`,ro:`se joacă`,category:`verbe`},{de:`lerne`,ro:`învăț`,category:`verbe`},{de:`schmeckt`,ro:`are gust`,category:`verbe`},{de:`freut`,ro:`bucură`,category:`verbe`},{de:`kennenzulernen`,ro:`a face cunoștință`,category:`verbe`},{de:`gut`,ro:`bine / bun`,category:`adjective`},{de:`schlecht`,ro:`rău`,category:`adjective`},{de:`gute`,ro:`bună`,category:`adjective`},{de:`guten`,ro:`bun (acuzativ)`,category:`adjective`},{de:`gross`,ro:`mare`,original:`groß`,category:`adjective`},{de:`klein`,ro:`mic`,category:`adjective`},{de:`schon`,ro:`frumos`,original:`schön`,category:`adjective`},{de:`mude`,ro:`obosit`,original:`müde`,category:`adjective`},{de:`heiss`,ro:`fierbinte`,original:`heiß`,category:`adjective`},{de:`gesund`,ro:`sănătos`,category:`adjective`},{de:`gerne`,ro:`cu plăcere`,category:`adjective`},{de:`sofort`,ro:`imediat`,category:`adjective`},{de:`eins`,ro:`unu`,category:`numere`},{de:`zwei`,ro:`doi`,category:`numere`},{de:`drei`,ro:`trei`,category:`numere`},{de:`vier`,ro:`patru`,category:`numere`},{de:`funf`,ro:`cinci`,original:`fünf`,category:`numere`},{de:`sechs`,ro:`șase`,category:`numere`},{de:`sieben`,ro:`șapte`,category:`numere`},{de:`acht`,ro:`opt`,category:`numere`},{de:`neun`,ro:`nouă`,category:`numere`},{de:`zehn`,ro:`zece`,category:`numere`},{de:`Morgen`,ro:`dimineață / mâine`,category:`timp`},{de:`Tag`,ro:`zi`,category:`timp`},{de:`Abend`,ro:`seară`,category:`timp`},{de:`Nacht`,ro:`noapte`,category:`timp`},{de:`Mutter`,article:`die`,ro:`mamă`,category:`familie`},{de:`Vater`,article:`der`,ro:`tată`,category:`familie`},{de:`Schwester`,article:`die`,ro:`soră`,category:`familie`},{de:`Bruder`,article:`der`,ro:`frate`,category:`familie`},{de:`Grossmutter`,article:`die`,ro:`bunică`,original:`Großmutter`,category:`familie`},{de:`Grossvater`,article:`der`,ro:`bunic`,original:`Großvater`,category:`familie`},{de:`Kind`,article:`das`,ro:`copil`,category:`familie`},{de:`Eltern`,article:`die`,ro:`părinți`,category:`familie`},{de:`Mann`,article:`der`,ro:`bărbat / soț`,category:`familie`},{de:`Frau`,article:`die`,ro:`femeie / soție`,category:`familie`},{de:`Familie`,article:`die`,ro:`familie`,category:`familie`},{de:`Brot`,article:`das`,ro:`pâine`,category:`mancare`},{de:`Apfel`,article:`der`,ro:`măr`,category:`mancare`},{de:`Suppe`,article:`die`,ro:`supă`,category:`mancare`},{de:`Fleisch`,article:`das`,ro:`carne`,category:`mancare`},{de:`Kase`,article:`der`,ro:`brânză`,original:`Käse`,category:`mancare`},{de:`Banane`,article:`die`,ro:`banană`,category:`mancare`},{de:`Ei`,article:`das`,ro:`ou`,category:`mancare`},{de:`Pizza`,article:`die`,ro:`pizza`,category:`mancare`},{de:`Wasser`,article:`das`,ro:`apă`,category:`bauturi`},{de:`Milch`,article:`die`,ro:`lapte`,category:`bauturi`},{de:`Kaffee`,article:`der`,ro:`cafea`,category:`bauturi`},{de:`Tee`,article:`der`,ro:`ceai`,category:`bauturi`},{de:`Saft`,article:`der`,ro:`suc`,category:`bauturi`},{de:`Cola`,article:`die`,ro:`cola`,category:`bauturi`},{de:`Bier`,article:`das`,ro:`bere`,category:`bauturi`},{de:`Wein`,article:`der`,ro:`vin`,category:`bauturi`},{de:`rot`,ro:`roșu`,category:`culori`},{de:`blau`,ro:`albastru`,category:`culori`},{de:`grun`,ro:`verde`,original:`grün`,category:`culori`},{de:`gelb`,ro:`galben`,category:`culori`},{de:`schwarz`,ro:`negru`,category:`culori`},{de:`weiss`,ro:`alb`,original:`weiß`,category:`culori`},{de:`braun`,ro:`maro`,category:`culori`},{de:`orange`,ro:`portocaliu`,category:`culori`},{de:`rosa`,ro:`roz`,category:`culori`},{de:`lila`,ro:`mov`,category:`culori`},{de:`Hund`,article:`der`,ro:`câine`,category:`animale`},{de:`Katze`,article:`die`,ro:`pisică`,category:`animale`},{de:`Vogel`,article:`der`,ro:`pasăre`,category:`animale`},{de:`Fisch`,article:`der`,ro:`pește`,category:`animale`},{de:`Pferd`,article:`das`,ro:`cal`,category:`animale`},{de:`Kuh`,article:`die`,ro:`vacă`,category:`animale`},{de:`Schwein`,article:`das`,ro:`porc`,category:`animale`},{de:`Maus`,article:`die`,ro:`șoarece`,category:`animale`},{de:`Bar`,article:`der`,ro:`urs`,original:`Bär`,category:`animale`},{de:`Fuchs`,article:`der`,ro:`vulpe`,category:`animale`},{de:`Sonne`,article:`die`,ro:`soare`,category:`natura`},{de:`Mond`,article:`der`,ro:`lună`,category:`natura`},{de:`Stern`,article:`der`,ro:`stea`,category:`natura`},{de:`Baum`,article:`der`,ro:`copac`,category:`natura`},{de:`Blume`,article:`die`,ro:`floare`,category:`natura`},{de:`Regen`,article:`der`,ro:`ploaie`,category:`natura`},{de:`Schnee`,article:`der`,ro:`zăpadă`,category:`natura`},{de:`Berg`,article:`der`,ro:`munte`,category:`natura`},{de:`Auto`,article:`das`,ro:`mașină`,category:`transport`},{de:`Bus`,article:`der`,ro:`autobuz`,category:`transport`},{de:`Zug`,article:`der`,ro:`tren`,category:`transport`},{de:`Fahrrad`,article:`das`,ro:`bicicletă`,category:`transport`},{de:`Flugzeug`,article:`das`,ro:`avion`,category:`transport`},{de:`Schiff`,article:`das`,ro:`vapor`,category:`transport`},{de:`Taxi`,article:`das`,ro:`taxi`,category:`transport`},{de:`Haus`,article:`das`,ro:`casă`,category:`locuri`},{de:`Fussball`,article:`der`,ro:`fotbal`,original:`Fußball`,category:`sport`},{de:`Deutsch`,ro:`germană (limba)`,category:`limbi`},{de:`Rumanien`,ro:`România`,original:`Rumänien`,category:`tari`},{de:`Deutschland`,ro:`Germania`,category:`tari`},{de:`Osterreich`,ro:`Austria`,original:`Österreich`,category:`tari`},{de:`Russland`,ro:`Rusia`,category:`tari`},{de:`elf`,ro:`unsprezece`,category:`numere`},{de:`zwolf`,ro:`doisprezece`,original:`zwölf`,category:`numere`},{de:`dreizehn`,ro:`treisprezece`,category:`numere`},{de:`vierzehn`,ro:`paisprezece`,category:`numere`},{de:`funfzehn`,ro:`cincisprezece`,original:`fünfzehn`,category:`numere`},{de:`sechzehn`,ro:`șaisprezece`,category:`numere`},{de:`siebzehn`,ro:`șaptesprezece`,category:`numere`},{de:`achtzehn`,ro:`optsprezece`,category:`numere`},{de:`neunzehn`,ro:`nouăsprezece`,category:`numere`},{de:`zwanzig`,ro:`douăzeci`,category:`numere`},{de:`Montag`,article:`der`,ro:`luni`,category:`zile`},{de:`Dienstag`,article:`der`,ro:`marți`,category:`zile`},{de:`Mittwoch`,article:`der`,ro:`miercuri`,category:`zile`},{de:`Donnerstag`,article:`der`,ro:`joi`,category:`zile`},{de:`Freitag`,article:`der`,ro:`vineri`,category:`zile`},{de:`Samstag`,article:`der`,ro:`sâmbătă`,category:`zile`},{de:`Sonntag`,article:`der`,ro:`duminică`,category:`zile`},{de:`Woche`,article:`die`,ro:`săptămână`,category:`zile`},{de:`Wochenende`,article:`das`,ro:`weekend`,category:`zile`},{de:`Januar`,article:`der`,ro:`ianuarie`,category:`luni`},{de:`Februar`,article:`der`,ro:`februarie`,category:`luni`},{de:`Marz`,article:`der`,ro:`martie`,original:`März`,category:`luni`},{de:`April`,article:`der`,ro:`aprilie`,category:`luni`},{de:`Mai`,article:`der`,ro:`mai`,category:`luni`},{de:`Juni`,article:`der`,ro:`iunie`,category:`luni`},{de:`Juli`,article:`der`,ro:`iulie`,category:`luni`},{de:`August`,article:`der`,ro:`august`,category:`luni`},{de:`September`,article:`der`,ro:`septembrie`,category:`luni`},{de:`Oktober`,article:`der`,ro:`octombrie`,category:`luni`},{de:`November`,article:`der`,ro:`noiembrie`,category:`luni`},{de:`Dezember`,article:`der`,ro:`decembrie`,category:`luni`},{de:`Monat`,article:`der`,ro:`lună (calendaristică)`,category:`timp`},{de:`Jahr`,article:`das`,ro:`an`,category:`timp`},{de:`Zeit`,article:`die`,ro:`timp`,category:`timp`},{de:`Stunde`,article:`die`,ro:`oră`,category:`timp`},{de:`Minute`,article:`die`,ro:`minut`,category:`timp`},{de:`Uhr`,article:`die`,ro:`ceas`,category:`timp`},{de:`heute`,ro:`azi`,category:`timp`},{de:`gestern`,ro:`ieri`,category:`timp`},{de:`jetzt`,ro:`acum`,category:`timp`},{de:`Kopf`,article:`der`,ro:`cap`,category:`corp`},{de:`Auge`,article:`das`,ro:`ochi`,category:`corp`},{de:`Ohr`,article:`das`,ro:`ureche`,category:`corp`},{de:`Nase`,article:`die`,ro:`nas`,category:`corp`},{de:`Mund`,article:`der`,ro:`gură`,category:`corp`},{de:`Hand`,article:`die`,ro:`mână`,category:`corp`},{de:`Fuss`,article:`der`,ro:`picior (laba)`,original:`Fuß`,category:`corp`},{de:`Herz`,article:`das`,ro:`inimă`,category:`corp`},{de:`Haar`,article:`das`,ro:`păr`,category:`corp`},{de:`Bein`,article:`das`,ro:`picior`,category:`corp`},{de:`Arm`,article:`der`,ro:`braț`,category:`corp`},{de:`Zahn`,article:`der`,ro:`dinte`,category:`corp`},{de:`Finger`,article:`der`,ro:`deget`,category:`corp`},{de:`Gesicht`,article:`das`,ro:`față`,category:`corp`},{de:`Bauch`,article:`der`,ro:`burtă`,category:`corp`},{de:`Rucken`,article:`der`,ro:`spate`,original:`Rücken`,category:`corp`},{de:`Hemd`,article:`das`,ro:`cămașă`,category:`haine`},{de:`Hose`,article:`die`,ro:`pantaloni`,category:`haine`},{de:`Schuh`,article:`der`,ro:`pantof`,category:`haine`},{de:`Jacke`,article:`die`,ro:`jachetă`,category:`haine`},{de:`Kleid`,article:`das`,ro:`rochie`,category:`haine`},{de:`Mantel`,article:`der`,ro:`palton`,category:`haine`},{de:`Mutze`,article:`die`,ro:`căciulă`,original:`Mütze`,category:`haine`},{de:`Socke`,article:`die`,ro:`șosetă`,category:`haine`},{de:`Hut`,article:`der`,ro:`pălărie`,category:`haine`},{de:`Rock`,article:`der`,ro:`fustă`,category:`haine`},{de:`Pullover`,article:`der`,ro:`pulover`,category:`haine`},{de:`Zimmer`,article:`das`,ro:`cameră`,category:`casa`},{de:`Kuche`,article:`die`,ro:`bucătărie`,original:`Küche`,category:`casa`},{de:`Bad`,article:`das`,ro:`baie`,category:`casa`},{de:`Tisch`,article:`der`,ro:`masă`,category:`casa`},{de:`Stuhl`,article:`der`,ro:`scaun`,category:`casa`},{de:`Bett`,article:`das`,ro:`pat`,category:`casa`},{de:`Tur`,article:`die`,ro:`ușă`,original:`Tür`,category:`casa`},{de:`Fenster`,article:`das`,ro:`fereastră`,category:`casa`},{de:`Lampe`,article:`die`,ro:`lampă`,category:`casa`},{de:`Sofa`,article:`das`,ro:`canapea`,category:`casa`},{de:`Schrank`,article:`der`,ro:`dulap`,category:`casa`},{de:`Garten`,article:`der`,ro:`grădină`,category:`casa`},{de:`Wetter`,article:`das`,ro:`vreme`,category:`vreme`},{de:`Wolke`,article:`die`,ro:`nor`,category:`vreme`},{de:`Wind`,article:`der`,ro:`vânt`,category:`vreme`},{de:`Sturm`,article:`der`,ro:`furtună`,category:`vreme`},{de:`Nebel`,article:`der`,ro:`ceață`,category:`vreme`},{de:`Himmel`,article:`der`,ro:`cer`,category:`vreme`},{de:`Sommer`,article:`der`,ro:`vară`,category:`vreme`},{de:`Winter`,article:`der`,ro:`iarnă`,category:`vreme`},{de:`Fruhling`,article:`der`,ro:`primăvară`,original:`Frühling`,category:`vreme`},{de:`Herbst`,article:`der`,ro:`toamnă`,category:`vreme`},{de:`Lehrer`,article:`der`,ro:`profesor`,category:`meserii`},{de:`Arzt`,article:`der`,ro:`medic`,category:`meserii`},{de:`Student`,article:`der`,ro:`student`,category:`meserii`},{de:`Koch`,article:`der`,ro:`bucătar`,category:`meserii`},{de:`Kellner`,article:`der`,ro:`chelner`,category:`meserii`},{de:`Polizist`,article:`der`,ro:`polițist`,category:`meserii`},{de:`Bauer`,article:`der`,ro:`fermier`,category:`meserii`},{de:`Fahrer`,article:`der`,ro:`șofer`,category:`meserii`},{de:`Verkaufer`,article:`der`,ro:`vânzător`,original:`Verkäufer`,category:`meserii`},{de:`Schule`,article:`die`,ro:`școală`,category:`locuri`},{de:`Universitat`,article:`die`,ro:`universitate`,original:`Universität`,category:`locuri`},{de:`Arbeit`,article:`die`,ro:`muncă`,category:`locuri`},{de:`Buro`,article:`das`,ro:`birou`,original:`Büro`,category:`locuri`},{de:`Krankenhaus`,article:`das`,ro:`spital`,category:`locuri`},{de:`Restaurant`,article:`das`,ro:`restaurant`,category:`locuri`},{de:`Bahnhof`,article:`der`,ro:`gară`,category:`locuri`},{de:`Flughafen`,article:`der`,ro:`aeroport`,category:`locuri`},{de:`Stadt`,article:`die`,ro:`oraș`,category:`locuri`},{de:`Land`,article:`das`,ro:`țară`,category:`locuri`},{de:`Park`,article:`der`,ro:`parc`,category:`locuri`},{de:`Kino`,article:`das`,ro:`cinema`,category:`locuri`},{de:`Museum`,article:`das`,ro:`muzeu`,category:`locuri`},{de:`Kirche`,article:`die`,ro:`biserică`,category:`locuri`},{de:`Supermarkt`,article:`der`,ro:`supermarket`,category:`locuri`},{de:`Strasse`,article:`die`,ro:`stradă`,original:`Straße`,category:`locuri`},{de:`Markt`,article:`der`,ro:`piață`,category:`locuri`},{de:`Meer`,article:`das`,ro:`mare`,category:`natura`},{de:`Gras`,article:`das`,ro:`iarbă`,category:`natura`},{de:`Wald`,article:`der`,ro:`pădure`,category:`natura`},{de:`Fluss`,article:`der`,ro:`râu`,category:`natura`},{de:`See`,article:`der`,ro:`lac`,category:`natura`},{de:`Insel`,article:`die`,ro:`insulă`,category:`natura`},{de:`Strand`,article:`der`,ro:`plajă`,category:`natura`},{de:`Feld`,article:`das`,ro:`câmp`,category:`natura`},{de:`Stein`,article:`der`,ro:`piatră`,category:`natura`},{de:`Erde`,article:`die`,ro:`pământ`,category:`natura`},{de:`Tomate`,article:`die`,ro:`roșie`,category:`mancare`},{de:`Kartoffel`,article:`die`,ro:`cartof`,category:`mancare`},{de:`Salat`,article:`der`,ro:`salată`,category:`mancare`},{de:`Kuchen`,article:`der`,ro:`prăjitură`,category:`mancare`},{de:`Schokolade`,article:`die`,ro:`ciocolată`,category:`mancare`},{de:`Reis`,article:`der`,ro:`orez`,category:`mancare`},{de:`Nudeln`,article:`die`,ro:`tăiței`,category:`mancare`},{de:`Butter`,article:`die`,ro:`unt`,category:`mancare`},{de:`Wurst`,article:`die`,ro:`cârnat`,category:`mancare`},{de:`Huhn`,article:`das`,ro:`pui`,category:`mancare`},{de:`Erdbeere`,article:`die`,ro:`căpșună`,category:`mancare`},{de:`Gemuse`,article:`das`,ro:`legume`,original:`Gemüse`,category:`mancare`},{de:`Obst`,article:`das`,ro:`fructe`,category:`mancare`},{de:`Zucker`,article:`der`,ro:`zahăr`,category:`mancare`},{de:`Salz`,article:`das`,ro:`sare`,category:`mancare`},{de:`Lowe`,article:`der`,ro:`leu`,original:`Löwe`,category:`animale`},{de:`Elefant`,article:`der`,ro:`elefant`,category:`animale`},{de:`Schaf`,article:`das`,ro:`oaie`,category:`animale`},{de:`Tiger`,article:`der`,ro:`tigru`,category:`animale`},{de:`Affe`,article:`der`,ro:`maimuță`,category:`animale`},{de:`Wolf`,article:`der`,ro:`lup`,category:`animale`},{de:`Freund`,article:`der`,ro:`prieten`,category:`oameni`},{de:`grau`,ro:`gri`,category:`culori`},{de:`schlafen`,ro:`a dormi`,category:`verbe`},{de:`arbeiten`,ro:`a munci`,category:`verbe`},{de:`lernen`,ro:`a învăța`,category:`verbe`},{de:`lesen`,ro:`a citi`,category:`verbe`},{de:`schreiben`,ro:`a scrie`,category:`verbe`},{de:`sprechen`,ro:`a vorbi`,category:`verbe`},{de:`horen`,ro:`a auzi`,original:`hören`,category:`verbe`},{de:`sehen`,ro:`a vedea`,category:`verbe`},{de:`gehen`,ro:`a merge`,category:`verbe`},{de:`laufen`,ro:`a alerga`,category:`verbe`},{de:`kommen`,ro:`a veni`,category:`verbe`},{de:`fahren`,ro:`a conduce`,category:`verbe`},{de:`kaufen`,ro:`a cumpăra`,category:`verbe`},{de:`spielen`,ro:`a (se) juca`,category:`verbe`},{de:`machen`,ro:`a face`,category:`verbe`},{de:`wohnen`,ro:`a locui`,category:`verbe`},{de:`haben`,ro:`a avea`,category:`verbe`},{de:`sein`,ro:`a fi`,category:`verbe`},{de:`sagen`,ro:`a spune`,category:`verbe`},{de:`geben`,ro:`a da`,category:`verbe`},{de:`finden`,ro:`a găsi`,category:`verbe`},{de:`brauchen`,ro:`a avea nevoie`,category:`verbe`},{de:`mogen`,ro:`a plăcea`,original:`mögen`,category:`verbe`},{de:`wissen`,ro:`a ști`,category:`verbe`},{de:`denken`,ro:`a gândi`,category:`verbe`},{de:`kalt`,ro:`rece`,category:`adjective`},{de:`warm`,ro:`cald`,category:`adjective`},{de:`neu`,ro:`nou`,category:`adjective`},{de:`alt`,ro:`vechi / bătrân`,category:`adjective`},{de:`jung`,ro:`tânăr`,category:`adjective`},{de:`glucklich`,ro:`fericit`,original:`glücklich`,category:`adjective`},{de:`traurig`,ro:`trist`,category:`adjective`},{de:`schnell`,ro:`rapid`,category:`adjective`},{de:`langsam`,ro:`lent`,category:`adjective`},{de:`teuer`,ro:`scump`,category:`adjective`},{de:`billig`,ro:`ieftin`,category:`adjective`},{de:`hasslich`,ro:`urât`,original:`hässlich`,category:`adjective`},{de:`lang`,ro:`lung`,category:`adjective`},{de:`kurz`,ro:`scurt`,category:`adjective`},{de:`hoch`,ro:`înalt`,category:`adjective`},{de:`voll`,ro:`plin`,category:`adjective`},{de:`leer`,ro:`gol`,category:`adjective`},{de:`richtig`,ro:`corect`,category:`adjective`},{de:`falsch`,ro:`greșit`,category:`adjective`},{de:`einfach`,ro:`simplu`,category:`adjective`},{de:`schwer`,ro:`greu`,category:`adjective`},{de:`leicht`,ro:`ușor`,category:`adjective`},{de:`stark`,ro:`puternic`,category:`adjective`},{de:`schwach`,ro:`slab`,category:`adjective`},{de:`Anna`,ro:`Anna (nume)`,category:`nume`},{de:`in`,ro:`în`,category:`functionale`},{de:`im`,ro:`în (in dem)`,category:`functionale`},{de:`ins`,ro:`în / la (in das)`,category:`functionale`},{de:`nach`,ro:`spre / către`,category:`functionale`},{de:`zu`,ro:`la / spre`,category:`functionale`},{de:`dem`,ro:`articol hotărât (dativ)`,category:`functionale`},{de:`den`,ro:`articol hotărât (acuzativ masculin)`,category:`functionale`},{de:`meine`,ro:`a mea / ale mele`,category:`functionale`},{de:`wir`,ro:`noi`,category:`functionale`},{de:`gern`,ro:`cu plăcere / bucuros`,category:`functionale`},{de:`viel`,ro:`mult`,category:`functionale`},{de:`gehe`,ro:`merg`,category:`verbe`},{de:`kaufe`,ro:`cumpăr`,category:`verbe`},{de:`kostet`,ro:`costă`,category:`verbe`},{de:`brauche`,ro:`am nevoie de`,category:`verbe`},{de:`wohne`,ro:`locuiesc`,category:`verbe`},{de:`wohnst`,ro:`locuiești`,category:`verbe`},{de:`schlafe`,ro:`dorm`,category:`verbe`},{de:`fahre`,ro:`merg (cu un vehicul) / conduc`,category:`verbe`},{de:`isst`,ro:`mănânci / mănâncă`,category:`verbe`},{de:`kommt`,ro:`vine`,category:`verbe`},{de:`lernt`,ro:`învață`,category:`verbe`},{de:`liebe`,ro:`iubesc`,category:`verbe`},{de:`arbeite`,ro:`muncesc`,category:`verbe`},{de:`arbeitet`,ro:`muncește / lucrează`,category:`verbe`},{de:`macht`,ro:`face`,category:`verbe`},{de:`machst`,ro:`faci`,category:`verbe`},{de:`sehe`,ro:`văd`,category:`verbe`},{de:`sprichst`,ro:`vorbești`,category:`verbe`},{de:`hore`,ro:`ascult / aud`,original:`höre`,category:`verbe`},{de:`schreibe`,ro:`scriu`,category:`verbe`},{de:`Musik`,ro:`muzică`,article:`die`,category:`hobby`}],Ie=/^(der|die|das|ein|eine|einen)\s+/,T=(()=>{let e=new Map;for(let t of w)e.set(x(t.de),t),t.article&&e.set(x(`${t.article} ${t.de}`),t);return e})();function Le(e){let t=x(e);if(T.has(t))return!0;let n=t.replace(Ie,``);return n!==t&&T.has(n)}function Re(e){let t=x(e);if(T.has(t))return T.get(t);let n=t.replace(Ie,``);return T.get(n)||null}function ze(e){let t=je(e);return t?w.filter(e=>x(e.de).includes(t)||je(e.ro).includes(t)||e.original&&x(e.original).includes(t)):[]}var Be={salutari:`👋 Salutări`,expresii:`💬 Expresii`,adjective:`📏 Adjective`,numere:`🔢 Numere`,natura:`🌳 Natură`,locuri:`📍 Locuri`,corp:`🧍 Corp`,animale:`🐾 Animale`,timp:`⏰ Timp`,luni:`📅 Luni`,casa:`🏠 Casă`,haine:`👕 Haine`,familie:`👪 Familie`,culori:`🎨 Culori`,vreme:`🌤️ Vreme`,zile:`📆 Zile`,meserii:`💼 Meserii`,bauturi:`🥤 Băuturi`,transport:`🚗 Transport`,tari:`🌍 Țări`,mancare:`🍎 Mâncare`,verbe:`🏃 Verbe`};function Ve(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function He(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function E(e){return He(Ve(String(e)))}function D(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function Ue(e,t,n){return D(e,n).slice(0,t)}function O(e){return e.article?`${e.article} ${e.de}`:e.de}function k(e,t,n,r,i){let a=new Set([e[n]]),o=[];for(let e of D(t,i))if(!a.has(e[n])&&(a.add(e[n]),o.push(e),o.length>=r))break;return o}function We(e,t,n){let r=k(e,t,`ro`,3,n);return r.length<3?null:{type:`multiChoice`,question:`Ce înseamnă "${e.de}"?`,correct:e.ro,options:D([e.ro,...r.map(e=>e.ro)],n)}}function Ge(e,t,n){let r=k(e,t,`de`,3,n);if(r.length<3)return null;let i=O(e);return{type:`multiChoice`,question:`Cum se spune "${e.ro}" în germană?`,correct:i,options:D([i,...r.map(O)],n)}}function Ke(e,t,n){return{type:`translate_de_ro`,prompt:O(e),answer:e.ro}}function qe(e,t,n){return{type:`translate_ro_de`,prompt:e.ro,answer:O(e)}}function Je(e){let t=O(e);return{type:`listen`,word:t,answer:t}}function Ye(e){return{type:`speak`,word:O(e),translation:e.ro}}function Xe(e,t,n){let r=k(e,t,`de`,3,n);return r.length<3?null:{type:`match`,pairs:D([e,...r],n).map(e=>[O(e),e.ro])}}function Ze(e,t,n){if(!Fe(e.de))return null;let r=Ue(t.filter(t=>t.de!==e.de&&Fe(t.de)),2,n);return r.length<2?null:{type:`picturePick`,wordDe:e.de,correct:e.de,options:D([e.de,...r.map(e=>e.de)],n)}}function Qe(e,t,n){let r=k(e,t,`ro`,3,n);return r.length<3?null:{type:`listenChoice`,word:O(e),correct:e.ro,options:D([e.ro,...r.map(e=>e.ro)],n)}}function $e(e,t,n){if(n()<.5)return{type:`trueFalse`,de:O(e),ro:e.ro,correct:e.ro,isTrue:!0};let r=k(e,t,`ro`,1,n);return r.length?{type:`trueFalse`,de:O(e),ro:r[0].ro,correct:e.ro,isTrue:!1}:null}function et(e,t,n){let r=new Map;for(let e of t){let t=Re(e.de)?.category;!t||t===`functionale`||(r.has(t)||r.set(t,[]),r.get(t).push(e))}let i=D([...r.keys()].filter(e=>r.get(e).length>=2),n);if(i.length<2)return null;let a=i.slice(0,2),o=a.map(e=>({id:e,label:Be[e]||e})),s=[];for(let e of a)for(let t of Ue(r.get(e),3,n))s.push({de:O(t),cat:e});return s.length<4?null:{type:`sortCategories`,categories:o,items:D(s,n)}}var tt={mcDeRo:We,mcRoDe:Ge,translateDeRo:Ke,translateRoDe:qe,listen:Je,speak:Ye,match:Xe,picturePick:Ze,listenChoice:Qe,trueFalse:$e,sortCategories:et},nt={easy:[`picturePick`,`mcDeRo`,`mcRoDe`,`match`,`listenChoice`,`trueFalse`],medium:[`mcDeRo`,`mcRoDe`,`translateDeRo`,`match`,`listen`,`listenChoice`,`trueFalse`,`sortCategories`],hard:[`translateRoDe`,`translateDeRo`,`listen`,`speak`,`match`,`mcRoDe`,`trueFalse`,`sortCategories`]};function rt({words:e,pool:t,count:n,seed:r,types:i}){let a=E(r),o=t&&t.length>=4?t:e,s=D(i,a),c=D(e,a),l=[],u=0,d=0,f=0;for(;l.length<n&&f<n*6;){f++;let e=s[d%s.length];d++;let t=c[u%c.length];u++;let n=tt[e],r=n(t,o,a);r||=We(t,o,a),r&&l.push(r)}return l}var it=[`mcDeRo`,`mcRoDe`,`translateDeRo`,`translateRoDe`,`listen`,`speak`,`match`,`picturePick`,`listenChoice`,`trueFalse`,`sortCategories`];function at(e,t,n,r){let i=(t||[]).map(e=>({de:e.de,ro:e.ro,article:e.article})).filter(e=>e.de&&e.ro&&Le(e.de));if(i.length<4)return e;let a=Math.round(e.length*n)-e.length;if(a<=0)return e;let o=rt({words:i,pool:i,count:a,seed:`aug:${r}`,types:it}).map(e=>({...e,gen:!0}));return e.concat(o)}var ot=[{key:`v_sein`,name:`Verbul „a fi" (sein)`,icon:`🟰`,sentences:[{de:`Ich bin mude.`,ro:`Sunt obosit.`,v:`bin`,vh:`sunt`},{de:`Du bist jung.`,ro:`Tu ești tânăr.`,v:`bist`,vh:`ești`},{de:`Ich bin gesund.`,ro:`Sunt sănătos.`,v:`bin`,vh:`sunt`},{de:`Du bist stark.`,ro:`Tu ești puternic.`,v:`bist`,vh:`ești`},{de:`Ich bin glucklich.`,ro:`Sunt fericit.`,v:`bin`,vh:`sunt`},{de:`Ich bin Student.`,ro:`Eu sunt student.`,v:`bin`,vh:`sunt`},{de:`Du bist mein Freund.`,ro:`Tu ești prietenul meu.`,v:`bist`,vh:`ești`},{de:`Das Kind ist mude.`,ro:`Copilul este obosit.`,v:`ist`,vh:`este`}]},{key:`v_haben`,name:`Verbul „a avea" (haben)`,icon:`📦`,sentences:[{de:`Ich habe einen Hund.`,ro:`Eu am un câine.`,v:`habe`,vh:`am`},{de:`Ich habe eine Katze.`,ro:`Eu am o pisică.`,v:`habe`,vh:`am`},{de:`Ich habe einen Bruder.`,ro:`Eu am un frate.`,v:`habe`,vh:`am`},{de:`Ich habe eine Schwester.`,ro:`Eu am o soră.`,v:`habe`,vh:`am`},{de:`Ich habe Zeit.`,ro:`Am timp.`,v:`habe`,vh:`am`},{de:`Ich habe einen Apfel.`,ro:`Am un măr.`,v:`habe`,vh:`am`}]},{key:`v_essentrinken`,name:`A mânca și a bea`,icon:`🍴`,sentences:[{de:`Ich esse Brot.`,ro:`Eu mănânc pâine.`,v:`esse`,vh:`mănânc`},{de:`Ich esse einen Apfel.`,ro:`Mănânc un măr.`,v:`esse`,vh:`mănânc`},{de:`Ich esse Kase.`,ro:`Mănânc brânză.`,v:`esse`,vh:`mănânc`},{de:`Ich trinke Wasser.`,ro:`Eu beau apă.`,v:`trinke`,vh:`beau`},{de:`Ich trinke Kaffee.`,ro:`Beau cafea.`,v:`trinke`,vh:`beau`},{de:`Du trinkst Tee.`,ro:`Tu bei ceai.`,v:`trinkst`,vh:`bei`},{de:`Die Suppe schmeckt gut.`,ro:`Supa are gust bun.`,v:`schmeckt`,vh:`are gust`}]},{key:`v_mochte`,name:`Aș vrea să... (mochte)`,icon:`💭`,sentences:[{de:`Ich mochte Wasser trinken.`,ro:`Aș vrea să beau apă.`,v:`trinken`,vh:`să beau`},{de:`Ich mochte Kaffee trinken.`,ro:`Aș vrea să beau cafea.`,v:`trinken`,vh:`să beau`},{de:`Ich mochte Brot essen.`,ro:`Aș vrea să mănânc pâine.`,v:`essen`,vh:`să mănânc`},{de:`Ich mochte Deutsch lernen.`,ro:`Aș vrea să învăț germană.`,v:`lernen`,vh:`să învăț`},{de:`Ich mochte schlafen.`,ro:`Aș vrea să dorm.`,v:`schlafen`,vh:`să dorm`},{de:`Ich mochte Fussball spielen.`,ro:`Aș vrea să joc fotbal.`,v:`spielen`,vh:`să joc`},{de:`Was mochtest du essen?`,ro:`Ce vrei să mănânci?`,v:`mochtest`,vh:`vrei`},{de:`Was mochtest du trinken?`,ro:`Ce vrei să bei?`,v:`mochtest`,vh:`vrei`}]},{key:`v_kommen`,name:`A veni / a te prezenta`,icon:`🚶`,sentences:[{de:`Ich komme aus Rumanien.`,ro:`Eu vin din România.`,v:`komme`,vh:`vin`},{de:`Du kommst aus Deutschland.`,ro:`Tu vii din Germania.`,v:`kommst`,vh:`vii`},{de:`Ich komme aus Osterreich.`,ro:`Eu vin din Austria.`,v:`komme`,vh:`vin`},{de:`Woher kommst du?`,ro:`De unde vii?`,v:`kommst`,vh:`vii`},{de:`Wie heisst du?`,ro:`Cum te cheamă?`,v:`heisst`,vh:`te cheamă`},{de:`Ich heisse Anna.`,ro:`Mă numesc Anna.`,v:`heisse`,vh:`mă numesc`}]},{key:`d_descrieri`,name:`Descrieri scurte`,icon:`🔎`,sentences:[{de:`Der Kaffee ist heiss.`,ro:`Cafeaua este fierbinte.`,v:`ist`,vh:`este`},{de:`Das Wasser ist kalt.`,ro:`Apa este rece.`,v:`ist`,vh:`este`},{de:`Der Apfel ist rot.`,ro:`Mărul este roșu.`,v:`ist`,vh:`este`},{de:`Die Sonne ist gelb.`,ro:`Soarele este galben.`,v:`ist`,vh:`este`},{de:`Der Berg ist hoch.`,ro:`Muntele este înalt.`,v:`ist`,vh:`este`},{de:`Das Auto ist schnell.`,ro:`Mașina este rapidă.`,v:`ist`,vh:`este`},{de:`Die Blume ist schon.`,ro:`Floarea este frumoasă.`,v:`ist`,vh:`este`},{de:`Das Haus ist gross.`,ro:`Casa este mare.`,v:`ist`,vh:`este`}]},{key:`q_intrebari`,name:`Întrebări uzuale`,icon:`❓`,sentences:[{de:`Wie geht es dir?`,ro:`Ce mai faci?`,v:`geht`,vh:`merge / faci`},{de:`Wie heisst du?`,ro:`Cum te cheamă?`,v:`heisst`,vh:`te cheamă`},{de:`Woher kommst du?`,ro:`De unde vii?`,v:`kommst`,vh:`vii`},{de:`Was mochtest du trinken?`,ro:`Ce vrei să bei?`,v:`mochtest`,vh:`vrei`},{de:`Was mochtest du essen?`,ro:`Ce vrei să mănânci?`,v:`mochtest`,vh:`vrei`}]},{key:`v_machen`,name:`A învăța și a face`,icon:`📚`,sentences:[{de:`Ich lerne Deutsch.`,ro:`Eu învăț germană.`,v:`lerne`,vh:`învăț`},{de:`Das Kind spielt Fussball.`,ro:`Copilul joacă fotbal.`,v:`spielt`,vh:`joacă`},{de:`Du mochtest Deutsch lernen.`,ro:`Tu ai vrea să înveți germană.`,v:`lernen`,vh:`să înveți`},{de:`Ich mochte arbeiten.`,ro:`Aș vrea să muncesc.`,v:`arbeiten`,vh:`să muncesc`},{de:`Ich mochte lesen.`,ro:`Aș vrea să citesc.`,v:`lesen`,vh:`să citesc`}]},{key:`w_vreme`,name:`Vremea (es gibt)`,icon:`🌦️`,sentences:[{de:`Es gibt Schnee.`,ro:`Este zăpadă.`,v:`gibt`,vh:`există / dă`},{de:`Es gibt Regen.`,ro:`Este ploaie.`,v:`gibt`,vh:`există / dă`},{de:`Es gibt Wind.`,ro:`Este vânt.`,v:`gibt`,vh:`există / dă`},{de:`Es gibt Nebel.`,ro:`Este ceață.`,v:`gibt`,vh:`există / dă`},{de:`Der Schnee ist kalt.`,ro:`Zăpada este rece.`,v:`ist`,vh:`este`},{de:`Die Sonne ist warm.`,ro:`Soarele este cald.`,v:`ist`,vh:`este`}]},{key:`v_infinitiv`,name:`Verbe la infinitiv`,icon:`🔁`,sentences:[{de:`Ich mochte essen.`,ro:`Aș vrea să mănânc.`,v:`essen`,vh:`să mănânc`},{de:`Ich mochte trinken.`,ro:`Aș vrea să beau.`,v:`trinken`,vh:`să beau`},{de:`Ich mochte schlafen.`,ro:`Aș vrea să dorm.`,v:`schlafen`,vh:`să dorm`},{de:`Ich mochte lernen.`,ro:`Aș vrea să învăț.`,v:`lernen`,vh:`să învăț`},{de:`Ich mochte arbeiten.`,ro:`Aș vrea să muncesc.`,v:`arbeiten`,vh:`să muncesc`},{de:`Ich mochte spielen.`,ro:`Aș vrea să mă joc.`,v:`spielen`,vh:`să mă joc`},{de:`Ich mochte lesen.`,ro:`Aș vrea să citesc.`,v:`lesen`,vh:`să citesc`},{de:`Ich mochte schreiben.`,ro:`Aș vrea să scriu.`,v:`schreiben`,vh:`să scriu`},{de:`Ich mochte gehen.`,ro:`Aș vrea să merg.`,v:`gehen`,vh:`să merg`},{de:`Ich mochte fahren.`,ro:`Aș vrea să conduc.`,v:`fahren`,vh:`să conduc`}]}],st=[{key:`e_oras`,name:`În oraș`,icon:`🏙️`,sentences:[{de:`Ich gehe in die Stadt.`,ro:`Merg în oraș.`,v:`gehe`,vh:`merg`},{de:`Ich gehe ins Kino.`,ro:`Merg la cinema.`,v:`gehe`,vh:`merg`},{de:`Wo ist der Bahnhof?`,ro:`Unde este gara?`,v:`ist`,vh:`este`},{de:`Der Supermarkt ist gross.`,ro:`Supermarketul este mare.`,v:`ist`,vh:`este`},{de:`Ich fahre mit dem Bus.`,ro:`Merg cu autobuzul.`,v:`fahre`,vh:`merg (cu un vehicul)`},{de:`Wir gehen in den Park.`,ro:`Mergem în parc.`,v:`gehen`,vh:`mergem`},{de:`Die Kirche ist alt.`,ro:`Biserica este veche.`,v:`ist`,vh:`este`},{de:`Das Museum ist schon.`,ro:`Muzeul este frumos.`,v:`ist`,vh:`este`}]},{key:`e_cumparaturi`,name:`La cumpărături`,icon:`🛒`,sentences:[{de:`Ich kaufe Brot.`,ro:`Cumpăr pâine.`,v:`kaufe`,vh:`cumpăr`},{de:`Ich kaufe einen Apfel.`,ro:`Cumpăr un măr.`,v:`kaufe`,vh:`cumpăr`},{de:`Was kostet das?`,ro:`Cât costă asta?`,v:`kostet`,vh:`costă`},{de:`Das ist teuer.`,ro:`Asta este scump.`,v:`ist`,vh:`este`},{de:`Das ist billig.`,ro:`Asta este ieftin.`,v:`ist`,vh:`este`},{de:`Ich brauche Milch.`,ro:`Am nevoie de lapte.`,v:`brauche`,vh:`am nevoie`},{de:`Der Markt ist voll.`,ro:`Piața este plină.`,v:`ist`,vh:`este`},{de:`Ich mochte Kase kaufen.`,ro:`Aș vrea să cumpăr brânză.`,v:`kaufen`,vh:`să cumpăr`}]},{key:`e_acasa`,name:`Acasă`,icon:`🏠`,sentences:[{de:`Ich wohne in Deutschland.`,ro:`Locuiesc în Germania.`,v:`wohne`,vh:`locuiesc`},{de:`Das Bett ist neu.`,ro:`Patul este nou.`,v:`ist`,vh:`este`},{de:`Die Lampe ist klein.`,ro:`Lampa este mică.`,v:`ist`,vh:`este`},{de:`Ich schlafe im Bett.`,ro:`Dorm în pat.`,v:`schlafe`,vh:`dorm`},{de:`Das Fenster ist gross.`,ro:`Fereastra este mare.`,v:`ist`,vh:`este`},{de:`Der Tisch ist alt.`,ro:`Masa este veche.`,v:`ist`,vh:`este`},{de:`Wir haben ein Sofa.`,ro:`Avem o canapea.`,v:`haben`,vh:`avem`},{de:`Die Tur ist neu.`,ro:`Ușa este nouă.`,v:`ist`,vh:`este`}]},{key:`e_familie`,name:`Familia mea`,icon:`👪`,sentences:[{de:`Meine Mutter ist jung.`,ro:`Mama mea este tânără.`,v:`ist`,vh:`este`},{de:`Mein Vater ist stark.`,ro:`Tatăl meu este puternic.`,v:`ist`,vh:`este`},{de:`Mein Bruder spielt Fussball.`,ro:`Fratele meu joacă fotbal.`,v:`spielt`,vh:`joacă`},{de:`Meine Schwester lernt Deutsch.`,ro:`Sora mea învață germană.`,v:`lernt`,vh:`învață`},{de:`Die Familie ist gross.`,ro:`Familia este mare.`,v:`ist`,vh:`este`},{de:`Das Kind spielt im Park.`,ro:`Copilul se joacă în parc.`,v:`spielt`,vh:`se joacă`},{de:`Mein Freund kommt heute.`,ro:`Prietenul meu vine azi.`,v:`kommt`,vh:`vine`},{de:`Ich liebe meine Familie.`,ro:`Îmi iubesc familia.`,v:`liebe`,vh:`iubesc`}]},{key:`e_masa`,name:`La masă`,icon:`🍽️`,sentences:[{de:`Die Suppe ist heiss.`,ro:`Supa este fierbinte.`,v:`ist`,vh:`este`},{de:`Ich esse gern Pizza.`,ro:`Mănânc cu plăcere pizza.`,v:`esse`,vh:`mănânc`},{de:`Der Fisch schmeckt gut.`,ro:`Peștele are gust bun.`,v:`schmeckt`,vh:`are gust`},{de:`Du isst ein Ei.`,ro:`Tu mănânci un ou.`,v:`isst`,vh:`mănânci`},{de:`Wir trinken Saft.`,ro:`Bem suc.`,v:`trinken`,vh:`bem`},{de:`Der Wein ist rot.`,ro:`Vinul este roșu.`,v:`ist`,vh:`este`},{de:`Das Brot ist gut.`,ro:`Pâinea este bună.`,v:`ist`,vh:`este`},{de:`Die Banane ist gelb.`,ro:`Banana este galbenă.`,v:`ist`,vh:`este`}]},{key:`e_timp`,name:`Timpul`,icon:`⏰`,sentences:[{de:`Der Tag ist schon.`,ro:`Ziua este frumoasă.`,v:`ist`,vh:`este`},{de:`Die Nacht ist kalt.`,ro:`Noaptea este rece.`,v:`ist`,vh:`este`},{de:`Heute ist Montag.`,ro:`Azi este luni.`,v:`ist`,vh:`este`},{de:`Morgen ist Dienstag.`,ro:`Mâine este marți.`,v:`ist`,vh:`este`},{de:`Das Jahr ist neu.`,ro:`Anul este nou.`,v:`ist`,vh:`este`},{de:`Ich habe heute Zeit.`,ro:`Am timp azi.`,v:`habe`,vh:`am`},{de:`Der Monat ist kurz.`,ro:`Luna este scurtă.`,v:`ist`,vh:`este`},{de:`Die Stunde ist lang.`,ro:`Ora este lungă.`,v:`ist`,vh:`este`}]},{key:`e_calatorie`,name:`Călătorie`,icon:`✈️`,sentences:[{de:`Der Zug kommt jetzt.`,ro:`Trenul vine acum.`,v:`kommt`,vh:`vine`},{de:`Ich fahre nach Deutschland.`,ro:`Merg în Germania.`,v:`fahre`,vh:`merg (cu un vehicul)`},{de:`Das Flugzeug ist gross.`,ro:`Avionul este mare.`,v:`ist`,vh:`este`},{de:`Wir fahren mit dem Taxi.`,ro:`Mergem cu taxiul.`,v:`fahren`,vh:`mergem`},{de:`Das Fahrrad ist neu.`,ro:`Bicicleta este nouă.`,v:`ist`,vh:`este`},{de:`Der Bus ist voll.`,ro:`Autobuzul este plin.`,v:`ist`,vh:`este`},{de:`Ich gehe zu Fuss.`,ro:`Merg pe jos.`,v:`gehe`,vh:`merg`},{de:`Das Schiff ist langsam.`,ro:`Vaporul este lent.`,v:`ist`,vh:`este`}]},{key:`e_natura`,name:`Natura`,icon:`🌳`,sentences:[{de:`Der Himmel ist blau.`,ro:`Cerul este albastru.`,v:`ist`,vh:`este`},{de:`Der Baum ist hoch.`,ro:`Copacul este înalt.`,v:`ist`,vh:`este`},{de:`Die Blume ist rosa.`,ro:`Floarea este roz.`,v:`ist`,vh:`este`},{de:`Der Mond ist schon.`,ro:`Luna este frumoasă.`,v:`ist`,vh:`este`},{de:`Es gibt heute Regen.`,ro:`Azi este ploaie.`,v:`gibt`,vh:`există / dă`},{de:`Der Schnee ist weiss.`,ro:`Zăpada este albă.`,v:`ist`,vh:`este`},{de:`Der Sturm kommt heute.`,ro:`Furtuna vine azi.`,v:`kommt`,vh:`vine`},{de:`Der Stern ist klein.`,ro:`Steaua este mică.`,v:`ist`,vh:`este`}]},{key:`e_munca`,name:`Muncă și școală`,icon:`💼`,sentences:[{de:`Ich arbeite heute.`,ro:`Muncesc azi.`,v:`arbeite`,vh:`muncesc`},{de:`Die Schule ist gross.`,ro:`Școala este mare.`,v:`ist`,vh:`este`},{de:`Der Lehrer ist gut.`,ro:`Profesorul este bun.`,v:`ist`,vh:`este`},{de:`Ich lerne heute Deutsch.`,ro:`Învăț germană azi.`,v:`lerne`,vh:`învăț`},{de:`Der Arzt arbeitet im Krankenhaus.`,ro:`Medicul lucrează la spital.`,v:`arbeitet`,vh:`lucrează`},{de:`Der Koch macht Suppe.`,ro:`Bucătarul face supă.`,v:`macht`,vh:`face`},{de:`Der Student lernt viel.`,ro:`Studentul învață mult.`,v:`lernt`,vh:`învață`},{de:`Ich mochte heute lesen.`,ro:`Aș vrea să citesc azi.`,v:`lesen`,vh:`să citesc`}]},{key:`e_conversatie`,name:`Conversație`,icon:`💬`,sentences:[{de:`Was machst du heute?`,ro:`Ce faci azi?`,v:`machst`,vh:`faci`},{de:`Ich sehe dich morgen.`,ro:`Te văd mâine.`,v:`sehe`,vh:`văd`},{de:`Kommst du mit?`,ro:`Vii și tu?`,v:`kommst`,vh:`vii`},{de:`Was trinkst du?`,ro:`Ce bei?`,v:`trinkst`,vh:`bei`},{de:`Wo wohnst du?`,ro:`Unde locuiești?`,v:`wohnst`,vh:`locuiești`},{de:`Du sprichst gut Deutsch.`,ro:`Tu vorbești bine germană.`,v:`sprichst`,vh:`vorbești`},{de:`Ich hore Musik.`,ro:`Ascult muzică.`,v:`hore`,vh:`ascult`},{de:`Ich schreibe dir morgen.`,ro:`Îți scriu mâine.`,v:`schreibe`,vh:`scriu`}]}],ct=[`și`,`un`,`este`,`foarte`,`bine`,`aici`,`mâine`,`azi`,`cu`,`la`,`mereu`,`acolo`],lt=[`und`,`nicht`,`sehr`,`gut`,`heute`,`mit`,`oder`,`jetzt`];function A(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function ut(e){return e.replace(/[.,!?;:]/g,``).split(/\s+/).filter(Boolean)}function dt(e,t){return e.replace(RegExp(`(^|\\s)${t}(?=\\s|[.,!?]|$)`),`$1_____`)}function j(e,t,n,r){let i=new Set([e.de]),a=[];for(let e of A(t,r))if(!i.has(e.de)&&(i.add(e.de),a.push(e),a.length>=n))break;return a}var ft={translate_de_ro:e=>({type:`translate_de_ro`,prompt:e.de,answer:e.ro}),translate_ro_de:e=>({type:`translate_ro_de`,prompt:e.ro,answer:e.de}),listen:e=>({type:`listen`,word:e.de,answer:e.de}),speak:e=>({type:`speak`,word:e.de,translation:e.ro}),fillBlank:e=>({type:`fillBlank`,sentence:dt(e.de,e.v),answer:e.v,hint:e.vh||e.ro}),wordBank:(e,t)=>{let n=ut(e.ro),r=A(ct.filter(e=>!n.includes(e)),t).slice(0,2);return{type:`wordBank`,promptDe:e.de,answer:e.ro,bank:A([...n,...r],t)}},sentenceBuild:(e,t)=>{let n=ut(e.de),r=new Set(n.map(e=>e.toLowerCase())),i=A(lt.filter(e=>!r.has(e)),t).slice(0,3);return{type:`sentenceBuild`,promptRo:e.ro,answer:e.de,bank:[...n,...i]}},match:(e,t,n)=>{let r=j(e,n,3,t);return r.length<3?null:{type:`match`,pairs:A([e,...r],t).map(e=>[e.de,e.ro])}},mcDeRo:(e,t,n)=>{let r=j(e,n,3,t);return r.length<3?null:{type:`multiChoice`,question:`Ce înseamnă "${e.de}"?`,correct:e.ro,options:A([e.ro,...r.map(e=>e.ro)],t)}},mcRoDe:(e,t,n)=>{let r=j(e,n,3,t);return r.length<3?null:{type:`multiChoice`,question:`Cum se spune "${e.ro}" în germană?`,correct:e.de,options:A([e.de,...r.map(e=>e.de)],t)}},listenChoice:(e,t,n)=>{let r=j(e,n,3,t);return r.length<3?null:{type:`listenChoice`,word:e.de,correct:e.ro,options:A([e.ro,...r.map(e=>e.ro)],t)}},trueFalse:(e,t,n)=>{if(t()<.5)return{type:`trueFalse`,de:e.de,ro:e.ro,correct:e.ro,isTrue:!0};let r=j(e,n,1,t);return r.length?{type:`trueFalse`,de:e.de,ro:r[0].ro,correct:e.ro,isTrue:!1}:null}},pt=[`translate_de_ro`,`fillBlank`,`wordBank`,`translate_ro_de`,`listen`,`speak`],mt=[`sentenceBuild`,`mcDeRo`,`match`,`translate_de_ro`,`listenChoice`,`wordBank`,`trueFalse`,`mcRoDe`,`fillBlank`,`listen`,`speak`,`translate_ro_de`];function ht({sentences:e,count:t,seed:n,types:r=pt}){let i=E(n),a=A(r,i),o=A(e,i),s=[],c=new Set,l=0;for(;s.length<t&&l<t*8;){let t=l;l++;let n=a[t%a.length],r=o[t%o.length],u=`${n}:${r.de}`;if(c.has(u))continue;c.add(u);let d=ft[n](r,i,e);d&&s.push(d)}return s}var M=[{cat:`numere`,name:`Numere`,icon:`🔢`},{cat:`culori`,name:`Culori`,icon:`🎨`},{cat:`animale`,name:`Animale`,icon:`🐾`},{cat:`mancare`,name:`Mâncare`,icon:`🍽️`},{cat:`bauturi`,name:`Băuturi`,icon:`🥤`},{cat:`corp`,name:`Corpul`,icon:`🧍`},{cat:`haine`,name:`Haine`,icon:`👕`},{cat:`casa`,name:`Casa`,icon:`🏠`},{cat:`natura`,name:`Natură`,icon:`🌳`},{cat:`transport`,name:`Transport`,icon:`🚗`},{cat:`locuri`,name:`Locuri`,icon:`🏙️`},{cat:`zile`,name:`Zilele săptămânii`,icon:`📅`},{cat:`luni`,name:`Lunile anului`,icon:`🗓️`},{cat:`vreme`,name:`Vreme`,icon:`🌤️`},{cat:`meserii`,name:`Meserii`,icon:`💼`},{cat:`familie`,name:`Familie`,icon:`👨‍👩‍👧`},{cat:`verbe`,name:`Verbe`,icon:`🏃`},{cat:`adjective`,name:`Adjective`,icon:`✨`},{cat:`timp`,name:`Timp`,icon:`⏰`}];function gt(e){return w.filter(t=>t.category===e).map(e=>({de:e.de,ro:e.ro,article:e.article}))}var _t=Object.fromEntries(M.map(e=>[e.cat,gt(e.cat)])),vt=100,N=7;function yt(e){return e<=3?`easy`:e<=7?`medium`:`hard`}function bt(){let e=[];for(let t=1;t<=vt;t++){let n=Math.ceil(t/10),r=M[(t-1)%M.length],i=yt(n),a=_t[r.cat],o=M[t%M.length],s=i===`hard`?a.concat(_t[o.cat]):a,c=i===`easy`?5:i===`medium`?6:7,l=`lp-${t}`,u=rt({words:a,pool:s,count:c,seed:l,types:nt[i]});e.push({id:l,title:`Lecția ${N+t}`,titleDe:r.name,icon:r.icon,description:`Seria ${n} · ${r.name}`,unit:N+t,extra:!0,series:n,words:a.map(e=>({de:e.de,ro:e.ro})),exercises:u})}return e}var xt=50;function St(){let e=[];for(let t=1;t<=xt;t++){let n=vt+t,r=Math.ceil(n/10),i=ot[(t-1)%ot.length],a=`lp-${n}`,o=ht({sentences:i.sentences,count:6,seed:a});e.push({id:a,title:`Lecția ${N+n}`,titleDe:i.name,icon:i.icon,description:`Seria ${r} · ${i.name}`,unit:N+n,extra:!0,series:r,words:i.sentences.map(e=>({de:e.de,ro:e.ro})),exercises:o})}return e}var Ct=100,wt=150;function Tt(){let e=[];for(let t=1;t<=Ct;t++){let n=wt+t,r=Math.ceil(n/10),i=st[(t-1)%st.length],a=`lp-${n}`,o=ht({sentences:i.sentences,count:7,seed:a,types:mt});e.push({id:a,title:`Lecția ${N+n}`,titleDe:i.name,icon:i.icon,description:`Seria ${r} · ${i.name}`,unit:N+n,extra:!0,series:r,words:i.sentences.map(e=>({de:e.de,ro:e.ro})),exercises:o})}return e}var Et=[...bt(),...St(),...Tt()],Dt=[{id:`salutari`,title:`Salutări`,titleDe:`Begrussungen`,icon:`👋`,description:`Învață să saluti în germană`,unit:1,words:[{de:`Hallo`,ro:`Bună`,example:`Hallo! Wie geht es dir?`,exampleRo:`Bună! Ce mai faci?`},{de:`Guten Morgen`,ro:`Bună dimineața`,example:`Guten Morgen! Wie geht es Ihnen?`,exampleRo:`Bună dimineața! Ce mai faceți?`},{de:`Guten Tag`,ro:`Bună ziua`,example:`Guten Tag, Herr Muller!`,exampleRo:`Bună ziua, domnul Muller!`},{de:`Guten Abend`,ro:`Bună seara`,example:`Guten Abend! Willkommen!`,exampleRo:`Bună seara! Bine ați venit!`},{de:`Gute Nacht`,ro:`Noapte bună`,example:`Gute Nacht! Schlaf gut!`,exampleRo:`Noapte bună! Somn ușor!`},{de:`Tschuss`,ro:`Pa / La revedere`,example:`Tschuss! Bis morgen!`,exampleRo:`Pa! Pe mâine!`},{de:`Auf Wiedersehen`,ro:`La revedere (formal)`,example:`Auf Wiedersehen, Frau Schmidt!`,exampleRo:`La revedere, doamna Schmidt!`},{de:`Danke`,ro:`Mulțumesc`,example:`Danke schon!`,exampleRo:`Mulțumesc frumos!`},{de:`Bitte`,ro:`Te rog / Cu plăcere`,example:`Bitte schon!`,exampleRo:`Cu plăcere!`},{de:`Ja`,ro:`Da`,example:`Ja, naturlich!`,exampleRo:`Da, desigur!`},{de:`Nein`,ro:`Nu`,example:`Nein, danke.`,exampleRo:`Nu, mulțumesc.`},{de:`Entschuldigung`,ro:`Scuzați-mă`,example:`Entschuldigung, wo ist der Bahnhof?`,exampleRo:`Scuzați-mă, unde este gara?`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "Hallo"?`,correct:`Bună`,options:[`Bună`,`Pa`,`Mulțumesc`,`Noapte bună`]},{type:`multiChoice`,question:`Cum spui "Bună dimineața" în germană?`,correct:`Guten Morgen`,options:[`Guten Morgen`,`Guten Tag`,`Guten Abend`,`Gute Nacht`]},{type:`translate_ro_de`,prompt:`Bună ziua`,answer:`Guten Tag`},{type:`translate_de_ro`,prompt:`Tschuss`,answer:`Pa`,alts:[`La revedere`]},{type:`listen`,word:`Guten Morgen`,answer:`Guten Morgen`},{type:`match`,pairs:[[`Hallo`,`Bună`],[`Danke`,`Mulțumesc`],[`Bitte`,`Te rog`],[`Ja`,`Da`]]},{type:`fillBlank`,sentence:`_____ Morgen! Wie geht es dir?`,answer:`Guten`,hint:`Bună dimineața`},{type:`multiChoice`,question:`Cum mulțumești în germană?`,correct:`Danke`,options:[`Bitte`,`Danke`,`Hallo`,`Nein`]},{type:`speak`,word:`Guten Tag`,translation:`Bună ziua`},{type:`translate_ro_de`,prompt:`Mulțumesc`,answer:`Danke`},{type:`listen`,word:`Auf Wiedersehen`,answer:`Auf Wiedersehen`},{type:`wordBank`,promptDe:`Guten Morgen!`,answer:`Bună dimineața`,bank:[`Bună`,`dimineața`,`ziua`,`seara`,`noapte`]},{type:`multiChoice`,question:`Ce înseamnă "Nein"?`,correct:`Nu`,options:[`Da`,`Nu`,`Te rog`,`Scuze`]}]},{id:`prezentari`,title:`Prezentări`,titleDe:`Vorstellungen`,icon:`🙋`,description:`Învață să te prezinți`,unit:2,words:[{de:`Ich`,ro:`Eu`,example:`Ich bin Maria.`,exampleRo:`Eu sunt Maria.`},{de:`Du`,ro:`Tu`,example:`Du bist nett.`,exampleRo:`Tu ești drăguțu/ă.`},{de:`bin`,ro:`sunt`,example:`Ich bin Student.`,exampleRo:`Eu sunt student.`},{de:`heisse`,ro:`mă numesc`,example:`Ich heisse Anna.`,exampleRo:`Mă numesc Anna.`},{de:`Wie heisst du?`,ro:`Cum te numești?`,example:`Hallo! Wie heisst du?`,exampleRo:`Bună! Cum te numești?`},{de:`Wie geht es dir?`,ro:`Ce mai faci?`,example:`Hallo! Wie geht es dir?`,exampleRo:`Bună! Ce mai faci?`},{de:`Gut`,ro:`Bine`,example:`Mir geht es gut.`,exampleRo:`Sunt bine.`},{de:`Schlecht`,ro:`Rău`,example:`Mir geht es schlecht.`,exampleRo:`Sunt rău / Nu mă simt bine.`},{de:`Freut mich`,ro:`Îmi pare bine (de cunoștință)`,example:`Freut mich, dich kennenzulernen!`,exampleRo:`Îmi pare bine de cunoștință!`},{de:`Ich komme aus`,ro:`Eu vin din / Sunt din`,example:`Ich komme aus Rumanien.`,exampleRo:`Eu sunt din România.`},{de:`Rumanien`,ro:`România`,example:`Ich komme aus Rumanien.`,exampleRo:`Eu vin din România.`},{de:`Deutschland`,ro:`Germania`,example:`Deutschland ist schon.`,exampleRo:`Germania e frumoasă.`}],exercises:[{type:`multiChoice`,question:`Cum spui "Eu sunt" în germană?`,correct:`Ich bin`,options:[`Ich bin`,`Du bist`,`Ich heisse`,`Ich komme`]},{type:`translate_ro_de`,prompt:`Mă numesc Anna`,answer:`Ich heisse Anna`},{type:`listen`,word:`Wie heisst du?`,answer:`Wie heisst du`},{type:`fillBlank`,sentence:`Ich _____ aus Rumanien.`,answer:`komme`,hint:`Eu vin din România`},{type:`match`,pairs:[[`Ich`,`Eu`],[`Du`,`Tu`],[`Gut`,`Bine`],[`Schlecht`,`Rău`]]},{type:`multiChoice`,question:`Ce înseamnă "Freut mich"?`,correct:`Îmi pare bine`,options:[`Îmi pare bine`,`Mă numesc`,`Sunt bine`,`La revedere`]},{type:`speak`,word:`Ich heisse`,translation:`Mă numesc`},{type:`translate_de_ro`,prompt:`Wie geht es dir?`,answer:`Ce mai faci?`,alts:[`Ce mai faci`,`Cum te simți`]},{type:`multiChoice`,question:`Cum spui "România" în germană?`,correct:`Rumanien`,options:[`Rumanien`,`Deutschland`,`Osterreich`,`Russland`]},{type:`fillBlank`,sentence:`_____ mich, dich kennenzulernen!`,answer:`Freut`,hint:`Îmi pare bine de cunoștință`},{type:`translate_ro_de`,prompt:`Eu sunt din România`,answer:`Ich komme aus Rumanien`},{type:`listen`,word:`Freut mich`,answer:`Freut mich`},{type:`wordBank`,promptDe:`Ich heisse Anna.`,answer:`Mă numesc Anna`,bank:[`Mă`,`numesc`,`Anna`,`sunt`,`eu`,`din`]}]},{id:`numere`,title:`Numere`,titleDe:`Zahlen`,icon:`🔢`,description:`Numerele de la 1 la 20`,unit:3,words:[{de:`eins`,ro:`unu (1)`,example:`Ich habe eins.`,exampleRo:`Am unu.`},{de:`zwei`,ro:`doi (2)`,example:`Zwei Kaffee, bitte.`,exampleRo:`Două cafele, vă rog.`},{de:`drei`,ro:`trei (3)`,example:`Ich habe drei Bucher.`,exampleRo:`Am trei cărți.`},{de:`vier`,ro:`patru (4)`,example:`Vier Jahreszeiten.`,exampleRo:`Patru anotimpuri.`},{de:`funf`,ro:`cinci (5)`,example:`Funf Minuten, bitte.`,exampleRo:`Cinci minute, vă rog.`},{de:`sechs`,ro:`șase (6)`,example:`Sechs Tage.`,exampleRo:`Șase zile.`},{de:`sieben`,ro:`șapte (7)`,example:`Sieben Tage in der Woche.`,exampleRo:`Șapte zile în săptămână.`},{de:`acht`,ro:`opt (8)`,example:`Acht Uhr.`,exampleRo:`Ora opt.`},{de:`neun`,ro:`nouă (9)`,example:`Neun Katzen.`,exampleRo:`Nouă pisici.`},{de:`zehn`,ro:`zece (10)`,example:`Zehn Euro, bitte.`,exampleRo:`Zece euro, vă rog.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "drei"?`,correct:`trei`,options:[`doi`,`trei`,`patru`,`cinci`]},{type:`multiChoice`,question:`Cum spui "cinci" în germană?`,correct:`funf`,options:[`vier`,`funf`,`sechs`,`drei`]},{type:`match`,pairs:[[`eins`,`unu`],[`zwei`,`doi`],[`drei`,`trei`],[`vier`,`patru`]]},{type:`listen`,word:`sieben`,answer:`sieben`},{type:`translate_ro_de`,prompt:`zece`,answer:`zehn`},{type:`translate_de_ro`,prompt:`acht`,answer:`opt`},{type:`fillBlank`,sentence:`_____ Kaffee, bitte.`,answer:`Zwei`,hint:`Două cafele, vă rog`},{type:`speak`,word:`funf`,translation:`cinci`},{type:`multiChoice`,question:`Ce înseamnă "neun"?`,correct:`nouă`,options:[`opt`,`nouă`,`zece`,`șase`]},{type:`match`,pairs:[[`funf`,`cinci`],[`sechs`,`șase`],[`sieben`,`șapte`],[`acht`,`opt`]]},{type:`listen`,word:`zehn`,answer:`zehn`},{type:`translate_ro_de`,prompt:`șapte`,answer:`sieben`}]},{id:`familie`,title:`Familie`,titleDe:`Familie`,icon:`👨‍👩‍👧‍👦`,description:`Membrii familiei`,unit:4,words:[{de:`die Mutter`,ro:`mama`,example:`Meine Mutter heisst Elena.`,exampleRo:`Mama mea se numește Elena.`},{de:`der Vater`,ro:`tatăl`,example:`Mein Vater ist Lehrer.`,exampleRo:`Tatăl meu este profesor.`},{de:`die Schwester`,ro:`sora`,example:`Meine Schwester ist jung.`,exampleRo:`Sora mea este tânără.`},{de:`der Bruder`,ro:`fratele`,example:`Mein Bruder spielt Fussball.`,exampleRo:`Fratele meu joacă fotbal.`},{de:`die Grossmutter`,ro:`bunica`,example:`Meine Grossmutter kocht gut.`,exampleRo:`Bunica mea gătește bine.`},{de:`der Grossvater`,ro:`bunicul`,example:`Mein Grossvater liest gern.`,exampleRo:`Bunicul meu citește cu plăcere.`},{de:`das Kind`,ro:`copilul`,example:`Das Kind spielt im Park.`,exampleRo:`Copilul se joacă în parc.`},{de:`die Eltern`,ro:`părinții`,example:`Meine Eltern sind nett.`,exampleRo:`Părinții mei sunt drăguți.`},{de:`der Mann`,ro:`soțul / bărbatul`,example:`Der Mann ist gross.`,exampleRo:`Bărbatul este înalt.`},{de:`die Frau`,ro:`soția / femeia`,example:`Die Frau ist arztin.`,exampleRo:`Femeia este doctoriță.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "die Mutter"?`,correct:`mama`,options:[`mama`,`sora`,`bunica`,`soția`]},{type:`match`,pairs:[[`die Mutter`,`mama`],[`der Vater`,`tatăl`],[`die Schwester`,`sora`],[`der Bruder`,`fratele`]]},{type:`translate_ro_de`,prompt:`bunica`,answer:`die Grossmutter`},{type:`listen`,word:`der Bruder`,answer:`der Bruder`},{type:`fillBlank`,sentence:`Mein _____ spielt Fussball.`,answer:`Bruder`,hint:`Fratele meu joacă fotbal`},{type:`multiChoice`,question:`Cum spui "copilul" în germană?`,correct:`das Kind`,options:[`der Mann`,`das Kind`,`die Frau`,`der Bruder`]},{type:`translate_de_ro`,prompt:`die Eltern`,answer:`părinții`,alts:[`parintii`]},{type:`speak`,word:`die Mutter`,translation:`mama`},{type:`match`,pairs:[[`die Grossmutter`,`bunica`],[`der Grossvater`,`bunicul`],[`das Kind`,`copilul`],[`die Eltern`,`părinții`]]},{type:`multiChoice`,question:`Ce înseamnă "der Mann"?`,correct:`soțul / bărbatul`,options:[`copilul`,`fratele`,`soțul / bărbatul`,`tatăl`]},{type:`translate_ro_de`,prompt:`sora`,answer:`die Schwester`},{type:`listen`,word:`die Grossmutter`,answer:`die Grossmutter`}]},{id:`mancare`,title:`Mâncare și Băuturi`,titleDe:`Essen und Trinken`,icon:`🍽️`,description:`Alimente și băuturi de bază`,unit:5,words:[{de:`das Brot`,ro:`pâinea`,example:`Ich esse Brot.`,exampleRo:`Eu mănânc pâine.`},{de:`das Wasser`,ro:`apa`,example:`Ich trinke Wasser.`,exampleRo:`Eu beau apă.`},{de:`die Milch`,ro:`laptele`,example:`Die Milch ist frisch.`,exampleRo:`Laptele e proaspăt.`},{de:`der Kaffee`,ro:`cafeaua`,example:`Ich trinke Kaffee.`,exampleRo:`Eu beau cafea.`},{de:`der Tee`,ro:`ceaiul`,example:`Mochtest du Tee?`,exampleRo:`Vrei ceai?`},{de:`der Apfel`,ro:`mărul`,example:`Der Apfel ist rot.`,exampleRo:`Mărul este roșu.`},{de:`die Suppe`,ro:`supa`,example:`Die Suppe ist heiss.`,exampleRo:`Supa este fierbinte.`},{de:`das Fleisch`,ro:`carnea`,example:`Ich esse kein Fleisch.`,exampleRo:`Eu nu mănânc carne.`},{de:`der Kase`,ro:`brânza`,example:`Ich mag Kase.`,exampleRo:`Îmi place brânza.`},{de:`essen`,ro:`a mânca`,example:`Was mochtest du essen?`,exampleRo:`Ce vrei să mănânci?`},{de:`trinken`,ro:`a bea`,example:`Was mochtest du trinken?`,exampleRo:`Ce vrei să bei?`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "das Brot"?`,correct:`pâinea`,options:[`pâinea`,`carnea`,`brânza`,`supa`]},{type:`translate_ro_de`,prompt:`apa`,answer:`das Wasser`},{type:`match`,pairs:[[`das Brot`,`pâinea`],[`das Wasser`,`apa`],[`die Milch`,`laptele`],[`der Kaffee`,`cafeaua`]]},{type:`listen`,word:`der Kaffee`,answer:`der Kaffee`},{type:`fillBlank`,sentence:`Ich trinke _____.`,answer:`Wasser`,hint:`Eu beau apă`},{type:`multiChoice`,question:`Cum spui "a bea" în germană?`,correct:`trinken`,options:[`essen`,`trinken`,`Kaffee`,`Wasser`]},{type:`translate_de_ro`,prompt:`der Apfel`,answer:`mărul`,alts:[`marul`,`mar`]},{type:`speak`,word:`das Brot`,translation:`pâinea`},{type:`match`,pairs:[[`der Tee`,`ceaiul`],[`die Suppe`,`supa`],[`der Kase`,`brânza`],[`das Fleisch`,`carnea`]]},{type:`fillBlank`,sentence:`Was mochtest du _____?`,answer:`essen`,hint:`Ce vrei să mănânci?`},{type:`multiChoice`,question:`Ce înseamnă "die Milch"?`,correct:`laptele`,options:[`apa`,`laptele`,`cafeaua`,`ceaiul`]},{type:`translate_ro_de`,prompt:`brânza`,answer:`der Kase`},{type:`picturePick`,wordDe:`Milch`,correct:`Milch`,options:[`Milch`,`Tee`,`Kaffee`]},{type:`picturePick`,wordDe:`Apfel`,correct:`Apfel`,options:[`Apfel`,`Brot`,`Kase`]},{type:`wordBank`,promptDe:`Ich trinke Wasser.`,answer:`Eu beau apă`,bank:[`Eu`,`beau`,`apă`,`mănânc`,`cafea`,`lapte`]}]},{id:`culori`,title:`Culori`,titleDe:`Farben`,icon:`🎨`,description:`Culorile principale`,unit:6,words:[{de:`rot`,ro:`roșu`,example:`Der Apfel ist rot.`,exampleRo:`Mărul este roșu.`},{de:`blau`,ro:`albastru`,example:`Der Himmel ist blau.`,exampleRo:`Cerul este albastru.`},{de:`grun`,ro:`verde`,example:`Das Gras ist grun.`,exampleRo:`Iarba este verde.`},{de:`gelb`,ro:`galben`,example:`Die Sonne ist gelb.`,exampleRo:`Soarele este galben.`},{de:`schwarz`,ro:`negru`,example:`Die Katze ist schwarz.`,exampleRo:`Pisica este neagră.`},{de:`weiss`,ro:`alb`,example:`Der Schnee ist weiss.`,exampleRo:`Zăpada este albă.`},{de:`braun`,ro:`maro`,example:`Der Hund ist braun.`,exampleRo:`Câinele este maro.`},{de:`orange`,ro:`portocaliu`,example:`Die Orange ist orange.`,exampleRo:`Portocala este portocalie.`},{de:`rosa`,ro:`roz`,example:`Die Blume ist rosa.`,exampleRo:`Floarea este roz.`},{de:`lila`,ro:`mov`,example:`Das Kleid ist lila.`,exampleRo:`Rochia este mov.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "rot"?`,correct:`roșu`,options:[`albastru`,`roșu`,`verde`,`galben`]},{type:`multiChoice`,question:`Cum spui "verde" în germană?`,correct:`grun`,options:[`gelb`,`blau`,`grun`,`rot`]},{type:`match`,pairs:[[`rot`,`roșu`],[`blau`,`albastru`],[`grun`,`verde`],[`gelb`,`galben`]]},{type:`translate_ro_de`,prompt:`negru`,answer:`schwarz`},{type:`listen`,word:`blau`,answer:`blau`},{type:`fillBlank`,sentence:`Der Apfel ist _____.`,answer:`rot`,hint:`Mărul este roșu`},{type:`speak`,word:`grun`,translation:`verde`},{type:`translate_de_ro`,prompt:`weiss`,answer:`alb`},{type:`match`,pairs:[[`schwarz`,`negru`],[`weiss`,`alb`],[`braun`,`maro`],[`rosa`,`roz`]]},{type:`multiChoice`,question:`Ce înseamnă "gelb"?`,correct:`galben`,options:[`verde`,`galben`,`roșu`,`albastru`]},{type:`translate_ro_de`,prompt:`albastru`,answer:`blau`},{type:`listen`,word:`schwarz`,answer:`schwarz`},{type:`picturePick`,wordDe:`rot`,correct:`rot`,options:[`rot`,`blau`,`grun`]},{type:`picturePick`,wordDe:`gelb`,correct:`gelb`,options:[`gelb`,`schwarz`,`weiss`]}]},{id:`animale`,title:`Animale`,titleDe:`Tiere`,icon:`🐾`,description:`Animalele cele mai comune`,unit:7,words:[{de:`der Hund`,ro:`câinele`,example:`Der Hund ist treu.`,exampleRo:`Câinele este fidel.`},{de:`die Katze`,ro:`pisica`,example:`Die Katze schlaft.`,exampleRo:`Pisica doarme.`},{de:`der Vogel`,ro:`pasărea`,example:`Der Vogel singt.`,exampleRo:`Pasărea cântă.`},{de:`der Fisch`,ro:`peștele`,example:`Der Fisch schwimmt.`,exampleRo:`Peștele înoată.`},{de:`das Pferd`,ro:`calul`,example:`Das Pferd ist schnell.`,exampleRo:`Calul este rapid.`},{de:`die Kuh`,ro:`vaca`,example:`Die Kuh gibt Milch.`,exampleRo:`Vaca dă lapte.`},{de:`das Schwein`,ro:`porcul`,example:`Das Schwein ist rosa.`,exampleRo:`Porcul este roz.`},{de:`die Maus`,ro:`șoarecele`,example:`Die Maus ist klein.`,exampleRo:`Șoarecele este mic.`},{de:`der Bar`,ro:`ursul`,example:`Der Bar ist gross.`,exampleRo:`Ursul este mare.`},{de:`der Fuchs`,ro:`vulpea`,example:`Der Fuchs ist schlau.`,exampleRo:`Vulpea este șireată.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "der Hund"?`,correct:`câinele`,options:[`pisica`,`câinele`,`pasărea`,`peștele`]},{type:`match`,pairs:[[`der Hund`,`câinele`],[`die Katze`,`pisica`],[`der Vogel`,`pasărea`],[`der Fisch`,`peștele`]]},{type:`translate_ro_de`,prompt:`pisica`,answer:`die Katze`},{type:`listen`,word:`das Pferd`,answer:`das Pferd`},{type:`fillBlank`,sentence:`Die _____ gibt Milch.`,answer:`Kuh`,hint:`Vaca dă lapte`},{type:`multiChoice`,question:`Cum spui "vulpea" în germană?`,correct:`der Fuchs`,options:[`der Bar`,`der Fuchs`,`die Maus`,`der Hund`]},{type:`speak`,word:`die Katze`,translation:`pisica`},{type:`translate_de_ro`,prompt:`das Schwein`,answer:`porcul`,alts:[`porc`]},{type:`match`,pairs:[[`das Pferd`,`calul`],[`die Kuh`,`vaca`],[`der Bar`,`ursul`],[`der Fuchs`,`vulpea`]]},{type:`multiChoice`,question:`Ce înseamnă "die Maus"?`,correct:`șoarecele`,options:[`calul`,`ursul`,`șoarecele`,`porcul`]},{type:`translate_ro_de`,prompt:`ursul`,answer:`der Bar`},{type:`listen`,word:`der Fuchs`,answer:`der Fuchs`},{type:`picturePick`,wordDe:`Hund`,correct:`Hund`,options:[`Hund`,`Katze`,`Vogel`]},{type:`picturePick`,wordDe:`Pferd`,correct:`Pferd`,options:[`Pferd`,`Kuh`,`Schwein`]}]}];for(let e of Dt)e.exercises=at(e.exercises,e.words,10,`lesson:${e.id}`);Dt.push(...Et);function Ot(e){return Dt.find(t=>t.id===e)}function kt(){return Dt}var P=[{cat:`numere`,name:`Numere`,icon:`🔢`},{cat:`culori`,name:`Culori`,icon:`🎨`},{cat:`animale`,name:`Animale`,icon:`🐾`},{cat:`mancare`,name:`Mâncare`,icon:`🍽️`},{cat:`bauturi`,name:`Băuturi`,icon:`🥤`},{cat:`corp`,name:`Corpul`,icon:`🧍`},{cat:`haine`,name:`Haine`,icon:`👕`},{cat:`casa`,name:`Casa`,icon:`🏠`},{cat:`natura`,name:`Natură`,icon:`🌳`},{cat:`transport`,name:`Transport`,icon:`🚗`},{cat:`locuri`,name:`Locuri`,icon:`🏙️`},{cat:`zile`,name:`Zilele săptămânii`,icon:`📅`},{cat:`luni`,name:`Lunile anului`,icon:`🗓️`},{cat:`vreme`,name:`Vreme`,icon:`🌤️`},{cat:`meserii`,name:`Meserii`,icon:`💼`},{cat:`familie`,name:`Familie`,icon:`👨‍👩‍👧`},{cat:`verbe`,name:`Verbe`,icon:`🏃`},{cat:`adjective`,name:`Adjective`,icon:`✨`},{cat:`timp`,name:`Timp`,icon:`⏰`}],At=P.filter(e=>[`numere`,`culori`,`animale`,`mancare`,`bauturi`,`corp`,`haine`,`casa`,`natura`,`transport`,`locuri`,`vreme`,`meserii`,`familie`].includes(e.cat));function jt(e){return w.filter(t=>t.category===e).map(e=>({de:e.de,ro:e.ro,article:e.article}))}var F=Object.fromEntries(P.map(e=>[e.cat,jt(e.cat)])),Mt=10,Nt=e=>Math.ceil(e/Mt);function Pt(e,t){let n=[];for(let r=1;r<=e;r++){let e=P[(r-1)%P.length],i=`${t}-${r}`;n.push({id:i,title:`${e.name} ${Math.ceil(r/P.length)}`,icon:e.icon,description:`Seria ${Nt(r)} · ${e.name}`,generated:!0,words:F[e.cat].map(e=>({de:e.de,ro:e.ro})),exercises:rt({words:F[e.cat],pool:F[e.cat],count:5,seed:i,types:nt.easy})})}return n}var Ft=[`picturePick`,`picturePick`,`match`,`mcDeRo`,`mcRoDe`];function It(e,t){let n=[];for(let r=1;r<=e;r++){let e=At[(r-1)%At.length],i=`${t}-${r}`;n.push({id:i,title:`${e.name} ${Math.ceil(r/At.length)}`,icon:e.icon,description:`Seria ${Nt(r)} · ${e.name}`,generated:!0,words:F[e.cat].map(e=>({de:e.de,ro:e.ro})),exercises:rt({words:F[e.cat],pool:F[e.cat],count:5,seed:`vis:${i}`,types:Ft})})}return n}var Lt={feel:[{de:`Mir geht es gut`,ro:`Mă simt bine`},{de:`Ich bin mude`,ro:`Sunt obosit`},{de:`Ich bin glucklich`,ro:`Sunt fericit`}],origin:[{de:`Ich komme aus Rumanien`,ro:`Vin din România`},{de:`Ich komme aus Deutschland`,ro:`Vin din Germania`},{de:`Ich komme aus Osterreich`,ro:`Vin din Austria`}],drink:[{de:`Ich mochte Kaffee trinken`,ro:`Aș vrea să beau cafea`},{de:`Ich mochte Wasser trinken`,ro:`Aș vrea să beau apă`},{de:`Ich trinke Tee`,ro:`Beau ceai`}],eat:[{de:`Ich mochte Brot essen`,ro:`Aș vrea să mănânc pâine`},{de:`Ich esse einen Apfel`,ro:`Mănânc un măr`},{de:`Ich esse Kase`,ro:`Mănânc brânză`}],name:[{de:`Ich heisse Anna`,ro:`Mă numesc Anna`}]},Rt=[{opener:{de:`Wie geht es dir?`,ro:`Ce mai faci?`},pool:`feel`,closer:{de:`Das freut mich!`,ro:`Mă bucur!`}},{opener:{de:`Woher kommst du?`,ro:`De unde vii?`},pool:`origin`,closer:{de:`Sehr schon!`,ro:`Foarte frumos!`}},{opener:{de:`Was mochtest du trinken?`,ro:`Ce vrei să bei?`},pool:`drink`,closer:{de:`Gerne!`,ro:`Cu plăcere!`}},{opener:{de:`Was mochtest du essen?`,ro:`Ce vrei să mănânci?`},pool:`eat`,closer:{de:`Sehr gut!`,ro:`Foarte bine!`}},{opener:{de:`Wie heisst du?`,ro:`Cum te cheamă?`},pool:`name`,closer:{de:`Freut mich!`,ro:`Îmi pare bine!`}}],zt=Object.values(Lt).flat(),Bt=[[{name:`Anna`,emoji:`👩`},{name:`Max`,emoji:`🧑`}],[{name:`Elena`,emoji:`👧`},{name:`Lukas`,emoji:`🧑`}],[{name:`Maria`,emoji:`👩`},{name:`Tom`,emoji:`👦`}]];function Vt(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function Ht({count:e,seed:t}){let n=E(t),r=[];for(let t=0;t<e;t++){let e=Rt[Math.floor(n()*Rt.length)],t=Lt[e.pool],i=t[Math.floor(n()*t.length)],a=Vt(zt.filter(e=>e.de!==i.de),n).slice(0,2),o=Bt[Math.floor(n()*Bt.length)];r.push({type:`dialogue`,scene:e.opener.ro,characters:o,lines:[{who:0,de:e.opener.de,ro:e.opener.ro},{who:1,blank:!0,answer:i.de,ro:i.ro},{who:0,de:e.closer.de,ro:e.closer.ro}],mode:`multiChoice`,options:Vt([i.de,...a.map(e=>e.de)],n)})}return r}function Ut(e,t){let n=[];for(let r=1;r<=e;r++){let e=ot[(r-1)%ot.length],i=`${t}-${r}`,a=[...Ht({count:2,seed:`dlg:${i}`}),...ht({sentences:e.sentences,count:4,seed:i})];n.push({id:i,title:`${e.name}`,icon:e.icon,description:`Seria ${Nt(r)} · ${e.name}`,generated:!0,words:e.sentences.map(e=>({de:e.de,ro:e.ro})),exercises:a})}return n}var Wt=`und.auch.sehr.nicht.heute.morgen.gern.hier.dort.mit.fur.ein.eine.ist.gut.viel.immer.jetzt.noch.bitte.wir.du.sie.das.schon.aber.oder.man`.split(`.`);function Gt(e){return e.replace(/[.,!?;:„""«»()]/g,``).split(/\s+/).filter(Boolean)}function Kt(e,t,n){let r=E(n),i=Gt(t),a=new Set(i.map(e=>e.toLowerCase())),o=Wt.slice();for(let e=o.length-1;e>0;e--){let t=Math.floor(r()*(e+1));[o[e],o[t]]=[o[t],o[e]]}let s=[];for(let e of o){if(s.length>=3)break;a.has(e.toLowerCase())||s.push(e)}return{type:`sentenceBuild`,promptRo:e,answer:t,bank:i.concat(s)}}var qt=[{title:`La cumpărături`,icon:`🛒`,description:`Prețuri, plată, unde găsești ce cauți`,items:[[`Merg la cumpărături.`,`Ich gehe einkaufen.`],[`Unde este laptele?`,`Wo ist die Milch?`],[`Cât costă?`,`Wie viel kostet das?`],[`Pot să plătesc cu cardul?`,`Kann ich mit Karte zahlen?`],[`Cât să vă plătesc?`,`Wie viel muss ich zahlen?`],[`Aș dori o pâine, vă rog.`,`Ich mochte ein Brot, bitte.`],[`Aveți mere?`,`Haben Sie Apfel?`],[`Este prea scump.`,`Das ist zu teuer.`],[`Iau asta.`,`Ich nehme das.`],[`Unde este casa de marcat?`,`Wo ist die Kasse?`]]},{title:`La restaurant`,icon:`🍽️`,description:`Comanzi, întrebi, plătești`,items:[[`Aș dori o cafea.`,`Ich mochte einen Kaffee.`],[`Nota, vă rog.`,`Die Rechnung, bitte.`],[`Ce recomandați?`,`Was empfehlen Sie?`],[`O masă pentru două persoane, vă rog.`,`Einen Tisch fur zwei, bitte.`],[`Apa este gratuită?`,`Ist das Wasser gratis?`],[`A fost foarte gustos.`,`Es war sehr lecker.`],[`Sunt vegetarian.`,`Ich bin Vegetarier.`],[`Mai vreau un pahar de apă.`,`Ich mochte noch ein Glas Wasser.`],[`Pot să plătesc separat?`,`Kann ich getrennt zahlen?`],[`Poftă bună!`,`Guten Appetit!`]]},{title:`Hobby-uri și pasiuni`,icon:`🎨`,description:`Ce îți place să faci`,items:[[`Îmi place să gătesc.`,`Ich koche gern.`],[`Îmi place să citesc.`,`Ich lese gern.`],[`Îmi place să vorbesc.`,`Ich rede gern.`],[`Îmi place muzica.`,`Ich mag Musik.`],[`Joc tenis.`,`Ich spiele Tennis.`],[`Ascult muzică.`,`Ich hore Musik.`],[`Îmi place să dansez.`,`Ich tanze gern.`],[`Îmi place să călătoresc.`,`Ich reise gern.`],[`Pictez în timpul liber.`,`Ich male in meiner Freizeit.`],[`Îmi place natura.`,`Ich mag die Natur.`]]},{title:`Familie și prieteni`,icon:`👪`,description:`Oamenii din viața ta`,items:[[`Vorbesc la telefon cu sora mea.`,`Ich telefoniere mit meiner Schwester.`],[`Am doi copii.`,`Ich habe zwei Kinder.`],[`Fratele meu locuiește în Berlin.`,`Mein Bruder wohnt in Berlin.`],[`Îmi iubesc familia.`,`Ich liebe meine Familie.`],[`Mama mea gătește foarte bine.`,`Meine Mutter kocht sehr gut.`],[`Mă întâlnesc cu prietenii.`,`Ich treffe meine Freunde.`],[`Soțul meu lucrează mult.`,`Mein Mann arbeitet viel.`],[`Astăzi o vizitez pe bunica.`,`Heute besuche ich meine Oma.`],[`Vorbesc mult cu prietena mea.`,`Ich rede viel mit meiner Freundin.`],[`Copiii mei merg la școală.`,`Meine Kinder gehen in die Schule.`]]},{title:`Rutina zilnică`,icon:`⏰`,description:`O zi obișnuită`,items:[[`Mă trezesc la șapte.`,`Ich stehe um sieben auf.`],[`Beau o cafea dimineața.`,`Ich trinke morgens einen Kaffee.`],[`Astăzi am gătit paste.`,`Heute habe ich Nudeln gekocht.`],[`Merg la muncă cu autobuzul.`,`Ich fahre mit dem Bus zur Arbeit.`],[`Seara mă uit la un film.`,`Abends schaue ich einen Film.`],[`Fac curat în casă.`,`Ich putze die Wohnung.`],[`Gătesc cina.`,`Ich koche das Abendessen.`],[`Mă culc târziu.`,`Ich gehe spat ins Bett.`],[`După-amiază fac o plimbare.`,`Nachmittags mache ich einen Spaziergang.`],[`Dimineața fac duș.`,`Morgens dusche ich.`]]},{title:`La telefon`,icon:`📞`,description:`Suni, scrii, vorbești`,items:[[`Îmi place să vorbesc la telefon.`,`Ich telefoniere gern.`],[`Te sun mai târziu.`,`Ich rufe dich spater an.`],[`Poți să vorbești mai rar?`,`Kannst du langsamer sprechen?`],[`Nu te aud bine.`,`Ich hore dich nicht gut.`],[`Îți trimit un mesaj.`,`Ich schicke dir eine Nachricht.`],[`Care este numărul tău?`,`Wie ist deine Nummer?`],[`Sună-mă diseară.`,`Ruf mich heute Abend an.`],[`Vorbesc cu ea acum.`,`Ich spreche jetzt mit ihr.`],[`Sunt ocupat acum.`,`Ich bin gerade beschaftigt.`],[`Ne auzim mâine.`,`Wir horen uns morgen.`]]},{title:`Timp liber și weekend`,icon:`🎉`,description:`Relaxare și distracție`,items:[[`La weekend dorm mult.`,`Am Wochenende schlafe ich viel.`],[`Merg la plimbare în parc.`,`Ich gehe im Park spazieren.`],[`Mă uit la televizor.`,`Ich schaue fern.`],[`Mâine merg la piscină.`,`Morgen gehe ich ins Schwimmbad.`],[`Duminică stau acasă.`,`Am Sonntag bleibe ich zu Hause.`],[`Îmi place să merg la cinema.`,`Ich gehe gern ins Kino.`],[`Astăzi este frumos afară.`,`Heute ist es schon draussen.`],[`Astăzi facem grătar.`,`Heute grillen wir.`],[`Citesc o carte bună.`,`Ich lese ein gutes Buch.`],[`Ne relaxăm împreună.`,`Wir entspannen zusammen.`]]},{title:`Sănătate și la doctor`,icon:`🩺`,description:`Când nu te simți bine`,items:[[`Mă doare capul.`,`Ich habe Kopfschmerzen.`],[`Nu mă simt bine.`,`Es geht mir nicht gut.`],[`Am nevoie de un doctor.`,`Ich brauche einen Arzt.`],[`Sunt răcit.`,`Ich bin erkaltet.`],[`Am febră.`,`Ich habe Fieber.`],[`Mă doare stomacul.`,`Ich habe Bauchschmerzen.`],[`Trebuie să iau medicamente.`,`Ich muss Medikamente nehmen.`],[`Sunt obosit astăzi.`,`Ich bin heute mude.`],[`Unde este farmacia?`,`Wo ist die Apotheke?`],[`Însănătoșire grabnică!`,`Gute Besserung!`]]},{title:`Direcții și oraș`,icon:`🧭`,description:`Găsești drumul prin oraș`,items:[[`Unde este gara?`,`Wo ist der Bahnhof?`],[`Cum ajung în centru?`,`Wie komme ich ins Zentrum?`],[`Este departe?`,`Ist es weit?`],[`Mergeți drept înainte.`,`Gehen Sie geradeaus.`],[`La stânga sau la dreapta?`,`Links oder rechts?`],[`Caut un hotel.`,`Ich suche ein Hotel.`],[`Autobuzul vine imediat.`,`Der Bus kommt gleich.`],[`Unde este toaleta?`,`Wo ist die Toilette?`],[`M-am rătăcit.`,`Ich habe mich verlaufen.`],[`Există o farmacie aici?`,`Gibt es hier eine Apotheke?`]]},{title:`Sentimente și opinii`,icon:`💬`,description:`Ce simți și ce crezi`,items:[[`Sunt foarte fericită.`,`Ich bin sehr glucklich.`],[`Cred că este bine.`,`Ich denke, das ist gut.`],[`Îmi place foarte mult.`,`Das gefallt mir sehr.`],[`Nu-mi place asta.`,`Das mag ich nicht.`],[`Sunt de acord.`,`Ich bin einverstanden.`],[`Ai dreptate.`,`Du hast recht.`],[`Este minunat!`,`Das ist wunderbar!`],[`Nu știu exact.`,`Ich weiss nicht genau.`],[`Sunt puțin obosit.`,`Ich bin ein bisschen mude.`],[`Mă bucur foarte mult.`,`Ich freue mich sehr.`]]}];function Jt(e=`dm`,t=3){return qt.map((n,r)=>({id:`${e}-${t+r}`,title:n.title,icon:n.icon,description:n.description,generated:!0,exercises:n.items.map(([t,n],i)=>Kt(t,n,`${e}:${r}:${i}`))}))}function Yt(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function Xt(e,t,n){let r=[];for(let i=0;i<t;i++){let t=e[i%e.length],a=`${n}-${i+1}`,o=E(`ame:${a}`),s=Yt(t.items,o).slice(0,6);r.push({id:a,title:t.title,icon:t.icon,description:`Exersează · ${t.title}`,generated:!0,exercises:s.map(([e,t],n)=>Kt(e,t,`${a}:${n}`))})}return r}function Zt(e=100,t=`dmg`){return Xt(qt,e,t)}var Qt=[{title:`Vremea`,icon:`🌦️`,description:`Cum e afară azi`,items:[[`Astăzi plouă.`,`Heute regnet es.`],[`Este frig afară.`,`Es ist kalt draussen.`],[`Soarele strălucește.`,`Die Sonne scheint.`],[`Mâine va ninge.`,`Morgen schneit es.`],[`Este foarte cald azi.`,`Heute ist es sehr warm.`],[`Bate vântul.`,`Es ist windig.`],[`Cerul este albastru.`,`Der Himmel ist blau.`],[`Îmi place vara.`,`Ich mag den Sommer.`],[`Iarna este rece.`,`Der Winter ist kalt.`],[`Ce vreme frumoasă!`,`Was fur ein schones Wetter!`]]},{title:`Călătorii`,icon:`🧳`,description:`Vacanță și drumuri`,items:[[`Merg în vacanță.`,`Ich fahre in den Urlaub.`],[`Rezerv un hotel.`,`Ich buche ein Hotel.`],[`Unde este aeroportul?`,`Wo ist der Flughafen?`],[`Călătoresc cu trenul.`,`Ich reise mit dem Zug.`],[`Îmi place să văd orașe noi.`,`Ich sehe gern neue Stadte.`],[`Bagajul meu este greu.`,`Mein Koffer ist schwer.`],[`Vreau un bilet spre Berlin.`,`Ich mochte ein Ticket nach Berlin.`],[`Vacanța a fost minunată.`,`Der Urlaub war wunderbar.`],[`Fac o poză.`,`Ich mache ein Foto.`],[`Călătoresc cu familia.`,`Ich reise mit meiner Familie.`]]},{title:`La muncă`,icon:`💼`,description:`Birou, colegi, program`,items:[[`Lucrez de acasă.`,`Ich arbeite von zu Hause.`],[`Am o ședință astăzi.`,`Ich habe heute ein Meeting.`],[`Îmi place munca mea.`,`Ich mag meine Arbeit.`],[`Încep la ora nouă.`,`Ich fange um neun an.`],[`Scriu un e-mail.`,`Ich schreibe eine E-Mail.`],[`Colegii mei sunt drăguți.`,`Meine Kollegen sind nett.`],[`Astăzi am mult de lucru.`,`Heute habe ich viel zu tun.`],[`Fac o pauză.`,`Ich mache eine Pause.`],[`Termin la ora cinci.`,`Ich hore um funf auf.`],[`Merg la birou.`,`Ich gehe ins Buro.`]]},{title:`Treburi casnice`,icon:`🧹`,description:`Curățenie și ordine`,items:[[`Spăl vasele.`,`Ich spule das Geschirr.`],[`Fac patul.`,`Ich mache das Bett.`],[`Fac curat în bucătărie.`,`Ich putze die Kuche.`],[`Spăl rufele.`,`Ich wasche die Wasche.`],[`Gătesc pentru familie.`,`Ich koche fur die Familie.`],[`Duc gunoiul afară.`,`Ich bringe den Mull raus.`],[`Curăț podeaua.`,`Ich putze den Boden.`],[`Ud florile.`,`Ich giesse die Blumen.`],[`Casa este curată acum.`,`Das Haus ist jetzt sauber.`],[`Am nevoie de ajutor.`,`Ich brauche Hilfe.`]]},{title:`Haine și mărimi`,icon:`🛍️`,description:`Ce porți și ce cumperi`,items:[[`Port o rochie roșie.`,`Ich trage ein rotes Kleid.`],[`Îmi cumpăr pantofi noi.`,`Ich kaufe neue Schuhe.`],[`Această jachetă este frumoasă.`,`Diese Jacke ist schon.`],[`Ce mărime aveți?`,`Welche Grosse haben Sie?`],[`Pot să probez asta?`,`Kann ich das anprobieren?`],[`Cămașa este prea mare.`,`Das Hemd ist zu gross.`],[`Îmi plac pantalonii aceștia.`,`Diese Hose gefallt mir.`],[`Caut o pălărie.`,`Ich suche einen Hut.`],[`Culoarea este foarte frumoasă.`,`Die Farbe ist sehr schon.`],[`Cât costă această jachetă?`,`Wie viel kostet diese Jacke?`]]}];function $t(e=50,t=`dmg2`){return Xt(Qt,e,t)}var en=[{id:`cuvinte-uzuale`,title:`Cuvinte uzuale`,icon:`💬`,description:`Cuvintele de zi cu zi, cu imagini`,kind:`units`,series:!0,seriesSize:10,units:[{id:`cu-1`,title:`Primele cuvinte`,icon:`🌟`,description:`Da, nu, mulțumesc — esențialul absolut`,words:[{de:`Hallo`,ro:`Bună`},{de:`Ja`,ro:`Da`},{de:`Nein`,ro:`Nu`},{de:`Danke`,ro:`Mulțumesc`},{de:`Bitte`,ro:`Te rog / Cu plăcere`},{de:`Entschuldigung`,ro:`Scuze`}],exercises:[{type:`picturePick`,wordDe:`Hallo`,correct:`Hallo`,options:[`Hallo`,`Danke`,`Nein`]},{type:`multiChoice`,question:`Ce înseamnă "Danke"?`,correct:`Mulțumesc`,options:[`Mulțumesc`,`Te rog`,`Da`,`Pa`]},{type:`picturePick`,wordDe:`Ja`,correct:`Ja`,options:[`Ja`,`Nein`,`Danke`]},{type:`multiChoice`,question:`Cum spui "Nu" în germană?`,correct:`Nein`,options:[`Nein`,`Ja`,`Bitte`,`Hallo`]},{type:`picturePick`,wordDe:`Danke`,correct:`Danke`,options:[`Danke`,`Ja`,`Nein`]},{type:`multiChoice`,question:`Ce înseamnă "Bitte"?`,correct:`Te rog`,options:[`Te rog`,`Mulțumesc`,`Da`,`Pa`]},{type:`picturePick`,wordDe:`Nein`,correct:`Nein`,options:[`Nein`,`Ja`,`Hallo`]},{type:`multiChoice`,question:`Cum saluți pe cineva?`,correct:`Hallo`,options:[`Hallo`,`Nein`,`Danke`,`Bitte`]},{type:`multiChoice`,question:`Ce înseamnă "Entschuldigung"?`,correct:`Scuze`,options:[`Scuze`,`Mulțumesc`,`La revedere`,`Da`]}]},{id:`cu-2`,title:`Oameni și familie`,icon:`👨‍👩‍👧`,description:`Bărbat, femeie, copil, familie`,words:[{de:`Mann`,ro:`bărbat`},{de:`Frau`,ro:`femeie`},{de:`Kind`,ro:`copil`},{de:`Familie`,ro:`familie`},{de:`Mutter`,ro:`mamă`},{de:`Vater`,ro:`tată`}],exercises:[{type:`picturePick`,wordDe:`Mann`,correct:`Mann`,options:[`Mann`,`Frau`,`Kind`]},{type:`picturePick`,wordDe:`Frau`,correct:`Frau`,options:[`Frau`,`Mann`,`Familie`]},{type:`multiChoice`,question:`Ce înseamnă "Kind"?`,correct:`Copil`,options:[`Copil`,`Bărbat`,`Femeie`,`Mamă`]},{type:`picturePick`,wordDe:`Familie`,correct:`Familie`,options:[`Familie`,`Kind`,`Mann`]},{type:`multiChoice`,question:`Cum spui "mamă" în germană?`,correct:`Mutter`,options:[`Mutter`,`Vater`,`Frau`,`Kind`]},{type:`picturePick`,wordDe:`Kind`,correct:`Kind`,options:[`Kind`,`Mann`,`Frau`]},{type:`multiChoice`,question:`Ce înseamnă "Vater"?`,correct:`Tată`,options:[`Tată`,`Mamă`,`Frate`,`Copil`]}]},{id:`cu-3`,title:`Lucruri de zi cu zi`,icon:`🏠`,description:`Casă, apă, pâine, animale de companie`,words:[{de:`Haus`,ro:`casă`},{de:`Auto`,ro:`mașină`},{de:`Wasser`,ro:`apă`},{de:`Brot`,ro:`pâine`},{de:`Hund`,ro:`câine`},{de:`Katze`,ro:`pisică`}],exercises:[{type:`picturePick`,wordDe:`Haus`,correct:`Haus`,options:[`Haus`,`Auto`,`Baum`]},{type:`picturePick`,wordDe:`Wasser`,correct:`Wasser`,options:[`Wasser`,`Brot`,`Kaffee`]},{type:`multiChoice`,question:`Ce înseamnă "Auto"?`,correct:`Mașină`,options:[`Mașină`,`Casă`,`Câine`,`Apă`]},{type:`picturePick`,wordDe:`Hund`,correct:`Hund`,options:[`Hund`,`Katze`,`Maus`]},{type:`picturePick`,wordDe:`Brot`,correct:`Brot`,options:[`Brot`,`Wasser`,`Apfel`]},{type:`multiChoice`,question:`Cum spui "pisică" în germană?`,correct:`Katze`,options:[`Katze`,`Hund`,`Maus`,`Kuh`]},{type:`picturePick`,wordDe:`Katze`,correct:`Katze`,options:[`Katze`,`Hund`,`Vogel`]}]}]},{id:`propozitii-scurte`,title:`Propoziții scurte`,icon:`🗨️`,description:`Propoziții simple și conversații de zi cu zi`,kind:`units`,series:!0,seriesSize:10,units:[{id:`ps-1`,title:`Conversații simple`,icon:`💬`,description:`Salută, prezintă-te, spune cum te simți`,words:[{de:`Wie geht es dir?`,ro:`Ce mai faci?`},{de:`Mir geht es gut`,ro:`Mă simt bine`},{de:`Ich heisse Anna`,ro:`Mă numesc Anna`},{de:`Ich komme aus Rumanien`,ro:`Vin din România`}],exercises:[{type:`dialogue`,scene:`Pe stradă`,characters:[{name:`Anna`,emoji:`👩`},{name:`Max`,emoji:`🧑`}],lines:[{who:0,de:`Hallo! Wie geht es dir?`,ro:`Bună! Ce mai faci?`},{who:1,blank:!0,answer:`Mir geht es gut`,ro:`Mă simt bine`},{who:0,de:`Das freut mich!`,ro:`Mă bucur!`}],mode:`wordBank`,bank:[`Mir`,`geht`,`es`,`gut`,`schlecht`,`nicht`]},{type:`wordBank`,promptDe:`Ich bin mude.`,answer:`Eu sunt obosit`,bank:[`Eu`,`sunt`,`obosit`,`fericit`,`azi`]},{type:`dialogue`,scene:`La școală`,characters:[{name:`Lehrer`,emoji:`👨‍🏫`},{name:`Anna`,emoji:`👩`}],lines:[{who:0,de:`Wie heisst du?`,ro:`Cum te cheamă?`},{who:1,blank:!0,answer:`Ich heisse Anna`,ro:`Mă numesc Anna`},{who:0,de:`Freut mich, Anna!`,ro:`Îmi pare bine, Anna!`}],mode:`multiChoice`,options:[`Ich heisse Anna`,`Ich bin mude`,`Gute Nacht`]},{type:`wordBank`,promptDe:`Das ist gut.`,answer:`Asta este bine`,bank:[`Asta`,`este`,`bine`,`rău`,`nu`]},{type:`dialogue`,scene:`La o cafea`,characters:[{name:`Max`,emoji:`🧑`},{name:`Elena`,emoji:`👧`}],lines:[{who:0,de:`Woher kommst du?`,ro:`De unde vii?`},{who:1,blank:!0,answer:`Ich komme aus Rumanien`,ro:`Vin din România`},{who:0,de:`Sehr schon!`,ro:`Foarte frumos!`}],mode:`wordBank`,bank:[`Ich`,`komme`,`aus`,`Rumanien`,`Deutschland`,`bin`]},{type:`wordBank`,promptDe:`Ich lerne Deutsch.`,answer:`Eu învăț germană`,bank:[`Eu`,`învăț`,`germană`,`română`,`vorbesc`]}]},{id:`ps-2`,title:`La cafenea`,icon:`☕`,description:`Comandă ceva de băut și de mâncat`,words:[{de:`Ich mochte einen Kaffee`,ro:`Aș dori o cafea`},{de:`Ich trinke Wasser`,ro:`Eu beau apă`},{de:`Das schmeckt gut`,ro:`Are gust bun`}],exercises:[{type:`dialogue`,scene:`La cafenea`,characters:[{name:`Kellner`,emoji:`🧑‍🍳`},{name:`Anna`,emoji:`👩`}],lines:[{who:0,de:`Guten Tag! Was mochten Sie?`,ro:`Bună ziua! Ce doriți?`},{who:1,blank:!0,answer:`Ich mochte einen Kaffee`,ro:`Aș dori o cafea`},{who:0,de:`Gerne! Sofort.`,ro:`Cu plăcere! Imediat.`}],mode:`wordBank`,bank:[`Ich`,`mochte`,`einen`,`Kaffee`,`Tee`,`Wasser`]},{type:`wordBank`,promptDe:`Der Kaffee ist heiss.`,answer:`Cafeaua este fierbinte`,bank:[`Cafeaua`,`este`,`fierbinte`,`rece`,`bună`]},{type:`dialogue`,scene:`Acasă`,characters:[{name:`Max`,emoji:`🧑`},{name:`Elena`,emoji:`👧`}],lines:[{who:0,de:`Was trinkst du?`,ro:`Ce bei?`},{who:1,blank:!0,answer:`Ich trinke Wasser`,ro:`Eu beau apă`},{who:0,de:`Gut! Wasser ist gesund.`,ro:`Bine! Apa e sănătoasă.`}],mode:`wordBank`,bank:[`Ich`,`trinke`,`Wasser`,`Milch`,`esse`]},{type:`wordBank`,promptDe:`Ich esse Brot mit Kase.`,answer:`Eu mănânc pâine cu brânză`,bank:[`Eu`,`mănânc`,`pâine`,`cu`,`brânză`,`lapte`]},{type:`dialogue`,scene:`La cafenea`,characters:[{name:`Kellner`,emoji:`🧑‍🍳`},{name:`Max`,emoji:`🧑`}],lines:[{who:0,de:`Mochtest du Tee oder Kaffee?`,ro:`Vrei ceai sau cafea?`},{who:1,blank:!0,answer:`Ich mochte Tee, bitte`,ro:`Aș dori ceai, te rog`},{who:0,de:`Sehr gut!`,ro:`Foarte bine!`}],mode:`multiChoice`,options:[`Ich mochte Tee, bitte`,`Gute Nacht`,`Ich bin ein Kind`]},{type:`wordBank`,promptDe:`Das schmeckt gut!`,answer:`Are gust bun`,bank:[`Are`,`gust`,`bun`,`rău`,`asta`]}]}]},{id:`despre-mine`,title:`Despre mine`,icon:`📝`,description:`Prezintă-te și vorbește despre viața de zi cu zi`,kind:`units`,series:!0,seriesSize:10,units:[{id:`dm-1`,title:`Cine sunt eu`,icon:`🙋‍♀️`,description:`Nume, vârstă, de unde vii`,exercises:[{type:`sentenceBuild`,promptRo:`Bună, mă numesc Paula.`,answer:`Hallo, ich heisse Paula.`,bank:[`Hallo`,`ich`,`heisse`,`Paula`,`bin`,`danke`]},{type:`sentenceBuild`,promptRo:`Am 49 de ani.`,answer:`Ich bin 49 Jahre alt.`,bank:[`Ich`,`bin`,`49`,`Jahre`,`alt`,`heisse`,`und`]},{type:`sentenceBuild`,promptRo:`Vin din România.`,answer:`Ich komme aus Rumanien.`,bank:[`Ich`,`komme`,`aus`,`Rumanien`,`Deutschland`,`bin`]},{type:`sentenceBuild`,promptRo:`Locuiesc în Germania.`,answer:`Ich wohne in Deutschland.`,bank:[`Ich`,`wohne`,`in`,`Deutschland`,`komme`,`aus`]}]},{id:`dm-2`,title:`Ce îmi place`,icon:`💚`,description:`Pasiuni, hobby-uri, limbi`,exercises:[{type:`sentenceBuild`,promptRo:`Îmi place să merg la sală.`,answer:`Ich gehe gern ins Fitnessstudio.`,bank:[`Ich`,`gehe`,`gern`,`ins`,`Fitnessstudio`,`und`,`aus`]},{type:`sentenceBuild`,promptRo:`Iubesc natura.`,answer:`Ich liebe die Natur.`,bank:[`Ich`,`liebe`,`die`,`Natur`,`Sonne`,`und`]},{type:`sentenceBuild`,promptRo:`Îmi place să ies în natură.`,answer:`Ich gehe gern in die Natur.`,bank:[`Ich`,`gehe`,`gern`,`in`,`die`,`Natur`,`ins`]},{type:`sentenceBuild`,promptRo:`Vorbesc puțină germană.`,answer:`Ich spreche ein bisschen Deutsch.`,bank:[`Ich`,`spreche`,`ein`,`bisschen`,`Deutsch`,`und`,`gern`]}]}]},{id:`imagini-cuvinte`,title:`Imagini și cuvinte`,icon:`🖼️`,description:`Învață vizual, pe teme: atinge, ascultă, ghicește`,kind:`themes`,series:!0,seriesSize:10,themes:[{id:`bauturi`,title:`Băuturi`,icon:`🥤`,words:[{de:`Wasser`,ro:`apă`},{de:`Milch`,ro:`lapte`},{de:`Tee`,ro:`ceai`},{de:`Kaffee`,ro:`cafea`},{de:`Saft`,ro:`suc`},{de:`Cola`,ro:`cola`},{de:`Bier`,ro:`bere`},{de:`Wein`,ro:`vin`}]},{id:`mancare`,title:`Mâncare`,icon:`🍽️`,words:[{de:`Brot`,ro:`pâine`},{de:`Kase`,ro:`brânză`},{de:`Apfel`,ro:`măr`},{de:`Banane`,ro:`banană`},{de:`Ei`,ro:`ou`},{de:`Fisch`,ro:`pește`},{de:`Suppe`,ro:`supă`},{de:`Pizza`,ro:`pizza`}]},{id:`animale`,title:`Animale`,icon:`🐾`,words:[{de:`Hund`,ro:`câine`},{de:`Katze`,ro:`pisică`},{de:`Pferd`,ro:`cal`},{de:`Kuh`,ro:`vacă`},{de:`Maus`,ro:`șoarece`},{de:`Bar`,ro:`urs`},{de:`Vogel`,ro:`pasăre`},{de:`Schwein`,ro:`porc`}]},{id:`culori`,title:`Culori`,icon:`🎨`,words:[{de:`rot`,ro:`roșu`},{de:`blau`,ro:`albastru`},{de:`grun`,ro:`verde`},{de:`gelb`,ro:`galben`},{de:`schwarz`,ro:`negru`},{de:`weiss`,ro:`alb`},{de:`braun`,ro:`maro`},{de:`rosa`,ro:`roz`}]},{id:`natura`,title:`Natură`,icon:`🌳`,words:[{de:`Sonne`,ro:`soare`},{de:`Mond`,ro:`lună`},{de:`Stern`,ro:`stea`},{de:`Baum`,ro:`copac`},{de:`Blume`,ro:`floare`},{de:`Regen`,ro:`ploaie`},{de:`Schnee`,ro:`zăpadă`},{de:`Berg`,ro:`munte`}]},{id:`transport`,title:`Transport`,icon:`🚗`,words:[{de:`Auto`,ro:`mașină`},{de:`Bus`,ro:`autobuz`},{de:`Zug`,ro:`tren`},{de:`Fahrrad`,ro:`bicicletă`},{de:`Flugzeug`,ro:`avion`},{de:`Schiff`,ro:`vapor`},{de:`Taxi`,ro:`taxi`}]},{id:`corp`,title:`Corpul`,icon:`🧍`,words:[{de:`Kopf`,ro:`cap`},{de:`Auge`,ro:`ochi`},{de:`Ohr`,ro:`ureche`},{de:`Nase`,ro:`nas`},{de:`Mund`,ro:`gură`},{de:`Hand`,ro:`mână`},{de:`Fuss`,ro:`picior`},{de:`Herz`,ro:`inimă`}]},{id:`haine`,title:`Haine`,icon:`👕`,words:[{de:`Hemd`,ro:`cămașă`},{de:`Hose`,ro:`pantaloni`},{de:`Schuh`,ro:`pantof`},{de:`Jacke`,ro:`jachetă`},{de:`Kleid`,ro:`rochie`},{de:`Mantel`,ro:`palton`},{de:`Mutze`,ro:`căciulă`},{de:`Socke`,ro:`șosetă`}]},{id:`casa`,title:`Casa`,icon:`🛋️`,words:[{de:`Tisch`,ro:`masă`},{de:`Stuhl`,ro:`scaun`},{de:`Bett`,ro:`pat`},{de:`Tur`,ro:`ușă`},{de:`Fenster`,ro:`fereastră`},{de:`Lampe`,ro:`lampă`},{de:`Schrank`,ro:`dulap`},{de:`Sofa`,ro:`canapea`}]},{id:`vreme`,title:`Vreme`,icon:`🌤️`,words:[{de:`Sonne`,ro:`soare`},{de:`Wolke`,ro:`nor`},{de:`Regen`,ro:`ploaie`},{de:`Schnee`,ro:`zăpadă`},{de:`Wind`,ro:`vânt`},{de:`Sturm`,ro:`furtună`},{de:`Nebel`,ro:`ceață`},{de:`Himmel`,ro:`cer`}]},{id:`meserii`,title:`Meserii`,icon:`💼`,words:[{de:`Lehrer`,ro:`profesor`},{de:`Arzt`,ro:`medic`},{de:`Koch`,ro:`bucătar`},{de:`Kellner`,ro:`chelner`},{de:`Polizist`,ro:`polițist`},{de:`Bauer`,ro:`fermier`},{de:`Student`,ro:`student`},{de:`Verkaufer`,ro:`vânzător`}]},{id:`fructe-legume`,title:`Fructe și legume`,icon:`🥗`,words:[{de:`Apfel`,ro:`măr`},{de:`Banane`,ro:`banană`},{de:`Tomate`,ro:`roșie`},{de:`Kartoffel`,ro:`cartof`},{de:`Erdbeere`,ro:`căpșună`},{de:`Salat`,ro:`salată`},{de:`Gemuse`,ro:`legume`},{de:`Obst`,ro:`fructe`}]}]}];I(`cuvinte-uzuale`).units.push(...Pt(97,`cug`)),I(`propozitii-scurte`).units.push(...Ut(98,`psg`)),I(`despre-mine`).units.push(...Jt(`dm`,3)),I(`despre-mine`).units.push(...Zt(100,`dmg`)),I(`despre-mine`).units.push(...$t(50,`dmg2`)),I(`imagini-cuvinte`).units=It(100,`img`);for(let e of I(`cuvinte-uzuale`)?.units||[])e.generated||(e.exercises=at(e.exercises,e.words,10,`unit:${e.id}`));function I(e){return en.find(t=>t.id===e)}function tn(){return en}var nn={low:[`Corect! 👍`,`Foarte bine! ✨`,`Exact! 🎯`,`Bravo! 👏`,`Așa da! 💚`,`Perfect! ✅`,`Minunat! 🌟`,`Ai dreptate! 👍`,`Da, corect! ✨`,`Bine lucrat! 💪`],medium:[`Excelent! Creierul tău lucrează de minune! 🧠✨`,`WOW, ești pe val! Continuă tot așa! 🌊🔥`,`Incredibil! Ai un talent natural pentru germană! 🌟`,`Ai nimerit-o din prima! Asta se cheamă progres! 📈`,`Super! Memoria ta e de fier! 💪🧲`,`Exact! Simți cum devii mai bun? Eu simt! 🚀`,`Bravo! Cu fiecare răspuns corect, germana devine mai ușoară! 🎯`],high:[`SPECTACULOS! 🎉🎊 Ești absolut genial! Merită o sărbătoare!`,`Nu-mi vine să cred! 🤩 Ești un MAESTRU al germanei! Aplauze stând în picioare! 👏👏👏`,`BOOM! 💥 Răspuns perfect! Ai merita o medalie! 🏅`,`FENOMENAL! 🌈✨ La cum progresezi, vei vorbi germana fluent în curând!`]},rn=[`Hmm, nu chiar, dar nu-i nimic! Hai să vedem împreună... 🤗`,`Aproape! Nu te descuraja, greșelile sunt parte din învățare! 💛`,`Nu e răspunsul corect, dar ești pe drumul cel bun! 💪`,`Ups! Dar știi ce? Creierul tău tocmai a învățat ceva important! 🧠`,`Nu de data asta, dar următoarea va fi a ta! ✨`,`Greșelile sunt cele mai bune profesoare! Hai să încercăm din nou! 📚`,`Încă nu ai nimerit, dar faptul că încerci e cel mai important! 🌟`,`Nu e corect, dar nu renunța! Fiecare greșeală te face mai puternic! 💪`,`Oops! Dar fiecare campion a trecut prin momente ca ăsta! 🏆`,`Nu-i nimic! Hai să privim răspunsul corect și să mergem mai departe! 🚀`],an=[`Nu-i nimic! Îl vei reîntâlni la practică 💛`,`E în regulă, mergem mai departe! Cuvântul ăsta revine la repetiție 🌱`,`Niciun stres! Data viitoare îl știi sigur 💪`,`Trecem peste — învățarea nu e o cursă! 😊`],on={perfect:[`PERFECȚIUNE ABSOLUTĂ! 💯🎉 Ai răspuns corect la TOATE întrebările! Ești incredibil!`,`SCOR PERFECT! 🌟🏆 Nu ai greșit NIMIC! Ești un geniu al germanei!`],great:[`Lecție terminată cu brio! 🎉 Ai fost fantastic! Continuă tot așa!`,`WOW! Rezultat excelent! 🌟 Ești din ce în ce mai bun!`,`Bravo! 🏆 Ce lecție reușită! Germana ta se îmbunătățește vizibil!`],good:[`Lecție completă! 👏 Ai făcut treabă bună! Cu fiecare lecție devii mai bun!`,`Bine lucrat! ✨ Continuă și vei fi expert în curând!`,`Felicitări! 🎯 Ai terminat lecția! Progresul tău e real și important!`],okay:[`Ai reușit să termini lecția! 💪 Asta contează enorm! Poți repeta oricând vrei!`,`Lecție completă! 🌱 Fiecare pas contează, iar tu tocmai ai făcut unul important!`]},sn={1:`Prima zi! 🌱 Fiecare călătorie începe cu un singur pas!`,2:`A doua zi consecutivă! 💚 Deja se formează un obicei!`,3:`3 zile la rând! 🔥 Consistența ta e admirabilă!`,5:`5 zile la rând! 🔥🔥 Ești de neoprit!`,7:`O săptămână întreagă! 🎉🔥 Ești un exemplu de dedicare!`,14:`Două săptămâni! 🏆 Germana devine parte din viața ta!`,30:`O LUNĂ! 🌟💎 Ești LEGENDAR! Nimic nu te poate opri!`},cn=[`Bine ai revenit! 🌟 Ești gata pentru o nouă aventură în germană?`,`Salut! Ce bine că ești aici! Hai să învățăm ceva nou astăzi!`,`Hei! 💛 E o zi perfectă pentru a învăța germana! Hai să începem!`,`Bine ai venit! ✨ Vulpea ta preferată te aștepta! Hai la treabă!`,`Salut! 🎯 Fiecare minut petrecut aici te face mai bun! Hai să profităm!`],ln=[`Ne-ai lipsit! 💛 E o bucurie că te-ai întors! Hai să continuăm de unde am rămas!`,`Bine ai revenit! 🤗 Nu contează cât timp a trecut, important e că ești aici acum!`,`Eee, cine a apărut! Ce bine că te-ai întors! Hai să recuperăm!`,`Salut! 🌟 Fiecare zi e o nouă șansă de a învăța! Bine ai revenit!`],un=[`Continuă tot așa! 💪`,`Ești pe drumul cel bun! 🛤️`,`Aproape ai terminat! 🏁`,`Excelent! Mergi înainte! 🚀`,`Nu te opri, ești genial! ⭐`];function L(e){return e[Math.floor(Math.random()*e.length)]}function dn(){let e=Math.random();return L(e<.1?nn.high:e<.4?nn.medium:nn.low)}function fn(e){return L(e===100?on.perfect:e>=85?on.great:e>=70?on.good:on.okay)}var pn={happy:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-idle`,badge:``},excited:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pop`,badge:``},thinking:{ring:`var(--color-xp)`,glow:`rgba(28,176,246,0.35)`,anim:`avatar-tilt`,badge:`?`},celebrating:{ring:`var(--color-secondary)`,glow:`rgba(206,130,255,0.4)`,anim:`avatar-spin`,badge:``},encouraging:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pulse`,badge:``},sad:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.3)`,anim:`avatar-shake`,badge:``},sleeping:{ring:`var(--text-muted)`,glow:`rgba(120,120,120,0.2)`,anim:``,badge:`z`},love:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.4)`,anim:`avatar-heart`,badge:``},waving:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-wave`,badge:``}},mn={sm:44,md:72,lg:104,xl:144};function R(e=`happy`,t=`md`,n=``){let r=pn[e]||pn.happy,i=mn[t]||mn.md,a=Math.round(i*.72);return`
    <div class="avatar-wrap" style="display:inline-flex;flex-direction:column;align-items:center;gap:10px;">
      <button type="button" class="avatar ${r.anim}"
              style="--ring:${r.ring};--glow:${r.glow};--size:${i}px;--inner:${a}px;"
              aria-label="Asistent" tabindex="0">
        <span class="avatar-glow"></span>
        <span class="avatar-core">
          <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
            <defs>
              <clipPath id="avClip"><circle cx="30" cy="30" r="28"/></clipPath>
            </defs>
            <g clip-path="url(#avClip)">
              <rect x="0" y="0"  width="60" height="20" fill="#1a1a1a"/>
              <rect x="0" y="20" width="60" height="20" fill="#DD0000"/>
              <rect x="0" y="40" width="60" height="20" fill="#FFCE00"/>
            </g>
            <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>
          </svg>
        </span>
        ${r.badge?`<span class="avatar-badge">${r.badge}</span>`:``}
      </button>
      ${n?`
        <div class="avatar-bubble">
          <span>${n}</span>
        </div>
      `:``}
    </div>
  `}function hn(e,t=0){return e?t>=5?`celebrating`:t>=3?`excited`:`happy`:`encouraging`}var gn=1.3,_n=2.5;function vn(e,t){let{interval:n,repetitions:r,easeFactor:i}=e;i||=_n,n||=0,r||=0,t>=3?(n=r===0?1:r===1?6:Math.round(n*i),r+=1):(r=0,n=1),i+=.1-(5-t)*(.08+(5-t)*.02),i<gn&&(i=gn);let a=new Date;return a.setDate(a.getDate()+n),{interval:n,repetitions:r,easeFactor:Math.round(i*100)/100,nextReview:a.toISOString(),lastReview:new Date().toISOString()}}function yn(e,t){let n=g(),r=n.exerciseHistory.find(t=>t.word===e);r||={word:e,interval:0,repetitions:0,easeFactor:_n,nextReview:new Date().toISOString(),lastReview:null};let i={word:e,...vn(r,t)},a=n.exerciseHistory.filter(t=>t.word!==e);a.push(i);let o=[...n.wordsMastered];return i.interval>=21&&!o.includes(e)&&o.push(e),v({exerciseHistory:a,wordsMastered:o}),i}function bn(){let e=g(),t=new Date;return e.exerciseHistory.filter(e=>new Date(e.nextReview)<=t).sort((e,t)=>new Date(e.nextReview)-new Date(t.nextReview))}function xn(){let e=g(),t=bn();return{totalTracked:e.exerciseHistory.length,dueForReview:t.length,mastered:e.wordsMastered.length}}function Sn(e){let t=g(),n=xe(),r=kt(),i=le(),a=xn(),o=l(),s=new Date().toDateString(),c=t.lastActiveDate,u;u=!c||c===s?L(cn):Math.floor((new Date-new Date(c))/864e5)>2?L(ln):L(cn);let d=sn[i]||(i>0?`🔥 ${i} zile la rând!`:``),f=(e,n)=>{let i=y(e.id),a=pe(e.id,r),o=t.lessonsCompleted[e.id]?.stars||0;return`
      <div class="lesson-node animate-fadeInUp ${i?`lesson-completed`:``} ${a?`lesson-unlocked`:`lesson-locked`}"
           style="animation-delay: ${.3+n*.05}s;"
           data-lesson-id="${e.id}"
           ${a?`id="lesson-${e.id}"`:``}>
        <div class="lesson-node-circle">
          <span class="lesson-node-icon">${i?`✅`:a?e.icon:`🔒`}</span>
        </div>
        <div class="lesson-node-info">
          <h3 class="lesson-node-title">${e.title}</h3>
          <p class="lesson-node-subtitle">${e.titleDe}</p>
          ${i?`
            <div class="lesson-stars">${`⭐`.repeat(o)}${`☆`.repeat(3-o)}</div>
          `:a?`
            <p class="lesson-node-desc">${e.description}</p>
          `:`
            <p class="lesson-node-desc" style="opacity: 0.5;">Completează lecția anterioară</p>
          `}
        </div>
        ${a?`<span class="lesson-node-arrow">→</span>`:``}
      </div>
    `},p=r.filter(e=>!e.extra),m=r.filter(e=>e.extra),h=localStorage.getItem(`ui_classicOpen`)===`1`,_=`
    <button class="lessons-collapse-btn" id="btn-toggle-classic" aria-expanded="${h}">
      <span class="lessons-collapse-label">📖 Lecții de bază</span>
      <span class="lessons-collapse-meta">
        <span class="lessons-collapse-count">${p.filter(e=>y(e.id)).length}/${p.length}</span>
        <span class="lessons-collapse-caret">${h?`▴`:`▾`}</span>
      </span>
    </button>
    <div class="lesson-map classic-map ${h?``:`is-collapsed`}" id="classic-map">${p.map((e,t)=>f(e,t)).join(``)}</div>
  `;if(m.length){let e=Math.ceil(m.length/10),t=[];for(let n=0;n<e;n++)t[n]=m.slice(n*10,n*10+10).every(e=>y(e.id));let n=pe(m[0].id,r),i=e=>e===0?n:t[e-1],a=[`<h2 class="home-extra-title">🏆 Provocări</h2>`],o=p.length;for(let n=0;n<e;n++)if(i(n)){let r=m.slice(n*10,n*10+10),i=r.filter(e=>y(e.id)).length,s=localStorage.getItem(`ui_series_home_${n}`),c=s===null?t[n]:s===`1`;a.push(`
          <button class="series-header series-toggle" data-series="${n}" aria-expanded="${!c}">
            <span class="series-header-title">Seria ${n+1} / ${e}</span>
            <span class="series-header-right">
              <span class="series-header-progress">${i}/${r.length}</span>
              <span class="series-caret">${c?`▾`:`▴`}</span>
            </span>
          </button>
        `),a.push(`<div class="lesson-map series-units ${c?`is-collapsed`:``}" data-series="${n}">${r.map((e,t)=>f(e,o+t)).join(``)}</div>`),o+=r.length+1}else{let e=n===0?`Termină lecțiile de bază ca să deblochezi provocările`:`Termină seria ${n} ca să deblochezi următoarele 10`;a.push(`
          <div class="series-teaser">
            <span class="series-teaser-lock">🔒</span>
            <div><strong>Seria ${n+1}</strong><p>${e}</p></div>
          </div>
        `);break}_+=a.join(``)}return`
    <div class="home-screen">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header-top">
          <div class="home-logo">
            <span class="home-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 60 60" width="32" height="32">
                <defs><clipPath id="logoClip"><circle cx="30" cy="30" r="28"/></clipPath></defs>
                <g clip-path="url(#logoClip)">
                  <rect width="60" height="20" fill="#1a1a1a"/>
                  <rect y="20" width="60" height="20" fill="#DD0000"/>
                  <rect y="40" width="60" height="20" fill="#FFCE00"/>
                </g>
                <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
              </svg>
            </span>
            <span class="home-logo-text">Învățăm Germană</span>
          </div>
          <div class="home-header-actions">
            ${o?`
              <button class="home-user-chip" id="btn-switch-user" title="Schimbă profilul">
                <span class="home-user-chip-avatar">${o.avatar}</span>
                <span class="home-user-chip-name">${o.name}</span>
              </button>
            `:``}
            <button class="home-icon-btn" id="btn-settings" title="Setări">⚙️</button>
          </div>
        </div>
        
        <!-- Stats Row -->
        <div class="home-stats-row">
          <div class="home-stat" id="btn-profile" style="cursor: pointer;">
            <span class="home-stat-icon">🔥</span>
            <span class="home-stat-value">${n.streak}</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">⭐</span>
            <span class="home-stat-value">${n.xp} XP</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">🎯</span>
            <span class="home-stat-value">${n.accuracy}%</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">📚</span>
            <span class="home-stat-value">${n.wordsLearned}</span>
          </div>
        </div>
      </div>
      
      <!-- Welcome Section -->
      <div class="home-welcome animate-fadeInUp">
        <div class="home-welcome-mascot">
          ${R(i>3?`excited`:`waving`,`lg`)}
        </div>
        <p class="home-welcome-text">${u}</p>
        ${d?`<p class="home-streak-text">${d}</p>`:``}
      </div>

      <!-- Daily Goal -->
      <div class="home-daily-goal animate-fadeInUp" style="animation-delay: 0.1s;">
        <div class="daily-goal-header">
          <span>🎯 Obiectiv zilnic</span>
          <span class="daily-goal-time">${n.dailyMinutes}/${n.dailyGoal} min</span>
        </div>
        <div class="progress-bar-container" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${Math.min(100,n.dailyMinutes/n.dailyGoal*100)}%; ${n.dailyGoalCompleted?`background: linear-gradient(90deg, #FFC800, #FF9600);`:``}"></div>
        </div>
        ${n.dailyGoalCompleted?`<p class="daily-goal-complete">✅ Obiectiv completat! Bravo!</p>`:``}
      </div>
      
      <!-- Level Progress -->
      <div class="home-level-card animate-fadeInUp" style="animation-delay: 0.15s;">
        <div class="level-info">
          <span class="badge badge-level">Nivel ${n.level}</span>
          <span class="level-name">${n.levelName}</span>
        </div>
        <div class="progress-bar-container" style="height: 12px;">
          <div class="progress-bar-fill" style="width: ${n.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p class="level-xp-text">${n.xpProgress.current}/${n.xpProgress.needed} XP pentru nivelul următor</p>
      </div>

      <!-- Review Section -->
      ${a.dueForReview>0?`
        <div class="home-review-card animate-fadeInUp" style="animation-delay: 0.2s;">
          <button class="btn btn-accent btn-full" id="btn-practice">
            🔄 Repetă ${a.dueForReview} cuvinte
          </button>
        </div>
      `:``}

      <!-- Lesson Map -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.25s;">
        <h2>📖 Lecții</h2>
      </div>
      ${_}
      
      <!-- Sections -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.75s;">
        <h2>🧩 Secțiuni</h2>
      </div>
      <div class="home-sections">
        ${tn().map((e,n)=>{let r=e.units?e.units.length:e.themes?.length||0,i=e.units?e.units.filter(e=>t.lessonsCompleted[e.id]?.completed).length:null;return`
            <button class="home-section-card card-interactive animate-fadeInUp"
                    data-section-id="${e.id}"
                    style="animation-delay: ${.8+n*.08}s">
              <span class="home-section-icon">${e.icon}</span>
              <div class="home-section-info">
                <span class="home-section-title">${e.title}</span>
                <span class="home-section-desc">${e.description}</span>
              </div>
              <span class="home-section-progress">${i===null?`${r} teme`:`${i}/${r}`}</span>
            </button>
          `}).join(``)}
      </div>

      <!-- Dictionary Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 1s;">
        <button class="btn btn-accent btn-full" id="btn-dictionary">
          📖 Dicționar
        </button>
      </div>

      <!-- Cognates Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 1.05s;">
        <button class="btn btn-secondary btn-full" id="btn-cognates">
          🇷🇴↔🇩🇪 Cuvinte similare Română-Germană
        </button>
      </div>

      <!-- Bottom Spacing -->
      <div style="height: 32px;"></div>
    </div>
  `}function Cn(e){kt().forEach(t=>{let n=document.getElementById(`lesson-${t.id}`);n&&(n.addEventListener(`click`,()=>e(`lesson`,{lessonId:t.id})),n.addEventListener(`pointermove`,e=>{let t=n.getBoundingClientRect();n.style.setProperty(`--mx`,`${(e.clientX-t.left)/t.width*100}%`),n.style.setProperty(`--my`,`${(e.clientY-t.top)/t.height*100}%`)}))}),document.querySelectorAll(`.series-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.series,n=document.querySelector(`.series-units[data-series="${t}"]`);if(!n)return;let r=n.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_series_home_${t}`,r?`1`:`0`),e.setAttribute(`aria-expanded`,String(!r));let i=e.querySelector(`.series-caret`);i&&(i.textContent=r?`▾`:`▴`)})});let t=document.getElementById(`btn-toggle-classic`);t?.addEventListener(`click`,()=>{let e=document.getElementById(`classic-map`);if(!e)return;let n=!e.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_classicOpen`,n?`1`:`0`),t.setAttribute(`aria-expanded`,String(n));let r=t.querySelector(`.lessons-collapse-caret`);r&&(r.textContent=n?`▴`:`▾`)}),document.getElementById(`btn-settings`)?.addEventListener(`click`,()=>e(`settings`)),document.getElementById(`btn-switch-user`)?.addEventListener(`click`,()=>e(`users`)),document.getElementById(`btn-profile`)?.addEventListener(`click`,()=>e(`profile`)),document.getElementById(`btn-practice`)?.addEventListener(`click`,()=>e(`practice`)),document.getElementById(`btn-cognates`)?.addEventListener(`click`,()=>e(`cognates`)),document.getElementById(`btn-dictionary`)?.addEventListener(`click`,()=>e(`dictionary`)),document.querySelectorAll(`.home-section-card`).forEach(t=>{t.addEventListener(`click`,()=>e(`section`,{sectionId:t.dataset.sectionId}))})}var wn=14;function Tn(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function En(e){if(!e||!e.exercises||e.exercises.length<=wn)return e;let t=e.exercises.filter(e=>!e.gen).slice(0,wn),n=e.exercises.filter(e=>e.gen),r=wn-t.length,i=r>0?Tn(n).slice(0,r):[];return{...e,exercises:t.concat(i)}}function Dn(e){if(e.exercises)return{id:e.unitId||`generated`,title:e.title||`Exercițiu`,icon:e.icon||`✨`,exercises:e.exercises};if(e.sectionId&&e.unitId){let t=I(e.sectionId)?.units?.find(t=>t.id===e.unitId);return En(t||null)}return En(Ot(e.lessonId))}var z=[],On=null,B=null,kn=[/Microsoft.*(Katja|Conrad|Amala|Killian).*Neural/i,/Microsoft.*(Katja|Conrad|Amala|Killian)/i,/Google Deutsch/i,/Google.*German/i,/Anna.*(Enhanced|Premium)/i,/Helena.*(Enhanced|Premium)/i,/Petra.*(Enhanced|Premium)/i,/Anna|Helena|Petra|Markus|Yannick/i,/(natural|neural|enhanced|premium|wavenet)/i];function An(){return z=window.speechSynthesis?.getVoices()||[],z}function jn(){return On||(On=new Promise(e=>{if(!window.speechSynthesis){e([]);return}if(An(),z.length>0){e(z);return}let t=0,n=()=>{An(),z.length>0||t>20?e(z):(t++,setTimeout(n,150))};window.speechSynthesis.onvoiceschanged=()=>{An(),z.length>0&&e(z)},n()}),On)}window.speechSynthesis&&jn();function Mn(){if(B)return B;z.length||An();let e=z.filter(e=>/^de(-|_|$)/i.test(e.lang));if(e.length===0)return B=z.find(e=>e.lang===`de`)||null,B;for(let t of kn){let n=e.find(e=>t.test(e.name));if(n)return B=n,n}let t=e.find(e=>e.localService&&e.lang===`de-DE`)||e.find(e=>e.localService)||e.find(e=>e.lang===`de-DE`)||e[0];return B=t,t}function Nn(e,{rate:t,pitch:n=1,lang:r=`de-DE`}){return new Promise(i=>{if(!window.speechSynthesis){i();return}window.speechSynthesis.cancel();let a=()=>{let a=new SpeechSynthesisUtterance(e);a.lang=r,a.rate=t,a.pitch=n,a.volume=1;let o=Mn();o&&(a.voice=o),a.onend=()=>i(),a.onerror=e=>{console.warn(`TTS error:`,e?.error),i()},window.speechSynthesis.speak(a),setTimeout(()=>{window.speechSynthesis.paused&&window.speechSynthesis.resume()},100)};z.length===0?jn().then(a):a()})}function V(e,t=`de-DE`){return Nn(e,{rate:.92,pitch:1.02,lang:t})}function Pn(e,t=`de-DE`){return Nn(e,{rate:.65,pitch:1,lang:t})}var H=null;function Fn(){return!!(window.SpeechRecognition||window.webkitSpeechRecognition)}function In(e=`de-DE`){return new Promise((t,n)=>{if(!Fn()){n(Error(`Speech recognition not supported`));return}H=new(window.SpeechRecognition||window.webkitSpeechRecognition),H.lang=e,H.interimResults=!1,H.maxAlternatives=3,H.continuous=!1,H.onresult=e=>{let n=[];for(let t=0;t<e.results[0].length;t++)n.push({transcript:e.results[0][t].transcript.toLowerCase().trim(),confidence:e.results[0][t].confidence});t(n)},H.onerror=e=>{e.error===`no-speech`?t([]):n(Error(`Speech recognition error: ${e.error}`))},H.onend=()=>{},H.start()})}function U(e){let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();switch(n.connect(r),r.connect(t.destination),e){case`correct`:n.frequency.setValueAtTime(523.25,t.currentTime),n.frequency.setValueAtTime(659.25,t.currentTime+.1),n.frequency.setValueAtTime(783.99,t.currentTime+.2),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.4),n.start(t.currentTime),n.stop(t.currentTime+.4);break;case`wrong`:n.frequency.setValueAtTime(200,t.currentTime),n.frequency.setValueAtTime(150,t.currentTime+.15),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.3),n.start(t.currentTime),n.stop(t.currentTime+.3);break;case`complete`:[523.25,587.33,659.25,783.99,1046.5].forEach((e,n)=>{let r=t.createOscillator(),i=t.createGain();r.connect(i),i.connect(t.destination),r.frequency.setValueAtTime(e,t.currentTime+n*.12),i.gain.setValueAtTime(.2,t.currentTime+n*.12),i.gain.exponentialRampToValueAtTime(.01,t.currentTime+n*.12+.3),r.start(t.currentTime+n*.12),r.stop(t.currentTime+n*.12+.3)});break;case`click`:n.frequency.setValueAtTime(800,t.currentTime),r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.05),n.start(t.currentTime),n.stop(t.currentTime+.05);break}}var Ln=[`#58CC02`,`#CE82FF`,`#FF9600`,`#1CB0F6`,`#FF4B4B`,`#FFC800`,`#89E219`];function Rn(e=`normal`){let t=document.getElementById(`confetti-container`);if(!t)return;let n=e===`high`?80:e===`low`?20:40;for(let e=0;e<n;e++){let e=document.createElement(`div`);e.className=`confetti-piece`,e.style.left=Math.random()*100+`%`,e.style.backgroundColor=Ln[Math.floor(Math.random()*Ln.length)],e.style.width=Math.random()*8+5+`px`,e.style.height=Math.random()*8+5+`px`,e.style.borderRadius=Math.random()>.5?`50%`:`2px`,e.style.animationDuration=Math.random()*2+1.5+`s`,e.style.animationDelay=Math.random()*.5+`s`,e.style.opacity=Math.random()*.5+.5,t.appendChild(e),setTimeout(()=>e.remove(),4e3)}}function zn(e=5){let t=document.getElementById(`confetti-container`);if(t)for(let n=0;n<e;n++){let e=document.createElement(`div`);e.textContent=`⭐`,e.style.cssText=`
      position: absolute;
      font-size: ${Math.random()*20+20}px;
      left: ${Math.random()*80+10}%;
      top: ${Math.random()*40+20}%;
      animation: popIn 0.5s ease forwards;
      animation-delay: ${n*.15}s;
      opacity: 0;
      pointer-events: none;
    `,t.appendChild(e),setTimeout(()=>e.remove(),2e3)}}function Bn(e,t=`success`,n=3e3){let r=document.getElementById(`toast-container`);if(!r)return;let i=document.createElement(`div`);i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-icon">${{success:`✅`,error:`❌`,info:`ℹ️`,warning:`⚠️`,badge:`🏅`,xp:`⭐`,streak:`🔥`,heart:`❤️`,levelup:`🎉`}[t]||`✨`}</span>
    <span class="toast-message">${e}</span>
  `,r.appendChild(i),setTimeout(()=>{i.classList.add(`toast-exit`),setTimeout(()=>i.remove(),300)},n)}function Vn(e){Bn(`+${e} XP`,`xp`,2e3)}function Hn(e){Bn(`${e.icon} Insignă nouă: ${e.name}!`,`badge`,4e3)}function Un(e,t){Bn(`🎉 Nivel nou: ${e} — ${t}!`,`levelup`,4e3)}function Wn(e){let t=e.options.map(e=>C(e)),n=t.every(Boolean),r=e.options.map((e,r)=>`
      <button class="mc-option card card-interactive animate-fadeInUp"
              data-value="${e}"
              style="animation-delay: ${r*.08}s;">
        <span class="mc-option-letter">${n?t[r]:String.fromCharCode(65+r)}</span>
        <span class="mc-option-text">${e}</span>
      </button>
    `).join(``);return`
    <div class="exercise-multi-choice">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🎯 Alege răspunsul corect</span>
      </div>

      <div class="mc-question animate-fadeIn">
        <p class="mc-question-text">${e.question}</p>
      </div>

      <div class="mc-options-grid">
        ${r}
      </div>
    </div>

    <style>
      .exercise-multi-choice {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .mc-question {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .mc-question-text {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        line-height: 1.3;
      }

      .mc-options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
      }

      .mc-option {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-lg) var(--space-md);
        min-height: 72px;
        text-align: left;
        cursor: pointer;
        transition: all var(--transition-fast);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        background: var(--bg-card);
        box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family);
      }

      .mc-option:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .mc-option-letter {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: var(--border-radius-full);
        background: var(--bg-secondary);
        border: 2px solid var(--border-color);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        flex-shrink: 0;
      }

      .mc-option-text {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      /* States applied by lesson.js */
      .mc-option.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
        box-shadow: none;
      }

      .mc-option.mc-correct .mc-option-letter {
        background: var(--color-success);
        border-color: var(--color-success);
        color: var(--text-inverse);
      }

      .mc-option.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s;
        box-shadow: none;
      }

      .mc-option.mc-wrong .mc-option-letter {
        background: var(--color-error);
        border-color: var(--color-error);
        color: var(--text-inverse);
      }

      .mc-option.mc-disabled {
        pointer-events: none;
        opacity: 0.7;
      }

      .mc-option.mc-disabled.mc-correct,
      .mc-option.mc-disabled.mc-wrong {
        opacity: 1;
      }

      @media (max-width: 400px) {
        .mc-options-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `}function Gn(e){let t=e.type===`translate_ro_de`,n=t?`Tradu în germană 🇩🇪`:`Tradu în română 🇷🇴`,r=t?`🇩🇪`:`🇷🇴`,i=t?`🇷🇴 Română`:`🇩🇪 Germană`,a=t?`🇩🇪 Germană`:`🇷🇴 Română`,o=t?`Scrie traducerea în germană...`:`Scrie traducerea în română...`;return`
    <div class="exercise-translate">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">📝 ${n}</span>
      </div>

      <div class="translate-prompt-card card animate-scaleIn">
        <div class="translate-source-label">${i}</div>
        <div class="translate-prompt-text">${e.prompt}</div>
        <button class="translate-speak-btn" id="btn-speak-word" title="Ascultă pronunția">
          🔊
        </button>
      </div>

      <div class="translate-arrow animate-fadeIn">⬇️</div>

      <div class="translate-answer-section animate-fadeInUp">
        <div class="translate-target-label">${a}</div>
        <input
          type="text"
          id="translate-input"
          class="input"
          placeholder="${o}"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-translate"
              style="animation-delay: 0.2s; margin-top: var(--space-lg);">
        VERIFICĂ ${r}
      </button>
    </div>

    <style>
      .exercise-translate {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .translate-prompt-card {
        position: relative;
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-md);
      }

      .translate-source-label,
      .translate-target-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: var(--space-sm);
      }

      .translate-prompt-text {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        line-height: 1.3;
      }

      .translate-speak-btn {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        background: none;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-full);
        width: 44px;
        height: 44px;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .translate-speak-btn:hover {
        border-color: var(--color-xp);
        background: rgba(28, 176, 246, 0.1);
      }

      .translate-speak-btn:active {
        transform: scale(0.9);
      }

      .translate-arrow {
        text-align: center;
        font-size: 1.5rem;
        margin: var(--space-sm) 0;
      }

      .translate-answer-section {
        margin-bottom: var(--space-sm);
      }
    </style>
  `}function Kn(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function qn(e){let t=e.pairs.map((e,t)=>({value:e[0],index:t})),n=e.pairs.map((e,t)=>({value:e[1],index:t})),r=Kn(t),i=Kn(n);return`
    <div class="exercise-match">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🔗 Potrivește perechile</span>
      </div>

      <div class="match-columns">
        <div class="match-column match-column-left">
          <div class="match-column-header">🇩🇪 Germană</div>
          ${r.map((e,t)=>`
      <button class="match-item card card-interactive animate-fadeInUp"
              data-side="left"
              data-value="${e.value}"
              data-index="${e.index}"
              style="animation-delay: ${t*.07}s;">
        <span class="match-flag">🇩🇪</span>
        <span class="match-text">${e.value}</span>
      </button>
    `).join(``)}
        </div>
        <div class="match-column match-column-right">
          <div class="match-column-header">🇷🇴 Română</div>
          ${i.map((e,t)=>`
      <button class="match-item card card-interactive animate-fadeInUp"
              data-side="right"
              data-value="${e.value}"
              data-index="${e.index}"
              style="animation-delay: ${t*.07+.1}s;">
        <span class="match-flag">🇷🇴</span>
        <span class="match-text">${e.value}</span>
      </button>
    `).join(``)}
        </div>
      </div>
    </div>

    <style>
      .exercise-match {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .match-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
      }

      .match-column {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .match-column-header {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-align: center;
        padding-bottom: var(--space-xs);
        border-bottom: 2px solid var(--border-color);
        margin-bottom: var(--space-xs);
      }

      .match-item {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-md);
        border-radius: var(--border-radius-md);
        font-family: var(--font-family);
        cursor: pointer;
        transition: all var(--transition-fast);
        min-height: 52px;
      }

      .match-flag {
        font-size: 1rem;
        flex-shrink: 0;
      }

      .match-text {
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      /* Selected state */
      .match-item.match-selected {
        border-color: var(--color-xp) !important;
        background: rgba(28, 176, 246, 0.1) !important;
        box-shadow: 0 0 0 3px rgba(28, 176, 246, 0.2);
        transform: scale(1.03);
      }

      /* Matched / done */
      .match-item.match-done {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
        opacity: 0.7;
        pointer-events: none;
        box-shadow: none;
      }

      .match-item.match-correct-anim {
        animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .match-item.match-wrong-anim {
        animation: shake 0.5s;
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
      }

      @media (max-width: 400px) {
        .match-item {
          padding: var(--space-sm);
          min-height: 44px;
        }

        .match-text {
          font-size: var(--font-size-sm);
        }
      }
    </style>
  `}function Jn(e){return`
    <div class="exercise-fillblank">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">✏️ Completează propoziția</span>
      </div>

      <div class="fillblank-sentence card animate-scaleIn">
        <p class="fillblank-text">${e.sentence.replace(/_{2,}/g,`<span class="fillblank-gap">______</span>`)}</p>
      </div>

      ${e.hint?`
        <div class="fillblank-hint animate-fadeIn">
          💡 <em>${e.hint}</em>
        </div>
      `:``}

      <div class="fillblank-input-area animate-fadeInUp">
        <input
          type="text"
          id="fillblank-input"
          class="input"
          placeholder="Scrie cuvântul lipsă..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-fillblank"
              style="animation-delay: 0.15s; margin-top: var(--space-md);">
        VERIFICĂ ✏️
      </button>
    </div>

    <style>
      .exercise-fillblank {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .fillblank-sentence {
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-md);
      }

      .fillblank-text {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        line-height: 1.6;
      }

      .fillblank-gap {
        display: inline-block;
        border-bottom: 3px solid var(--color-primary);
        color: var(--color-primary);
        font-weight: var(--font-weight-extrabold);
        padding: 0 var(--space-xs);
        margin: 0 var(--space-xs);
        min-width: 80px;
        text-align: center;
        letter-spacing: 2px;
      }

      .fillblank-hint {
        text-align: center;
        font-size: var(--font-size-md);
        color: var(--text-secondary);
        margin-bottom: var(--space-lg);
        padding: var(--space-sm) var(--space-md);
        background: var(--color-warning-bg);
        border-radius: var(--border-radius-md);
      }

      .fillblank-input-area {
        margin-bottom: var(--space-sm);
      }
    </style>
  `}function Yn(e){return`
    <div class="exercise-listen">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🎧 Ascultă și scrie ce auzi</span>
      </div>

      <div class="listen-play-area animate-scaleIn">
        <button class="listen-play-btn" id="btn-play-audio" title="Ascultă">
          <span class="listen-play-icon">🔊</span>
        </button>
        <p class="listen-play-label">Apasă pentru a asculta</p>
      </div>

      <div class="listen-slow-area animate-fadeIn" style="animation-delay: 0.15s;">
        <button class="listen-slow-btn" id="btn-play-slow">
          🐌 Mai încet
        </button>
      </div>

      <div class="listen-input-area animate-fadeInUp" style="animation-delay: 0.2s;">
        <input
          type="text"
          id="listen-input"
          class="input"
          placeholder="Scrie ce ai auzit..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-listen"
              style="animation-delay: 0.3s; margin-top: var(--space-md);">
        VERIFICĂ 🎧
      </button>
    </div>

    <style>
      .exercise-listen {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .listen-play-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--space-lg);
      }

      .listen-play-btn {
        width: 120px;
        height: 120px;
        border-radius: var(--border-radius-full);
        background: linear-gradient(135deg, var(--color-xp), #1899d6);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 0 #1278a8, var(--shadow-lg);
        transition: all var(--transition-fast);
        animation: float 3s ease-in-out infinite;
      }

      .listen-play-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 9px 0 #1278a8, var(--shadow-xl);
      }

      .listen-play-btn:active {
        transform: translateY(4px);
        box-shadow: 0 2px 0 #1278a8;
      }

      .listen-play-icon {
        font-size: 3rem;
      }

      .listen-play-label {
        margin-top: var(--space-md);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .listen-slow-area {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .listen-slow-btn {
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-sm) var(--space-lg);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: var(--font-family);
        box-shadow: var(--shadow-button-secondary);
      }

      .listen-slow-btn:hover {
        border-color: var(--text-secondary);
      }

      .listen-slow-btn:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .listen-input-area {
        margin-bottom: var(--space-sm);
      }
    </style>
  `}function Xn(e){return`
    <div class="exercise-speak">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🗣️ Spune în germană</span>
      </div>

      <div class="speak-word-card card animate-scaleIn">
        <div class="speak-word-label">🇩🇪 Spune acest cuvânt:</div>
        <div class="speak-word-text">${e.word}</div>
        <div class="speak-word-translation">🇷🇴 ${e.translation}</div>
      </div>

      <div class="speak-hear-area animate-fadeIn" style="animation-delay: 0.1s;">
        <button class="speak-hear-btn" id="btn-hear-word">
          🔊 Ascultă mai întâi
        </button>
      </div>

      <div class="speak-record-area animate-fadeInUp" style="animation-delay: 0.2s;">
        <button class="speak-record-btn" id="btn-record">
          <span class="speak-record-icon">🎤</span>
          <span class="speak-record-label">Vorbește</span>
        </button>
        <p class="speak-record-hint">Apasă și spune cuvântul în germană</p>
      </div>

      <div class="speak-result hidden" id="speak-result"></div>
    </div>

    <style>
      .exercise-speak {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .speak-word-card {
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-lg);
      }

      .speak-word-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: var(--space-sm);
      }

      .speak-word-text {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
        margin-bottom: var(--space-sm);
        line-height: 1.2;
      }

      .speak-word-translation {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .speak-hear-area {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .speak-hear-btn {
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-md) var(--space-xl);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--color-xp);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: var(--font-family);
        box-shadow: var(--shadow-button-secondary);
      }

      .speak-hear-btn:hover {
        border-color: var(--color-xp);
        background: rgba(28, 176, 246, 0.05);
      }

      .speak-hear-btn:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .speak-record-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--space-lg);
      }

      .speak-record-btn {
        width: 140px;
        height: 140px;
        border-radius: var(--border-radius-full);
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
        box-shadow: 0 6px 0 var(--color-primary-dark), var(--shadow-lg);
        transition: all var(--transition-fast);
      }

      .speak-record-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 9px 0 var(--color-primary-dark), var(--shadow-xl);
      }

      .speak-record-btn:active {
        transform: translateY(4px);
        box-shadow: 0 2px 0 var(--color-primary-dark);
      }

      .speak-record-btn.recording {
        background: linear-gradient(135deg, var(--color-hearts), var(--color-hearts-dark));
        box-shadow: 0 6px 0 var(--color-hearts-dark), var(--shadow-lg);
        animation: pulse 1s infinite;
      }

      .speak-record-icon {
        font-size: 3rem;
      }

      .speak-record-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-extrabold);
        color: var(--text-inverse);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .speak-record-hint {
        margin-top: var(--space-md);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .speak-result {
        text-align: center;
        padding: var(--space-lg);
        background: var(--bg-secondary);
        border-radius: var(--border-radius-lg);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        animation: fadeInUp var(--transition-normal) forwards;
      }
    </style>
  `}function Zn(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Qn(e){let t=Zn(e.bank).map((e,t)=>`
      <button class="wb-tile card-interactive animate-fadeInUp" data-token="${e}" data-idx="${t}" style="animation-delay:${t*.04}s">
        ${e}
      </button>
    `).join(``);return`
    <div class="exercise-word-bank">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">📝 Scrie asta în română</span>
      </div>

      <div class="wb-prompt animate-fadeIn">
        <button class="wb-speaker" id="btn-wb-speak" aria-label="Ascultă">🔊</button>
        <span class="wb-prompt-text">${e.promptDe}</span>
      </div>

      <div class="wb-answer-row" id="wb-answer">
        <div class="wb-placeholder">Apasă cuvintele pentru a forma răspunsul</div>
      </div>

      <div class="wb-bank" id="wb-bank">${t}</div>

      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-wb-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-wb-check" disabled>VERIFICĂ</button>
      </div>
    </div>

    <style>
      .exercise-word-bank { padding: var(--space-md); }
      .wb-prompt {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); margin-bottom: var(--space-lg);
      }
      .wb-prompt-text {
        font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .wb-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .wb-speaker:active { transform: translateY(2px); box-shadow: none; }

      .wb-answer-row {
        min-height: 70px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-lg);
      }
      .wb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }

      .wb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-xl);
      }
      .wb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .wb-tile:active { transform: translateY(2px); box-shadow: none; }
      .wb-tile.wb-used { opacity: 0; pointer-events: none; }

      .wb-chip {
        background: var(--color-xp-bg, #e0f2fe); border: 2px solid var(--color-xp);
        border-radius: var(--border-radius-md); padding: 10px 16px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; font-family: var(--font-family);
      }

      .exercise-actions {
        display: flex; gap: var(--space-md); justify-content: space-between;
      }
      .exercise-actions .btn { flex: 1; }
      .exercise-actions .btn[disabled] { opacity: 0.5; pointer-events: none; }
    </style>
  `}function $n(e){let t=e.options.map((e,t)=>{let n=C(e)||`🎴`;return`
        <button class="pp-card card-interactive animate-fadeInUp"
                data-value="${e}"
                style="animation-delay:${t*.08}s">
          <span class="pp-emoji">${n}</span>
          <span class="pp-label">${e}</span>
          <span class="pp-index">${t+1}</span>
        </button>
      `}).join(``);return`
    <div class="exercise-picture-pick">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🖼️ Alege imaginea</span>
      </div>

      <div class="pp-prompt animate-fadeIn">
        <button class="pp-speaker" id="btn-pp-speak" aria-label="Ascultă">🔊</button>
        <span class="pp-prompt-text">${e.wordDe}</span>
      </div>

      <div class="pp-grid">${t}</div>
    </div>

    <style>
      .exercise-picture-pick { padding: var(--space-md); }

      .pp-prompt {
        display: flex; align-items: center; justify-content: center;
        gap: var(--space-md); margin-bottom: var(--space-xl);
      }
      .pp-prompt-text {
        font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .pp-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 48px; height: 48px; border-radius: 50%;
        font-size: 22px; cursor: pointer;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .pp-speaker:active { transform: translateY(2px); box-shadow: none; }

      .pp-grid {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md);
      }
      .pp-card {
        position: relative;
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-lg) var(--space-md);
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm); cursor: pointer;
        box-shadow: var(--shadow-button-secondary);
        transition: all var(--transition-fast);
        font-family: var(--font-family);
      }
      .pp-card:active { transform: translateY(3px); box-shadow: none; }
      .pp-emoji { font-size: 56px; line-height: 1; }
      .pp-label {
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .pp-index {
        position: absolute; bottom: 8px; right: 10px;
        font-size: var(--font-size-xs); color: var(--text-muted);
        background: var(--bg-secondary); border-radius: 4px;
        padding: 1px 6px;
      }

      .pp-card.pp-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important;
      }
      .pp-card.pp-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s;
      }
      .pp-card.pp-disabled { pointer-events: none; }

      @media (max-width: 480px) {
        .pp-grid { grid-template-columns: repeat(2, 1fr); }
        .pp-emoji { font-size: 44px; }
      }
    </style>
  `}function er(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function tr(e){let t=e.characters,n=e.lines.map((e,n)=>{let r=t[e.who]||t[0],i=e.who===0?`left`:`right`;return e.blank?`
        <div class="dlg-line dlg-${i} dlg-blank" data-line="${n}">
          <span class="dlg-avatar">${r.emoji}</span>
          <div class="dlg-bubble">
            <span class="dlg-name">${r.name}</span>
            <span class="dlg-bubble-text dlg-dots">…</span>
            <span class="dlg-ro">${e.ro}</span>
          </div>
        </div>
      `:`
      <div class="dlg-line dlg-${i}" data-line="${n}">
        <span class="dlg-avatar">${r.emoji}</span>
        <div class="dlg-bubble">
          <span class="dlg-name">${r.name}</span>
          <span class="dlg-bubble-text">${e.de}</span>
          <span class="dlg-ro">${e.ro}</span>
        </div>
      </div>
    `}).join(``),r=``;return e.mode===`multiChoice`?(r=er(e.options).map(e=>`
        <button class="dlg-option mc-option card-interactive" data-value="${e}">${e}</button>
      `).join(``),r=`<div class="dlg-options">${r}</div>`):r=`
      <div class="wb-answer-row" id="dlg-answer">
        <div class="wb-placeholder">Formează replica lipsă din cuvinte</div>
      </div>
      <div class="wb-bank" id="dlg-bank">${er(e.bank).map((e,t)=>`
        <button class="wb-tile card-interactive" data-token="${e}" data-idx="${t}">${e}</button>
      `).join(``)}</div>
      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-dlg-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-dlg-check" disabled>VERIFICĂ</button>
      </div>
    `,`
    <div class="exercise-dialogue">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">💬 Completează conversația</span>
        ${e.scene?`<span class="dlg-scene">📍 ${e.scene}</span>`:``}
      </div>

      <div class="dlg-chat">${n}</div>

      <div class="dlg-interact" id="dlg-interact">${r}</div>
    </div>

    <style>
      .exercise-dialogue { padding: var(--space-md); }
      .dlg-scene {
        display: inline-block; margin-left: var(--space-sm);
        font-size: var(--font-size-xs); color: var(--text-secondary);
        background: var(--bg-secondary); border-radius: 999px;
        padding: 4px 12px; font-weight: var(--font-weight-bold);
      }

      .dlg-chat {
        display: flex; flex-direction: column; gap: var(--space-md);
        margin: var(--space-lg) 0;
      }
      .dlg-line {
        display: flex; align-items: flex-end; gap: var(--space-sm);
        opacity: 0; transform: translateY(12px) scale(0.96);
        transition: opacity 0.4s ease, transform 0.4s ease;
      }
      .dlg-line.dlg-shown { opacity: 1; transform: none; }
      .dlg-right { flex-direction: row-reverse; }

      .dlg-avatar {
        font-size: 36px; line-height: 1; flex-shrink: 0;
      }
      .dlg-bubble {
        display: flex; flex-direction: column; gap: 2px;
        max-width: 78%;
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: 18px; padding: var(--space-sm) var(--space-md);
        box-shadow: var(--shadow-sm);
      }
      .dlg-left .dlg-bubble { border-bottom-left-radius: 4px; }
      .dlg-right .dlg-bubble {
        border-bottom-right-radius: 4px;
        background: var(--color-success-bg);
      }
      .dlg-name {
        font-size: var(--font-size-xs); font-weight: var(--font-weight-bold);
        color: var(--text-muted);
      }
      .dlg-bubble-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .dlg-ro {
        font-size: var(--font-size-xs); color: var(--text-secondary); font-style: italic;
      }
      .dlg-blank .dlg-bubble { border-style: dashed; border-color: var(--color-xp); }
      .dlg-dots {
        animation: dlgPulse 1.2s ease-in-out infinite;
        letter-spacing: 3px;
      }
      .dlg-filled .dlg-bubble {
        border-style: solid; border-color: var(--color-success);
        background: var(--color-success-bg);
        animation: dlgPop 0.4s ease;
      }
      @keyframes dlgPulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 1; }
      }
      @keyframes dlgPop {
        0% { transform: scale(0.92); }
        60% { transform: scale(1.04); }
        100% { transform: scale(1); }
      }

      .dlg-interact {
        opacity: 0; transition: opacity 0.4s ease;
        pointer-events: none;
      }
      .dlg-interact.dlg-shown { opacity: 1; pointer-events: auto; }

      .dlg-options { display: flex; flex-direction: column; gap: var(--space-sm); }
      .dlg-option {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); padding: var(--space-md);
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; text-align: center;
        box-shadow: 0 3px 0 var(--border-color);
        font-family: var(--font-family);
        transition: transform 0.1s;
      }
      .dlg-option:active { transform: translateY(2px); box-shadow: none; }
      .dlg-option.mc-correct { border-color: var(--color-success); background: var(--color-success-bg); }
      .dlg-option.mc-wrong { border-color: var(--color-error); background: var(--color-error-bg); animation: shake 0.5s; }
      .dlg-option.mc-disabled { pointer-events: none; }

      /* piese word-bank (stil propriu — wordBank.js își injectează stilurile doar
         când e randat el) */
      .exercise-dialogue .wb-answer-row {
        min-height: 60px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-md);
      }
      .exercise-dialogue .wb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }
      .exercise-dialogue .wb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-lg);
      }
      .exercise-dialogue .wb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .exercise-dialogue .wb-tile:active { transform: translateY(2px); box-shadow: none; }
      .exercise-dialogue .wb-tile.wb-used { opacity: 0; pointer-events: none; }
      .exercise-dialogue .wb-chip {
        background: var(--color-xp-bg, #e0f2fe); border: 2px solid var(--color-xp);
        border-radius: var(--border-radius-md); padding: 10px 16px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; font-family: var(--font-family);
      }
      .exercise-dialogue .exercise-actions {
        display: flex; gap: var(--space-md); justify-content: space-between;
      }
      .exercise-dialogue .exercise-actions .btn { flex: 1; }
      .exercise-dialogue .exercise-actions .btn[disabled] { opacity: 0.5; pointer-events: none; }
    </style>
  `}function nr(e){return`
    <div class="exercise-listen-choice">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🔊 Ascultă și alege</span>
      </div>

      <div class="lc-speaker-wrap animate-fadeIn">
        <button class="lc-speaker" id="btn-lc-speak" aria-label="Ascultă din nou">🔊</button>
        <p class="lc-hint">Apasă difuzorul ca să auzi din nou</p>
      </div>

      <div class="lc-options-grid">
        ${e.options.map((e,t)=>`
      <button class="lc-option card card-interactive animate-fadeInUp"
              data-value="${e}"
              style="animation-delay: ${t*.08}s;">
        <span class="lc-option-letter">${String.fromCharCode(65+t)}</span>
        <span class="lc-option-text">${e}</span>
      </button>
    `).join(``)}
      </div>
    </div>

    <style>
      .exercise-listen-choice { padding: var(--space-md); }

      .lc-speaker-wrap {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm); margin-bottom: var(--space-xl);
      }
      .lc-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 96px; height: 96px; border-radius: 50%;
        font-size: 44px; cursor: pointer;
        box-shadow: 0 4px 0 rgba(0,0,0,0.15);
        transition: transform var(--transition-fast);
      }
      .lc-speaker:active { transform: translateY(3px); box-shadow: none; }
      .lc-hint { font-size: var(--font-size-sm); color: var(--text-muted); }

      .lc-options-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);
      }
      .lc-option {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-lg) var(--space-md); min-height: 72px;
        text-align: left; cursor: pointer;
        transition: all var(--transition-fast);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        background: var(--bg-card); box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family);
      }
      .lc-option:active { transform: translateY(3px); box-shadow: none; }
      .lc-option-letter {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: var(--border-radius-full);
        background: var(--bg-secondary); border: 2px solid var(--border-color);
        font-size: var(--font-size-sm); font-weight: var(--font-weight-bold);
        color: var(--text-secondary); flex-shrink: 0;
      }
      .lc-option-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      .lc-option.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important; box-shadow: none;
      }
      .lc-option.mc-correct .lc-option-letter {
        background: var(--color-success); border-color: var(--color-success);
        color: var(--text-inverse);
      }
      .lc-option.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s; box-shadow: none;
      }
      .lc-option.mc-wrong .lc-option-letter {
        background: var(--color-error); border-color: var(--color-error);
        color: var(--text-inverse);
      }
      .lc-option.mc-disabled { pointer-events: none; opacity: 0.7; }
      .lc-option.mc-disabled.mc-correct, .lc-option.mc-disabled.mc-wrong { opacity: 1; }

      @media (max-width: 400px) {
        .lc-options-grid { grid-template-columns: 1fr; }
      }
    </style>
  `}function rr(e){return`
    <div class="exercise-true-false">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🤔 Adevărat sau fals?</span>
      </div>

      <div class="tf-card animate-fadeIn">
        <div class="tf-de">
          <button class="tf-speaker" id="btn-tf-speak" aria-label="Ascultă">🔊</button>
          <span class="tf-de-text">${e.de}</span>
        </div>
        <span class="tf-equals">=</span>
        <span class="tf-ro-text">${e.ro}</span>
      </div>

      <div class="tf-buttons">
        <button class="tf-btn tf-true card-interactive animate-fadeInUp" data-value="true">
          <span class="tf-btn-icon">✅</span>
          <span class="tf-btn-label">Adevărat</span>
        </button>
        <button class="tf-btn tf-false card-interactive animate-fadeInUp" data-value="false" style="animation-delay: 0.08s;">
          <span class="tf-btn-icon">❌</span>
          <span class="tf-btn-label">Fals</span>
        </button>
      </div>
    </div>

    <style>
      .exercise-true-false { padding: var(--space-md); }

      .tf-card {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-sm);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-xl) var(--space-lg);
        margin-bottom: var(--space-xl);
      }
      .tf-de { display: flex; align-items: center; gap: var(--space-md); }
      .tf-de-text {
        font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .tf-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .tf-speaker:active { transform: translateY(2px); box-shadow: none; }
      .tf-equals { font-size: var(--font-size-xl); color: var(--text-muted); }
      .tf-ro-text {
        font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);
        color: var(--color-secondary);
      }

      .tf-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
      .tf-btn {
        display: flex; flex-direction: column; align-items: center; gap: var(--space-xs);
        padding: var(--space-lg); min-height: 96px; cursor: pointer;
        border: 2px solid var(--border-color); border-radius: var(--border-radius-lg);
        background: var(--bg-card); box-shadow: var(--shadow-button-secondary);
        font-family: var(--font-family); transition: all var(--transition-fast);
      }
      .tf-btn:active { transform: translateY(3px); box-shadow: none; }
      .tf-btn-icon { font-size: 40px; line-height: 1; }
      .tf-btn-label {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }

      .tf-btn.mc-correct {
        border-color: var(--color-success) !important;
        background: var(--color-success-bg) !important; box-shadow: none;
      }
      .tf-btn.mc-wrong {
        border-color: var(--color-error) !important;
        background: var(--color-error-bg) !important;
        animation: shake 0.5s; box-shadow: none;
      }
      .tf-btn.mc-disabled { pointer-events: none; opacity: 0.7; }
      .tf-btn.mc-disabled.mc-correct, .tf-btn.mc-disabled.mc-wrong { opacity: 1; }
    </style>
  `}function ir(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function ar(e){return`
    <div class="exercise-sort-categories">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🗂️ Sortează pe categorii</span>
      </div>

      <p class="sc-instruction animate-fadeIn">Atinge un cuvânt, apoi coșul potrivit</p>

      <div class="sc-pool" id="sc-pool">${ir(e.items).map((e,t)=>`
      <button class="sc-item card-interactive animate-fadeInUp"
              data-de="${e.de}" data-cat="${e.cat}" style="animation-delay:${t*.05}s">
        ${e.de}
      </button>
    `).join(``)}</div>

      <div class="sc-buckets">${e.categories.map(e=>`
      <div class="sc-bucket" data-cat="${e.id}">
        <div class="sc-bucket-label">${e.label}</div>
        <div class="sc-bucket-drop" data-cat="${e.id}"></div>
      </div>
    `).join(``)}</div>
    </div>

    <style>
      .exercise-sort-categories { padding: var(--space-md); }
      .sc-instruction {
        text-align: center; color: var(--text-secondary);
        font-size: var(--font-size-md); margin-bottom: var(--space-lg);
      }

      .sc-pool {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; min-height: 56px; margin-bottom: var(--space-xl);
      }
      .sc-item {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s;
        font-family: var(--font-family);
      }
      .sc-item:active { transform: translateY(2px); box-shadow: none; }
      .sc-item.sc-selected {
        border-color: var(--color-xp); background: var(--color-xp-bg, #e0f2fe);
        transform: translateY(-2px);
      }
      .sc-item.sc-placed { opacity: 0; pointer-events: none; }

      .sc-buckets {
        display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);
      }
      .sc-bucket {
        display: flex; flex-direction: column; gap: var(--space-sm);
        background: var(--bg-secondary); border: 2px dashed var(--border-color);
        border-radius: var(--border-radius-lg); padding: var(--space-md);
        min-height: 140px; cursor: pointer;
        transition: all var(--transition-fast);
      }
      .sc-bucket.sc-bucket-active {
        border-color: var(--color-xp); border-style: solid;
        background: var(--color-xp-bg, #e0f2fe);
      }
      .sc-bucket.sc-bucket-wrong { animation: shake 0.5s; border-color: var(--color-error); }
      .sc-bucket-label {
        text-align: center; font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold); color: var(--text-primary);
      }
      .sc-bucket-drop {
        display: flex; flex-wrap: wrap; gap: var(--space-xs);
        align-content: flex-start; flex: 1;
      }
      .sc-chip {
        background: var(--color-success-bg); border: 2px solid var(--color-success);
        border-radius: var(--border-radius-md); padding: 6px 12px;
        font-size: var(--font-size-sm); font-weight: var(--font-weight-bold);
        color: var(--text-primary); font-family: var(--font-family);
        animation: fadeInUp 0.3s;
      }
    </style>
  `}function or(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function sr(e){let t=or(e.bank).map((e,t)=>`
      <button class="sb-tile card-interactive animate-fadeInUp" data-token="${e}" style="animation-delay:${t*.04}s">
        ${e}
      </button>
    `).join(``);return`
    <div class="exercise-sentence-build">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">✍️ Scrie asta în germană</span>
      </div>

      <div class="sb-prompt animate-fadeIn">
        <button class="sb-speaker" id="btn-sb-speak" aria-label="Ascultă în germană">🔊</button>
        <span class="sb-prompt-text">${e.promptRo}</span>
      </div>

      <div class="sb-answer-row" id="sb-answer">
        <div class="sb-placeholder">Apasă cuvintele pentru a forma propoziția</div>
      </div>

      <div class="sb-bank" id="sb-bank">${t}</div>

      <div class="exercise-actions">
        <button class="btn btn-secondary" id="btn-sb-clear">↶ Șterge</button>
        <button class="btn btn-primary" id="btn-sb-check" disabled>VERIFICĂ</button>
      </div>
    </div>

    <style>
      .exercise-sentence-build { padding: var(--space-md); }
      .sb-prompt {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg); margin-bottom: var(--space-lg);
      }
      .sb-prompt-text {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary); line-height: 1.35;
      }
      .sb-speaker {
        background: var(--color-xp); color: white; border: none;
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 20px; cursor: pointer; flex-shrink: 0;
        box-shadow: 0 3px 0 rgba(0,0,0,0.15);
      }
      .sb-speaker:active { transform: translateY(2px); box-shadow: none; }

      .sb-answer-row {
        min-height: 70px; padding: var(--space-md);
        border-bottom: 2px solid var(--border-color);
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        align-items: center; margin-bottom: var(--space-lg);
      }
      .sb-placeholder {
        color: var(--text-muted); font-style: italic; font-size: var(--font-size-sm);
      }

      .sb-bank {
        display: flex; flex-wrap: wrap; gap: var(--space-sm);
        justify-content: center; margin-bottom: var(--space-xl);
      }
      .sb-tile {
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-md); padding: 12px 18px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer;
        box-shadow: 0 3px 0 var(--border-color);
        transition: transform 0.1s, opacity 0.2s; font-family: var(--font-family);
      }
      .sb-tile:active { transform: translateY(2px); box-shadow: none; }
      .sb-tile.sb-used { opacity: 0; pointer-events: none; }

      .sb-chip {
        background: var(--color-xp-bg, #e0f2fe); border: 2px solid var(--color-xp);
        border-radius: var(--border-radius-md); padding: 10px 16px;
        font-size: var(--font-size-md); font-weight: var(--font-weight-bold);
        color: var(--text-primary); cursor: pointer; font-family: var(--font-family);
      }

      .exercise-actions {
        display: flex; gap: var(--space-md); justify-content: space-between;
      }
      .exercise-actions .btn { flex: 1; }
      .exercise-actions .btn[disabled] { opacity: 0.5; pointer-events: none; }
    </style>
  `}var W=0,cr=0,lr=0,G=0,K=null,q=!1,J=0,Y=3;function ur(e,t){let n=Dn(t);return n?(K=n,W=0,cr=0,lr=0,G=0,q=!1,J=0,dr(e)):(e(`home`),`<p>Lecția nu a fost găsită.</p>`)}function dr(e){let t=K,n=t.exercises[W],r=W/t.exercises.length*100,i=``;switch(n.type){case`multiChoice`:i=Wn(n);break;case`translate_ro_de`:case`translate_de_ro`:i=Gn(n);break;case`match`:i=qn(n);break;case`fillBlank`:i=Jn(n);break;case`listen`:i=Yn(n);break;case`speak`:i=Xn(n);break;case`wordBank`:i=Qn(n);break;case`picturePick`:i=$n(n);break;case`dialogue`:i=tr(n);break;case`listenChoice`:i=nr(n);break;case`trueFalse`:i=rr(n);break;case`sortCategories`:i=ar(n);break;case`sentenceBuild`:i=sr(n);break;default:i=`<p>Tip necunoscut: ${n.type}</p>`}let a=W>0&&W%4==0&&G>=2;return`
    <div class="lesson-screen">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <button class="lesson-close-btn" id="btn-close-lesson">✕</button>
        <div class="progress-bar-container" style="flex: 1;">
          <div class="progress-bar-fill" style="width: ${r}%;"></div>
        </div>
      </div>

      <!-- Lesson Title -->
      <div class="lesson-title-bar">
        <span class="lesson-title-text">${t.icon} ${t.title}</span>
        <span class="lesson-counter">${W+1}/${t.exercises.length}</span>
      </div>

      ${a?`
        <div class="lesson-encouragement animate-fadeInDown">
          ${L(un)}
        </div>
      `:``}

      <!-- Exercise Area -->
      <div class="exercise-area animate-fadeInUp" id="exercise-area">
        ${i}
      </div>

      <!-- Feedback Area (hidden by default) -->
      <div class="feedback-area hidden" id="feedback-area"></div>
    </div>
  `}function fr(e,t){let n=K||Dn(t);if(!n)return;document.getElementById(`btn-close-lesson`)?.addEventListener(`click`,()=>{confirm(`Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.`)&&e(`home`)});let r=n.exercises[W];pr(r,e,t)}function pr(e,t,n){switch(e.type){case`multiChoice`:br(e,t,n);break;case`translate_ro_de`:case`translate_de_ro`:xr(e,t,n);break;case`match`:Tr(e,t,n);break;case`fillBlank`:Cr(e,t,n);break;case`listen`:Er(e,t,n);break;case`speak`:Or(e,t,n);break;case`wordBank`:vr(e,t,n);break;case`picturePick`:yr(e,t,n);break;case`dialogue`:kr(e,t,n);break;case`listenChoice`:mr(e,t,n);break;case`trueFalse`:hr(e,t,n);break;case`sortCategories`:gr(e,t,n);break;case`sentenceBuild`:_r(e,t,n);break}}function mr(e,t,n){document.getElementById(`btn-lc-speak`)?.addEventListener(`click`,()=>V(e.word)),setTimeout(()=>V(e.word),400),document.querySelectorAll(`.lc-option`).forEach(r=>{r.addEventListener(`click`,()=>{if(q)return;let i=r.dataset.value,a=i===e.correct;document.querySelectorAll(`.lc-option`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===e.correct&&t.classList.add(`mc-correct`),t.dataset.value===i&&!a&&t.classList.add(`mc-wrong`)}),Z(a,e.correct,t,n)})})}function hr(e,t,n){document.getElementById(`btn-tf-speak`)?.addEventListener(`click`,()=>V(e.de)),setTimeout(()=>V(e.de),400);let r=e.isTrue?`Adevărat ✅`:`Fals — ${e.de} = ${e.correct}`;document.querySelectorAll(`.tf-btn`).forEach(i=>{i.addEventListener(`click`,()=>{if(q)return;let a=i.dataset.value===`true`===e.isTrue;document.querySelectorAll(`.tf-btn`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===`true`===e.isTrue&&t.classList.add(`mc-correct`),t===i&&!a&&t.classList.add(`mc-wrong`)}),Z(a,r,t,n)})})}function gr(e,t,n){let r=e.items.length,i=0,a=null,o=()=>{document.querySelectorAll(`.sc-item.sc-selected`).forEach(e=>e.classList.remove(`sc-selected`)),document.querySelectorAll(`.sc-bucket-active`).forEach(e=>e.classList.remove(`sc-bucket-active`)),a=null};document.querySelectorAll(`.sc-item`).forEach(e=>{e.addEventListener(`click`,()=>{if(!(q||e.classList.contains(`sc-placed`))){if(a?.el===e){o();return}o(),e.classList.add(`sc-selected`),a={el:e,de:e.dataset.de,cat:e.dataset.cat},document.querySelectorAll(`.sc-bucket`).forEach(e=>e.classList.add(`sc-bucket-active`))}})}),document.querySelectorAll(`.sc-bucket`).forEach(e=>{e.addEventListener(`click`,()=>{if(!(q||!a))if(e.dataset.cat===a.cat){let s=document.createElement(`span`);s.className=`sc-chip`,s.textContent=a.de,e.querySelector(`.sc-bucket-drop`)?.appendChild(s),a.el.classList.add(`sc-placed`),U(`click`),o(),i++,i===r&&setTimeout(()=>Z(!0,``,t,n),400)}else e.classList.add(`sc-bucket-wrong`),U(`wrong`),setTimeout(()=>e.classList.remove(`sc-bucket-wrong`),600)})})}function _r(e,t,n){let r=document.getElementById(`sb-answer`),i=document.getElementById(`sb-bank`),a=document.getElementById(`btn-sb-check`),o=document.getElementById(`btn-sb-clear`),s=r?.querySelector(`.sb-placeholder`);document.getElementById(`btn-sb-speak`)?.addEventListener(`click`,()=>V(e.answer));let c=[],l=()=>{s&&(s.style.display=c.length===0?``:`none`),a&&(a.disabled=c.length===0)},u=(e,t)=>{if(q)return;let n=c.findIndex(e=>e.tileEl===t);n>=0&&c.splice(n,1),e.remove(),t.classList.remove(`sb-used`),l()},d=(e,t)=>{if(q)return;c.push({token:e,tileEl:t}),t.classList.add(`sb-used`);let n=document.createElement(`button`);n.className=`sb-chip animate-fadeInUp`,n.textContent=e,n.addEventListener(`click`,()=>u(n,t)),r?.appendChild(n),l()};i?.querySelectorAll(`.sb-tile`).forEach(e=>{e.addEventListener(`click`,()=>d(e.dataset.token,e))}),o?.addEventListener(`click`,()=>{q||(c.splice(0).forEach(e=>e.tileEl.classList.remove(`sb-used`)),r?.querySelectorAll(`.sb-chip`).forEach(e=>e.remove()),l())}),a?.addEventListener(`click`,()=>{q||c.length===0||(S(c.map(e=>e.token).join(` `))===S(e.answer)?Z(!0,e.answer,t,n):X(e,e.answer,t,n))})}function vr(e,t,n){let r=document.getElementById(`wb-answer`),i=document.getElementById(`wb-bank`),a=document.getElementById(`btn-wb-check`),o=document.getElementById(`btn-wb-clear`),s=r?.querySelector(`.wb-placeholder`);document.getElementById(`btn-wb-speak`)?.addEventListener(`click`,()=>V(e.promptDe)),setTimeout(()=>V(e.promptDe),400);let c=[],l=()=>{s&&(s.style.display=c.length===0?``:`none`),a&&(a.disabled=c.length===0)},u=(e,t)=>{if(q)return;c.push({token:e,tileEl:t}),t.classList.add(`wb-used`);let n=document.createElement(`button`);n.className=`wb-chip animate-fadeInUp`,n.textContent=e,n.addEventListener(`click`,()=>d(n,t)),r.appendChild(n),l()},d=(e,t)=>{if(q)return;let n=c.findIndex(e=>e.tileEl===t);n>=0&&c.splice(n,1),e.remove(),t.classList.remove(`wb-used`),l()};i?.querySelectorAll(`.wb-tile`).forEach(e=>{e.addEventListener(`click`,()=>u(e.dataset.token,e))}),o?.addEventListener(`click`,()=>{q||(c.splice(0).forEach(e=>e.tileEl.classList.remove(`wb-used`)),r.querySelectorAll(`.wb-chip`).forEach(e=>e.remove()),l())}),a?.addEventListener(`click`,()=>{q||c.length===0||(S(c.map(e=>e.token).join(` `))===S(e.answer)?Z(!0,e.answer,t,n):X(e,e.answer,t,n))})}function yr(e,t,n){document.getElementById(`btn-pp-speak`)?.addEventListener(`click`,()=>V(e.wordDe)),setTimeout(()=>V(e.wordDe),400),document.querySelectorAll(`.pp-card`).forEach(r=>{r.addEventListener(`click`,()=>{if(q)return;let i=r.dataset.value,a=i===e.correct;document.querySelectorAll(`.pp-card`).forEach(t=>{t.classList.add(`pp-disabled`),t.dataset.value===e.correct&&t.classList.add(`pp-correct`),t.dataset.value===i&&!a&&t.classList.add(`pp-wrong`)}),Z(a,e.correct,t,n)})})}function br(e,t,n){document.querySelectorAll(`.mc-option`).forEach(r=>{r.addEventListener(`click`,()=>{if(q)return;let i=r.dataset.value,a=i===e.correct;Z(a,e.correct,t,n),document.querySelectorAll(`.mc-option`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===e.correct&&t.classList.add(`mc-correct`),t.dataset.value===i&&!a&&t.classList.add(`mc-wrong`)})})})}function xr(e,t,n){let r=document.getElementById(`translate-input`),i=document.getElementById(`btn-check-translate`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!q&&Sr(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{q||Sr(e,t,n)}),document.getElementById(`btn-speak-word`)?.addEventListener(`click`,()=>{V(e.type===`translate_de_ro`?e.prompt:e.answer)})}function Sr(e,t,n){let r=document.getElementById(`translate-input`);if(!r)return;let i=S(r.value),a=S(e.answer),o=(e.alts||[]).map(S);i===a||o.includes(i)?(r.classList.add(`input-success`),Z(!0,e.answer,t,n)):(r.classList.add(`input-error`),X(e,e.answer,t,n))}function Cr(e,t,n){let r=document.getElementById(`fillblank-input`),i=document.getElementById(`btn-check-fillblank`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!q&&wr(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{q||wr(e,t,n)})}function wr(e,t,n){let r=document.getElementById(`fillblank-input`);r&&(S(r.value)===S(e.answer)?(r.classList.add(`input-success`),Z(!0,e.answer,t,n)):(r.classList.add(`input-error`),X(e,e.answer,t,n)))}function Tr(e,t,n){let r=null,i=null,a=0,o=e.pairs.length;document.querySelectorAll(`.match-item`).forEach(s=>{s.addEventListener(`click`,()=>{if(s.classList.contains(`match-done`))return;let c=s.dataset.side,l=s.dataset.value,u=s.dataset.index;if(c===`left`?(document.querySelectorAll(`.match-item[data-side="left"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),r={value:l,index:u,el:s}):(document.querySelectorAll(`.match-item[data-side="right"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),i={value:l,index:u,el:s}),r&&i){let s=e.pairs[r.index];if(s&&s[1]===i.value)r.el.classList.add(`match-done`,`match-correct-anim`),i.el.classList.add(`match-done`,`match-correct-anim`),a++,U(`click`),a===o&&setTimeout(()=>Z(!0,``,t,n),500);else{let e=r.el,t=i.el;e.classList.add(`match-wrong-anim`),t.classList.add(`match-wrong-anim`),U(`wrong`),setTimeout(()=>{e.classList.remove(`match-selected`,`match-wrong-anim`),t.classList.remove(`match-selected`,`match-wrong-anim`)},1200)}r=null,i=null}})})}function Er(e,t,n){document.getElementById(`btn-play-audio`)?.addEventListener(`click`,()=>V(e.word)),document.getElementById(`btn-play-slow`)?.addEventListener(`click`,()=>{Pn(e.word)}),setTimeout(()=>V(e.word),500);let r=document.getElementById(`listen-input`),i=document.getElementById(`btn-check-listen`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!q&&Dr(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{q||Dr(e,t,n)})}function Dr(e,t,n){let r=document.getElementById(`listen-input`);r&&(S(r.value)===S(e.answer)?(r.classList.add(`input-success`),Z(!0,e.answer,t,n)):(r.classList.add(`input-error`),X(e,e.answer,t,n)))}function Or(e,t,n){document.getElementById(`btn-hear-word`)?.addEventListener(`click`,()=>V(e.word)),setTimeout(()=>V(e.word),500);let r=document.getElementById(`btn-record`),i=!1;r?.addEventListener(`click`,async()=>{if(!q&&!i){i=!0,r.classList.add(`recording`),r.innerHTML=`🔴 Ascult...`;try{let a=await In(`de-DE`);if(r.classList.remove(`recording`),r.innerHTML=`🎤 Încearcă din nou`,i=!1,a.length>0){let r=e.word.toLowerCase().replace(/[?.!,]/g,``).trim(),i=a.some(e=>{let t=e.transcript.replace(/[?.!,]/g,``).trim();return t===r||t.includes(r)||r.includes(t)}),o=document.getElementById(`speak-result`);o&&(o.innerHTML=`<p>Ai spus: "<strong>${a[0].transcript}</strong>"</p>`,o.classList.remove(`hidden`)),Z(i,e.word,t,n)}else{let e=document.getElementById(`speak-result`);e&&(e.innerHTML=`<p>Nu am auzit nimic. Încearcă din nou! 🎤</p>`,e.classList.remove(`hidden`))}}catch(e){console.error(`Speech recognition error:`,e),r.classList.remove(`recording`),r.innerHTML=`🎤 Încearcă din nou`,i=!1;let a=document.getElementById(`speak-result`);a&&(a.innerHTML=`
          <p>Recunoașterea vocală nu este disponibilă în acest browser. 😔</p>
          <button class="btn btn-secondary btn-sm" id="btn-skip-speak">Treci mai departe →</button>
        `,a.classList.remove(`hidden`),document.getElementById(`btn-skip-speak`)?.addEventListener(`click`,()=>{Z(!0,``,t,n)}))}}})}function kr(e,t,n){let r=e.lines,i=r.findIndex(e=>e.blank),a=r[i],o=Array.from(document.querySelectorAll(`.dlg-line`)),s=document.getElementById(`dlg-interact`),c=e=>new Promise(t=>setTimeout(t,e)),l=()=>o[0]?.isConnected,u=async(e,t)=>{for(let n=e;n<=t&&n<r.length;n++){if(!l())return;o[n]?.classList.add(`dlg-shown`),!r[n].blank&&r[n].de?(await V(r[n].de),await c(300)):await c(400)}};(async()=>{await c(400),await u(0,i),l()&&s?.classList.add(`dlg-shown`)})();let d=e=>{let t=o[i];if(t){let n=t.querySelector(`.dlg-bubble-text`);n&&(n.textContent=e),t.classList.remove(`dlg-blank`),t.classList.add(`dlg-filled`)}s&&(s.style.display=`none`),(async()=>{await V(e),await c(300),await u(i+1,r.length-1)})()};if(e.mode===`multiChoice`){document.querySelectorAll(`.dlg-option`).forEach(e=>{e.addEventListener(`click`,()=>{if(q)return;let r=e.dataset.value,i=S(r)===S(a.answer);document.querySelectorAll(`.dlg-option`).forEach(t=>{t.classList.add(`mc-disabled`),S(t.dataset.value)===S(a.answer)&&t.classList.add(`mc-correct`),t===e&&!i&&t.classList.add(`mc-wrong`)}),i&&d(a.answer),Z(i,a.answer,t,n)})});return}let f=document.getElementById(`dlg-answer`),p=document.getElementById(`btn-dlg-check`),m=document.getElementById(`btn-dlg-clear`),h=f?.querySelector(`.wb-placeholder`),g=[],_=()=>{h&&(h.style.display=g.length===0?``:`none`),p&&(p.disabled=g.length===0)},v=(e,t)=>{if(q)return;let n=g.findIndex(e=>e.tileEl===t);n>=0&&g.splice(n,1),e.remove(),t.classList.remove(`wb-used`),_()};document.querySelectorAll(`#dlg-bank .wb-tile`).forEach(e=>{e.addEventListener(`click`,()=>{if(q)return;g.push({token:e.dataset.token,tileEl:e}),e.classList.add(`wb-used`);let t=document.createElement(`button`);t.className=`wb-chip animate-fadeInUp`,t.textContent=e.dataset.token,t.addEventListener(`click`,()=>v(t,e)),f?.appendChild(t),_()})}),m?.addEventListener(`click`,()=>{q||(g.splice(0).forEach(e=>e.tileEl.classList.remove(`wb-used`)),f?.querySelectorAll(`.wb-chip`).forEach(e=>e.remove()),_())}),p?.addEventListener(`click`,()=>{q||g.length===0||(S(g.map(e=>e.token).join(` `))===S(a.answer)?(d(a.answer),Z(!0,a.answer,t,n)):X(e,a.answer,t,n))})}function Ar(e){let t=S(e),n=t.split(` `).filter(Boolean).length;return n===1?t.length<=6?3:4:n<=3?5:6}function jr(e,t,n){if(t>=n)return e;let r=e.length,i=e.indexOf(` `),a=i>0&&i<r-1,o=Math.max(1,n-1),s=.35+.5*((t-1)/o),c=Math.ceil(r*Math.min(.9,s));t===1&&a&&(c=Math.max(c,i)),c=Math.min(c,r-1),c=Math.max(1,c);let l=``;for(let t=0;t<r;t++){let n=e[t];t<c||n===` `||n===`-`||n===`'`?l+=n:l+=`_`}return l}function X(e,t,n,r){if(q=!0,_e(),J===0){Y=Ar(t),lr++,G=0,he({exercise:e,lessonId:K?.id||r.lessonId,timestamp:new Date().toISOString()});let n=e.word||e.prompt||e.correct;n&&yn(n,1)}J=Math.min(J+1,Y+1),U(`wrong`),Mr(e,t,J,n,r)}function Mr(e,t,n,r,i){let a=document.getElementById(`feedback-area`);if(!a)return;let o=n>=Y,s=jr(t,n,Y),c=o?`thinking`:`encouraging`,l=Math.min(n,Y),u=``;u=o?`
      <p class="feedback-answer">Răspunsul corect: <strong>${t}</strong></p>
      <p class="feedback-text">Scrie-l ca să continui — sau treci peste.</p>
    `:`
      <p class="feedback-text">Aproape! Iată un indiciu: <span class="hint-letters">${s}</span></p>
    `,a.innerHTML=`
    <div class="feedback-bar feedback-bar-wrong feedback-wrong">
      <div class="feedback-content">
        <div class="feedback-mascot">${R(c,`sm`)}</div>
        <div class="feedback-info">
          <p class="feedback-title">Încercare ${l}/${Y}</p>
          ${u}
        </div>
      </div>
      <button class="btn btn-danger btn-full" id="btn-try-again">ÎNCEARCĂ DIN NOU</button>
      ${o?`
        <button class="btn btn-secondary btn-full" id="btn-skip-exercise" style="margin-top: var(--space-sm);">
          Treci peste →
        </button>
      `:``}
    </div>
  `,a.classList.remove(`hidden`),document.getElementById(`btn-try-again`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),q=!1;let e=document.querySelector(`#translate-input, #fillblank-input, #listen-input`);e&&(e.value=``,e.classList.remove(`input-error`),e.focus()),Nr(s,l,o?t:null)}),document.getElementById(`btn-skip-exercise`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),Bn(L(an),`info`),Fr(r,i)})}function Nr(e,t,n){let r=document.getElementById(`exercise-area`);if(!r)return;let i=document.getElementById(`hint-box`);i||(i=document.createElement(`div`),i.id=`hint-box`,i.className=`hint-box animate-fadeInDown`,r.insertBefore(i,r.firstChild)),n?i.innerHTML=`
      <span class="hint-label">💡 Răspuns:</span>
      <span class="hint-text"><strong>${n}</strong></span>
    `:i.innerHTML=`
      <span class="hint-label">💡 Indiciu (${t}/${Y}):</span>
      <span class="hint-text">${e}</span>
    `}function Z(e,t,n,r){q=!0,_e();let i=K.exercises[W];if(e){cr++,J===0?G++:G=0,ge();let e=(J===0?10:Math.max(1,10-J*2))+(J===0&&G>=3?5:0);ce(e),i.word&&me(i.word),i.prompt&&me(i.prompt),i.correct&&me(i.correct);let a=i.word||i.prompt||i.correct;a&&yn(a,4),U(`correct`);let o=Math.random();o<.1&&G>=3?Rn(`high`):o<.3&&zn(3),Pr(!0,dn(),t,n,r),setTimeout(()=>Vn(e),500)}else{lr++,G=0,he({exercise:i,lessonId:K?.id||r.lessonId,timestamp:new Date().toISOString()});let e=i.word||i.prompt||i.correct;e&&yn(e,1),U(`wrong`),Pr(!1,L(rn),t,n,r)}}function Pr(e,t,n,r,i){let a=document.getElementById(`feedback-area`);if(!a)return;let o=hn(e,G);a.innerHTML=`
    <div class="feedback-bar ${e?`feedback-bar-correct`:`feedback-bar-wrong`} feedback-${e?`correct`:`wrong`}">
      <div class="feedback-content">
        <div class="feedback-mascot">
          ${R(o,`sm`)}
        </div>
        <div class="feedback-info">
          <p class="feedback-title">${e?`✅ Corect!`:`❌ Nu chiar...`}</p>
          <p class="feedback-text">${t}</p>
          ${!e&&n?`<p class="feedback-answer">Răspunsul corect: <strong>${n}</strong></p>`:``}
        </div>
      </div>
      <button class="btn ${e?`btn-primary`:`btn-danger`} btn-full" id="btn-continue">
        CONTINUĂ
      </button>
    </div>
  `,a.classList.remove(`hidden`),document.getElementById(`btn-continue`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),Fr(r,i)})}function Fr(e,t){if(W++,J=0,Y=3,W>=K.exercises.length)Ir(e,t);else{q=!1;let n=document.getElementById(`app`);n.innerHTML=dr(e),fr(e,t)}}function Ir(e,t){let n=K.exercises.length,r=Math.round(cr/n*100),i=fe(K.id,r,n);U(`complete`),Rn(r===100?`high`:`normal`),setTimeout(()=>{i.newBadges.forEach((e,t)=>{setTimeout(()=>Hn(e),t*1500)}),i.xpResult.leveledUp&&setTimeout(()=>Un(i.xpResult.level,oe(i.xpResult.level)),800)},1e3),e(`results`,{lessonId:t.lessonId,title:`${K.icon} ${K.title}`,lessonParams:t,score:r,stars:i.stars,correctCount:cr,totalExercises:n,xpGained:i.bonusXP,newBadges:i.newBadges})}function Lr(e,t){let{lessonId:n,score:r,stars:i,correctCount:a,totalExercises:o,xpGained:s,newBadges:c}=t,l=n?Ot(n):null,u=t.title||(l?`${l.icon} ${l.title}`:`Lecție`),d=fn(r),f=Array.from({length:3},(e,t)=>{let n=t<i,r=t===1?`64px`:`48px`,a=.3+t*.2;return`
      <span class="results-star ${n?`results-star-earned`:`results-star-empty`} animate-popIn"
            style="font-size: ${r}; animation-delay: ${a}s; opacity: 0;">
        ${n?`⭐`:`☆`}
      </span>
    `}).join(``),p=c&&c.length>0?`
    <div class="results-badges animate-fadeInUp" style="animation-delay: 1s;">
      <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
        🏅 Insigne noi deblocate!
      </h3>
      <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
        ${c.map(e=>`
          <div class="card animate-scaleIn" style="padding: var(--space-md); text-align: center; min-width: 120px;">
            <div style="font-size: 2rem; margin-bottom: var(--space-xs);">${e.icon}</div>
            <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--text-primary);">${e.name}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">${e.description}</div>
          </div>
        `).join(``)}
      </div>
    </div>
  `:``;return`
    <div class="results-screen" style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-xl) var(--space-lg);
      text-align: center;
      overflow-y: auto;
    ">
      <!-- Lesson Title -->
      <div class="animate-fadeInDown" style="margin-bottom: var(--space-md);">
        <span style="font-size: var(--font-size-sm); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-weight: var(--font-weight-bold);">
          Lecție completă
        </span>
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary); margin-top: var(--space-xs);">
          ${u}
        </h2>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="margin-bottom: var(--space-lg);">
        ${R(r===100?`celebrating`:r>=80?`excited`:r>=60?`happy`:`encouraging`,`xl`,d)}
      </div>

      <!-- Stars -->
      <div style="display: flex; align-items: flex-end; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-xl);">
        ${f}
      </div>

      <!-- Score Card -->
      <div class="card animate-fadeInUp" style="width: 100%; max-width: 360px; padding: var(--space-lg); animation-delay: 0.6s; margin-bottom: var(--space-lg);">
        <!-- Score Percentage -->
        <div style="margin-bottom: var(--space-lg);">
          <div style="font-size: var(--font-size-4xl); font-weight: var(--font-weight-extrabold); color: ${r>=80?`var(--color-primary)`:r>=60?`var(--color-accent)`:`var(--color-hearts)`};">
            ${r}%
          </div>
          <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">Scor</div>
        </div>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
          <!-- Correct Count -->
          <div style="
            background: var(--color-success-bg);
            border-radius: var(--border-radius-md);
            padding: var(--space-md);
          ">
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-primary);">
              ${a}/${o}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
              ✅ Corecte
            </div>
          </div>

          <!-- XP Earned -->
          <div style="
            background: rgba(28, 176, 246, 0.1);
            border-radius: var(--border-radius-md);
            padding: var(--space-md);
          ">
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-xp);">
              +${s}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
              ⭐ XP câștigat
            </div>
          </div>
        </div>
      </div>

      <!-- New Badges -->
      ${p}

      <!-- Action Buttons -->
      <div class="animate-fadeInUp" style="width: 100%; max-width: 360px; margin-top: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-md); animation-delay: 1.2s;">
        <button class="btn btn-primary btn-full btn-lg" id="btn-results-continue">
          🏠 Continuă
        </button>
        <button class="btn btn-secondary btn-full" id="btn-results-retry">
          🔄 Repetă lecția
        </button>
      </div>

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `}function Rr(e,t){setTimeout(()=>{Rn(t.score===100?`high`:`normal`)},300),setTimeout(()=>U(`complete`),100),document.getElementById(`btn-results-continue`)?.addEventListener(`click`,()=>{e(`home`)}),document.getElementById(`btn-results-retry`)?.addEventListener(`click`,()=>{e(`lesson`,t.lessonParams||{lessonId:t.lessonId})})}var zr=[{ro:`spital`,de:`Spital`,meaning:`hospital`,category:`sănătate`},{ro:`scandal`,de:`Skandal`,meaning:`scandal`,category:`general`},{ro:`rucksac`,de:`Rucksack`,meaning:`backpack`,category:`obiecte`},{ro:`șină`,de:`Schiene`,meaning:`rail/track`,category:`transport`},{ro:`cartof`,de:`Kartoffel`,meaning:`potato`,category:`mâncare`},{ro:`bere`,de:`Bier`,meaning:`beer`,category:`mâncare`},{ro:`dans`,de:`Tanz`,meaning:`dance`,category:`general`},{ro:`muzică`,de:`Musik`,meaning:`music`,category:`cultură`},{ro:`sport`,de:`Sport`,meaning:`sport`,category:`activități`},{ro:`telefon`,de:`Telefon`,meaning:`telephone`,category:`obiecte`},{ro:`hotel`,de:`Hotel`,meaning:`hotel`,category:`călătorii`},{ro:`restaurant`,de:`Restaurant`,meaning:`restaurant`,category:`mâncare`},{ro:`parc`,de:`Park`,meaning:`park`,category:`locuri`},{ro:`familie`,de:`Familie`,meaning:`family`,category:`oameni`},{ro:`universitate`,de:`Universitat`,meaning:`university`,category:`educație`},{ro:`profesor`,de:`Professor`,meaning:`professor`,category:`educație`},{ro:`student`,de:`Student`,meaning:`student`,category:`educație`},{ro:`natură`,de:`Natur`,meaning:`nature`,category:`natură`},{ro:`pasaport`,de:`Pass / Reisepass`,meaning:`passport`,category:`călătorii`},{ro:`ciocolată`,de:`Schokolade`,meaning:`chocolate`,category:`mâncare`},{ro:`lampă`,de:`Lampe`,meaning:`lamp`,category:`obiecte`},{ro:`clasă`,de:`Klasse`,meaning:`class`,category:`educație`},{ro:`mașină`,de:`Maschine`,meaning:`machine`,category:`obiecte`},{ro:`poliție`,de:`Polizei`,meaning:`police`,category:`general`},{ro:`banană`,de:`Banane`,meaning:`banana`,category:`mâncare`},{ro:`tomată`,de:`Tomate`,meaning:`tomato`,category:`mâncare`},{ro:`supă`,de:`Suppe`,meaning:`soup`,category:`mâncare`},{ro:`garaj`,de:`Garage`,meaning:`garage`,category:`locuri`},{ro:`balcon`,de:`Balkon`,meaning:`balcony`,category:`locuri`},{ro:`radio`,de:`Radio`,meaning:`radio`,category:`obiecte`}];function Br(){let e={};return zr.forEach(t=>{e[t.category]||(e[t.category]=[]),e[t.category].push(t)}),e}var Vr={sănătate:`🏥`,general:`📋`,obiecte:`🔧`,transport:`🚂`,mâncare:`🍽️`,cultură:`🎭`,activități:`⚽`,călătorii:`✈️`,locuri:`📍`,oameni:`👥`,educație:`📚`,natură:`🌿`};function Hr(e){let t=Br(),n=Object.keys(t),r=n.map((e,n)=>{let r=t[e],i=Vr[e]||`📂`,a=.2+n*.1,o=r.map(e=>`
      <div class="cognate-row" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-sm) var(--space-md);
        border-bottom: 1px solid var(--border-color);
        transition: background var(--transition-fast);
      ">
        <div style="display: flex; align-items: center; gap: var(--space-sm); flex: 1; min-width: 0;">
          <span style="
            font-weight: var(--font-weight-semibold);
            color: var(--text-primary);
            font-size: var(--font-size-md);
          ">${e.ro}</span>
          <span style="color: var(--text-muted); font-size: var(--font-size-sm);">→</span>
          <span style="
            font-weight: var(--font-weight-bold);
            color: var(--color-xp-dark);
            font-size: var(--font-size-md);
          ">${e.de}</span>
        </div>
        <button class="cognate-speak-btn" data-word="${e.de}" style="
          background: rgba(28, 176, 246, 0.1);
          border: none;
          border-radius: var(--border-radius-full);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        " title="Ascultă pronunția">
          🔊
        </button>
      </div>
    `).join(``);return`
      <div class="card animate-fadeInUp" style="animation-delay: ${a}s; padding: 0; overflow: hidden; margin-bottom: var(--space-md);">
        <div style="
          padding: var(--space-md) var(--space-lg);
          background: var(--bg-secondary);
          border-bottom: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        ">
          <span style="font-size: 1.3rem;">${i}</span>
          <h3 style="
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-bold);
            color: var(--text-primary);
            text-transform: capitalize;
          ">${e}</h3>
          <span class="badge badge-xp" style="margin-left: auto;">${r.length} cuvinte</span>
        </div>
        <div>
          ${o}
        </div>
      </div>
    `}).join(``);return`
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-cognates" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary); margin-bottom: var(--space-xs);">
          🇷🇴↔🇩🇪 Cuvinte Similare
        </h1>
        <p style="font-size: var(--font-size-md); color: var(--text-secondary); max-width: 400px; margin: 0 auto; line-height: 1.6;">
          Româna și germana au surprinzător de multe cuvinte care se aseamănă! Descoperă-le și vei vedea că germana e mai ușoară decât crezi! 🤩
        </p>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${R(`thinking`,`lg`,`Știai că româna și germana au multe cuvinte similare?`)}
      </div>

      <!-- Stats -->
      <div class="animate-fadeInUp" style="
        display: flex;
        justify-content: center;
        gap: var(--space-lg);
        margin-bottom: var(--space-xl);
        animation-delay: 0.1s;
      ">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-primary);">
            ${zr.length}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Cuvinte similare</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-extrabold); color: var(--color-secondary);">
            ${n.length}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Categorii</div>
        </div>
      </div>

      <!-- Categories -->
      ${r}

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `}function Ur(e){document.getElementById(`btn-back-cognates`)?.addEventListener(`click`,()=>{e(`home`)}),document.querySelectorAll(`.cognate-speak-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.word;n&&(e.style.transform=`scale(1.2)`,e.style.background=`rgba(28, 176, 246, 0.25)`,setTimeout(()=>{e.style.transform=`scale(1)`,e.style.background=`rgba(28, 176, 246, 0.1)`},300),V(n))})})}function Wr(e){let t=Math.round(e);if(t<60)return`${t} min`;let n=Math.floor(t/60),r=t%60;return r>0?`${n}h ${r}min`:`${n}h`}function Gr(e){let t=xe(),n=be();g();let r=l(),i=n.filter(e=>e.earned).length,a=t.level>3?`celebrating`:`happy`,o=t.level>3?`Ești un adevărat campion! 🏆`:`Continuă să înveți, ești minunat! 💛`,s=[{icon:`⭐`,label:`XP Total`,value:t.xp,color:`var(--color-xp)`},{icon:`🔥`,label:`Serie zilnică`,value:`${t.streak} zile`,color:`var(--color-streak)`},{icon:`📚`,label:`Cuvinte învățate`,value:t.wordsLearned,color:`var(--color-secondary)`},{icon:`🎯`,label:`Precizie`,value:`${t.accuracy}%`,color:`var(--color-primary)`},{icon:`✅`,label:`Lecții completate`,value:t.totalLessonsCompleted,color:`var(--color-primary-dark)`},{icon:`⏱️`,label:`Obiectiv zilnic`,value:`${t.dailyMinutes}/${t.dailyGoal} min`,color:`var(--color-accent)`},{icon:`⏳`,label:`Timp total de învățare`,value:Wr(t.totalMinutes),color:`var(--color-xp)`},{icon:`✏️`,label:`Răspunsuri date`,value:t.totalAttempts,color:`var(--color-secondary)`}].map((e,t)=>`
    <div class="card animate-fadeInUp" style="
      padding: var(--space-md);
      text-align: center;
      animation-delay: ${.3+t*.08}s;
    ">
      <div style="font-size: 1.5rem; margin-bottom: var(--space-xs);">${e.icon}</div>
      <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-extrabold); color: ${e.color};">
        ${e.value}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
        ${e.label}
      </div>
    </div>
  `).join(``),c=n.map((e,t)=>`
    <div class="card animate-fadeInUp" style="
      padding: var(--space-md);
      text-align: center;
      animation-delay: ${.6+t*.06}s;
      ${e.earned?`border-color: var(--color-accent-light);`:`opacity: 0.45; filter: grayscale(0.8);`}
    ">
      <div style="font-size: 2rem; margin-bottom: var(--space-xs); position: relative; display: inline-block;">
        ${e.icon}
        ${e.earned?``:`<span style="position: absolute; bottom: -2px; right: -6px; font-size: 0.8rem;">🔒</span>`}
      </div>
      <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--text-primary);">
        ${e.name}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px; line-height: 1.4;">
        ${e.description}
      </div>
      ${e.earned?`<div style="margin-top: var(--space-xs);"><span class="badge badge-xp" style="font-size: 0.65rem;">✅ Obținut</span></div>`:``}
    </div>
  `).join(``);return`
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-profile" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          ${r?`${r.avatar} ${r.name}`:`👤 Profilul Meu`}
        </h1>
        <button class="btn btn-secondary btn-sm" id="btn-profile-switch" style="margin-top: var(--space-sm); padding: 6px 14px;">
          👥 Schimbă profilul
        </button>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${R(a,`lg`,o)}
      </div>

      <!-- Level Progress -->
      <div class="card animate-fadeInUp" style="margin-bottom: var(--space-xl); animation-delay: 0.15s;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
          <div style="display: flex; align-items: center; gap: var(--space-sm);">
            <span class="badge badge-level" style="font-size: var(--font-size-sm); padding: 6px 14px;">
              Nivel ${t.level}
            </span>
            <span style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
              ${t.levelName}
            </span>
          </div>
        </div>
        <div class="progress-bar-container" style="height: 14px; margin-bottom: var(--space-sm);">
          <div class="progress-bar-fill" style="width: ${t.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); text-align: center;">
          ${t.xpProgress.current} / ${t.xpProgress.needed} XP pentru nivelul următor
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="animate-fadeInUp" style="animation-delay: 0.2s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
          📊 Statistici
        </h2>
      </div>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      ">
        ${s}
      </div>

      <!-- Badges Section -->
      <div class="animate-fadeInUp" style="animation-delay: 0.5s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          🏅 Insigne
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          ${i} din ${n.length} deblocate
        </p>
      </div>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      ">
        ${c}
      </div>

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `}function Kr(e){document.getElementById(`btn-back-profile`)?.addEventListener(`click`,()=>{e(`home`)}),document.getElementById(`btn-profile-switch`)?.addEventListener(`click`,()=>{e(`users`)})}var qr=[{value:5,label:`5 min`,emoji:`🌱`,desc:`Relaxat`},{value:10,label:`10 min`,emoji:`📚`,desc:`Normal`},{value:15,label:`15 min`,emoji:`💪`,desc:`Serios`},{value:20,label:`20 min`,emoji:`🔥`,desc:`Intens`}];function Jr(e){let t=g(),n=t.dailyGoalMinutes||10,r=t.theme===`dark`,i=qr.map(e=>`
    <label class="goal-option card-interactive" data-value="${e.value}" style="
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--border-radius-lg);
      border: 2px solid ${n===e.value?`var(--color-primary)`:`var(--border-color)`};
      background: ${n===e.value?`var(--color-success-bg)`:`var(--bg-card)`};
      cursor: pointer;
      transition: all var(--transition-fast);
      margin-bottom: var(--space-sm);
      box-shadow: var(--shadow-sm);
    ">
      <input type="radio" name="daily-goal" value="${e.value}"
        ${n===e.value?`checked`:``}
        style="display: none;">
      <span style="font-size: 1.5rem;">${e.emoji}</span>
      <div style="flex: 1;">
        <div style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
          ${e.label}
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">
          ${e.desc}
        </div>
      </div>
      <div style="
        width: 24px; height: 24px;
        border-radius: var(--border-radius-full);
        border: 2px solid ${n===e.value?`var(--color-primary)`:`var(--border-color)`};
        background: ${n===e.value?`var(--color-primary)`:`transparent`};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        flex-shrink: 0;
      ">
        ${n===e.value?`<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>`:``}
      </div>
    </label>
  `).join(``);return`
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-settings" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          ⚙️ Setări
        </h1>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${R(`happy`,`md`,`Personalizează-ți experiența!`)}
      </div>

      <!-- Daily Goal Section -->
      <div class="animate-fadeInUp" style="margin-bottom: var(--space-xl); animation-delay: 0.1s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          🎯 Obiectiv zilnic
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Cât timp vrei să înveți în fiecare zi?
        </p>
        <div id="goal-options-container">
          ${i}
        </div>
      </div>

      <!-- Dark Mode Section -->
      <div class="card animate-fadeInUp" style="
        margin-bottom: var(--space-xl);
        animation-delay: 0.2s;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div style="display: flex; align-items: center; gap: var(--space-md);">
          <span style="font-size: 1.5rem;">🌙</span>
          <div>
            <div style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
              Mod întunecat
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">
              Mai ușor pentru ochi seara
            </div>
          </div>
        </div>
        <label style="
          position: relative;
          width: 52px;
          height: 28px;
          flex-shrink: 0;
          cursor: pointer;
        ">
          <input type="checkbox" id="toggle-dark-mode"
            ${r?`checked`:``}
            style="opacity: 0; width: 0; height: 0; position: absolute;">
          <span style="
            position: absolute;
            inset: 0;
            background: ${r?`var(--color-primary)`:`var(--border-color)`};
            border-radius: 999px;
            transition: all var(--transition-normal);
          "></span>
          <span style="
            position: absolute;
            top: 2px;
            left: ${r?`26px`:`2px`};
            width: 24px;
            height: 24px;
            background: white;
            border-radius: var(--border-radius-full);
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-sm);
          "></span>
        </label>
      </div>

      <!-- Profil -->
      <div class="animate-fadeInUp" style="animation-delay: 0.25s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          👥 Profil
        </h2>
        <button class="btn btn-secondary btn-full" id="btn-change-user" style="margin-bottom: var(--space-sm);">
          🔄 Schimbă profilul
        </button>
      </div>

      <!-- Danger Zone -->
      <div class="animate-fadeInUp" style="animation-delay: 0.3s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-hearts); margin-bottom: var(--space-sm);">
          ⚠️ Zonă periculoasă
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Atenție! Aceste acțiuni afectează doar profilul activ și nu pot fi anulate.
        </p>
        <button class="btn btn-danger btn-full" id="btn-reset-progress" style="margin-bottom: var(--space-sm);">
          🗑️ Resetează progresul acestui profil
        </button>
        <button class="btn btn-danger btn-full" id="btn-delete-user">
          ❌ Șterge acest profil
        </button>
      </div>

      <!-- App Version -->
      <div class="animate-fadeIn" style="
        text-align: center;
        padding: var(--space-xl) 0;
        border-top: 1px solid var(--border-color);
        margin-top: auto;
      ">
        <p style="font-size: var(--font-size-xs); color: var(--text-muted);">
          Învățăm Germană · v1.0.0
        </p>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: var(--space-xs);">
          Făcut cu ❤️ pentru învățare
        </p>
      </div>
    </div>
  `}function Yr(e){document.getElementById(`btn-back-settings`)?.addEventListener(`click`,()=>{e(`home`)}),document.querySelectorAll(`.goal-option`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.value);t&&(de(t),document.querySelectorAll(`.goal-option`).forEach(e=>{let n=parseInt(e.dataset.value)===t;e.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,e.style.background=n?`var(--color-success-bg)`:`var(--bg-card)`;let r=e.querySelector(`div:last-child`);r&&(r.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,r.style.background=n?`var(--color-primary)`:`transparent`,r.innerHTML=n?`<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>`:``);let i=e.querySelector(`input[type="radio"]`);i&&(i.checked=n)}))})});let t=document.getElementById(`toggle-dark-mode`);t&&t.addEventListener(`change`,()=>{let e=t.checked;v({theme:e?`dark`:`light`}),document.documentElement.setAttribute(`data-theme`,e?`dark`:`light`);let n=t.nextElementSibling?.nextElementSibling;n&&(n.style.left=e?`26px`:`2px`);let r=t.nextElementSibling;r&&(r.style.background=e?`var(--color-primary)`:`var(--border-color)`)}),document.getElementById(`btn-change-user`)?.addEventListener(`click`,()=>{e(`users`)}),document.getElementById(`btn-reset-progress`)?.addEventListener(`click`,()=>{confirm(`⚠️ Ești absolut sigur?

Tot progresul ACESTUI profil va fi șters:
- XP și nivel
- Lecții completate
- Insigne câștigate
- Serie zilnică

Această acțiune NU poate fi anulată!`)&&confirm(`Ultima confirmare: chiar vrei să ștergi TOT progresul acestui profil?`)&&(ee(),document.documentElement.removeAttribute(`data-theme`),e(`home`))}),document.getElementById(`btn-delete-user`)?.addEventListener(`click`,()=>{let t=l();t&&confirm(`⚠️ Ștergi profilul „${t.name}" și tot progresul lui?`)&&confirm(`Ultima confirmare: profilul și progresul vor dispărea definitiv. Continui?`)&&(p(t.id),document.documentElement.removeAttribute(`data-theme`),e(`users`))})}function Xr(e){let t=g(),n=xn(),r=bn(),i=t.mistakes.slice(0,20),a=r.length>0,o=i.length>0;return`
    <div class="practice-screen">
      <button class="screen-back-btn" id="btn-back-practice">← Înapoi</button>
      <h1 class="screen-title">🔄 Hub de Practică</h1>
      <p class="screen-subtitle">Repetă cuvintele și corectează greșelile pentru a le fixa în memorie!</p>
      
      ${!a&&!o?`
        <div class="practice-empty animate-scaleIn">
          ${R(`happy`,`lg`,`Nu ai nimic de repetat acum! Completează lecții noi și revino mai târziu! 🌟`)}
          <p class="practice-empty-text">Cuvintele de repetat vor apărea aici automat.</p>
          <button class="btn btn-primary btn-full" id="btn-practice-home" style="margin-top: 24px;">
            🏠 Înapoi la lecții
          </button>
        </div>
      `:`
        <!-- Stats -->
        <div class="card" style="margin-bottom: var(--space-lg);">
          <div class="flex-between">
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Cuvinte de repetat</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-xp);">${n.dueForReview}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Cuvinte stăpânite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-primary);">${n.mastered}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Total urmărite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-secondary);">${n.totalTracked}</p>
            </div>
          </div>
        </div>
        
        ${a?`
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            📖 Cuvinte de repetat (${r.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${r.slice(0,15).map((e,t)=>`
              <div class="card animate-fadeInUp" style="animation-delay: ${t*.05}s; padding: var(--space-md); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <span style="font-weight: 800; font-size: var(--font-size-md);">${e.word}</span>
                  <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 8px;">
                    interval: ${e.interval} zile
                  </span>
                </div>
                <button class="speaker-btn-inline practice-speak-btn" data-word="${e.word}" style="background: none; border: none; font-size: 20px; cursor: pointer;">🔊</button>
              </div>
            `).join(``)}
          </div>
        `:``}
        
        ${o?`
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            ❌ Greșeli recente (${i.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${i.slice(0,10).map((e,t)=>{let n=e.exercise,r=n.lines?n.lines.find(e=>e.blank):null,i=n.prompt||n.question||n.word||n.sentence||n.promptDe||n.wordDe||(n.scene?`💬 ${n.scene}`:``)||``,a=n.answer||n.correct||r?.answer||``;return`
                <div class="card animate-fadeInUp" style="animation-delay: ${t*.05}s; padding: var(--space-md);">
                  <p style="font-weight: 700; font-size: var(--font-size-sm); color: var(--text-primary);">${i}</p>
                  <p style="font-size: var(--font-size-xs); color: var(--color-primary); margin-top: 4px;">
                    ✅ Răspuns corect: <strong>${a}</strong>
                  </p>
                </div>
              `}).join(``)}
          </div>
        `:``}
      `}
    </div>
  `}function Zr(e){document.getElementById(`btn-back-practice`)?.addEventListener(`click`,()=>e(`home`)),document.getElementById(`btn-practice-home`)?.addEventListener(`click`,()=>e(`home`)),document.querySelectorAll(`.practice-speak-btn`).forEach(e=>{e.addEventListener(`click`,()=>V(e.dataset.word))})}var Qr=[`👩`,`👨`,`👵`,`👴`,`🧑`,`👧`,`👦`,`🐱`,`🐶`,`🦊`,`🐻`,`🦉`];function $r(e){let t=c(),n=l(),r=t.map((e,t)=>{let r=m(e.id),i=n&&n.id===e.id;return`
      <div class="user-card card-interactive animate-fadeInUp ${i?`user-card-active`:``}"
           data-user-id="${e.id}" style="animation-delay: ${t*.08}s">
        <span class="user-card-avatar">${e.avatar}</span>
        <div class="user-card-info">
          <span class="user-card-name">${ei(e.name)}</span>
          <span class="user-card-stats">
            ⭐ Nivel ${r.level} · ${oe(r.level)} &nbsp; 🔥 ${r.streak} zile
          </span>
        </div>
        <button class="user-card-edit" data-edit-id="${e.id}" title="Redenumește" aria-label="Redenumește profilul">✏️</button>
        ${i?`<span class="user-card-check">✓</span>`:``}
      </div>
    `}).join(``),i=Qr.map((e,t)=>`
    <button class="avatar-option ${t===0?`avatar-selected`:``}" data-avatar="${e}">${e}</button>
  `).join(``);return`
    <div class="users-screen">
      <div class="animate-fadeInDown" style="text-align: center; margin: var(--space-xl) 0 var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          👥 Cine învață azi?
        </h1>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: var(--space-xs);">
          Alege-ți profilul sau creează unul nou
        </p>
      </div>

      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${R(`waving`,`md`)}
      </div>

      <div class="users-list">
        ${r||`<p style="text-align:center; color: var(--text-secondary);">Niciun profil încă — creează primul mai jos! 👇</p>`}
      </div>

      <div id="new-user-form" class="card animate-fadeInUp" style="display: none; margin-top: var(--space-lg);">
        <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
          ✨ Profil nou
        </h3>
        <input type="text" id="new-user-name" class="exercise-input" placeholder="Numele tău..."
               maxlength="24" autocomplete="off"
               style="width: 100%; margin-bottom: var(--space-md);">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-sm);">Alege un avatar:</p>
        <div class="avatar-grid">${i}</div>
        <button class="btn btn-primary btn-full" id="btn-create-user" style="margin-top: var(--space-md);">
          Începe să înveți! 🚀
        </button>
      </div>

      <button class="btn btn-secondary btn-full animate-fadeInUp" id="btn-show-new-user"
              style="margin-top: var(--space-lg); animation-delay: 0.2s;">
        ➕ Adaugă profil
      </button>

      ${n?`
        <button class="btn btn-ghost btn-full" id="btn-users-back" style="margin-top: var(--space-sm);">
          ← Înapoi
        </button>
      `:``}

      <div style="height: 32px;"></div>
    </div>

    <style>
      .users-screen { max-width: 480px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .users-list { display: flex; flex-direction: column; gap: var(--space-md); }
      .user-card {
        position: relative;
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; transition: all var(--transition-fast);
      }
      .user-card:active { transform: translateY(2px); box-shadow: none; }
      .user-card-active { border-color: var(--color-primary); background: var(--color-success-bg); }
      .user-card-avatar { font-size: 40px; line-height: 1; }
      .user-card-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .user-card-name {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .user-card-stats { font-size: var(--font-size-xs); color: var(--text-secondary); }
      .user-card-edit {
        background: none; border: none; font-size: 18px; cursor: pointer;
        padding: var(--space-xs); opacity: 0.6;
      }
      .user-card-edit:hover { opacity: 1; }
      .user-card-check {
        font-size: 20px; color: var(--color-primary); font-weight: var(--font-weight-extrabold);
      }
      .avatar-grid {
        display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-sm);
      }
      .avatar-option {
        font-size: 28px; padding: var(--space-sm); cursor: pointer;
        background: var(--bg-secondary); border: 2px solid transparent;
        border-radius: var(--border-radius-md); transition: all var(--transition-fast);
      }
      .avatar-option.avatar-selected {
        border-color: var(--color-primary); background: var(--color-success-bg);
        transform: scale(1.1);
      }
      .btn-ghost {
        background: transparent; color: var(--text-secondary);
        border: none; box-shadow: none;
      }
    </style>
  `}function ei(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function ti(e){let t=Qr[0];document.querySelectorAll(`.user-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.user-card-edit`))return;let r=t.dataset.userId;d(r),ni(),le(),e(`home`)})}),document.querySelectorAll(`.user-card-edit`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.dataset.editId,i=c().find(e=>e.id===r),a=prompt(`Noul nume al profilului:`,i?i.name:``);a&&a.trim()&&(f(r,a),e(`users`))})}),document.getElementById(`btn-show-new-user`)?.addEventListener(`click`,()=>{let e=document.getElementById(`new-user-form`);e&&(e.style.display=`block`,document.getElementById(`new-user-name`)?.focus()),document.getElementById(`btn-show-new-user`).style.display=`none`}),document.querySelectorAll(`.avatar-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.avatar-option`).forEach(e=>e.classList.remove(`avatar-selected`)),e.classList.add(`avatar-selected`),t=e.dataset.avatar})});let n=()=>{let n=document.getElementById(`new-user-name`),r=n?n.value.trim():``;if(!r){n&&(n.placeholder=`Scrie un nume mai întâi 🙂`,n.focus());return}u(r,t),ni(),le(),e(`home`)};document.getElementById(`btn-create-user`)?.addEventListener(`click`,n),document.getElementById(`new-user-name`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&n()}),document.getElementById(`btn-users-back`)?.addEventListener(`click`,()=>e(`home`))}function ni(){let e=g();document.documentElement.setAttribute(`data-theme`,e.theme||`light`)}function ri(e,t){let n=I(t.sectionId);if(!n)return e(`home`),`<p>Secțiunea nu a fost găsită.</p>`;let r=``;if(n.themes&&n.themes.length&&(r+=`
      <div class="theme-grid">
        ${n.themes.map((e,t)=>`
          <button class="theme-card card-interactive animate-fadeInUp"
                  data-theme-id="${e.id}"
                  style="animation-delay: ${.1+t*.07}s">
            <span class="theme-card-icon">${e.icon}</span>
            <span class="theme-card-title">${e.title}</span>
            <span class="theme-card-count">${e.words.length} cuvinte</span>
          </button>
        `).join(``)}
      </div>
    `),n.units&&n.units.length){n.themes&&n.themes.length&&(r+=`<h2 class="home-extra-title">🏆 Provocări vizuale</h2>`);let e=g(),t=n.units,i=(n,r,i)=>{let a=y(n.id),o=r===0||y(t[r-1].id),s=e.lessonsCompleted[n.id]?.stars||0;return`
        <div class="lesson-node animate-fadeInUp ${a?`lesson-completed`:``} ${o?`lesson-unlocked`:`lesson-locked`}"
             style="animation-delay: ${.1+i*.06}s"
             ${o?`data-unit-id="${n.id}"`:``}>
          <div class="lesson-node-circle">
            <span class="lesson-node-icon">${a?`✅`:o?n.icon:`🔒`}</span>
          </div>
          <div class="lesson-node-info">
            <h3 class="lesson-node-title">${n.title}</h3>
            ${a?`
              <div class="lesson-stars">${`⭐`.repeat(s)}${`☆`.repeat(3-s)}</div>
            `:o?`
              <p class="lesson-node-desc">${n.description||``}</p>
            `:`
              <p class="lesson-node-desc" style="opacity: 0.5;">Completează unitatea anterioară</p>
            `}
          </div>
          ${o?`<span class="lesson-node-arrow">→</span>`:``}
        </div>
      `};if(n.series){let e=n.seriesSize||10,a=Math.ceil(t.length/e),o=[];for(let n=0;n<a;n++)o[n]=t.slice(n*e,n*e+e).every(e=>y(e.id));let s=e=>e===0||o[e-1],c=[],l=0;for(let r=0;r<a;r++)if(s(r)){let s=t.slice(r*e,r*e+e),u=s.filter(e=>y(e.id)).length,d=localStorage.getItem(`ui_series_${n.id}_${r}`),f=d===null?o[r]:d===`1`;c.push(`
            <button class="series-header series-toggle animate-fadeInUp" data-series="${r}"
                    aria-expanded="${!f}" style="animation-delay: ${.05+l*.04}s">
              <span class="series-header-title">Seria ${r+1} / ${a}</span>
              <span class="series-header-right">
                <span class="series-header-progress">${u}/${s.length}</span>
                <span class="series-caret">${f?`▾`:`▴`}</span>
              </span>
            </button>
          `),c.push(`<div class="lesson-map series-units ${f?`is-collapsed`:``}" data-series="${r}">${s.map((t,n)=>i(t,r*e+n,l+n)).join(``)}</div>`),l+=s.length+1}else{c.push(`
            <div class="series-teaser animate-fadeInUp" style="animation-delay: ${.05+l*.04}s">
              <span class="series-teaser-lock">🔒</span>
              <div>
                <strong>Seria ${r+1}</strong>
                <p>Termină seria ${r} ca să deblochezi următoarele 10</p>
              </div>
            </div>
          `);break}r+=c.join(``)}else r+=`
        <div class="lesson-map">
          ${t.map((e,t)=>i(e,t,t)).join(``)}
        </div>
      `}return`
    <div class="section-screen">
      <button class="screen-back-btn" id="btn-back-section">← Înapoi</button>
      <h1 class="screen-title">${n.icon} ${n.title}</h1>
      <p class="screen-subtitle">${n.description}</p>
      ${r}
      <div style="height: 32px;"></div>
    </div>

    <style>
      .section-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .theme-grid {
        display: grid; grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md); margin-top: var(--space-lg);
      }
      .theme-card {
        display: flex; flex-direction: column; align-items: center;
        gap: var(--space-xs); padding: var(--space-lg) var(--space-md);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; font-family: var(--font-family);
        transition: all var(--transition-fast);
      }
      .theme-card:active { transform: translateY(3px); box-shadow: none; }
      .theme-card-icon { font-size: 44px; line-height: 1; }
      .theme-card-title {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      .theme-card-count { font-size: var(--font-size-xs); color: var(--text-secondary); }

      .series-header {
        display: flex; align-items: center; justify-content: space-between;
        margin: var(--space-lg) 0 var(--space-xs);
        padding-bottom: var(--space-xs);
        border-bottom: 2px solid var(--border-color);
      }
      .series-toggle {
        width: 100%; background: none; border: none;
        border-bottom: 2px solid var(--border-color);
        cursor: pointer; font-family: var(--font-family); color: inherit;
      }
      .series-toggle:active { opacity: 0.7; }
      .series-header-right { display: flex; align-items: center; gap: var(--space-sm); }
      .series-caret { font-size: var(--font-size-md); color: var(--text-secondary); }
      .series-units.is-collapsed { display: none; }
      .series-header-title {
        font-size: var(--font-size-sm); font-weight: var(--font-weight-extrabold);
        color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;
      }
      .series-header-progress {
        font-size: var(--font-size-xs); font-weight: var(--font-weight-bold);
        color: var(--color-secondary);
        background: rgba(206, 130, 255, 0.12);
        padding: 2px 10px; border-radius: 999px;
      }
      .series-teaser {
        display: flex; align-items: center; gap: var(--space-md);
        margin-top: var(--space-lg); padding: var(--space-lg);
        background: var(--bg-card); border: 2px dashed var(--border-color);
        border-radius: var(--border-radius-lg); opacity: 0.75;
      }
      .series-teaser-lock { font-size: 32px; }
      .series-teaser strong { color: var(--text-primary); font-size: var(--font-size-md); }
      .series-teaser p { margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--text-secondary); }
    </style>
  `}function ii(e,t){let n=I(t.sectionId);n&&(document.getElementById(`btn-back-section`)?.addEventListener(`click`,()=>e(`home`)),document.querySelectorAll(`.series-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.series,r=document.querySelector(`.series-units[data-series="${t}"]`);if(!r)return;let i=r.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_series_${n.id}_${t}`,i?`1`:`0`),e.setAttribute(`aria-expanded`,String(!i));let a=e.querySelector(`.series-caret`);a&&(a.textContent=i?`▾`:`▴`)})}),document.querySelectorAll(`.theme-card`).forEach(t=>{t.addEventListener(`click`,()=>{e(`themeGallery`,{sectionId:n.id,themeId:t.dataset.themeId})})}),document.querySelectorAll(`.lesson-node[data-unit-id]`).forEach(t=>{t.addEventListener(`click`,()=>{e(`lesson`,{sectionId:n.id,unitId:t.dataset.unitId})})}))}function ai(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function oi(e){return I(e.sectionId)?.themes?.find(t=>t.id===e.themeId)||null}function si(e,t){let n=oi(t);if(!n)return e(`home`),`<p>Tema nu a fost găsită.</p>`;let r=n.words.map((e,t)=>{let n=C(e.de)||`🎴`;return`
      <button class="tg-card card-interactive animate-fadeInUp"
              data-de="${e.de}" data-idx="${t}"
              style="animation-delay: ${.05+t*.06}s">
        <span class="tg-emoji">${n}</span>
        <span class="tg-de">${e.de}</span>
        <span class="tg-ro">${e.ro}</span>
        <span class="tg-speaker">🔊</span>
      </button>
    `}).join(``);return`
    <div class="tg-screen">
      <button class="screen-back-btn" id="btn-back-gallery">← Înapoi</button>
      <h1 class="screen-title">${n.icon} ${n.title}</h1>
      <p class="screen-subtitle">Atinge un card ca să auzi cuvântul în germană</p>

      <div class="tg-grid">${r}</div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-theme-quiz"
              style="margin-top: var(--space-xl); animation-delay: 0.5s;">
        🎯 Începe quiz
      </button>
      <div style="height: 32px;"></div>
    </div>

    <style>
      .tg-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .tg-grid {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md); margin-top: var(--space-lg);
      }
      .tg-card {
        position: relative;
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: var(--space-lg) var(--space-sm);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; font-family: var(--font-family);
        transition: all var(--transition-fast);
      }
      .tg-card:active { transform: translateY(3px); box-shadow: none; }
      .tg-card.tg-playing { border-color: var(--color-xp); background: rgba(28, 176, 246, 0.08); }
      .tg-emoji { font-size: 48px; line-height: 1; }
      .tg-de {
        font-size: var(--font-size-md); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary);
      }
      .tg-ro { font-size: var(--font-size-xs); color: var(--text-secondary); font-style: italic; }
      .tg-speaker {
        position: absolute; top: 6px; right: 8px;
        font-size: 14px; opacity: 0.5;
      }

      @media (max-width: 480px) {
        .tg-grid { grid-template-columns: repeat(2, 1fr); }
        .tg-emoji { font-size: 42px; }
      }
    </style>
  `}function ci(e,t){let n=oi(t);n&&(document.getElementById(`btn-back-gallery`)?.addEventListener(`click`,()=>{e(`section`,{sectionId:t.sectionId})}),document.querySelectorAll(`.tg-card`).forEach(e=>{e.addEventListener(`click`,async()=>{document.querySelectorAll(`.tg-card`).forEach(e=>e.classList.remove(`tg-playing`)),e.classList.add(`tg-playing`),await V(e.dataset.de),e.classList.remove(`tg-playing`)})}),document.getElementById(`btn-theme-quiz`)?.addEventListener(`click`,()=>{let r=n.words;e(`lesson`,{exercises:ai(r).map(e=>{let t=ai(r.filter(t=>t.de!==e.de)).slice(0,2).map(e=>e.de);return{type:`picturePick`,wordDe:e.de,correct:e.de,options:ai([e.de,...t])}}),title:n.title,icon:n.icon,unitId:`theme:${n.id}`,sectionId:t.sectionId,themeId:n.id})}))}var li={salutari:`👋 Salutări`,expresii:`💬 Expresii`,familie:`👨‍👩‍👧 Familie`,mancare:`🍽️ Mâncare`,bauturi:`🥤 Băuturi`,culori:`🎨 Culori`,animale:`🐾 Animale`,natura:`🌳 Natură`,transport:`🚗 Transport`,numere:`🔢 Numere`};function ui(e){return`
    <div class="dict-row card animate-fadeIn">
      <span class="dict-emoji">${C(e.de)||``}</span>
      <div class="dict-words">
        <span class="dict-de">${e.article?`${e.article} ${e.de}`:e.de}</span>
        <span class="dict-ro">${e.ro}</span>
      </div>
      <button class="dict-speak" data-word="${e.de}" aria-label="Ascultă">🔊</button>
    </div>
  `}function di(e){return`
    <div class="dict-screen">
      <button class="screen-back-btn" id="btn-back-dict">← Înapoi</button>
      <h1 class="screen-title">📖 Dicționar</h1>
      <p class="screen-subtitle">${w.length} cuvinte verificate · caută în română sau germană</p>

      <input type="text" id="dict-search" class="exercise-input" placeholder="🔍 Caută un cuvânt..."
             autocomplete="off" style="width: 100%; margin: var(--space-md) 0;">

      <div id="dict-results"></div>
      <div style="height: 32px;"></div>
    </div>

    <style>
      .dict-screen { max-width: 600px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .dict-category-title {
        font-size: var(--font-size-md); font-weight: var(--font-weight-extrabold);
        color: var(--text-primary); margin: var(--space-lg) 0 var(--space-sm);
      }
      .dict-row {
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-sm) var(--space-md); margin-bottom: var(--space-sm);
      }
      .dict-emoji { font-size: 26px; width: 32px; text-align: center; flex-shrink: 0; }
      .dict-words { flex: 1; display: flex; flex-direction: column; min-width: 0; }
      .dict-de { font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary); }
      .dict-ro { font-size: var(--font-size-sm); color: var(--text-secondary); }
      .dict-speak {
        background: none; border: none; font-size: 20px; cursor: pointer;
        padding: var(--space-xs); flex-shrink: 0;
      }
      .dict-empty {
        text-align: center; color: var(--text-secondary);
        padding: var(--space-xl) 0; font-style: italic;
      }
    </style>
  `}function fi(e){let t=document.getElementById(`dict-results`);if(t){if(e&&e.trim()){let n=ze(e);t.innerHTML=n.length?n.map(ui).join(``):`<p class="dict-empty">Niciun rezultat. Încearcă alt cuvânt 🙂</p>`}else t.innerHTML=Object.entries(li).map(([e,t])=>{let n=w.filter(t=>t.category===e);return n.length?`
        <h2 class="dict-category-title">${t}</h2>
        ${n.map(ui).join(``)}
      `:``}).join(``);t.querySelectorAll(`.dict-speak`).forEach(e=>{e.addEventListener(`click`,()=>V(e.dataset.word))})}}function pi(e){document.getElementById(`btn-back-dict`)?.addEventListener(`click`,()=>e(`home`));let t=document.getElementById(`dict-search`),n=null;t?.addEventListener(`input`,()=>{clearTimeout(n),n=setTimeout(()=>fi(t.value),200)}),fi(``)}var mi=`home`,Q={};function hi(){let e=g();document.documentElement.setAttribute(`data-theme`,e.theme||`light`)}function $(e,t={}){mi=e,Q=t,gi(),window.scrollTo(0,0)}function gi(){let e=document.getElementById(`app`);if(!e)return;let t=``;switch(mi){case`home`:t=Sn($);break;case`lesson`:t=ur($,Q);break;case`results`:t=Lr($,Q);break;case`cognates`:t=Hr($);break;case`profile`:t=Gr($);break;case`settings`:t=Jr($);break;case`practice`:t=Xr($);break;case`users`:t=$r($);break;case`section`:t=ri($,Q);break;case`themeGallery`:t=si($,Q);break;case`dictionary`:t=di($);break;default:t=Sn($)}e.innerHTML=t,requestAnimationFrame(()=>{switch(mi){case`home`:Cn($);break;case`lesson`:fr($,Q);break;case`results`:Rr($,Q);break;case`cognates`:Ur($);break;case`profile`:Kr($);break;case`settings`:Yr($);break;case`practice`:Zr($);break;case`users`:ti($);break;case`section`:ii($,Q);break;case`themeGallery`:ci($,Q);break;case`dictionary`:pi($);break}})}function _i(){if(hi(),Ae(),!s().activeUserId){$(`users`);return}le(),$(`home`)}document.addEventListener(`DOMContentLoaded`,_i),window.__navigate=$;