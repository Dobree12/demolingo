(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`invatam_germana`,t={xp:0,level:1,streak:0,lastActiveDate:null,dailyGoalMinutes:10,dailyMinutesToday:0,dailyGoalCompleted:!1,hearts:5,heartsLastRefill:null,lessonsCompleted:{},exerciseHistory:[],wordsLearned:[],wordsMastered:[],badges:[],totalCorrect:0,totalWrong:0,totalLessonsCompleted:0,sessionStartTime:null,theme:`light`,createdAt:null,mistakes:[]};function n(){try{let n=localStorage.getItem(e);if(!n){let e={...t,createdAt:new Date().toISOString()};return r(e),e}return{...t,...JSON.parse(n)}}catch(e){return console.error(`Failed to load state:`,e),{...t}}}function r(t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`Failed to save state:`,e)}}function i(e){let t={...n(),...e};return r(t),t}function a(){return localStorage.removeItem(e),n()}var o=50,s=30,c=[0,100,250,500,850,1300,1900,2600,3500,4500,6e3,8e3,10500,13500,17e3],l=[`Începător`,`Începător`,`Începător Avansat`,`Elementar`,`Elementar`,`Elementar Avansat`,`Intermediar`,`Intermediar`,`Intermediar Avansat`,`Avansat`,`Avansat`,`Expert`,`Expert`,`Maestru`,`Maestru Suprem`];function u(e){let t=1;for(let n=c.length-1;n>=0;n--)if(e>=c[n]){t=n+1;break}return t}function d(e){return l[Math.min(e-1,l.length-1)]}function f(e,t){let n=c[t-1]||0,r=c[t]||n+1e3;return{current:e-n,needed:r-n,percent:Math.min(100,(e-n)/(r-n)*100)}}function p(e){let t=n(),r=t.level,a=t.xp+e,o=u(a),s=o>r;return i({xp:a,level:o}),{xp:a,level:o,leveledUp:s,xpGained:e}}function m(){let e=n(),t=new Date().toDateString(),r=e.lastActiveDate;if(r===t)return e.streak;let a=new Date;a.setDate(a.getDate()-1);let o;return o=r===a.toDateString()?e.streak+1:1,i({streak:o,lastActiveDate:t,dailyMinutesToday:r===t?e.dailyMinutesToday:0,dailyGoalCompleted:!1}),o}function ee(e){let t=n(),r=t.dailyMinutesToday+e,a=r>=t.dailyGoalMinutes;return i({dailyMinutesToday:r,dailyGoalCompleted:a}),{minutes:r,goal:t.dailyGoalMinutes,completed:a}}function te(e){i({dailyGoalMinutes:e})}function ne(e,t,r){let a=n(),c=t>=90?3:t>=70?2:1,l=a.lessonsCompleted[e],u=!l||!l.completed;i({lessonsCompleted:{...a.lessonsCompleted,[e]:{completed:!0,stars:Math.max(c,l?.stars||0),bestScore:Math.max(t,l?.bestScore||0),completedAt:new Date().toISOString()}},totalLessonsCompleted:a.totalLessonsCompleted+ +!!u});let d=s;t===100&&(d+=o);let f=p(d),m=oe();return{stars:c,score:t,bonusXP:d,xpResult:f,newBadges:m,isNew:u}}function h(e){return n().lessonsCompleted[e]?.completed||!1}function re(e,t){if(e===t[0]?.id)return!0;let n=t.findIndex(t=>t.id===e);return n<=0?!0:h(t[n-1].id)}function g(e){let t=n();t.wordsLearned.includes(e)||i({wordsLearned:[...t.wordsLearned,e]})}function ie(e){let t=n();i({mistakes:[e,...t.mistakes].slice(0,50),totalWrong:t.totalWrong+1})}function ae(){i({totalCorrect:n().totalCorrect+1})}var _=[{id:`first_lesson`,icon:`🎓`,name:`Prima lecție`,description:`Ai completat prima ta lecție!`,check:e=>e.totalLessonsCompleted>=1},{id:`streak_3`,icon:`🔥`,name:`3 zile la rând`,description:`Serie de 3 zile consecutive!`,check:e=>e.streak>=3},{id:`streak_7`,icon:`🔥`,name:`O săptămână!`,description:`Serie de 7 zile consecutive!`,check:e=>e.streak>=7},{id:`streak_30`,icon:`💎`,name:`O lună!`,description:`Serie de 30 de zile consecutive!`,check:e=>e.streak>=30},{id:`words_10`,icon:`📚`,name:`Primele 10 cuvinte`,description:`Ai învățat 10 cuvinte noi!`,check:e=>e.wordsLearned.length>=10},{id:`words_50`,icon:`📖`,name:`50 de cuvinte`,description:`Ai învățat 50 de cuvinte!`,check:e=>e.wordsLearned.length>=50},{id:`words_100`,icon:`🏆`,name:`100 de cuvinte`,description:`Ai învățat 100 de cuvinte! Ești un campion!`,check:e=>e.wordsLearned.length>=100},{id:`xp_500`,icon:`⭐`,name:`500 XP`,description:`Ai acumulat 500 de puncte de experiență!`,check:e=>e.xp>=500},{id:`xp_1000`,icon:`🌟`,name:`1000 XP`,description:`O mie de puncte XP! Incredibil!`,check:e=>e.xp>=1e3},{id:`perfect`,icon:`💯`,name:`Perfecțiune`,description:`Ai terminat o lecție cu scor perfect!`,check:e=>Object.values(e.lessonsCompleted).some(e=>e.bestScore===100)},{id:`lessons_5`,icon:`🎯`,name:`5 lecții complete`,description:`Ai terminat 5 lecții! Continui excelent!`,check:e=>e.totalLessonsCompleted>=5},{id:`level_5`,icon:`🏅`,name:`Nivel 5`,description:`Ai ajuns la nivelul 5!`,check:e=>e.level>=5}];function oe(){let e=n(),t=[];for(let n of _)!e.badges.includes(n.id)&&n.check(e)&&t.push(n);return t.length>0&&i({badges:[...e.badges,...t.map(e=>e.id)]}),t}function se(){let e=n();return _.map(t=>({...t,earned:e.badges.includes(t.id)}))}function ce(){let e=n();return{xp:e.xp,level:e.level,levelName:d(e.level),streak:e.streak,wordsLearned:e.wordsLearned.length,totalCorrect:e.totalCorrect,totalWrong:e.totalWrong,accuracy:e.totalCorrect+e.totalWrong>0?Math.round(e.totalCorrect/(e.totalCorrect+e.totalWrong)*100):0,totalLessonsCompleted:e.totalLessonsCompleted,dailyMinutes:e.dailyMinutesToday,dailyGoal:e.dailyGoalMinutes,dailyGoalCompleted:e.dailyGoalCompleted,xpProgress:f(e.xp,e.level)}}var le=[{id:`salutari`,title:`Salutări`,titleDe:`Begrüßungen`,icon:`👋`,description:`Învață să saluti în germană`,unit:1,words:[{de:`Hallo`,ro:`Bună`,example:`Hallo! Wie geht es dir?`,exampleRo:`Bună! Ce mai faci?`},{de:`Guten Morgen`,ro:`Bună dimineața`,example:`Guten Morgen! Wie geht es Ihnen?`,exampleRo:`Bună dimineața! Ce mai faceți?`},{de:`Guten Tag`,ro:`Bună ziua`,example:`Guten Tag, Herr Müller!`,exampleRo:`Bună ziua, domnul Müller!`},{de:`Guten Abend`,ro:`Bună seara`,example:`Guten Abend! Willkommen!`,exampleRo:`Bună seara! Bine ați venit!`},{de:`Gute Nacht`,ro:`Noapte bună`,example:`Gute Nacht! Schlaf gut!`,exampleRo:`Noapte bună! Somn ușor!`},{de:`Tschüss`,ro:`Pa / La revedere`,example:`Tschüss! Bis morgen!`,exampleRo:`Pa! Pe mâine!`},{de:`Auf Wiedersehen`,ro:`La revedere (formal)`,example:`Auf Wiedersehen, Frau Schmidt!`,exampleRo:`La revedere, doamna Schmidt!`},{de:`Danke`,ro:`Mulțumesc`,example:`Danke schön!`,exampleRo:`Mulțumesc frumos!`},{de:`Bitte`,ro:`Te rog / Cu plăcere`,example:`Bitte schön!`,exampleRo:`Cu plăcere!`},{de:`Ja`,ro:`Da`,example:`Ja, natürlich!`,exampleRo:`Da, desigur!`},{de:`Nein`,ro:`Nu`,example:`Nein, danke.`,exampleRo:`Nu, mulțumesc.`},{de:`Entschuldigung`,ro:`Scuzați-mă`,example:`Entschuldigung, wo ist der Bahnhof?`,exampleRo:`Scuzați-mă, unde este gara?`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "Hallo"?`,correct:`Bună`,options:[`Bună`,`Pa`,`Mulțumesc`,`Noapte bună`]},{type:`multiChoice`,question:`Cum spui "Bună dimineața" în germană?`,correct:`Guten Morgen`,options:[`Guten Morgen`,`Guten Tag`,`Guten Abend`,`Gute Nacht`]},{type:`translate_ro_de`,prompt:`Bună ziua`,answer:`Guten Tag`},{type:`translate_de_ro`,prompt:`Tschüss`,answer:`Pa`,alts:[`La revedere`]},{type:`listen`,word:`Guten Morgen`,answer:`Guten Morgen`},{type:`match`,pairs:[[`Hallo`,`Bună`],[`Danke`,`Mulțumesc`],[`Bitte`,`Te rog`],[`Ja`,`Da`]]},{type:`fillBlank`,sentence:`_____ Morgen! Wie geht es dir?`,answer:`Guten`,hint:`Bună dimineața`},{type:`multiChoice`,question:`Cum mulțumești în germană?`,correct:`Danke`,options:[`Bitte`,`Danke`,`Hallo`,`Nein`]},{type:`speak`,word:`Guten Tag`,translation:`Bună ziua`},{type:`translate_ro_de`,prompt:`Mulțumesc`,answer:`Danke`},{type:`listen`,word:`Auf Wiedersehen`,answer:`Auf Wiedersehen`},{type:`multiChoice`,question:`Ce înseamnă "Nein"?`,correct:`Nu`,options:[`Da`,`Nu`,`Te rog`,`Scuze`]}]},{id:`prezentari`,title:`Prezentări`,titleDe:`Vorstellungen`,icon:`🙋`,description:`Învață să te prezinți`,unit:2,words:[{de:`Ich`,ro:`Eu`,example:`Ich bin Maria.`,exampleRo:`Eu sunt Maria.`},{de:`Du`,ro:`Tu`,example:`Du bist nett.`,exampleRo:`Tu ești drăguțu/ă.`},{de:`bin`,ro:`sunt`,example:`Ich bin Student.`,exampleRo:`Eu sunt student.`},{de:`heiße`,ro:`mă numesc`,example:`Ich heiße Anna.`,exampleRo:`Mă numesc Anna.`},{de:`Wie heißt du?`,ro:`Cum te numești?`,example:`Hallo! Wie heißt du?`,exampleRo:`Bună! Cum te numești?`},{de:`Wie geht es dir?`,ro:`Ce mai faci?`,example:`Hallo! Wie geht es dir?`,exampleRo:`Bună! Ce mai faci?`},{de:`Gut`,ro:`Bine`,example:`Mir geht es gut.`,exampleRo:`Sunt bine.`},{de:`Schlecht`,ro:`Rău`,example:`Mir geht es schlecht.`,exampleRo:`Sunt rău / Nu mă simt bine.`},{de:`Freut mich`,ro:`Îmi pare bine (de cunoștință)`,example:`Freut mich, dich kennenzulernen!`,exampleRo:`Îmi pare bine de cunoștință!`},{de:`Ich komme aus`,ro:`Eu vin din / Sunt din`,example:`Ich komme aus Rumänien.`,exampleRo:`Eu sunt din România.`},{de:`Rumänien`,ro:`România`,example:`Ich komme aus Rumänien.`,exampleRo:`Eu vin din România.`},{de:`Deutschland`,ro:`Germania`,example:`Deutschland ist schön.`,exampleRo:`Germania e frumoasă.`}],exercises:[{type:`multiChoice`,question:`Cum spui "Eu sunt" în germană?`,correct:`Ich bin`,options:[`Ich bin`,`Du bist`,`Ich heiße`,`Ich komme`]},{type:`translate_ro_de`,prompt:`Mă numesc Anna`,answer:`Ich heiße Anna`},{type:`listen`,word:`Wie heißt du?`,answer:`Wie heißt du`},{type:`fillBlank`,sentence:`Ich _____ aus Rumänien.`,answer:`komme`,hint:`Eu vin din România`},{type:`match`,pairs:[[`Ich`,`Eu`],[`Du`,`Tu`],[`Gut`,`Bine`],[`Schlecht`,`Rău`]]},{type:`multiChoice`,question:`Ce înseamnă "Freut mich"?`,correct:`Îmi pare bine`,options:[`Îmi pare bine`,`Mă numesc`,`Sunt bine`,`La revedere`]},{type:`speak`,word:`Ich heiße`,translation:`Mă numesc`},{type:`translate_de_ro`,prompt:`Wie geht es dir?`,answer:`Ce mai faci?`,alts:[`Ce mai faci`,`Cum te simți`]},{type:`multiChoice`,question:`Cum spui "România" în germană?`,correct:`Rumänien`,options:[`Rumänien`,`Deutschland`,`Österreich`,`Russland`]},{type:`fillBlank`,sentence:`_____ mich, dich kennenzulernen!`,answer:`Freut`,hint:`Îmi pare bine de cunoștință`},{type:`translate_ro_de`,prompt:`Eu sunt din România`,answer:`Ich komme aus Rumänien`},{type:`listen`,word:`Freut mich`,answer:`Freut mich`}]},{id:`numere`,title:`Numere`,titleDe:`Zahlen`,icon:`🔢`,description:`Numerele de la 1 la 20`,unit:3,words:[{de:`eins`,ro:`unu (1)`,example:`Ich habe eins.`,exampleRo:`Am unu.`},{de:`zwei`,ro:`doi (2)`,example:`Zwei Kaffee, bitte.`,exampleRo:`Două cafele, vă rog.`},{de:`drei`,ro:`trei (3)`,example:`Ich habe drei Bücher.`,exampleRo:`Am trei cărți.`},{de:`vier`,ro:`patru (4)`,example:`Vier Jahreszeiten.`,exampleRo:`Patru anotimpuri.`},{de:`fünf`,ro:`cinci (5)`,example:`Fünf Minuten, bitte.`,exampleRo:`Cinci minute, vă rog.`},{de:`sechs`,ro:`șase (6)`,example:`Sechs Tage.`,exampleRo:`Șase zile.`},{de:`sieben`,ro:`șapte (7)`,example:`Sieben Tage in der Woche.`,exampleRo:`Șapte zile în săptămână.`},{de:`acht`,ro:`opt (8)`,example:`Acht Uhr.`,exampleRo:`Ora opt.`},{de:`neun`,ro:`nouă (9)`,example:`Neun Katzen.`,exampleRo:`Nouă pisici.`},{de:`zehn`,ro:`zece (10)`,example:`Zehn Euro, bitte.`,exampleRo:`Zece euro, vă rog.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "drei"?`,correct:`trei`,options:[`doi`,`trei`,`patru`,`cinci`]},{type:`multiChoice`,question:`Cum spui "cinci" în germană?`,correct:`fünf`,options:[`vier`,`fünf`,`sechs`,`drei`]},{type:`match`,pairs:[[`eins`,`unu`],[`zwei`,`doi`],[`drei`,`trei`],[`vier`,`patru`]]},{type:`listen`,word:`sieben`,answer:`sieben`},{type:`translate_ro_de`,prompt:`zece`,answer:`zehn`},{type:`translate_de_ro`,prompt:`acht`,answer:`opt`},{type:`fillBlank`,sentence:`_____ Kaffee, bitte.`,answer:`Zwei`,hint:`Două cafele, vă rog`},{type:`speak`,word:`fünf`,translation:`cinci`},{type:`multiChoice`,question:`Ce înseamnă "neun"?`,correct:`nouă`,options:[`opt`,`nouă`,`zece`,`șase`]},{type:`match`,pairs:[[`fünf`,`cinci`],[`sechs`,`șase`],[`sieben`,`șapte`],[`acht`,`opt`]]},{type:`listen`,word:`zehn`,answer:`zehn`},{type:`translate_ro_de`,prompt:`șapte`,answer:`sieben`}]},{id:`familie`,title:`Familie`,titleDe:`Familie`,icon:`👨‍👩‍👧‍👦`,description:`Membrii familiei`,unit:4,words:[{de:`die Mutter`,ro:`mama`,example:`Meine Mutter heißt Elena.`,exampleRo:`Mama mea se numește Elena.`},{de:`der Vater`,ro:`tatăl`,example:`Mein Vater ist Lehrer.`,exampleRo:`Tatăl meu este profesor.`},{de:`die Schwester`,ro:`sora`,example:`Meine Schwester ist jung.`,exampleRo:`Sora mea este tânără.`},{de:`der Bruder`,ro:`fratele`,example:`Mein Bruder spielt Fußball.`,exampleRo:`Fratele meu joacă fotbal.`},{de:`die Großmutter`,ro:`bunica`,example:`Meine Großmutter kocht gut.`,exampleRo:`Bunica mea gătește bine.`},{de:`der Großvater`,ro:`bunicul`,example:`Mein Großvater liest gern.`,exampleRo:`Bunicul meu citește cu plăcere.`},{de:`das Kind`,ro:`copilul`,example:`Das Kind spielt im Park.`,exampleRo:`Copilul se joacă în parc.`},{de:`die Eltern`,ro:`părinții`,example:`Meine Eltern sind nett.`,exampleRo:`Părinții mei sunt drăguți.`},{de:`der Mann`,ro:`soțul / bărbatul`,example:`Der Mann ist groß.`,exampleRo:`Bărbatul este înalt.`},{de:`die Frau`,ro:`soția / femeia`,example:`Die Frau ist Ärztin.`,exampleRo:`Femeia este doctoriță.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "die Mutter"?`,correct:`mama`,options:[`mama`,`sora`,`bunica`,`soția`]},{type:`match`,pairs:[[`die Mutter`,`mama`],[`der Vater`,`tatăl`],[`die Schwester`,`sora`],[`der Bruder`,`fratele`]]},{type:`translate_ro_de`,prompt:`bunica`,answer:`die Großmutter`},{type:`listen`,word:`der Bruder`,answer:`der Bruder`},{type:`fillBlank`,sentence:`Mein _____ spielt Fußball.`,answer:`Bruder`,hint:`Fratele meu joacă fotbal`},{type:`multiChoice`,question:`Cum spui "copilul" în germană?`,correct:`das Kind`,options:[`der Mann`,`das Kind`,`die Frau`,`der Bruder`]},{type:`translate_de_ro`,prompt:`die Eltern`,answer:`părinții`,alts:[`parintii`]},{type:`speak`,word:`die Mutter`,translation:`mama`},{type:`match`,pairs:[[`die Großmutter`,`bunica`],[`der Großvater`,`bunicul`],[`das Kind`,`copilul`],[`die Eltern`,`părinții`]]},{type:`multiChoice`,question:`Ce înseamnă "der Mann"?`,correct:`soțul / bărbatul`,options:[`copilul`,`fratele`,`soțul / bărbatul`,`tatăl`]},{type:`translate_ro_de`,prompt:`sora`,answer:`die Schwester`},{type:`listen`,word:`die Großmutter`,answer:`die Großmutter`}]},{id:`mancare`,title:`Mâncare și Băuturi`,titleDe:`Essen und Trinken`,icon:`🍽️`,description:`Alimente și băuturi de bază`,unit:5,words:[{de:`das Brot`,ro:`pâinea`,example:`Ich esse Brot.`,exampleRo:`Eu mănânc pâine.`},{de:`das Wasser`,ro:`apa`,example:`Ich trinke Wasser.`,exampleRo:`Eu beau apă.`},{de:`die Milch`,ro:`laptele`,example:`Die Milch ist frisch.`,exampleRo:`Laptele e proaspăt.`},{de:`der Kaffee`,ro:`cafeaua`,example:`Ich trinke Kaffee.`,exampleRo:`Eu beau cafea.`},{de:`der Tee`,ro:`ceaiul`,example:`Möchtest du Tee?`,exampleRo:`Vrei ceai?`},{de:`der Apfel`,ro:`mărul`,example:`Der Apfel ist rot.`,exampleRo:`Mărul este roșu.`},{de:`die Suppe`,ro:`supa`,example:`Die Suppe ist heiß.`,exampleRo:`Supa este fierbinte.`},{de:`das Fleisch`,ro:`carnea`,example:`Ich esse kein Fleisch.`,exampleRo:`Eu nu mănânc carne.`},{de:`der Käse`,ro:`brânza`,example:`Ich mag Käse.`,exampleRo:`Îmi place brânza.`},{de:`essen`,ro:`a mânca`,example:`Was möchtest du essen?`,exampleRo:`Ce vrei să mănânci?`},{de:`trinken`,ro:`a bea`,example:`Was möchtest du trinken?`,exampleRo:`Ce vrei să bei?`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "das Brot"?`,correct:`pâinea`,options:[`pâinea`,`carnea`,`brânza`,`supa`]},{type:`translate_ro_de`,prompt:`apa`,answer:`das Wasser`},{type:`match`,pairs:[[`das Brot`,`pâinea`],[`das Wasser`,`apa`],[`die Milch`,`laptele`],[`der Kaffee`,`cafeaua`]]},{type:`listen`,word:`der Kaffee`,answer:`der Kaffee`},{type:`fillBlank`,sentence:`Ich trinke _____.`,answer:`Wasser`,hint:`Eu beau apă`},{type:`multiChoice`,question:`Cum spui "a bea" în germană?`,correct:`trinken`,options:[`essen`,`trinken`,`Kaffee`,`Wasser`]},{type:`translate_de_ro`,prompt:`der Apfel`,answer:`mărul`,alts:[`marul`,`mar`]},{type:`speak`,word:`das Brot`,translation:`pâinea`},{type:`match`,pairs:[[`der Tee`,`ceaiul`],[`die Suppe`,`supa`],[`der Käse`,`brânza`],[`das Fleisch`,`carnea`]]},{type:`fillBlank`,sentence:`Was möchtest du _____?`,answer:`essen`,hint:`Ce vrei să mănânci?`},{type:`multiChoice`,question:`Ce înseamnă "die Milch"?`,correct:`laptele`,options:[`apa`,`laptele`,`cafeaua`,`ceaiul`]},{type:`translate_ro_de`,prompt:`brânza`,answer:`der Käse`}]},{id:`culori`,title:`Culori`,titleDe:`Farben`,icon:`🎨`,description:`Culorile principale`,unit:6,words:[{de:`rot`,ro:`roșu`,example:`Der Apfel ist rot.`,exampleRo:`Mărul este roșu.`},{de:`blau`,ro:`albastru`,example:`Der Himmel ist blau.`,exampleRo:`Cerul este albastru.`},{de:`grün`,ro:`verde`,example:`Das Gras ist grün.`,exampleRo:`Iarba este verde.`},{de:`gelb`,ro:`galben`,example:`Die Sonne ist gelb.`,exampleRo:`Soarele este galben.`},{de:`schwarz`,ro:`negru`,example:`Die Katze ist schwarz.`,exampleRo:`Pisica este neagră.`},{de:`weiß`,ro:`alb`,example:`Der Schnee ist weiß.`,exampleRo:`Zăpada este albă.`},{de:`braun`,ro:`maro`,example:`Der Hund ist braun.`,exampleRo:`Câinele este maro.`},{de:`orange`,ro:`portocaliu`,example:`Die Orange ist orange.`,exampleRo:`Portocala este portocalie.`},{de:`rosa`,ro:`roz`,example:`Die Blume ist rosa.`,exampleRo:`Floarea este roz.`},{de:`lila`,ro:`mov`,example:`Das Kleid ist lila.`,exampleRo:`Rochia este mov.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "rot"?`,correct:`roșu`,options:[`albastru`,`roșu`,`verde`,`galben`]},{type:`multiChoice`,question:`Cum spui "verde" în germană?`,correct:`grün`,options:[`gelb`,`blau`,`grün`,`rot`]},{type:`match`,pairs:[[`rot`,`roșu`],[`blau`,`albastru`],[`grün`,`verde`],[`gelb`,`galben`]]},{type:`translate_ro_de`,prompt:`negru`,answer:`schwarz`},{type:`listen`,word:`blau`,answer:`blau`},{type:`fillBlank`,sentence:`Der Apfel ist _____.`,answer:`rot`,hint:`Mărul este roșu`},{type:`speak`,word:`grün`,translation:`verde`},{type:`translate_de_ro`,prompt:`weiß`,answer:`alb`},{type:`match`,pairs:[[`schwarz`,`negru`],[`weiß`,`alb`],[`braun`,`maro`],[`rosa`,`roz`]]},{type:`multiChoice`,question:`Ce înseamnă "gelb"?`,correct:`galben`,options:[`verde`,`galben`,`roșu`,`albastru`]},{type:`translate_ro_de`,prompt:`albastru`,answer:`blau`},{type:`listen`,word:`schwarz`,answer:`schwarz`}]},{id:`animale`,title:`Animale`,titleDe:`Tiere`,icon:`🐾`,description:`Animalele cele mai comune`,unit:7,words:[{de:`der Hund`,ro:`câinele`,example:`Der Hund ist treu.`,exampleRo:`Câinele este fidel.`},{de:`die Katze`,ro:`pisica`,example:`Die Katze schläft.`,exampleRo:`Pisica doarme.`},{de:`der Vogel`,ro:`pasărea`,example:`Der Vogel singt.`,exampleRo:`Pasărea cântă.`},{de:`der Fisch`,ro:`peștele`,example:`Der Fisch schwimmt.`,exampleRo:`Peștele înoată.`},{de:`das Pferd`,ro:`calul`,example:`Das Pferd ist schnell.`,exampleRo:`Calul este rapid.`},{de:`die Kuh`,ro:`vaca`,example:`Die Kuh gibt Milch.`,exampleRo:`Vaca dă lapte.`},{de:`das Schwein`,ro:`porcul`,example:`Das Schwein ist rosa.`,exampleRo:`Porcul este roz.`},{de:`die Maus`,ro:`șoarecele`,example:`Die Maus ist klein.`,exampleRo:`Șoarecele este mic.`},{de:`der Bär`,ro:`ursul`,example:`Der Bär ist groß.`,exampleRo:`Ursul este mare.`},{de:`der Fuchs`,ro:`vulpea`,example:`Der Fuchs ist schlau.`,exampleRo:`Vulpea este șireată.`}],exercises:[{type:`multiChoice`,question:`Ce înseamnă "der Hund"?`,correct:`câinele`,options:[`pisica`,`câinele`,`pasărea`,`peștele`]},{type:`match`,pairs:[[`der Hund`,`câinele`],[`die Katze`,`pisica`],[`der Vogel`,`pasărea`],[`der Fisch`,`peștele`]]},{type:`translate_ro_de`,prompt:`pisica`,answer:`die Katze`},{type:`listen`,word:`das Pferd`,answer:`das Pferd`},{type:`fillBlank`,sentence:`Die _____ gibt Milch.`,answer:`Kuh`,hint:`Vaca dă lapte`},{type:`multiChoice`,question:`Cum spui "vulpea" în germană?`,correct:`der Fuchs`,options:[`der Bär`,`der Fuchs`,`die Maus`,`der Hund`]},{type:`speak`,word:`die Katze`,translation:`pisica`},{type:`translate_de_ro`,prompt:`das Schwein`,answer:`porcul`,alts:[`porc`]},{type:`match`,pairs:[[`das Pferd`,`calul`],[`die Kuh`,`vaca`],[`der Bär`,`ursul`],[`der Fuchs`,`vulpea`]]},{type:`multiChoice`,question:`Ce înseamnă "die Maus"?`,correct:`șoarecele`,options:[`calul`,`ursul`,`șoarecele`,`porcul`]},{type:`translate_ro_de`,prompt:`ursul`,answer:`der Bär`},{type:`listen`,word:`der Fuchs`,answer:`der Fuchs`}]}];function v(e){return le.find(t=>t.id===e)}function ue(){return le}var y={low:[`Corect! 👍`,`Foarte bine! ✨`,`Exact! 🎯`,`Bravo! 👏`,`Așa da! 💚`,`Perfect! ✅`,`Minunat! 🌟`,`Ai dreptate! 👍`,`Da, corect! ✨`,`Bine lucrat! 💪`],medium:[`Excelent! Creierul tău lucrează de minune! 🧠✨`,`WOW, ești pe val! Continuă tot așa! 🌊🔥`,`Incredibil! Ai un talent natural pentru germană! 🌟`,`Ai nimerit-o din prima! Asta se cheamă progres! 📈`,`Super! Memoria ta e de fier! 💪🧲`,`Exact! Simți cum devii mai bun? Eu simt! 🚀`,`Bravo! Cu fiecare răspuns corect, germana devine mai ușoară! 🎯`],high:[`SPECTACULOS! 🎉🎊 Ești absolut genial! Merită o sărbătoare!`,`Nu-mi vine să cred! 🤩 Ești un MAESTRU al germanei! Aplauze stând în picioare! 👏👏👏`,`BOOM! 💥 Răspuns perfect! Ai merita o medalie! 🏅`,`FENOMENAL! 🌈✨ La cum progresezi, vei vorbi germana fluent în curând!`]},de=[`Hmm, nu chiar, dar nu-i nimic! Hai să vedem împreună... 🤗`,`Aproape! Nu te descuraja, greșelile sunt parte din învățare! 💛`,`Nu e răspunsul corect, dar ești pe drumul cel bun! 💪`,`Ups! Dar știi ce? Creierul tău tocmai a învățat ceva important! 🧠`,`Nu de data asta, dar următoarea va fi a ta! ✨`,`Greșelile sunt cele mai bune profesoare! Hai să încercăm din nou! 📚`,`Încă nu ai nimerit, dar faptul că încerci e cel mai important! 🌟`,`Nu e corect, dar nu renunța! Fiecare greșeală te face mai puternic! 💪`,`Oops! Dar fiecare campion a trecut prin momente ca ăsta! 🏆`,`Nu-i nimic! Hai să privim răspunsul corect și să mergem mai departe! 🚀`],fe=[`Ai folosit toate inimile, dar nu te opri! 💛 Repetă lecția și vei vedea cât de mult ai învățat!`,`Toate inimile s-au folosit! Dar asta înseamnă că ai încercat din greu! Hai din nou! 💪`,`Nu te descuraja că ai pierdut inimile! Repetarea e mama învățării! 🌱`,`Inimile s-au terminat, dar curajul tău nu! Hai încă o dată! 💪`],b={perfect:[`PERFECȚIUNE ABSOLUTĂ! 💯🎉 Ai răspuns corect la TOATE întrebările! Ești incredibil!`,`SCOR PERFECT! 🌟🏆 Nu ai greșit NIMIC! Ești un geniu al germanei!`],great:[`Lecție terminată cu brio! 🎉 Ai fost fantastic! Continuă tot așa!`,`WOW! Rezultat excelent! 🌟 Ești din ce în ce mai bun!`,`Bravo! 🏆 Ce lecție reușită! Germana ta se îmbunătățește vizibil!`],good:[`Lecție completă! 👏 Ai făcut treabă bună! Cu fiecare lecție devii mai bun!`,`Bine lucrat! ✨ Continuă și vei fi expert în curând!`,`Felicitări! 🎯 Ai terminat lecția! Progresul tău e real și important!`],okay:[`Ai reușit să termini lecția! 💪 Asta contează enorm! Poți repeta oricând vrei!`,`Lecție completă! 🌱 Fiecare pas contează, iar tu tocmai ai făcut unul important!`]},pe={1:`Prima zi! 🌱 Fiecare călătorie începe cu un singur pas!`,2:`A doua zi consecutivă! 💚 Deja se formează un obicei!`,3:`3 zile la rând! 🔥 Consistența ta e admirabilă!`,5:`5 zile la rând! 🔥🔥 Ești de neoprit!`,7:`O săptămână întreagă! 🎉🔥 Ești un exemplu de dedicare!`,14:`Două săptămâni! 🏆 Germana devine parte din viața ta!`,30:`O LUNĂ! 🌟💎 Ești LEGENDAR! Nimic nu te poate opri!`},x=[`Bine ai revenit! 🌟 Ești gata pentru o nouă aventură în germană?`,`Salut! Ce bine că ești aici! Hai să învățăm ceva nou astăzi!`,`Hei! 💛 E o zi perfectă pentru a învăța germana! Hai să începem!`,`Bine ai venit! ✨ Vulpea ta preferată te aștepta! Hai la treabă!`,`Salut! 🎯 Fiecare minut petrecut aici te face mai bun! Hai să profităm!`],me=[`Ne-ai lipsit! 💛 E o bucurie că te-ai întors! Hai să continuăm de unde am rămas!`,`Bine ai revenit! 🤗 Nu contează cât timp a trecut, important e că ești aici acum!`,`Eee, cine a apărut! Ce bine că te-ai întors! Hai să recuperăm!`,`Salut! 🌟 Fiecare zi e o nouă șansă de a învăța! Bine ai revenit!`],he=[`Continuă tot așa! 💪`,`Ești pe drumul cel bun! 🛤️`,`Aproape ai terminat! 🏁`,`Excelent! Mergi înainte! 🚀`,`Nu te opri, ești genial! ⭐`];function S(e){return e[Math.floor(Math.random()*e.length)]}function ge(){let e=Math.random();return S(e<.1?y.high:e<.4?y.medium:y.low)}function _e(e){return S(e===100?b.perfect:e>=85?b.great:e>=70?b.good:b.okay)}var C={happy:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-idle`,badge:``},excited:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pop`,badge:``},thinking:{ring:`var(--color-xp)`,glow:`rgba(28,176,246,0.35)`,anim:`avatar-tilt`,badge:`?`},celebrating:{ring:`var(--color-secondary)`,glow:`rgba(206,130,255,0.4)`,anim:`avatar-spin`,badge:``},encouraging:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pulse`,badge:``},sad:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.3)`,anim:`avatar-shake`,badge:``},sleeping:{ring:`var(--text-muted)`,glow:`rgba(120,120,120,0.2)`,anim:``,badge:`z`},love:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.4)`,anim:`avatar-heart`,badge:``},waving:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-wave`,badge:``}},w={sm:44,md:72,lg:104,xl:144};function T(e=`happy`,t=`md`,n=``){let r=C[e]||C.happy,i=w[t]||w.md,a=Math.round(i*.72);return`
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
  `}function ve(e,t=0){return e?t>=5?`celebrating`:t>=3?`excited`:`happy`:`encouraging`}var E=1.3,ye=2.5;function be(e,t){let{interval:n,repetitions:r,easeFactor:i}=e;i||=ye,n||=0,r||=0,t>=3?(n=r===0?1:r===1?6:Math.round(n*i),r+=1):(r=0,n=1),i+=.1-(5-t)*(.08+(5-t)*.02),i<E&&(i=E);let a=new Date;return a.setDate(a.getDate()+n),{interval:n,repetitions:r,easeFactor:Math.round(i*100)/100,nextReview:a.toISOString(),lastReview:new Date().toISOString()}}function xe(e,t){let r=n(),a=r.exerciseHistory.find(t=>t.word===e);a||={word:e,interval:0,repetitions:0,easeFactor:ye,nextReview:new Date().toISOString(),lastReview:null};let o={word:e,...be(a,t)},s=r.exerciseHistory.filter(t=>t.word!==e);s.push(o);let c=[...r.wordsMastered];return o.interval>=21&&!c.includes(e)&&c.push(e),i({exerciseHistory:s,wordsMastered:c}),o}function Se(){let e=n(),t=new Date;return e.exerciseHistory.filter(e=>new Date(e.nextReview)<=t).sort((e,t)=>new Date(e.nextReview)-new Date(t.nextReview))}function Ce(){let e=n(),t=Se();return{totalTracked:e.exerciseHistory.length,dueForReview:t.length,mastered:e.wordsMastered.length}}function D(e){let t=n(),r=ce(),i=ue(),a=m(),o=Ce(),s=new Date().toDateString(),c=t.lastActiveDate,l;l=!c||c===s?S(x):Math.floor((new Date-new Date(c))/864e5)>2?S(me):S(x);let u=pe[a]||(a>0?`🔥 ${a} zile la rând!`:``);return`
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
            <button class="home-icon-btn" id="btn-settings" title="Setări">⚙️</button>
          </div>
        </div>
        
        <!-- Stats Row -->
        <div class="home-stats-row">
          <div class="home-stat" id="btn-profile" style="cursor: pointer;">
            <span class="home-stat-icon">🔥</span>
            <span class="home-stat-value">${r.streak}</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">⭐</span>
            <span class="home-stat-value">${r.xp} XP</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">❤️</span>
            <span class="home-stat-value">${t.hearts}</span>
          </div>
          <div class="home-stat">
            <span class="home-stat-icon">📚</span>
            <span class="home-stat-value">${r.wordsLearned}</span>
          </div>
        </div>
      </div>
      
      <!-- Welcome Section -->
      <div class="home-welcome animate-fadeInUp">
        <div class="home-welcome-mascot">
          ${T(a>3?`excited`:`waving`,`lg`)}
        </div>
        <p class="home-welcome-text">${l}</p>
        ${u?`<p class="home-streak-text">${u}</p>`:``}
      </div>

      <!-- Daily Goal -->
      <div class="home-daily-goal animate-fadeInUp" style="animation-delay: 0.1s;">
        <div class="daily-goal-header">
          <span>🎯 Obiectiv zilnic</span>
          <span class="daily-goal-time">${r.dailyMinutes}/${r.dailyGoal} min</span>
        </div>
        <div class="progress-bar-container" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${Math.min(100,r.dailyMinutes/r.dailyGoal*100)}%; ${r.dailyGoalCompleted?`background: linear-gradient(90deg, #FFC800, #FF9600);`:``}"></div>
        </div>
        ${r.dailyGoalCompleted?`<p class="daily-goal-complete">✅ Obiectiv completat! Bravo!</p>`:``}
      </div>
      
      <!-- Level Progress -->
      <div class="home-level-card animate-fadeInUp" style="animation-delay: 0.15s;">
        <div class="level-info">
          <span class="badge badge-level">Nivel ${r.level}</span>
          <span class="level-name">${r.levelName}</span>
        </div>
        <div class="progress-bar-container" style="height: 12px;">
          <div class="progress-bar-fill" style="width: ${r.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p class="level-xp-text">${r.xpProgress.current}/${r.xpProgress.needed} XP pentru nivelul următor</p>
      </div>

      <!-- Review Section -->
      ${o.dueForReview>0?`
        <div class="home-review-card animate-fadeInUp" style="animation-delay: 0.2s;">
          <button class="btn btn-accent btn-full" id="btn-practice">
            🔄 Repetă ${o.dueForReview} cuvinte
          </button>
        </div>
      `:``}

      <!-- Lesson Map -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.25s;">
        <h2>📖 Lecții</h2>
      </div>
      <div class="lesson-map">
        ${i.map((e,n)=>{let r=h(e.id),a=re(e.id,i),o=t.lessonsCompleted[e.id]?.stars||0,s=.3+n*.08;return`
            <div class="lesson-node animate-fadeInUp ${r?`lesson-completed`:``} ${a?`lesson-unlocked`:`lesson-locked`}"
                 style="animation-delay: ${s}s;"
                 data-lesson-id="${e.id}"
                 ${a?`id="lesson-${e.id}"`:``}>
              <div class="lesson-node-circle">
                <span class="lesson-node-icon">${r?`✅`:a?e.icon:`🔒`}</span>
              </div>
              <div class="lesson-node-info">
                <h3 class="lesson-node-title">${e.title}</h3>
                <p class="lesson-node-subtitle">${e.titleDe}</p>
                ${r?`
                  <div class="lesson-stars">
                    ${`⭐`.repeat(o)}${`☆`.repeat(3-o)}
                  </div>
                `:a?`
                  <p class="lesson-node-desc">${e.description}</p>
                `:`
                  <p class="lesson-node-desc" style="opacity: 0.5;">Completează lecția anterioară</p>
                `}
              </div>
              ${a?`<span class="lesson-node-arrow">→</span>`:``}
            </div>
          `}).join(``)}
      </div>
      
      <!-- Cognates Link -->
      <div class="home-cognates-card animate-fadeInUp" style="animation-delay: 0.8s;">
        <button class="btn btn-secondary btn-full" id="btn-cognates">
          🇷🇴↔🇩🇪 Cuvinte similare Română-Germană
        </button>
      </div>

      <!-- Bottom Spacing -->
      <div style="height: 32px;"></div>
    </div>
  `}function we(e){ue().forEach(t=>{let n=document.getElementById(`lesson-${t.id}`);n&&(n.addEventListener(`click`,()=>e(`lesson`,{lessonId:t.id})),n.addEventListener(`pointermove`,e=>{let t=n.getBoundingClientRect();n.style.setProperty(`--mx`,`${(e.clientX-t.left)/t.width*100}%`),n.style.setProperty(`--my`,`${(e.clientY-t.top)/t.height*100}%`)}))}),document.getElementById(`btn-settings`)?.addEventListener(`click`,()=>e(`settings`)),document.getElementById(`btn-profile`)?.addEventListener(`click`,()=>e(`profile`)),document.getElementById(`btn-practice`)?.addEventListener(`click`,()=>e(`practice`)),document.getElementById(`btn-cognates`)?.addEventListener(`click`,()=>e(`cognates`))}var O=5;function Te(){let e=n(),t=Math.max(0,e.hearts-1);return i({hearts:t}),t}function Ee(){return i({hearts:O}),O}function De(){return Ee(),O}var k=[];function A(){k=window.speechSynthesis?.getVoices()||[],k.length}window.speechSynthesis&&(A(),window.speechSynthesis.onvoiceschanged=A);function j(){return k.length||A(),k.find(e=>e.lang===`de-DE`)||k.find(e=>e.lang.startsWith(`de`))||k.find(e=>e.lang===`de`)||null}function M(e,t=`de-DE`){return new Promise((n,r)=>{if(!window.speechSynthesis){console.warn(`Speech synthesis not supported`),n();return}window.speechSynthesis.cancel();let i=new SpeechSynthesisUtterance(e);i.lang=t,i.rate=.85,i.pitch=1;let a=j();a&&(i.voice=a),i.onend=()=>n(),i.onerror=e=>{console.warn(`Speech error:`,e),n()},window.speechSynthesis.speak(i)})}function Oe(e,t=`de-DE`){return new Promise(n=>{if(!window.speechSynthesis){n();return}window.speechSynthesis.cancel();let r=new SpeechSynthesisUtterance(e);r.lang=t,r.rate=.6,r.pitch=1;let i=j();i&&(r.voice=i),r.onend=()=>n(),r.onerror=()=>n(),window.speechSynthesis.speak(r)})}var N=null;function ke(){return!!(window.SpeechRecognition||window.webkitSpeechRecognition)}function Ae(e=`de-DE`){return new Promise((t,n)=>{if(!ke()){n(Error(`Speech recognition not supported`));return}N=new(window.SpeechRecognition||window.webkitSpeechRecognition),N.lang=e,N.interimResults=!1,N.maxAlternatives=3,N.continuous=!1,N.onresult=e=>{let n=[];for(let t=0;t<e.results[0].length;t++)n.push({transcript:e.results[0][t].transcript.toLowerCase().trim(),confidence:e.results[0][t].confidence});t(n)},N.onerror=e=>{e.error===`no-speech`?t([]):n(Error(`Speech recognition error: ${e.error}`))},N.onend=()=>{},N.start()})}function P(e){let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();switch(n.connect(r),r.connect(t.destination),e){case`correct`:n.frequency.setValueAtTime(523.25,t.currentTime),n.frequency.setValueAtTime(659.25,t.currentTime+.1),n.frequency.setValueAtTime(783.99,t.currentTime+.2),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.4),n.start(t.currentTime),n.stop(t.currentTime+.4);break;case`wrong`:n.frequency.setValueAtTime(200,t.currentTime),n.frequency.setValueAtTime(150,t.currentTime+.15),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.3),n.start(t.currentTime),n.stop(t.currentTime+.3);break;case`complete`:[523.25,587.33,659.25,783.99,1046.5].forEach((e,n)=>{let r=t.createOscillator(),i=t.createGain();r.connect(i),i.connect(t.destination),r.frequency.setValueAtTime(e,t.currentTime+n*.12),i.gain.setValueAtTime(.2,t.currentTime+n*.12),i.gain.exponentialRampToValueAtTime(.01,t.currentTime+n*.12+.3),r.start(t.currentTime+n*.12),r.stop(t.currentTime+n*.12+.3)});break;case`click`:n.frequency.setValueAtTime(800,t.currentTime),r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.05),n.start(t.currentTime),n.stop(t.currentTime+.05);break}}var F=[`#58CC02`,`#CE82FF`,`#FF9600`,`#1CB0F6`,`#FF4B4B`,`#FFC800`,`#89E219`];function I(e=`normal`){let t=document.getElementById(`confetti-container`);if(!t)return;let n=e===`high`?80:e===`low`?20:40;for(let e=0;e<n;e++){let e=document.createElement(`div`);e.className=`confetti-piece`,e.style.left=Math.random()*100+`%`,e.style.backgroundColor=F[Math.floor(Math.random()*F.length)],e.style.width=Math.random()*8+5+`px`,e.style.height=Math.random()*8+5+`px`,e.style.borderRadius=Math.random()>.5?`50%`:`2px`,e.style.animationDuration=Math.random()*2+1.5+`s`,e.style.animationDelay=Math.random()*.5+`s`,e.style.opacity=Math.random()*.5+.5,t.appendChild(e),setTimeout(()=>e.remove(),4e3)}}function je(e=5){let t=document.getElementById(`confetti-container`);if(t)for(let n=0;n<e;n++){let e=document.createElement(`div`);e.textContent=`⭐`,e.style.cssText=`
      position: absolute;
      font-size: ${Math.random()*20+20}px;
      left: ${Math.random()*80+10}%;
      top: ${Math.random()*40+20}%;
      animation: popIn 0.5s ease forwards;
      animation-delay: ${n*.15}s;
      opacity: 0;
      pointer-events: none;
    `,t.appendChild(e),setTimeout(()=>e.remove(),2e3)}}function L(e,t=`success`,n=3e3){let r=document.getElementById(`toast-container`);if(!r)return;let i=document.createElement(`div`);i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-icon">${{success:`✅`,error:`❌`,info:`ℹ️`,warning:`⚠️`,badge:`🏅`,xp:`⭐`,streak:`🔥`,heart:`❤️`,levelup:`🎉`}[t]||`✨`}</span>
    <span class="toast-message">${e}</span>
  `,r.appendChild(i),setTimeout(()=>{i.classList.add(`toast-exit`),setTimeout(()=>i.remove(),300)},n)}function Me(e){L(`+${e} XP`,`xp`,2e3)}function Ne(e){L(`${e.icon} Insignă nouă: ${e.name}!`,`badge`,4e3)}function Pe(e,t){L(`🎉 Nivel nou: ${e} — ${t}!`,`levelup`,4e3)}function Fe(e){let t=e.options.map((e,t)=>`
      <button class="mc-option card card-interactive animate-fadeInUp"
              data-value="${e}"
              style="animation-delay: ${t*.08}s;">
        <span class="mc-option-letter">${String.fromCharCode(65+t)}</span>
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
        ${t}
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
  `}function Ie(e){let t=e.type===`translate_ro_de`,n=t?`Tradu în germană 🇩🇪`:`Tradu în română 🇷🇴`,r=t?`🇩🇪`:`🇷🇴`,i=t?`🇷🇴 Română`:`🇩🇪 Germană`,a=t?`🇩🇪 Germană`:`🇷🇴 Română`,o=t?`Scrie traducerea în germană...`:`Scrie traducerea în română...`;return`
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
  `}function R(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Le(e){let t=e.pairs.map((e,t)=>({value:e[0],index:t})),n=e.pairs.map((e,t)=>({value:e[1],index:t})),r=R(t),i=R(n);return`
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
  `}function Re(e){return`
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
  `}function ze(e){return`
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
  `}function Be(e){return`
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
  `}var z=0,B=0,V=0,H=0,U=null,W=5,G=!1,K=null;function q(e,t){let n=v(t.lessonId);return n?(U=n,z=0,B=0,V=0,H=0,G=!1,W=De(),K=Date.now(),Ve(e)):(e(`home`),`<p>Lecția nu a fost găsită.</p>`)}function Ve(e){let t=U,n=t.exercises[z],r=z/t.exercises.length*100,i=Array.from({length:5},(e,t)=>`<span class="heart-icon ${t<W?`heart-active`:`heart-empty`}">${t<W?`❤️`:`🤍`}</span>`).join(``),a=``;switch(n.type){case`multiChoice`:a=Fe(n);break;case`translate_ro_de`:case`translate_de_ro`:a=Ie(n);break;case`match`:a=Le(n);break;case`fillBlank`:a=Re(n);break;case`listen`:a=ze(n);break;case`speak`:a=Be(n);break;default:a=`<p>Tip necunoscut: ${n.type}</p>`}let o=z>0&&z%4==0&&H>=2;return`
    <div class="lesson-screen">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <button class="lesson-close-btn" id="btn-close-lesson">✕</button>
        <div class="progress-bar-container" style="flex: 1;">
          <div class="progress-bar-fill" style="width: ${r}%;"></div>
        </div>
        <div class="lesson-hearts">${i}</div>
      </div>
      
      <!-- Lesson Title -->
      <div class="lesson-title-bar">
        <span class="lesson-title-text">${t.icon} ${t.title}</span>
        <span class="lesson-counter">${z+1}/${t.exercises.length}</span>
      </div>
      
      ${o?`
        <div class="lesson-encouragement animate-fadeInDown">
          ${S(he)}
        </div>
      `:``}
      
      <!-- Exercise Area -->
      <div class="exercise-area animate-fadeInUp" id="exercise-area">
        ${a}
      </div>
      
      <!-- Feedback Area (hidden by default) -->
      <div class="feedback-area hidden" id="feedback-area"></div>
    </div>
  `}function J(e,t){let n=v(t.lessonId);if(!n)return;document.getElementById(`btn-close-lesson`)?.addEventListener(`click`,()=>{confirm(`Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.`)&&e(`home`)});let r=n.exercises[z];He(r,e,t)}function He(e,t,n){switch(e.type){case`multiChoice`:Ue(e,t,n);break;case`translate_ro_de`:case`translate_de_ro`:We(e,t,n);break;case`match`:qe(e,t,n);break;case`fillBlank`:Ke(e,t,n);break;case`listen`:Je(e,t,n);break;case`speak`:Xe(e,t,n);break}}function Ue(e,t,n){document.querySelectorAll(`.mc-option`).forEach(r=>{r.addEventListener(`click`,()=>{if(G)return;let i=r.dataset.value,a=i===e.correct;X(a,e.correct,t,n),document.querySelectorAll(`.mc-option`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===e.correct&&t.classList.add(`mc-correct`),t.dataset.value===i&&!a&&t.classList.add(`mc-wrong`)})})})}function We(e,t,n){let r=document.getElementById(`translate-input`),i=document.getElementById(`btn-check-translate`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&Ge(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||Ge(e,t,n)}),document.getElementById(`btn-speak-word`)?.addEventListener(`click`,()=>{M(e.type===`translate_de_ro`?e.prompt:e.answer)})}function Ge(e,t,n){let r=document.getElementById(`translate-input`);if(!r)return;let i=r.value.trim().toLowerCase(),a=e.answer.toLowerCase(),o=(e.alts||[]).map(e=>e.toLowerCase()),s=i===a||o.includes(i);r.classList.add(s?`input-success`:`input-error`),X(s,e.answer,t,n)}function Ke(e,t,n){let r=document.getElementById(`fillblank-input`),i=document.getElementById(`btn-check-fillblank`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&Y(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||Y(e,t,n)})}function Y(e,t,n){let r=document.getElementById(`fillblank-input`);if(!r)return;let i=r.value.trim().toLowerCase()===e.answer.toLowerCase();r.classList.add(i?`input-success`:`input-error`),X(i,e.answer,t,n)}function qe(e,t,n){let r=null,i=null,a=0,o=e.pairs.length;document.querySelectorAll(`.match-item`).forEach(s=>{s.addEventListener(`click`,()=>{if(s.classList.contains(`match-done`))return;let c=s.dataset.side,l=s.dataset.value,u=s.dataset.index;if(c===`left`?(document.querySelectorAll(`.match-item[data-side="left"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),r={value:l,index:u,el:s}):(document.querySelectorAll(`.match-item[data-side="right"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),i={value:l,index:u,el:s}),r&&i){let s=e.pairs[r.index];s&&s[1]===i.value?(r.el.classList.add(`match-done`,`match-correct-anim`),i.el.classList.add(`match-done`,`match-correct-anim`),a++,P(`click`),a===o&&setTimeout(()=>X(!0,``,t,n),500)):(r.el.classList.add(`match-wrong-anim`),i.el.classList.add(`match-wrong-anim`),setTimeout(()=>{r.el.classList.remove(`match-selected`,`match-wrong-anim`),i.el.classList.remove(`match-selected`,`match-wrong-anim`)},600)),r=null,i=null}})})}function Je(e,t,n){document.getElementById(`btn-play-audio`)?.addEventListener(`click`,()=>M(e.word)),document.getElementById(`btn-play-slow`)?.addEventListener(`click`,()=>{Oe(e.word)}),setTimeout(()=>M(e.word),500);let r=document.getElementById(`listen-input`),i=document.getElementById(`btn-check-listen`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&Ye(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||Ye(e,t,n)})}function Ye(e,t,n){let r=document.getElementById(`listen-input`);if(!r)return;let i=r.value.trim().toLowerCase(),a=e.answer.toLowerCase(),o=e=>e.replace(/[?.!,]/g,``).replace(/\s+/g,` `).trim(),s=o(i)===o(a);r.classList.add(s?`input-success`:`input-error`),X(s,e.answer,t,n)}function Xe(e,t,n){document.getElementById(`btn-hear-word`)?.addEventListener(`click`,()=>M(e.word)),setTimeout(()=>M(e.word),500);let r=document.getElementById(`btn-record`),i=!1;r?.addEventListener(`click`,async()=>{if(!G&&!i){i=!0,r.classList.add(`recording`),r.innerHTML=`🔴 Ascult...`;try{let a=await Ae(`de-DE`);if(r.classList.remove(`recording`),r.innerHTML=`🎤 Încearcă din nou`,i=!1,a.length>0){let r=e.word.toLowerCase().replace(/[?.!,]/g,``).trim(),i=a.some(e=>{let t=e.transcript.replace(/[?.!,]/g,``).trim();return t===r||t.includes(r)||r.includes(t)}),o=document.getElementById(`speak-result`);o&&(o.innerHTML=`<p>Ai spus: "<strong>${a[0].transcript}</strong>"</p>`,o.classList.remove(`hidden`)),X(i,e.word,t,n)}else{let e=document.getElementById(`speak-result`);e&&(e.innerHTML=`<p>Nu am auzit nimic. Încearcă din nou! 🎤</p>`,e.classList.remove(`hidden`))}}catch(e){console.error(`Speech recognition error:`,e),r.classList.remove(`recording`),r.innerHTML=`🎤 Încearcă din nou`,i=!1;let a=document.getElementById(`speak-result`);a&&(a.innerHTML=`
          <p>Recunoașterea vocală nu este disponibilă în acest browser. 😔</p>
          <button class="btn btn-secondary btn-sm" id="btn-skip-speak">Treci mai departe →</button>
        `,a.classList.remove(`hidden`),document.getElementById(`btn-skip-speak`)?.addEventListener(`click`,()=>{X(!0,``,t,n)}))}}})}function X(e,t,n,r){G=!0;let i=U.exercises[z];if(e){B++,H++,ae();let e=10+(H>=3?5:0);p(e),i.word&&g(i.word),i.prompt&&g(i.prompt),i.correct&&g(i.correct);let a=i.word||i.prompt||i.correct;a&&xe(a,4),P(`correct`);let o=Math.random();o<.1&&H>=3?I(`high`):o<.3&&je(3),Ze(!0,ge(),t,n,r),setTimeout(()=>Me(e),500)}else{V++,H=0,W=Te(),ie({exercise:i,lessonId:r.lessonId,timestamp:new Date().toISOString()});let e=i.word||i.prompt||i.correct;e&&xe(e,1),P(`wrong`),Ze(!1,S(de),t,n,r)}}function Ze(e,t,n,r,i){let a=document.getElementById(`feedback-area`);if(!a)return;let o=ve(e,H);a.innerHTML=`
    <div class="feedback-bar ${e?`feedback-bar-correct`:`feedback-bar-wrong`} feedback-${e?`correct`:`wrong`}">
      <div class="feedback-content">
        <div class="feedback-mascot">
          ${T(o,`sm`)}
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
  `,a.classList.remove(`hidden`),document.getElementById(`btn-continue`)?.addEventListener(`click`,()=>{if(a.classList.add(`hidden`),W<=0){Qe(r,i);return}if(z++,z>=U.exercises.length)$e(r,i);else{G=!1;let e=document.getElementById(`app`);e.innerHTML=Ve(r),J(r,i)}})}function Qe(e,t){let n=S(fe),r=document.getElementById(`app`);r.innerHTML=`
    <div class="hearts-gone-screen">
      <div class="hearts-gone-content animate-scaleIn">
        ${T(`encouraging`,`xl`,n)}
        <div class="hearts-gone-actions" style="margin-top: 32px;">
          <button class="btn btn-primary btn-full btn-lg" id="btn-retry-lesson">
            🔄 Încearcă din nou
          </button>
          <button class="btn btn-secondary btn-full" id="btn-go-home" style="margin-top: 12px;">
            🏠 Acasă
          </button>
        </div>
      </div>
    </div>
  `,document.getElementById(`btn-retry-lesson`)?.addEventListener(`click`,()=>{r.innerHTML=q(e,t),J(e,t)}),document.getElementById(`btn-go-home`)?.addEventListener(`click`,()=>e(`home`))}function $e(e,t){let n=U.exercises.length,r=Math.round(B/n*100),i=Math.round((Date.now()-K)/6e4),a=ne(t.lessonId,r,n);ee(Math.max(1,i)),P(`complete`),I(r===100?`high`:`normal`),setTimeout(()=>{a.newBadges.forEach((e,t)=>{setTimeout(()=>Ne(e),t*1500)}),a.xpResult.leveledUp&&setTimeout(()=>Pe(a.xpResult.level,d(a.xpResult.level)),800)},1e3),e(`results`,{lessonId:t.lessonId,score:r,stars:a.stars,correctCount:B,totalExercises:n,xpGained:a.bonusXP,newBadges:a.newBadges})}function et(e,t){let{lessonId:n,score:r,stars:i,correctCount:a,totalExercises:o,xpGained:s,newBadges:c}=t,l=v(n),u=l?`${l.icon} ${l.title}`:`Lecție`,d=_e(r),f=Array.from({length:3},(e,t)=>{let n=t<i,r=t===1?`64px`:`48px`,a=.3+t*.2;return`
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
        ${T(r===100?`celebrating`:r>=80?`excited`:r>=60?`happy`:`encouraging`,`xl`,d)}
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
  `}function tt(e,t){setTimeout(()=>{I(t.score===100?`high`:`normal`)},300),setTimeout(()=>P(`complete`),100),document.getElementById(`btn-results-continue`)?.addEventListener(`click`,()=>{e(`home`)}),document.getElementById(`btn-results-retry`)?.addEventListener(`click`,()=>{e(`lesson`,{lessonId:t.lessonId})})}var nt=[{ro:`spital`,de:`Spital`,meaning:`hospital`,category:`sănătate`},{ro:`scandal`,de:`Skandal`,meaning:`scandal`,category:`general`},{ro:`rucksac`,de:`Rucksack`,meaning:`backpack`,category:`obiecte`},{ro:`șină`,de:`Schiene`,meaning:`rail/track`,category:`transport`},{ro:`cartof`,de:`Kartoffel`,meaning:`potato`,category:`mâncare`},{ro:`bere`,de:`Bier`,meaning:`beer`,category:`mâncare`},{ro:`dans`,de:`Tanz`,meaning:`dance`,category:`general`},{ro:`muzică`,de:`Musik`,meaning:`music`,category:`cultură`},{ro:`sport`,de:`Sport`,meaning:`sport`,category:`activități`},{ro:`telefon`,de:`Telefon`,meaning:`telephone`,category:`obiecte`},{ro:`hotel`,de:`Hotel`,meaning:`hotel`,category:`călătorii`},{ro:`restaurant`,de:`Restaurant`,meaning:`restaurant`,category:`mâncare`},{ro:`parc`,de:`Park`,meaning:`park`,category:`locuri`},{ro:`familie`,de:`Familie`,meaning:`family`,category:`oameni`},{ro:`universitate`,de:`Universität`,meaning:`university`,category:`educație`},{ro:`profesor`,de:`Professor`,meaning:`professor`,category:`educație`},{ro:`student`,de:`Student`,meaning:`student`,category:`educație`},{ro:`natură`,de:`Natur`,meaning:`nature`,category:`natură`},{ro:`pasaport`,de:`Pass / Reisepass`,meaning:`passport`,category:`călătorii`},{ro:`ciocolată`,de:`Schokolade`,meaning:`chocolate`,category:`mâncare`},{ro:`lampă`,de:`Lampe`,meaning:`lamp`,category:`obiecte`},{ro:`clasă`,de:`Klasse`,meaning:`class`,category:`educație`},{ro:`mașină`,de:`Maschine`,meaning:`machine`,category:`obiecte`},{ro:`poliție`,de:`Polizei`,meaning:`police`,category:`general`},{ro:`banană`,de:`Banane`,meaning:`banana`,category:`mâncare`},{ro:`tomată`,de:`Tomate`,meaning:`tomato`,category:`mâncare`},{ro:`supă`,de:`Suppe`,meaning:`soup`,category:`mâncare`},{ro:`garaj`,de:`Garage`,meaning:`garage`,category:`locuri`},{ro:`balcon`,de:`Balkon`,meaning:`balcony`,category:`locuri`},{ro:`radio`,de:`Radio`,meaning:`radio`,category:`obiecte`}];function rt(){let e={};return nt.forEach(t=>{e[t.category]||(e[t.category]=[]),e[t.category].push(t)}),e}var it={sănătate:`🏥`,general:`📋`,obiecte:`🔧`,transport:`🚂`,mâncare:`🍽️`,cultură:`🎭`,activități:`⚽`,călătorii:`✈️`,locuri:`📍`,oameni:`👥`,educație:`📚`,natură:`🌿`};function at(e){let t=rt(),n=Object.keys(t),r=n.map((e,n)=>{let r=t[e],i=it[e]||`📂`,a=.2+n*.1,o=r.map(e=>`
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
        ${T(`thinking`,`lg`,`Știai că româna și germana au multe cuvinte similare?`)}
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
            ${nt.length}
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
  `}function ot(e){document.getElementById(`btn-back-cognates`)?.addEventListener(`click`,()=>{e(`home`)}),document.querySelectorAll(`.cognate-speak-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.word;n&&(e.style.transform=`scale(1.2)`,e.style.background=`rgba(28, 176, 246, 0.25)`,setTimeout(()=>{e.style.transform=`scale(1)`,e.style.background=`rgba(28, 176, 246, 0.1)`},300),M(n))})})}function st(e){let t=ce(),r=se();n();let i=r.filter(e=>e.earned).length,a=t.level>3?`celebrating`:`happy`,o=t.level>3?`Ești un adevărat campion! 🏆`:`Continuă să înveți, ești minunat! 💛`,s=[{icon:`⭐`,label:`XP Total`,value:t.xp,color:`var(--color-xp)`},{icon:`🔥`,label:`Serie zilnică`,value:`${t.streak} zile`,color:`var(--color-streak)`},{icon:`📚`,label:`Cuvinte învățate`,value:t.wordsLearned,color:`var(--color-secondary)`},{icon:`🎯`,label:`Precizie`,value:`${t.accuracy}%`,color:`var(--color-primary)`},{icon:`✅`,label:`Lecții completate`,value:t.totalLessonsCompleted,color:`var(--color-primary-dark)`},{icon:`⏱️`,label:`Obiectiv zilnic`,value:`${t.dailyMinutes}/${t.dailyGoal} min`,color:`var(--color-accent)`}].map((e,t)=>`
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
  `).join(``),c=r.map((e,t)=>`
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
          👤 Profilul Meu
        </h1>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${T(a,`lg`,o)}
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
          ${i} din ${r.length} deblocate
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
  `}function ct(e){document.getElementById(`btn-back-profile`)?.addEventListener(`click`,()=>{e(`home`)})}var lt=[{value:5,label:`5 min`,emoji:`🌱`,desc:`Relaxat`},{value:10,label:`10 min`,emoji:`📚`,desc:`Normal`},{value:15,label:`15 min`,emoji:`💪`,desc:`Serios`},{value:20,label:`20 min`,emoji:`🔥`,desc:`Intens`}];function ut(e){let t=n(),r=t.dailyGoalMinutes||10,i=t.theme===`dark`,a=lt.map(e=>`
    <label class="goal-option card-interactive" data-value="${e.value}" style="
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--border-radius-lg);
      border: 2px solid ${r===e.value?`var(--color-primary)`:`var(--border-color)`};
      background: ${r===e.value?`var(--color-success-bg)`:`var(--bg-card)`};
      cursor: pointer;
      transition: all var(--transition-fast);
      margin-bottom: var(--space-sm);
      box-shadow: var(--shadow-sm);
    ">
      <input type="radio" name="daily-goal" value="${e.value}"
        ${r===e.value?`checked`:``}
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
        border: 2px solid ${r===e.value?`var(--color-primary)`:`var(--border-color)`};
        background: ${r===e.value?`var(--color-primary)`:`transparent`};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        flex-shrink: 0;
      ">
        ${r===e.value?`<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>`:``}
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
        ${T(`happy`,`md`,`Personalizează-ți experiența!`)}
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
          ${a}
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
            ${i?`checked`:``}
            style="opacity: 0; width: 0; height: 0; position: absolute;">
          <span style="
            position: absolute;
            inset: 0;
            background: ${i?`var(--color-primary)`:`var(--border-color)`};
            border-radius: 999px;
            transition: all var(--transition-normal);
          "></span>
          <span style="
            position: absolute;
            top: 2px;
            left: ${i?`26px`:`2px`};
            width: 24px;
            height: 24px;
            background: white;
            border-radius: var(--border-radius-full);
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-sm);
          "></span>
        </label>
      </div>

      <!-- Danger Zone -->
      <div class="animate-fadeInUp" style="animation-delay: 0.3s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-hearts); margin-bottom: var(--space-sm);">
          ⚠️ Zonă periculoasă
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Atenție! Această acțiune nu poate fi anulată.
        </p>
        <button class="btn btn-danger btn-full" id="btn-reset-progress">
          🗑️ Resetează tot progresul
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
  `}function dt(e){document.getElementById(`btn-back-settings`)?.addEventListener(`click`,()=>{e(`home`)}),document.querySelectorAll(`.goal-option`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.value);t&&(te(t),document.querySelectorAll(`.goal-option`).forEach(e=>{let n=parseInt(e.dataset.value)===t;e.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,e.style.background=n?`var(--color-success-bg)`:`var(--bg-card)`;let r=e.querySelector(`div:last-child`);r&&(r.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,r.style.background=n?`var(--color-primary)`:`transparent`,r.innerHTML=n?`<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>`:``);let i=e.querySelector(`input[type="radio"]`);i&&(i.checked=n)}))})});let t=document.getElementById(`toggle-dark-mode`);t&&t.addEventListener(`change`,()=>{let e=t.checked;i({theme:e?`dark`:`light`}),document.documentElement.setAttribute(`data-theme`,e?`dark`:`light`);let n=t.nextElementSibling?.nextElementSibling;n&&(n.style.left=e?`26px`:`2px`);let r=t.nextElementSibling;r&&(r.style.background=e?`var(--color-primary)`:`var(--border-color)`)}),document.getElementById(`btn-reset-progress`)?.addEventListener(`click`,()=>{confirm(`⚠️ Ești absolut sigur?

Tot progresul tău va fi șters:
- XP și nivel
- Lecții completate
- Insigne câștigate
- Serie zilnică

Această acțiune NU poate fi anulată!`)&&confirm(`Ultima confirmare: chiar vrei să ștergi TOT?`)&&(a(),document.documentElement.removeAttribute(`data-theme`),e(`home`))})}function ft(e){let t=n(),r=Ce(),i=Se(),a=t.mistakes.slice(0,20),o=i.length>0,s=a.length>0;return`
    <div class="practice-screen">
      <button class="screen-back-btn" id="btn-back-practice">← Înapoi</button>
      <h1 class="screen-title">🔄 Hub de Practică</h1>
      <p class="screen-subtitle">Repetă cuvintele și corectează greșelile pentru a le fixa în memorie!</p>
      
      ${!o&&!s?`
        <div class="practice-empty animate-scaleIn">
          ${T(`happy`,`lg`,`Nu ai nimic de repetat acum! Completează lecții noi și revino mai târziu! 🌟`)}
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
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-xp);">${r.dueForReview}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Cuvinte stăpânite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-primary);">${r.mastered}</p>
            </div>
            <div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Total urmărite</p>
              <p style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-secondary);">${r.totalTracked}</p>
            </div>
          </div>
        </div>
        
        ${o?`
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            📖 Cuvinte de repetat (${i.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${i.slice(0,15).map((e,t)=>`
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
        
        ${s?`
          <h2 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-md);">
            ❌ Greșeli recente (${a.length})
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${a.slice(0,10).map((e,t)=>{let n=e.exercise,r=n.prompt||n.question||n.word||n.sentence||``,i=n.answer||n.correct||``;return`
                <div class="card animate-fadeInUp" style="animation-delay: ${t*.05}s; padding: var(--space-md);">
                  <p style="font-weight: 700; font-size: var(--font-size-sm); color: var(--text-primary);">${r}</p>
                  <p style="font-size: var(--font-size-xs); color: var(--color-primary); margin-top: 4px;">
                    ✅ Răspuns corect: <strong>${i}</strong>
                  </p>
                </div>
              `}).join(``)}
          </div>
        `:``}
      `}
    </div>
  `}function pt(e){document.getElementById(`btn-back-practice`)?.addEventListener(`click`,()=>e(`home`)),document.getElementById(`btn-practice-home`)?.addEventListener(`click`,()=>e(`home`)),document.querySelectorAll(`.practice-speak-btn`).forEach(e=>{e.addEventListener(`click`,()=>M(e.dataset.word))})}var Z=`home`,Q={};function mt(){let e=n();document.documentElement.setAttribute(`data-theme`,e.theme||`light`)}function $(e,t={}){Z=e,Q=t,ht(),window.scrollTo(0,0)}function ht(){let e=document.getElementById(`app`);if(!e)return;let t=``;switch(Z){case`home`:t=D($);break;case`lesson`:t=q($,Q);break;case`results`:t=et($,Q);break;case`cognates`:t=at($);break;case`profile`:t=st($);break;case`settings`:t=ut($);break;case`practice`:t=ft($);break;default:t=D($)}e.innerHTML=t,requestAnimationFrame(()=>{switch(Z){case`home`:we($);break;case`lesson`:J($,Q);break;case`results`:tt($,Q);break;case`cognates`:ot($);break;case`profile`:ct($);break;case`settings`:dt($);break;case`practice`:pt($);break}})}function gt(){mt(),m(),$(`home`);let e=Date.now();window.addEventListener(`beforeunload`,()=>{let t=Math.round((Date.now()-e)/6e4);if(t>0){let e=n(),r=new Date().toDateString();e.lastActiveDate===r&&i({dailyMinutesToday:e.dailyMinutesToday+t})}})}document.addEventListener(`DOMContentLoaded`,gt),window.__navigate=$;