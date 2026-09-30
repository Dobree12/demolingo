import{A as e,B as t,C as n,D as r,E as i,F as a,I as o,L as s,M as c,N as l,O as u,P as d,R as f,S as p,T as m,_ as h,a as g,b as _,c as v,d as ee,f as te,g as ne,h as re,i as ie,j as ae,k as oe,l as se,m as y,n as b,o as x,p as ce,r as le,s as S,t as ue,u as C,v as de,w as fe,x as pe,y as me,z as he}from"./sections-GsQmv5Zb.js";var ge=3e4,_e=9e4,ve=4,ye=Date.now(),w=0,be=0,xe=!1;function Se(){ye=Date.now()}function T(){w<=0||(t({totalMinutes:(d().totalMinutes||0)+w}),i(w),w=0,be=0)}function Ce(){xe||(xe=!0,document.addEventListener(`pointerdown`,Se,{passive:!0}),document.addEventListener(`keydown`,Se,{passive:!0}),setInterval(()=>{document.visibilityState===`visible`&&Date.now()-ye<_e&&(w+=.5,be++,be>=ve&&T())},ge),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&T()}),window.addEventListener(`pagehide`,T))}var we=1.3,Te=2.5;function Ee(e,t){let{interval:n,repetitions:r,easeFactor:i}=e;i||=Te,n||=0,r||=0,t>=3?(n=r===0?1:r===1?6:Math.round(n*i),r+=1):(r=0,n=1),i+=.1-(5-t)*(.08+(5-t)*.02),i<we&&(i=we);let a=new Date;return a.setDate(a.getDate()+n),{interval:n,repetitions:r,easeFactor:Math.round(i*100)/100,nextReview:a.toISOString(),lastReview:new Date().toISOString()}}function De(e){if(!e)return null;let t=[];switch(e.type){case`multiChoice`:{let n=e.question||``,r=/"([^"]+)"/.exec(n);r&&!/^Cum (se )?spu/i.test(n)&&t.push(r[1]),t.push(e.correct);break}case`translate_de_ro`:t.push(e.prompt);break;case`translate_ro_de`:t.push(e.answer);break;case`listen`:case`speak`:case`listenChoice`:t.push(e.word);break;case`trueFalse`:t.push(e.de);break;case`picturePick`:t.push(e.wordDe);break;default:return null}for(let e of t){let t=e?v(e):null;if(t)return t.de}return null}function Oe(){let e=d(),n=new Map,r=!1;for(let t of e.exerciseHistory){let e=v(t.word)?.de;if(e!==t.word&&(r=!0),!e)continue;let i=n.get(e);!i||(t.lastReview||``)>(i.lastReview||``)?(i&&(r=!0),n.set(e,{...t,word:e})):r=!0}let i=[...new Set(e.wordsMastered.map(e=>v(e)?.de).filter(Boolean))];i.join(`|`)!==e.wordsMastered.join(`|`)&&(r=!0),r&&t({exerciseHistory:[...n.values()],wordsMastered:i})}function ke(e,n){let r=d(),i=r.exerciseHistory.find(t=>t.word===e);i||={word:e,interval:0,repetitions:0,easeFactor:Te,nextReview:new Date().toISOString(),lastReview:null};let a={word:e,...Ee(i,n)},o=r.exerciseHistory.filter(t=>t.word!==e);o.push(a);let s=[...r.wordsMastered];return a.interval>=21&&!s.includes(e)&&s.push(e),t({exerciseHistory:o,wordsMastered:s}),a}function Ae(){let e=d(),t=new Date;return e.exerciseHistory.filter(e=>new Date(e.nextReview)<=t).sort((e,t)=>new Date(e.nextReview)-new Date(t.nextReview))}var je=[`mcDeRo`,`mcRoDe`,`translateDeRo`,`translateRoDe`,`listen`,`listenChoice`,`trueFalse`,`picturePick`],Me=14;function Ne(){let e=Ae().slice(0,Me).map(e=>v(e.word)).filter(Boolean).map(e=>({de:e.de,ro:e.ro,article:e.article,category:e.category}));if(!e.length)return[];let t=new Set(e.map(e=>e.category)),n=e=>({de:e.de,ro:e.ro,article:e.article}),r=S.filter(e=>t.has(e.category)).map(n);return r.length<8&&(r=S.filter(e=>e.category!==`functionale`).map(n)),g({words:e.map(n),pool:r,count:Math.min(Me,Math.max(e.length,6)),seed:`review:${Date.now()}`,types:je})}function Pe(){let e=d(),t=Ae();return{totalTracked:e.exerciseHistory.length,dueForReview:t.length,mastered:e.wordsMastered.length}}var Fe=`invatam_germana_sync`,Ie=`/api/progress.php`,Le=180*1e3;function Re(){try{return JSON.parse(localStorage.getItem(Fe))||null}catch{return null}}function ze(e){try{e?localStorage.setItem(Fe,JSON.stringify(e)):localStorage.removeItem(Fe)}catch(e){console.error(`sync settings:`,e)}}function Be(){return Re()}function E(e){let t=Re();t&&ze({...t,...e})}function Ve(){let t=Re(),n=e();return!t?.key||!n||n.id!==t.profileId?null:{s:t,user:n}}async function He(e){let t=await fetch(Ie,{headers:{"X-Key":e},cache:`no-store`});if(t.status===403)throw Error(`Cheie greșită.`);if(t.status!==200&&t.status!==404)throw Error(`Serverul a răspuns ${t.status}.`);let n=await t.json().catch(()=>({}));return{access:n.access,server:t.status===200?n:null}}async function Ue(e){return(await He(e)).server}var We=6e4;async function Ge(e,t,n,r=!1){let i=JSON.stringify({key:e,force:r,profile:{name:t.name,avatar:t.avatar},state:n}),a=await fetch(Ie,{method:`POST`,headers:{"Content-Type":`application/json`},body:i,keepalive:i.length<We}),o=await a.json().catch(()=>({}));return{status:a.status,body:o}}var D=``,O=null;function k({force:e=!1}={}){let t=Ve();if(!t)return Promise.resolve(!1);let n=d(),r=JSON.stringify(n);return!e&&r===D?Promise.resolve(!0):O||(O=(async()=>{try{let{status:i,body:a}=await Ge(t.s.key,t.user,n,e);return i===200?(D=r,E({lastSyncAt:new Date().toISOString(),lastError:null,conflict:null}),!0):(E(i===409?{lastError:`regression`,conflict:a.server||{}}:{lastError:a.error||`http_${i}`}),!1)}catch{return E({lastError:navigator.onLine===!1?`offline`:`network`}),!1}finally{O=null}})(),O)}async function Ke(t){let n=e();if(!n)throw Error(`Alege mai întâi un profil.`);let{access:r,server:i}=await He(t);if(r!==`write`)throw Error(`Aceasta este cheia de citire — ea se folosește doar în pagina progres.html. Aici trebuie cheia de scriere.`);ze({key:t,profileId:n.id,enabledAt:new Date().toISOString()});let a=d(),o=i?.state?.totalAttempts||0;return i&&o>(a.totalAttempts||0)?{needsChoice:!0,server:i}:{needsChoice:!1,ok:await k({force:!1})}}function qe(){ze(null),D=``}async function Je(){let e=Ve();if(!e)throw Error(`Sincronizarea nu e activă pentru acest profil.`);let t=await Ue(e.s.key);if(!t?.state)throw Error(`Pe server nu există progres salvat.`);return f(t.state),D=JSON.stringify(d()),E({lastSyncAt:new Date().toISOString(),lastError:null,conflict:null}),t}var Ye=!1;function Xe(){Ye||(Ye=!0,setInterval(()=>{k()},Le),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&k()}),window.addEventListener(`online`,()=>k()),setTimeout(()=>k(),5e3))}var Ze={low:[`Corect! 👍`,`Foarte bine! ✨`,`Exact! 🎯`,`Bravo! 👏`,`Așa da! 💚`,`Perfect! ✅`,`Minunat! 🌟`,`Ai dreptate! 👍`,`Da, corect! ✨`,`Bine lucrat! 💪`],medium:[`Excelent! Creierul tău lucrează de minune! 🧠✨`,`WOW, ești pe val! Continuă tot așa! 🌊🔥`,`Incredibil! Ai un talent natural pentru germană! 🌟`,`Ai nimerit-o din prima! Asta se cheamă progres! 📈`,`Super! Memoria ta e de fier! 💪🧲`,`Exact! Simți cum devii mai bun? Eu simt! 🚀`,`Bravo! Cu fiecare răspuns corect, germana devine mai ușoară! 🎯`],high:[`SPECTACULOS! 🎉🎊 Ești absolut genial! Merită o sărbătoare!`,`Nu-mi vine să cred! 🤩 Ești un MAESTRU al germanei! Aplauze stând în picioare! 👏👏👏`,`BOOM! 💥 Răspuns perfect! Ai merita o medalie! 🏅`,`FENOMENAL! 🌈✨ La cum progresezi, vei vorbi germana fluent în curând!`]},Qe=[`Hmm, nu chiar, dar nu-i nimic! Hai să vedem împreună... 🤗`,`Aproape! Nu te descuraja, greșelile sunt parte din învățare! 💛`,`Nu e răspunsul corect, dar ești pe drumul cel bun! 💪`,`Ups! Dar știi ce? Creierul tău tocmai a învățat ceva important! 🧠`,`Nu de data asta, dar următoarea va fi a ta! ✨`,`Greșelile sunt cele mai bune profesoare! Hai să încercăm din nou! 📚`,`Încă nu ai nimerit, dar faptul că încerci e cel mai important! 🌟`,`Nu e corect, dar nu renunța! Fiecare greșeală te face mai puternic! 💪`,`Oops! Dar fiecare campion a trecut prin momente ca ăsta! 🏆`,`Nu-i nimic! Hai să privim răspunsul corect și să mergem mai departe! 🚀`],$e=[`Nu-i nimic! Îl vei reîntâlni la practică 💛`,`E în regulă, mergem mai departe! Cuvântul ăsta revine la repetiție 🌱`,`Niciun stres! Data viitoare îl știi sigur 💪`,`Trecem peste — învățarea nu e o cursă! 😊`],A={perfect:[`PERFECȚIUNE ABSOLUTĂ! 💯🎉 Ai răspuns corect la TOATE întrebările! Ești incredibil!`,`SCOR PERFECT! 🌟🏆 Nu ai greșit NIMIC! Ești un geniu al germanei!`],great:[`Lecție terminată cu brio! 🎉 Ai fost fantastic! Continuă tot așa!`,`WOW! Rezultat excelent! 🌟 Ești din ce în ce mai bun!`,`Bravo! 🏆 Ce lecție reușită! Germana ta se îmbunătățește vizibil!`],good:[`Lecție completă! 👏 Ai făcut treabă bună! Cu fiecare lecție devii mai bun!`,`Bine lucrat! ✨ Continuă și vei fi expert în curând!`,`Felicitări! 🎯 Ai terminat lecția! Progresul tău e real și important!`],okay:[`Ai reușit să termini lecția! 💪 Asta contează enorm! Poți repeta oricând vrei!`,`Lecție completă! 🌱 Fiecare pas contează, iar tu tocmai ai făcut unul important!`]},et={1:`Prima zi! 🌱 Fiecare călătorie începe cu un singur pas!`,2:`A doua zi consecutivă! 💚 Deja se formează un obicei!`,3:`3 zile la rând! 🔥 Consistența ta e admirabilă!`,5:`5 zile la rând! 🔥🔥 Ești de neoprit!`,7:`O săptămână întreagă! 🎉🔥 Ești un exemplu de dedicare!`,14:`Două săptămâni! 🏆 Germana devine parte din viața ta!`,30:`O LUNĂ! 🌟💎 Ești LEGENDAR! Nimic nu te poate opri!`},tt=[`Bine ai revenit! 🌟 Ești gata pentru o nouă aventură în germană?`,`Salut! Ce bine că ești aici! Hai să învățăm ceva nou astăzi!`,`Hei! 💛 E o zi perfectă pentru a învăța germana! Hai să începem!`,`Bine ai venit! ✨ Vulpea ta preferată te aștepta! Hai la treabă!`,`Salut! 🎯 Fiecare minut petrecut aici te face mai bun! Hai să profităm!`],nt=[`Ne-ai lipsit! 💛 E o bucurie că te-ai întors! Hai să continuăm de unde am rămas!`,`Bine ai revenit! 🤗 Nu contează cât timp a trecut, important e că ești aici acum!`,`Eee, cine a apărut! Ce bine că te-ai întors! Hai să recuperăm!`,`Salut! 🌟 Fiecare zi e o nouă șansă de a învăța! Bine ai revenit!`],rt=[`Continuă tot așa! 💪`,`Ești pe drumul cel bun! 🛤️`,`Aproape ai terminat! 🏁`,`Excelent! Mergi înainte! 🚀`,`Nu te opri, ești genial! ⭐`];function j(e){return e[Math.floor(Math.random()*e.length)]}function it(){let e=Math.random();return j(e<.1?Ze.high:e<.4?Ze.medium:Ze.low)}function at(e){return j(e===100?A.perfect:e>=85?A.great:e>=70?A.good:A.okay)}var ot={happy:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-idle`,badge:``},excited:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pop`,badge:``},thinking:{ring:`var(--color-xp)`,glow:`rgba(28,176,246,0.35)`,anim:`avatar-tilt`,badge:`?`},celebrating:{ring:`var(--color-secondary)`,glow:`rgba(206,130,255,0.4)`,anim:`avatar-spin`,badge:``},encouraging:{ring:`var(--color-accent)`,glow:`rgba(255,150,0,0.35)`,anim:`avatar-pulse`,badge:``},sad:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.3)`,anim:`avatar-shake`,badge:``},sleeping:{ring:`var(--text-muted)`,glow:`rgba(120,120,120,0.2)`,anim:``,badge:`z`},love:{ring:`var(--color-hearts)`,glow:`rgba(255,75,75,0.4)`,anim:`avatar-heart`,badge:``},waving:{ring:`var(--color-primary)`,glow:`var(--color-primary-glow)`,anim:`avatar-wave`,badge:``}},st={sm:44,md:72,lg:104,xl:144};function M(e=`happy`,t=`md`,n=``){let r=ot[e]||ot.happy,i=st[t]||st.md,a=Math.round(i*.72);return`
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
  `}function ct(e,t=0){return e?t>=5?`celebrating`:t>=3?`excited`:`happy`:`encouraging`}function lt(t){let n=d(),r=me(),i=le(),a=y(),o=Pe(),s=e(),c=new Date().toDateString(),l=n.lastActiveDate,u;u=!l||l===c?j(tt):Math.floor((new Date-new Date(l))/864e5)>2?j(nt):j(tt);let f=et[a]||(a>0?`🔥 ${a} zile la rând!`:``),p=(e,t)=>{let r=_(e.id),a=pe(e.id,i),o=n.lessonsCompleted[e.id]?.stars||0;return`
      <div class="lesson-node animate-fadeInUp ${r?`lesson-completed`:``} ${a?`lesson-unlocked`:`lesson-locked`}"
           style="animation-delay: ${.3+t*.05}s;"
           data-lesson-id="${e.id}"
           ${a?`id="lesson-${e.id}"`:``}>
        <div class="lesson-node-circle">
          <span class="lesson-node-icon">${r?`✅`:a?e.icon:`🔒`}</span>
        </div>
        <div class="lesson-node-info">
          <h3 class="lesson-node-title">${e.title}</h3>
          <p class="lesson-node-subtitle">${e.titleDe}</p>
          ${r?`
            <div class="lesson-stars">${`⭐`.repeat(o)}${`☆`.repeat(3-o)}</div>
          `:a?`
            <p class="lesson-node-desc">${e.description}</p>
          `:`
            <p class="lesson-node-desc" style="opacity: 0.5;">Completează lecția anterioară</p>
          `}
        </div>
        ${a?`<span class="lesson-node-arrow">→</span>`:``}
      </div>
    `},m=i.filter(e=>!e.extra),h=i.filter(e=>e.extra),g=localStorage.getItem(`ui_classicOpen`)===`1`,v=`
    <button class="lessons-collapse-btn" id="btn-toggle-classic" aria-expanded="${g}">
      <span class="lessons-collapse-label">📖 Lecții de bază</span>
      <span class="lessons-collapse-meta">
        <span class="lessons-collapse-count">${m.filter(e=>_(e.id)).length}/${m.length}</span>
        <span class="lessons-collapse-caret">${g?`▴`:`▾`}</span>
      </span>
    </button>
    <div class="lesson-map classic-map ${g?``:`is-collapsed`}" id="classic-map">${m.map((e,t)=>p(e,t)).join(``)}</div>
  `;if(h.length){let e=Math.ceil(h.length/10),t=[];for(let n=0;n<e;n++)t[n]=h.slice(n*10,n*10+10).every(e=>_(e.id));let n=pe(h[0].id,i),r=e=>e===0?n:t[e-1],a=[`<h2 class="home-extra-title">🏆 Provocări</h2>`],o=m.length;for(let n=0;n<e;n++)if(r(n)){let r=h.slice(n*10,n*10+10),i=r.filter(e=>_(e.id)).length,s=localStorage.getItem(`ui_series_home_${n}`),c=s===null?t[n]:s===`1`;a.push(`
          <button class="series-header series-toggle" data-series="${n}" aria-expanded="${!c}">
            <span class="series-header-title">Seria ${n+1} / ${e}${r[0].level?` · ${r[0].level} · ${r[0].titleDe}`:``}</span>
            <span class="series-header-right">
              <span class="series-header-progress">${i}/${r.length}</span>
              <span class="series-caret">${c?`▾`:`▴`}</span>
            </span>
          </button>
        `),a.push(`<div class="lesson-map series-units ${c?`is-collapsed`:``}" data-series="${n}">${r.map((e,t)=>p(e,o+t)).join(``)}</div>`),o+=r.length+1}else{let e=n===0?`Termină lecțiile de bază ca să deblochezi provocările`:`Termină seria ${n} ca să deblochezi următoarele 10`;a.push(`
          <div class="series-teaser">
            <span class="series-teaser-lock">🔒</span>
            <div><strong>Seria ${n+1}</strong><p>${e}</p></div>
          </div>
        `);break}v+=a.join(``)}return`
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
            ${s?`
              <button class="home-user-chip" id="btn-switch-user" title="Schimbă profilul">
                <span class="home-user-chip-avatar">${s.avatar}</span>
                <span class="home-user-chip-name">${s.name}</span>
              </button>
            `:``}
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
            <span class="home-stat-icon">🎯</span>
            <span class="home-stat-value">${r.accuracy}%</span>
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
          ${M(a>3?`excited`:`waving`,`lg`)}
        </div>
        <p class="home-welcome-text">${u}</p>
        ${f?`<p class="home-streak-text">${f}</p>`:``}
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
      ${v}
      
      <!-- Sections -->
      <div class="home-lessons-title animate-fadeInUp" style="animation-delay: 0.75s;">
        <h2>🧩 Secțiuni</h2>
      </div>
      <div class="home-sections">
        ${ue().map((e,t)=>{let r=e.units?e.units.length:e.themes?.length||0,i=e.units?e.units.filter(e=>n.lessonsCompleted[e.id]?.completed).length:null;return`
            <button class="home-section-card card-interactive animate-fadeInUp"
                    data-section-id="${e.id}"
                    style="animation-delay: ${.8+t*.08}s">
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
  `}function ut(e){le().forEach(t=>{let n=document.getElementById(`lesson-${t.id}`);n&&(n.addEventListener(`click`,()=>e(`lesson`,{lessonId:t.id})),n.addEventListener(`pointermove`,e=>{let t=n.getBoundingClientRect();n.style.setProperty(`--mx`,`${(e.clientX-t.left)/t.width*100}%`),n.style.setProperty(`--my`,`${(e.clientY-t.top)/t.height*100}%`)}))}),document.querySelectorAll(`.series-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.series,n=document.querySelector(`.series-units[data-series="${t}"]`);if(!n)return;let r=n.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_series_home_${t}`,r?`1`:`0`),e.setAttribute(`aria-expanded`,String(!r));let i=e.querySelector(`.series-caret`);i&&(i.textContent=r?`▾`:`▴`)})});let t=document.getElementById(`btn-toggle-classic`);t?.addEventListener(`click`,()=>{let e=document.getElementById(`classic-map`);if(!e)return;let n=!e.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_classicOpen`,n?`1`:`0`),t.setAttribute(`aria-expanded`,String(n));let r=t.querySelector(`.lessons-collapse-caret`);r&&(r.textContent=n?`▴`:`▾`)}),document.getElementById(`btn-settings`)?.addEventListener(`click`,()=>e(`settings`)),document.getElementById(`btn-switch-user`)?.addEventListener(`click`,()=>e(`users`)),document.getElementById(`btn-profile`)?.addEventListener(`click`,()=>e(`profile`)),document.getElementById(`btn-practice`)?.addEventListener(`click`,()=>e(`practice`)),document.getElementById(`btn-cognates`)?.addEventListener(`click`,()=>e(`cognates`)),document.getElementById(`btn-dictionary`)?.addEventListener(`click`,()=>e(`dictionary`)),document.querySelectorAll(`.home-section-card`).forEach(t=>{t.addEventListener(`click`,()=>e(`section`,{sectionId:t.dataset.sectionId}))})}var dt=14;function ft(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function pt(e){if(!e||!e.exercises||e.exercises.length<=dt)return e;let t=e.exercises.filter(e=>!e.gen).slice(0,dt),n=e.exercises.filter(e=>e.gen),r=dt-t.length,i=r>0?ft(n).slice(0,r):[];return{...e,exercises:t.concat(i)}}function mt(e){if(e.exercises)return{id:e.unitId||`generated`,title:e.title||`Exercițiu`,icon:e.icon||`✨`,exercises:e.exercises};if(e.sectionId&&e.unitId){let t=b(e.sectionId)?.units?.find(t=>t.id===e.unitId);return pt(t||null)}return pt(ie(e.lessonId))}var N=[],ht=null,P=null,gt=[/Microsoft.*(Katja|Conrad|Amala|Killian).*Neural/i,/Microsoft.*(Katja|Conrad|Amala|Killian)/i,/Google Deutsch/i,/Google.*German/i,/Anna.*(Enhanced|Premium)/i,/Helena.*(Enhanced|Premium)/i,/Petra.*(Enhanced|Premium)/i,/Anna|Helena|Petra|Markus|Yannick/i,/(natural|neural|enhanced|premium|wavenet)/i];function F(){return N=window.speechSynthesis?.getVoices()||[],N}function _t(){return ht||(ht=new Promise(e=>{if(!window.speechSynthesis){e([]);return}if(F(),N.length>0){e(N);return}let t=0,n=()=>{F(),N.length>0||t>20?e(N):(t++,setTimeout(n,150))};window.speechSynthesis.onvoiceschanged=()=>{F(),N.length>0&&e(N)},n()}),ht)}window.speechSynthesis&&_t();function vt(){if(P)return P;N.length||F();let e=N.filter(e=>/^de(-|_|$)/i.test(e.lang));if(e.length===0)return P=N.find(e=>e.lang===`de`)||null,P;for(let t of gt){let n=e.find(e=>t.test(e.name));if(n)return P=n,n}let t=e.find(e=>e.localService&&e.lang===`de-DE`)||e.find(e=>e.localService)||e.find(e=>e.lang===`de-DE`)||e[0];return P=t,t}function yt(e,{rate:t,pitch:n=1,lang:r=`de-DE`}){return new Promise(i=>{if(!window.speechSynthesis){i();return}window.speechSynthesis.cancel();let a=()=>{let a=new SpeechSynthesisUtterance(e);a.lang=r,a.rate=t,a.pitch=n,a.volume=1;let o=vt();o&&(a.voice=o),a.onend=()=>i(),a.onerror=e=>{console.warn(`TTS error:`,e?.error),i()},window.speechSynthesis.speak(a),setTimeout(()=>{window.speechSynthesis.paused&&window.speechSynthesis.resume()},100)};N.length===0?_t().then(a):a()})}function I(e,t=`de-DE`){return yt(e,{rate:.92,pitch:1.02,lang:t})}function bt(e,t=`de-DE`){return yt(e,{rate:.65,pitch:1,lang:t})}var L=null;function xt(){return!!(window.SpeechRecognition||window.webkitSpeechRecognition)}var St=1e4;function Ct(e=`de-DE`){return new Promise((t,n)=>{if(!xt()){n(Error(`Speech recognition not supported`));return}R();let r=new(window.SpeechRecognition||window.webkitSpeechRecognition);L=r,r.lang=e,r.interimResults=!1,r.maxAlternatives=3,r.continuous=!1;let i=!1,a=(e,t)=>{i||(i=!0,clearTimeout(o),L===r&&(L=null),e(t))},o=setTimeout(()=>{try{r.abort()}catch{}a(t,[])},St);r.onresult=e=>{let n=[];for(let t=0;t<e.results[0].length;t++)n.push({transcript:e.results[0][t].transcript.toLowerCase().trim(),confidence:e.results[0][t].confidence});a(t,n)},r.onerror=e=>{e.error===`no-speech`||e.error===`aborted`?a(t,[]):a(n,Error(`Speech recognition error: ${e.error}`))},r.onend=()=>a(t,[]);try{r.start()}catch(e){a(n,e)}})}function R(){if(L){try{L.abort()}catch{}L=null}}function z(e){let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();switch(n.connect(r),r.connect(t.destination),e){case`correct`:n.frequency.setValueAtTime(523.25,t.currentTime),n.frequency.setValueAtTime(659.25,t.currentTime+.1),n.frequency.setValueAtTime(783.99,t.currentTime+.2),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.4),n.start(t.currentTime),n.stop(t.currentTime+.4);break;case`wrong`:n.frequency.setValueAtTime(200,t.currentTime),n.frequency.setValueAtTime(150,t.currentTime+.15),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.3),n.start(t.currentTime),n.stop(t.currentTime+.3);break;case`complete`:[523.25,587.33,659.25,783.99,1046.5].forEach((e,n)=>{let r=t.createOscillator(),i=t.createGain();r.connect(i),i.connect(t.destination),r.frequency.setValueAtTime(e,t.currentTime+n*.12),i.gain.setValueAtTime(.2,t.currentTime+n*.12),i.gain.exponentialRampToValueAtTime(.01,t.currentTime+n*.12+.3),r.start(t.currentTime+n*.12),r.stop(t.currentTime+n*.12+.3)});break;case`click`:n.frequency.setValueAtTime(800,t.currentTime),r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.05),n.start(t.currentTime),n.stop(t.currentTime+.05);break}}var wt=[`#58CC02`,`#CE82FF`,`#FF9600`,`#1CB0F6`,`#FF4B4B`,`#FFC800`,`#89E219`];function Tt(e=`normal`){let t=document.getElementById(`confetti-container`);if(!t)return;let n=e===`high`?80:e===`low`?20:40;for(let e=0;e<n;e++){let e=document.createElement(`div`);e.className=`confetti-piece`,e.style.left=Math.random()*100+`%`,e.style.backgroundColor=wt[Math.floor(Math.random()*wt.length)],e.style.width=Math.random()*8+5+`px`,e.style.height=Math.random()*8+5+`px`,e.style.borderRadius=Math.random()>.5?`50%`:`2px`,e.style.animationDuration=Math.random()*2+1.5+`s`,e.style.animationDelay=Math.random()*.5+`s`,e.style.opacity=Math.random()*.5+.5,t.appendChild(e),setTimeout(()=>e.remove(),4e3)}}function Et(e=5){let t=document.getElementById(`confetti-container`);if(t)for(let n=0;n<e;n++){let e=document.createElement(`div`);e.textContent=`⭐`,e.style.cssText=`
      position: absolute;
      font-size: ${Math.random()*20+20}px;
      left: ${Math.random()*80+10}%;
      top: ${Math.random()*40+20}%;
      animation: popIn 0.5s ease forwards;
      animation-delay: ${n*.15}s;
      opacity: 0;
      pointer-events: none;
    `,t.appendChild(e),setTimeout(()=>e.remove(),2e3)}}function B(e,t=`success`,n=3e3){let r=document.getElementById(`toast-container`);if(!r)return;let i=document.createElement(`div`);i.className=`toast toast-${t}`,i.innerHTML=`
    <span class="toast-icon">${{success:`✅`,error:`❌`,info:`ℹ️`,warning:`⚠️`,badge:`🏅`,xp:`⭐`,streak:`🔥`,heart:`❤️`,levelup:`🎉`}[t]||`✨`}</span>
    <span class="toast-message">${e}</span>
  `,r.appendChild(i),setTimeout(()=>{i.classList.add(`toast-exit`),setTimeout(()=>i.remove(),300)},n)}function Dt(e){B(`+${e} XP`,`xp`,2e3)}function Ot(e){B(`${e.icon} Insignă nouă: ${e.name}!`,`badge`,4e3)}function kt(e,t){B(`🎉 Nivel nou: ${e} — ${t}!`,`levelup`,4e3)}function At(e){let t=e.options.map(e=>x(e)),n=t.every(Boolean),r=e.options.map((e,r)=>`
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
  `}function jt(e){let t=e.type===`translate_ro_de`,n=t?`Tradu în germană 🇩🇪`:`Tradu în română 🇷🇴`,r=t?`🇩🇪`:`🇷🇴`,i=t?`🇷🇴 Română`:`🇩🇪 Germană`,a=t?`🇩🇪 Germană`:`🇷🇴 Română`,o=t?`Scrie traducerea în germană...`:`Scrie traducerea în română...`;return`
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
  `}function Mt(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Nt(e){let t=e.pairs.map((e,t)=>({value:e[0],index:t})),n=e.pairs.map((e,t)=>({value:e[1],index:t})),r=Mt(t),i=Mt(n);return`
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
  `}function Pt(e){return`
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
  `}function Ft(e){return`
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
  `}function It(e){return`
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

      <div class="speak-skip-area">
        <button class="speak-skip-btn" id="btn-cant-speak">🙊 Nu pot vorbi acum</button>
      </div>
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

      .speak-skip-area {
        text-align: center;
        margin-top: var(--space-md);
      }

      .speak-skip-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-family: var(--font-family);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        text-decoration: underline;
        cursor: pointer;
        padding: var(--space-sm) var(--space-md);
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
  `}function Lt(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Rt(e){let t=Lt(e.bank).map((e,t)=>`
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
  `}function zt(e){let t=e.options.map((e,t)=>{let n=x(e)||`🎴`;return`
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
  `}function Bt(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Vt(e){let t=e.characters,n=e.lines.map((e,n)=>{let r=t[e.who]||t[0],i=e.who===0?`left`:`right`;return e.blank?`
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
    `}).join(``),r=``;return e.mode===`multiChoice`?(r=Bt(e.options).map(e=>`
        <button class="dlg-option mc-option card-interactive" data-value="${e}">${e}</button>
      `).join(``),r=`<div class="dlg-options">${r}</div>`):r=`
      <div class="wb-answer-row" id="dlg-answer">
        <div class="wb-placeholder">Formează replica lipsă din cuvinte</div>
      </div>
      <div class="wb-bank" id="dlg-bank">${Bt(e.bank).map((e,t)=>`
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
  `}function Ht(e){return`
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
  `}function Ut(e){return`
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
  `}function Wt(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Gt(e){return`
    <div class="exercise-sort-categories">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🗂️ Sortează pe categorii</span>
      </div>

      <p class="sc-instruction animate-fadeIn">Atinge un cuvânt, apoi coșul potrivit</p>

      <div class="sc-pool" id="sc-pool">${Wt(e.items).map((e,t)=>`
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
  `}function Kt(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function qt(e){let t=Kt(e.bank).map((e,t)=>`
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
  `}var V=0,H=0,Jt=0,U=0,W=null,G=!1,K=0,q=3;function Yt(e,t){let n=mt(t);return n?(W=n,V=0,H=0,Jt=0,U=0,G=!1,K=0,Xt(e)):(e(`home`),`<p>Lecția nu a fost găsită.</p>`)}function Xt(e){let t=W,n=t.exercises[V],r=V/t.exercises.length*100,i=``;switch(n.type){case`multiChoice`:i=At(n);break;case`translate_ro_de`:case`translate_de_ro`:i=jt(n);break;case`match`:i=Nt(n);break;case`fillBlank`:i=Pt(n);break;case`listen`:i=Ft(n);break;case`speak`:i=It(n);break;case`wordBank`:i=Rt(n);break;case`picturePick`:i=zt(n);break;case`dialogue`:i=Vt(n);break;case`listenChoice`:i=Ht(n);break;case`trueFalse`:i=Ut(n);break;case`sortCategories`:i=Gt(n);break;case`sentenceBuild`:i=qt(n);break;default:i=`<p>Tip necunoscut: ${n.type}</p>`}let a=V>0&&V%4==0&&U>=2;return`
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
        <span class="lesson-counter">${V+1}/${t.exercises.length}</span>
      </div>

      ${a?`
        <div class="lesson-encouragement animate-fadeInDown">
          ${j(rt)}
        </div>
      `:``}

      <!-- Exercise Area -->
      <div class="exercise-area animate-fadeInUp" id="exercise-area">
        ${i}
      </div>

      <!-- Feedback Area (hidden by default) -->
      <div class="feedback-area hidden" id="feedback-area"></div>
    </div>
  `}function Zt(e,t){let n=W||mt(t);if(!n)return;document.getElementById(`btn-close-lesson`)?.addEventListener(`click`,()=>{confirm(`Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.`)&&e(`home`)});let r=n.exercises[V];Qt(r,e,t)}function Qt(e,t,n){switch(e.type){case`multiChoice`:on(e,t,n);break;case`translate_ro_de`:case`translate_de_ro`:sn(e,t,n);break;case`match`:dn(e,t,n);break;case`fillBlank`:ln(e,t,n);break;case`listen`:fn(e,t,n);break;case`speak`:mn(e,t,n);break;case`wordBank`:rn(e,t,n);break;case`picturePick`:an(e,t,n);break;case`dialogue`:gn(e,t,n);break;case`listenChoice`:$t(e,t,n);break;case`trueFalse`:en(e,t,n);break;case`sortCategories`:tn(e,t,n);break;case`sentenceBuild`:nn(e,t,n);break}}function $t(e,t,n){document.getElementById(`btn-lc-speak`)?.addEventListener(`click`,()=>I(e.word)),setTimeout(()=>I(e.word),400),document.querySelectorAll(`.lc-option`).forEach(r=>{r.addEventListener(`click`,()=>{if(G)return;let i=r.dataset.value,a=i===e.correct;document.querySelectorAll(`.lc-option`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===e.correct&&t.classList.add(`mc-correct`),t.dataset.value===i&&!a&&t.classList.add(`mc-wrong`)}),Y(a,e.correct,t,n)})})}function en(e,t,n){document.getElementById(`btn-tf-speak`)?.addEventListener(`click`,()=>I(e.de)),setTimeout(()=>I(e.de),400);let r=e.isTrue?`Adevărat ✅`:`Fals — ${e.de} = ${e.correct}`;document.querySelectorAll(`.tf-btn`).forEach(i=>{i.addEventListener(`click`,()=>{if(G)return;let a=i.dataset.value===`true`===e.isTrue;document.querySelectorAll(`.tf-btn`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===`true`===e.isTrue&&t.classList.add(`mc-correct`),t===i&&!a&&t.classList.add(`mc-wrong`)}),Y(a,r,t,n)})})}function tn(e,t,n){let r=e.items.length,i=0,a=null,o=()=>{document.querySelectorAll(`.sc-item.sc-selected`).forEach(e=>e.classList.remove(`sc-selected`)),document.querySelectorAll(`.sc-bucket-active`).forEach(e=>e.classList.remove(`sc-bucket-active`)),a=null};document.querySelectorAll(`.sc-item`).forEach(e=>{e.addEventListener(`click`,()=>{if(!(G||e.classList.contains(`sc-placed`))){if(a?.el===e){o();return}o(),e.classList.add(`sc-selected`),a={el:e,de:e.dataset.de,cat:e.dataset.cat},document.querySelectorAll(`.sc-bucket`).forEach(e=>e.classList.add(`sc-bucket-active`))}})}),document.querySelectorAll(`.sc-bucket`).forEach(e=>{e.addEventListener(`click`,()=>{if(!(G||!a))if(e.dataset.cat===a.cat){let s=document.createElement(`span`);s.className=`sc-chip`,s.textContent=a.de,e.querySelector(`.sc-bucket-drop`)?.appendChild(s),a.el.classList.add(`sc-placed`),z(`click`),o(),i++,i===r&&setTimeout(()=>Y(!0,``,t,n),400)}else e.classList.add(`sc-bucket-wrong`),z(`wrong`),setTimeout(()=>e.classList.remove(`sc-bucket-wrong`),600)})})}function nn(e,t,n){let r=document.getElementById(`sb-answer`),i=document.getElementById(`sb-bank`),a=document.getElementById(`btn-sb-check`),o=document.getElementById(`btn-sb-clear`),s=r?.querySelector(`.sb-placeholder`);document.getElementById(`btn-sb-speak`)?.addEventListener(`click`,()=>I(e.answer));let c=[],l=()=>{s&&(s.style.display=c.length===0?``:`none`),a&&(a.disabled=c.length===0)},u=(e,t)=>{if(G)return;let n=c.findIndex(e=>e.tileEl===t);n>=0&&c.splice(n,1),e.remove(),t.classList.remove(`sb-used`),l()},d=(e,t)=>{if(G)return;c.push({token:e,tileEl:t}),t.classList.add(`sb-used`);let n=document.createElement(`button`);n.className=`sb-chip animate-fadeInUp`,n.textContent=e,n.addEventListener(`click`,()=>u(n,t)),r?.appendChild(n),l()};i?.querySelectorAll(`.sb-tile`).forEach(e=>{e.addEventListener(`click`,()=>d(e.dataset.token,e))}),o?.addEventListener(`click`,()=>{G||(c.splice(0).forEach(e=>e.tileEl.classList.remove(`sb-used`)),r?.querySelectorAll(`.sb-chip`).forEach(e=>e.remove()),l())}),a?.addEventListener(`click`,()=>{G||c.length===0||(C(c.map(e=>e.token).join(` `))===C(e.answer)?Y(!0,e.answer,t,n):J(e,e.answer,t,n))})}function rn(e,t,n){let r=document.getElementById(`wb-answer`),i=document.getElementById(`wb-bank`),a=document.getElementById(`btn-wb-check`),o=document.getElementById(`btn-wb-clear`),s=r?.querySelector(`.wb-placeholder`);document.getElementById(`btn-wb-speak`)?.addEventListener(`click`,()=>I(e.promptDe)),setTimeout(()=>I(e.promptDe),400);let c=[],l=()=>{s&&(s.style.display=c.length===0?``:`none`),a&&(a.disabled=c.length===0)},u=(e,t)=>{if(G)return;c.push({token:e,tileEl:t}),t.classList.add(`wb-used`);let n=document.createElement(`button`);n.className=`wb-chip animate-fadeInUp`,n.textContent=e,n.addEventListener(`click`,()=>d(n,t)),r.appendChild(n),l()},d=(e,t)=>{if(G)return;let n=c.findIndex(e=>e.tileEl===t);n>=0&&c.splice(n,1),e.remove(),t.classList.remove(`wb-used`),l()};i?.querySelectorAll(`.wb-tile`).forEach(e=>{e.addEventListener(`click`,()=>u(e.dataset.token,e))}),o?.addEventListener(`click`,()=>{G||(c.splice(0).forEach(e=>e.tileEl.classList.remove(`wb-used`)),r.querySelectorAll(`.wb-chip`).forEach(e=>e.remove()),l())}),a?.addEventListener(`click`,()=>{G||c.length===0||(C(c.map(e=>e.token).join(` `))===C(e.answer)?Y(!0,e.answer,t,n):J(e,e.answer,t,n))})}function an(e,t,n){document.getElementById(`btn-pp-speak`)?.addEventListener(`click`,()=>I(e.wordDe)),setTimeout(()=>I(e.wordDe),400),document.querySelectorAll(`.pp-card`).forEach(r=>{r.addEventListener(`click`,()=>{if(G)return;let i=r.dataset.value,a=i===e.correct;document.querySelectorAll(`.pp-card`).forEach(t=>{t.classList.add(`pp-disabled`),t.dataset.value===e.correct&&t.classList.add(`pp-correct`),t.dataset.value===i&&!a&&t.classList.add(`pp-wrong`)}),Y(a,e.correct,t,n)})})}function on(e,t,n){document.querySelectorAll(`.mc-option`).forEach(r=>{r.addEventListener(`click`,()=>{if(G)return;let i=r.dataset.value,a=i===e.correct;Y(a,e.correct,t,n),document.querySelectorAll(`.mc-option`).forEach(t=>{t.classList.add(`mc-disabled`),t.dataset.value===e.correct&&t.classList.add(`mc-correct`),t.dataset.value===i&&!a&&t.classList.add(`mc-wrong`)})})})}function sn(e,t,n){let r=document.getElementById(`translate-input`),i=document.getElementById(`btn-check-translate`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&cn(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||cn(e,t,n)}),document.getElementById(`btn-speak-word`)?.addEventListener(`click`,()=>{I(e.type===`translate_de_ro`?e.prompt:e.answer)})}function cn(e,t,n){let r=document.getElementById(`translate-input`);if(!r)return;let i=C(r.value),a=C(e.answer),o=(e.alts||[]).map(C);i===a||o.includes(i)?(r.classList.add(`input-success`),Y(!0,e.answer,t,n)):(r.classList.add(`input-error`),J(e,e.answer,t,n))}function ln(e,t,n){let r=document.getElementById(`fillblank-input`),i=document.getElementById(`btn-check-fillblank`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&un(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||un(e,t,n)})}function un(e,t,n){let r=document.getElementById(`fillblank-input`);r&&(C(r.value)===C(e.answer)?(r.classList.add(`input-success`),Y(!0,e.answer,t,n)):(r.classList.add(`input-error`),J(e,e.answer,t,n)))}function dn(e,t,n){let r=null,i=null,a=0,o=e.pairs.length;document.querySelectorAll(`.match-item`).forEach(s=>{s.addEventListener(`click`,()=>{if(s.classList.contains(`match-done`))return;let c=s.dataset.side,l=s.dataset.value,u=s.dataset.index;if(c===`left`?(document.querySelectorAll(`.match-item[data-side="left"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),r={value:l,index:u,el:s}):(document.querySelectorAll(`.match-item[data-side="right"]`).forEach(e=>e.classList.remove(`match-selected`)),s.classList.add(`match-selected`),i={value:l,index:u,el:s}),r&&i){let s=e.pairs[r.index];if(s&&s[1]===i.value)r.el.classList.add(`match-done`,`match-correct-anim`),i.el.classList.add(`match-done`,`match-correct-anim`),a++,z(`click`),a===o&&setTimeout(()=>Y(!0,``,t,n),500);else{let e=r.el,t=i.el;e.classList.add(`match-wrong-anim`),t.classList.add(`match-wrong-anim`),z(`wrong`),setTimeout(()=>{e.classList.remove(`match-selected`,`match-wrong-anim`),t.classList.remove(`match-selected`,`match-wrong-anim`)},1200)}r=null,i=null}})})}function fn(e,t,n){document.getElementById(`btn-play-audio`)?.addEventListener(`click`,()=>I(e.word)),document.getElementById(`btn-play-slow`)?.addEventListener(`click`,()=>{bt(e.word)}),setTimeout(()=>I(e.word),500);let r=document.getElementById(`listen-input`),i=document.getElementById(`btn-check-listen`);r&&(r.addEventListener(`keydown`,r=>{r.key===`Enter`&&!G&&pn(e,t,n)}),r.focus()),i?.addEventListener(`click`,()=>{G||pn(e,t,n)})}function pn(e,t,n){let r=document.getElementById(`listen-input`);r&&(C(r.value)===C(e.answer)?(r.classList.add(`input-success`),Y(!0,e.answer,t,n)):(r.classList.add(`input-error`),J(e,e.answer,t,n)))}function mn(e,t,n){document.getElementById(`btn-hear-word`)?.addEventListener(`click`,()=>I(e.word)),setTimeout(()=>I(e.word),500),document.getElementById(`btn-cant-speak`)?.addEventListener(`click`,()=>hn(t,n));let r=document.getElementById(`btn-record`),i=document.getElementById(`speak-result`),a=!1,o=0,s=e=>{i&&(i.innerHTML=e,i.classList.remove(`hidden`))},c=()=>{a=!1,r.classList.remove(`recording`),r.innerHTML=`🎤 Încearcă din nou`};r?.addEventListener(`click`,async()=>{if(G)return;if(a){R();return}a=!0,r.classList.add(`recording`),r.innerHTML=`🔴 Ascult... (apasă ca să oprești)`;let i;try{i=await Ct(`de-DE`)}catch(e){if(console.error(`Speech recognition error:`,e),!r.isConnected||G)return;c(),s(`
        <p>Microfonul sau recunoașterea vocală nu merg acum. 😔</p>
        <button class="btn btn-secondary btn-sm" id="btn-skip-speak">Treci mai departe →</button>
      `),document.getElementById(`btn-skip-speak`)?.addEventListener(`click`,()=>hn(t,n));return}if(!r.isConnected||G)return;if(c(),i.length===0){o++,s(o>=2?`<p>Tot nu te aud. 🎤 Verifică microfonul — sau apasă „Nu pot vorbi acum" de mai jos.</p>`:`<p>Nu am auzit nimic. Încearcă din nou! 🎤</p>`);return}let l=e.word.toLowerCase().replace(/[?.!,]/g,``).trim(),u=i.some(e=>{let t=e.transcript.replace(/[?.!,]/g,``).trim();return t===l||t.includes(l)||l.includes(t)});s(`<p>Ai spus: "<strong>${i[0].transcript}</strong>"</p>`),Y(u,e.word,t,n)})}function hn(e,t){G||(G=!0,R(),H++,B(`Am sărit peste exercițiul de vorbit 🙊`,`info`),X(e,t))}function gn(e,t,n){let r=e.lines,i=r.findIndex(e=>e.blank),a=r[i],o=Array.from(document.querySelectorAll(`.dlg-line`)),s=document.getElementById(`dlg-interact`),c=e=>new Promise(t=>setTimeout(t,e)),l=()=>o[0]?.isConnected,u=async(e,t)=>{for(let n=e;n<=t&&n<r.length;n++){if(!l())return;o[n]?.classList.add(`dlg-shown`),!r[n].blank&&r[n].de?(await I(r[n].de),await c(300)):await c(400)}};(async()=>{await c(400),await u(0,i),l()&&s?.classList.add(`dlg-shown`)})();let d=e=>{let t=o[i];if(t){let n=t.querySelector(`.dlg-bubble-text`);n&&(n.textContent=e),t.classList.remove(`dlg-blank`),t.classList.add(`dlg-filled`)}s&&(s.style.display=`none`),(async()=>{await I(e),await c(300),await u(i+1,r.length-1)})()};if(e.mode===`multiChoice`){document.querySelectorAll(`.dlg-option`).forEach(e=>{e.addEventListener(`click`,()=>{if(G)return;let r=e.dataset.value,i=C(r)===C(a.answer);document.querySelectorAll(`.dlg-option`).forEach(t=>{t.classList.add(`mc-disabled`),C(t.dataset.value)===C(a.answer)&&t.classList.add(`mc-correct`),t===e&&!i&&t.classList.add(`mc-wrong`)}),i&&d(a.answer),Y(i,a.answer,t,n)})});return}let f=document.getElementById(`dlg-answer`),p=document.getElementById(`btn-dlg-check`),m=document.getElementById(`btn-dlg-clear`),h=f?.querySelector(`.wb-placeholder`),g=[],_=()=>{h&&(h.style.display=g.length===0?``:`none`),p&&(p.disabled=g.length===0)},v=(e,t)=>{if(G)return;let n=g.findIndex(e=>e.tileEl===t);n>=0&&g.splice(n,1),e.remove(),t.classList.remove(`wb-used`),_()};document.querySelectorAll(`#dlg-bank .wb-tile`).forEach(e=>{e.addEventListener(`click`,()=>{if(G)return;g.push({token:e.dataset.token,tileEl:e}),e.classList.add(`wb-used`);let t=document.createElement(`button`);t.className=`wb-chip animate-fadeInUp`,t.textContent=e.dataset.token,t.addEventListener(`click`,()=>v(t,e)),f?.appendChild(t),_()})}),m?.addEventListener(`click`,()=>{G||(g.splice(0).forEach(e=>e.tileEl.classList.remove(`wb-used`)),f?.querySelectorAll(`.wb-chip`).forEach(e=>e.remove()),_())}),p?.addEventListener(`click`,()=>{G||g.length===0||(C(g.map(e=>e.token).join(` `))===C(a.answer)?(d(a.answer),Y(!0,a.answer,t,n)):J(e,a.answer,t,n))})}function _n(e){let t=C(e),n=t.split(` `).filter(Boolean).length;return n===1?t.length<=6?3:4:n<=3?5:6}function vn(e,t,n){if(t>=n)return e;let r=e.length,i=e.indexOf(` `),a=i>0&&i<r-1,o=Math.max(1,n-1),s=.35+.5*((t-1)/o),c=Math.ceil(r*Math.min(.9,s));t===1&&a&&(c=Math.max(c,i)),c=Math.min(c,r-1),c=Math.max(1,c);let l=``;for(let t=0;t<r;t++){let n=e[t];t<c||n===` `||n===`-`||n===`'`?l+=n:l+=`_`}return l}function J(e,t,n,r){G=!0,p(),K===0&&(q=_n(t),Jt++,U=0,ee({exercise:e,lessonId:W?.id||r.lessonId,timestamp:new Date().toISOString()})),K=Math.min(K+1,q+1),z(`wrong`),yn(e,t,K,n,r)}function yn(e,t,n,r,i){let a=document.getElementById(`feedback-area`);if(!a)return;let o=n>=q,s=vn(t,n,q),c=o?`thinking`:`encouraging`,l=Math.min(n,q),u=``;u=o?`
      <p class="feedback-answer">Răspunsul corect: <strong>${t}</strong></p>
      <p class="feedback-text">Scrie-l ca să continui — sau treci peste.</p>
    `:`
      <p class="feedback-text">Aproape! Iată un indiciu: <span class="hint-letters">${s}</span></p>
    `,a.innerHTML=`
    <div class="feedback-bar feedback-bar-wrong feedback-wrong">
      <div class="feedback-content">
        <div class="feedback-mascot">${M(c,`sm`)}</div>
        <div class="feedback-info">
          <p class="feedback-title">Încercare ${l}/${q}</p>
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
  `,a.classList.remove(`hidden`),document.getElementById(`btn-try-again`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),G=!1;let e=document.querySelector(`#translate-input, #fillblank-input, #listen-input`);e&&(e.value=``,e.classList.remove(`input-error`),e.focus()),bn(s,l,o?t:null)}),document.getElementById(`btn-skip-exercise`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),B(j($e),`info`),xn(e,1),X(r,i)})}function bn(e,t,n){let r=document.getElementById(`exercise-area`);if(!r)return;let i=document.getElementById(`hint-box`);i||(i=document.createElement(`div`),i.id=`hint-box`,i.className=`hint-box animate-fadeInDown`,r.insertBefore(i,r.firstChild)),n?i.innerHTML=`
      <span class="hint-label">💡 Răspuns:</span>
      <span class="hint-text"><strong>${n}</strong></span>
    `:i.innerHTML=`
      <span class="hint-label">💡 Indiciu (${t}/${q}):</span>
      <span class="hint-text">${e}</span>
    `}function xn(e,t){let n=De(e);n&&ke(n,t)}function Y(e,t,r,i){G=!0,p();let a=W.exercises[V];if(e){H++,K===0?U++:U=0,n();let e=(K===0?10:Math.max(1,10-K*2))+(K===0&&U>=3?5:0);ce(e),a.word&&te(a.word),a.prompt&&te(a.prompt),a.correct&&te(a.correct),xn(a,K===0?5:3),K===0&&fe(a),z(`correct`);let o=Math.random();o<.1&&U>=3?Tt(`high`):o<.3&&Et(3),Sn(!0,it(),t,r,i),setTimeout(()=>Dt(e),500)}else Jt++,U=0,ee({exercise:a,lessonId:W?.id||i.lessonId,timestamp:new Date().toISOString()}),xn(a,1),z(`wrong`),Sn(!1,j(Qe),t,r,i)}function Sn(e,t,n,r,i){let a=document.getElementById(`feedback-area`);if(!a)return;let o=ct(e,U);a.innerHTML=`
    <div class="feedback-bar ${e?`feedback-bar-correct`:`feedback-bar-wrong`} feedback-${e?`correct`:`wrong`}">
      <div class="feedback-content">
        <div class="feedback-mascot">
          ${M(o,`sm`)}
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
  `,a.classList.remove(`hidden`),document.getElementById(`btn-continue`)?.addEventListener(`click`,()=>{a.classList.add(`hidden`),X(r,i)})}function X(e,t){if(R(),V++,K=0,q=3,V>=W.exercises.length)Cn(e,t);else{G=!1;let n=document.getElementById(`app`);n.innerHTML=Xt(e),Zt(e,t)}}function Cn(e,t){let n=W.exercises.length,r=Math.round(H/n*100),i=re(W.id,r,n);T(),k(),z(`complete`),Tt(r===100?`high`:`normal`),setTimeout(()=>{i.newBadges.forEach((e,t)=>{setTimeout(()=>Ot(e),t*1500)}),i.xpResult.leveledUp&&setTimeout(()=>kt(i.xpResult.level,h(i.xpResult.level)),800)},1e3),e(`results`,{lessonId:t.lessonId,title:`${W.icon} ${W.title}`,lessonParams:t,score:r,stars:i.stars,correctCount:H,totalExercises:n,xpGained:i.bonusXP,newBadges:i.newBadges})}function wn(e,t){let{lessonId:n,score:r,stars:i,correctCount:a,totalExercises:o,xpGained:s,newBadges:c}=t,l=n?ie(n):null,u=t.title||(l?`${l.icon} ${l.title}`:`Lecție`),d=at(r),f=Array.from({length:3},(e,t)=>{let n=t<i,r=t===1?`64px`:`48px`,a=.3+t*.2;return`
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
        ${M(r===100?`celebrating`:r>=80?`excited`:r>=60?`happy`:`encouraging`,`xl`,d)}
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
  `}function Tn(e,t){setTimeout(()=>{Tt(t.score===100?`high`:`normal`)},300),setTimeout(()=>z(`complete`),100),document.getElementById(`btn-results-continue`)?.addEventListener(`click`,()=>{e(`home`)}),document.getElementById(`btn-results-retry`)?.addEventListener(`click`,()=>{e(`lesson`,t.lessonParams||{lessonId:t.lessonId})})}var En=[{ro:`spital`,de:`Spital`,meaning:`hospital`,category:`sănătate`},{ro:`scandal`,de:`Skandal`,meaning:`scandal`,category:`general`},{ro:`rucksac`,de:`Rucksack`,meaning:`backpack`,category:`obiecte`},{ro:`șină`,de:`Schiene`,meaning:`rail/track`,category:`transport`},{ro:`cartof`,de:`Kartoffel`,meaning:`potato`,category:`mâncare`},{ro:`bere`,de:`Bier`,meaning:`beer`,category:`mâncare`},{ro:`dans`,de:`Tanz`,meaning:`dance`,category:`general`},{ro:`muzică`,de:`Musik`,meaning:`music`,category:`cultură`},{ro:`sport`,de:`Sport`,meaning:`sport`,category:`activități`},{ro:`telefon`,de:`Telefon`,meaning:`telephone`,category:`obiecte`},{ro:`hotel`,de:`Hotel`,meaning:`hotel`,category:`călătorii`},{ro:`restaurant`,de:`Restaurant`,meaning:`restaurant`,category:`mâncare`},{ro:`parc`,de:`Park`,meaning:`park`,category:`locuri`},{ro:`familie`,de:`Familie`,meaning:`family`,category:`oameni`},{ro:`universitate`,de:`Universitat`,meaning:`university`,category:`educație`},{ro:`profesor`,de:`Professor`,meaning:`professor`,category:`educație`},{ro:`student`,de:`Student`,meaning:`student`,category:`educație`},{ro:`natură`,de:`Natur`,meaning:`nature`,category:`natură`},{ro:`pasaport`,de:`Pass / Reisepass`,meaning:`passport`,category:`călătorii`},{ro:`ciocolată`,de:`Schokolade`,meaning:`chocolate`,category:`mâncare`},{ro:`lampă`,de:`Lampe`,meaning:`lamp`,category:`obiecte`},{ro:`clasă`,de:`Klasse`,meaning:`class`,category:`educație`},{ro:`mașină`,de:`Maschine`,meaning:`machine`,category:`obiecte`},{ro:`poliție`,de:`Polizei`,meaning:`police`,category:`general`},{ro:`banană`,de:`Banane`,meaning:`banana`,category:`mâncare`},{ro:`tomată`,de:`Tomate`,meaning:`tomato`,category:`mâncare`},{ro:`supă`,de:`Suppe`,meaning:`soup`,category:`mâncare`},{ro:`garaj`,de:`Garage`,meaning:`garage`,category:`locuri`},{ro:`balcon`,de:`Balkon`,meaning:`balcony`,category:`locuri`},{ro:`radio`,de:`Radio`,meaning:`radio`,category:`obiecte`}];function Dn(){let e={};return En.forEach(t=>{e[t.category]||(e[t.category]=[]),e[t.category].push(t)}),e}var On={sănătate:`🏥`,general:`📋`,obiecte:`🔧`,transport:`🚂`,mâncare:`🍽️`,cultură:`🎭`,activități:`⚽`,călătorii:`✈️`,locuri:`📍`,oameni:`👥`,educație:`📚`,natură:`🌿`};function kn(e){let t=Dn(),n=Object.keys(t),r=n.map((e,n)=>{let r=t[e],i=On[e]||`📂`,a=.2+n*.1,o=r.map(e=>`
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
        ${M(`thinking`,`lg`,`Știai că româna și germana au multe cuvinte similare?`)}
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
            ${En.length}
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
  `}function An(e){document.getElementById(`btn-back-cognates`)?.addEventListener(`click`,()=>{e(`home`)}),document.querySelectorAll(`.cognate-speak-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.word;n&&(e.style.transform=`scale(1.2)`,e.style.background=`rgba(28, 176, 246, 0.25)`,setTimeout(()=>{e.style.transform=`scale(1)`,e.style.background=`rgba(28, 176, 246, 0.1)`},300),I(n))})})}function jn(e){let t=Math.round(e);if(t<60)return`${t} min`;let n=Math.floor(t/60),r=t%60;return r>0?`${n}h ${r}min`:`${n}h`}function Mn(t){let n=me(),r=ne();d();let i=e(),a=r.filter(e=>e.earned).length,o=n.level>3?`celebrating`:`happy`,s=n.level>3?`Ești un adevărat campion! 🏆`:`Continuă să înveți, ești minunat! 💛`,c=[{icon:`⭐`,label:`XP Total`,value:n.xp,color:`var(--color-xp)`},{icon:`🔥`,label:`Serie zilnică`,value:`${n.streak} zile`,color:`var(--color-streak)`},{icon:`📚`,label:`Cuvinte învățate`,value:n.wordsLearned,color:`var(--color-secondary)`},{icon:`🎯`,label:`Precizie`,value:`${n.accuracy}%`,color:`var(--color-primary)`},{icon:`✅`,label:`Lecții completate`,value:n.totalLessonsCompleted,color:`var(--color-primary-dark)`},{icon:`⏱️`,label:`Obiectiv zilnic`,value:`${n.dailyMinutes}/${n.dailyGoal} min`,color:`var(--color-accent)`},{icon:`⏳`,label:`Timp total de învățare`,value:jn(n.totalMinutes),color:`var(--color-xp)`},{icon:`✏️`,label:`Răspunsuri date`,value:n.totalAttempts,color:`var(--color-secondary)`}].map((e,t)=>`
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
  `).join(``),l=r.map((e,t)=>`
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
          ${i?`${i.avatar} ${i.name}`:`👤 Profilul Meu`}
        </h1>
        <button class="btn btn-secondary btn-sm" id="btn-profile-switch" style="margin-top: var(--space-sm); padding: 6px 14px;">
          👥 Schimbă profilul
        </button>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${M(o,`lg`,s)}
      </div>

      <!-- Level Progress -->
      <div class="card animate-fadeInUp" style="margin-bottom: var(--space-xl); animation-delay: 0.15s;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
          <div style="display: flex; align-items: center; gap: var(--space-sm);">
            <span class="badge badge-level" style="font-size: var(--font-size-sm); padding: 6px 14px;">
              Nivel ${n.level}
            </span>
            <span style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
              ${n.levelName}
            </span>
          </div>
        </div>
        <div class="progress-bar-container" style="height: 14px; margin-bottom: var(--space-sm);">
          <div class="progress-bar-fill" style="width: ${n.xpProgress.percent}%; background: linear-gradient(90deg, var(--color-secondary), #CE82FF);"></div>
        </div>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); text-align: center;">
          ${n.xpProgress.current} / ${n.xpProgress.needed} XP pentru nivelul următor
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
        ${c}
      </div>

      <!-- Badges Section -->
      <div class="animate-fadeInUp" style="animation-delay: 0.5s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          🏅 Insigne
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          ${a} din ${r.length} deblocate
        </p>
      </div>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      ">
        ${l}
      </div>

      <!-- Bottom Spacing -->
      <div style="height: var(--space-xl);"></div>
    </div>
  `}function Nn(e){document.getElementById(`btn-back-profile`)?.addEventListener(`click`,()=>{e(`home`)}),document.getElementById(`btn-profile-switch`)?.addEventListener(`click`,()=>{e(`users`)})}function Pn(){let e=oe();if(!e)return!1;let t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`),i=e.profile.name.replace(/[^\p{L}\p{N}_-]+/gu,`-`);return r.href=n,r.download=`invatam-germana-${i}-${e.exportedAt.slice(0,10)}.json`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3),!0}function Fn(){return new Promise((e,t)=>{let n=document.createElement(`input`);n.type=`file`,n.accept=`application/json,.json`,n.addEventListener(`change`,async()=>{let r=n.files?.[0];if(!r)return e(null);try{e(l(JSON.parse(await r.text())))}catch(e){t(e instanceof SyntaxError?Error(`Fișierul nu este un JSON valid.`):e)}}),n.click()})}async function In(e){try{let t=await Fn();if(!t)return;document.documentElement.setAttribute(`data-theme`,d().theme||`light`),y(),Oe(),B(`Profilul „${t.name}" a fost importat 🎉`,`success`),e(`home`)}catch(e){B(e.message,`error`,4e3)}}var Ln=[{value:5,label:`5 min`,emoji:`🌱`,desc:`Relaxat`},{value:10,label:`10 min`,emoji:`📚`,desc:`Normal`},{value:15,label:`15 min`,emoji:`💪`,desc:`Serios`},{value:20,label:`20 min`,emoji:`🔥`,desc:`Intens`}],Rn={offline:`Nu există conexiune — se trimite automat mai târziu.`,network:`Serverul nu a putut fi contactat — se reîncearcă automat.`,bad_key:`Serverul nu acceptă cheia pentru scriere. Apasă „Dezactivează" și activează din nou cu cheia de scriere (sau, dacă aici doar urmărești progresul, folosește progres.html).`,regression:`Serverul are mai mult progres decât acest calculator.`,not_configured:`Serverul nu este configurat încă.`};function zn(e){return e?new Date(e).toLocaleString(`ro-RO`,{dateStyle:`short`,timeStyle:`short`}):`niciodată`}function Bn(){let t=Be(),n=e(),r=`font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);`;if(!t)return`
      <p style="${r}">
        Trimite progresul pe server, ca să poată fi urmărit de la distanță. Activează doar pe calculatorul pe care se învață.
      </p>
      <input type="password" id="sync-key-input" class="exercise-input" placeholder="Cheia de sincronizare"
             autocomplete="off" style="width: 100%; margin-bottom: var(--space-sm);">
      <button class="btn btn-primary btn-full" id="btn-sync-enable">Activează sincronizarea</button>
    `;if(!n||t.profileId!==n.id)return`<p style="${r}">Sincronizarea este activă pentru alt profil de pe acest calculator.</p>
      <button class="btn btn-secondary btn-full" id="btn-sync-disable">Dezactivează</button>`;let i=t.lastError?`<p style="${r} color: var(--color-hearts);">⚠️ ${Rn[t.lastError]||`Eroare: ${t.lastError}`}</p>`:``,a=t.lastError===`regression`?`
    <div class="card" style="margin-bottom: var(--space-sm);">
      <p style="${r}">
        Pe server: ${Math.round(t.conflict?.xp||0)} XP, ${t.conflict?.totalAttempts||0} răspunsuri
        (salvat ${zn(t.conflict?.receivedAt)}). Aici: ${d().xp} XP.
      </p>
      <button class="btn btn-primary btn-full" id="btn-sync-restore" style="margin-bottom: var(--space-sm);">⬇️ Adu progresul de pe server</button>
      <button class="btn btn-secondary btn-full" id="btn-sync-force">⬆️ Păstrează ce e aici (suprascrie serverul)</button>
    </div>`:``;return`
    <p style="${r}">✅ Activă · ultima trimitere: <strong>${zn(t.lastSyncAt)}</strong></p>
    ${i}
    ${a}
    <button class="btn btn-secondary btn-full" id="btn-sync-now" style="margin-bottom: var(--space-sm);">🔄 Trimite acum</button>
    <button class="btn btn-secondary btn-full" id="btn-sync-disable">Dezactivează pe acest calculator</button>
  `}function Vn(e){let t=d(),n=t.dailyGoalMinutes||10,r=t.theme===`dark`,i=Ln.map(e=>`
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
        ${M(`happy`,`md`,`Personalizează-ți experiența!`)}
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

      <!-- Sincronizare -->
      <div class="animate-fadeInUp" style="animation-delay: 0.27s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          ☁️ Sincronizare
        </h2>
        ${Bn()}
      </div>

      <!-- Backup -->
      <div class="animate-fadeInUp" style="animation-delay: 0.28s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          💾 Salvează progresul
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Progresul stă doar în acest browser. Descarcă un fișier de rezervă ca să nu-l pierzi sau ca să-l muți pe alt telefon/calculator.
        </p>
        <button class="btn btn-secondary btn-full" id="btn-export-profile" style="margin-bottom: var(--space-sm);">
          ⬇️ Descarcă progresul
        </button>
        <button class="btn btn-secondary btn-full" id="btn-import-profile">
          ⬆️ Încarcă un fișier (profil nou)
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
  `}function Hn(n){document.getElementById(`btn-back-settings`)?.addEventListener(`click`,()=>{n(`home`)}),document.querySelectorAll(`.goal-option`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.value);t&&(m(t),document.querySelectorAll(`.goal-option`).forEach(e=>{let n=parseInt(e.dataset.value)===t;e.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,e.style.background=n?`var(--color-success-bg)`:`var(--bg-card)`;let r=e.querySelector(`div:last-child`);r&&(r.style.borderColor=n?`var(--color-primary)`:`var(--border-color)`,r.style.background=n?`var(--color-primary)`:`transparent`,r.innerHTML=n?`<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>`:``);let i=e.querySelector(`input[type="radio"]`);i&&(i.checked=n)}))})});let r=document.getElementById(`toggle-dark-mode`);r&&r.addEventListener(`change`,()=>{let e=r.checked;t({theme:e?`dark`:`light`}),document.documentElement.setAttribute(`data-theme`,e?`dark`:`light`);let n=r.nextElementSibling?.nextElementSibling;n&&(n.style.left=e?`26px`:`2px`);let i=r.nextElementSibling;i&&(i.style.background=e?`var(--color-primary)`:`var(--border-color)`)}),document.getElementById(`btn-change-user`)?.addEventListener(`click`,()=>{n(`users`)});let i=()=>n(`settings`,{},{replace:!0});document.getElementById(`btn-sync-enable`)?.addEventListener(`click`,async e=>{let t=document.getElementById(`sync-key-input`)?.value.trim();if(t){e.target.disabled=!0;try{let e=await Ke(t);if(e.needsChoice){let t=Math.round(e.server.state.xp||0);confirm(`Pe server există deja mai mult progres (${t} XP). Îl aduc pe acest calculator?\n\nOK = adu de pe server · Anulează = păstrează ce e aici`)?(await Je(),B(`Progresul a fost adus de pe server ☁️`,`success`)):(await k({force:!0}),B(`Sincronizare activată ☁️`,`success`))}else B(e.ok?`Sincronizare activată ☁️`:`Activată — se trimite când e conexiune`,`success`);i()}catch(t){B(t.message||`Nu m-am putut conecta la server.`,`error`,4e3),e.target.disabled=!1}}}),document.getElementById(`btn-sync-now`)?.addEventListener(`click`,async()=>{let e=await k({force:!1});B(e?`Trimis ☁️`:`Nu s-a putut trimite acum`,e?`success`:`warning`),i()}),document.getElementById(`btn-sync-restore`)?.addEventListener(`click`,async()=>{if(confirm(`Progresul de pe acest calculator va fi înlocuit cu cel de pe server. Continui?`))try{await Je(),B(`Progresul a fost adus de pe server ☁️`,`success`),i()}catch(e){B(e.message,`error`,4e3)}}),document.getElementById(`btn-sync-force`)?.addEventListener(`click`,async()=>{if(!confirm(`Progresul de pe server va fi înlocuit cu cel de aici. Continui?`))return;let e=await k({force:!0});B(e?`Serverul a fost actualizat ☁️`:`Nu s-a putut trimite acum`,e?`success`:`warning`),i()}),document.getElementById(`btn-sync-disable`)?.addEventListener(`click`,()=>{confirm(`Oprești sincronizarea pe acest calculator? Progresul rămâne salvat local și pe server.`)&&(qe(),i())}),document.getElementById(`btn-export-profile`)?.addEventListener(`click`,()=>{Pn()&&B(`Fișierul cu progresul a fost descărcat 💾`,`success`)}),document.getElementById(`btn-import-profile`)?.addEventListener(`click`,()=>In(n)),document.getElementById(`btn-reset-progress`)?.addEventListener(`click`,()=>{confirm(`⚠️ Ești absolut sigur?

Tot progresul ACESTUI profil va fi șters:
- XP și nivel
- Lecții completate
- Insigne câștigate
- Serie zilnică

Această acțiune NU poate fi anulată!`)&&confirm(`Ultima confirmare: chiar vrei să ștergi TOT progresul acestui profil?`)&&(s(),document.documentElement.removeAttribute(`data-theme`),n(`home`))}),document.getElementById(`btn-delete-user`)?.addEventListener(`click`,()=>{let t=e();t&&confirm(`⚠️ Ștergi profilul „${t.name}" și tot progresul lui?`)&&confirm(`Ultima confirmare: profilul și progresul vor dispărea definitiv. Continui?`)&&(u(t.id),document.documentElement.removeAttribute(`data-theme`),n(`users`))})}function Un(e){let t=d(),n=Pe(),r=Ae(),i=t.mistakes.slice(0,20),a=r.length>0,o=i.length>0;return`
    <div class="practice-screen">
      <button class="screen-back-btn" id="btn-back-practice">← Înapoi</button>
      <h1 class="screen-title">🔄 Hub de Practică</h1>
      <p class="screen-subtitle">Repetă cuvintele și corectează greșelile pentru a le fixa în memorie!</p>
      
      ${!a&&!o?`
        <div class="practice-empty animate-scaleIn">
          ${M(`happy`,`lg`,`Nu ai nimic de repetat acum! Completează lecții noi și revino mai târziu! 🌟`)}
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
        
        <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
          ${a?`
            <button class="btn btn-primary btn-full" id="btn-start-review">▶ Începe repetiția (${Math.min(r.length,14)} cuvinte)</button>
          `:``}
          ${o?`
            <button class="btn btn-accent btn-full" id="btn-fix-mistakes">🛠️ Repară greșelile (${Math.min(i.length,14)})</button>
          `:``}
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
  `}function Wn(e){document.getElementById(`btn-back-practice`)?.addEventListener(`click`,()=>e(`home`)),document.getElementById(`btn-practice-home`)?.addEventListener(`click`,()=>e(`home`)),document.getElementById(`btn-start-review`)?.addEventListener(`click`,()=>{let t=Ne();t.length&&e(`lesson`,{exercises:t,title:`Repetiție`,icon:`🔄`,unitId:`review`})}),document.getElementById(`btn-fix-mistakes`)?.addEventListener(`click`,()=>{let t=de();t.length&&e(`lesson`,{exercises:t,title:`Repară greșelile`,icon:`🛠️`,unitId:`mistakes`})}),document.querySelectorAll(`.practice-speak-btn`).forEach(e=>{e.addEventListener(`click`,()=>I(e.dataset.word))})}var Gn=[`👩`,`👨`,`👵`,`👴`,`🧑`,`👧`,`👦`,`🐱`,`🐶`,`🦊`,`🐻`,`🦉`];function Kn(t){let n=c(),r=e(),i=n.map((e,t)=>{let n=a(e.id),i=r&&r.id===e.id;return`
      <div class="user-card card-interactive animate-fadeInUp ${i?`user-card-active`:``}"
           data-user-id="${e.id}" style="animation-delay: ${t*.08}s">
        <span class="user-card-avatar">${e.avatar}</span>
        <div class="user-card-info">
          <span class="user-card-name">${qn(e.name)}</span>
          <span class="user-card-stats">
            ⭐ Nivel ${n.level} · ${h(n.level)} &nbsp; 🔥 ${n.streak} zile
          </span>
        </div>
        <button class="user-card-edit" data-edit-id="${e.id}" title="Redenumește" aria-label="Redenumește profilul">✏️</button>
        ${i?`<span class="user-card-check">✓</span>`:``}
      </div>
    `}).join(``),o=Gn.map((e,t)=>`
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
        ${M(`waving`,`md`)}
      </div>

      <div class="users-list">
        ${i||`<p style="text-align:center; color: var(--text-secondary);">Niciun profil încă — creează primul mai jos! 👇</p>`}
      </div>

      <div id="new-user-form" class="card animate-fadeInUp" style="display: none; margin-top: var(--space-lg);">
        <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
          ✨ Profil nou
        </h3>
        <input type="text" id="new-user-name" class="exercise-input" placeholder="Numele tău..."
               maxlength="24" autocomplete="off"
               style="width: 100%; margin-bottom: var(--space-md);">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-sm);">Alege un avatar:</p>
        <div class="avatar-grid">${o}</div>
        <button class="btn btn-primary btn-full" id="btn-create-user" style="margin-top: var(--space-md);">
          Începe să înveți! 🚀
        </button>
      </div>

      <button class="btn btn-secondary btn-full animate-fadeInUp" id="btn-show-new-user"
              style="margin-top: var(--space-lg); animation-delay: 0.2s;">
        ➕ Adaugă profil
      </button>

      <button class="btn btn-ghost btn-full" id="btn-users-import" style="margin-top: var(--space-sm);">
        ⬆️ Am un fișier cu progresul
      </button>

      ${r?`
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
  `}function qn(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function Jn(e){let t=Gn[0];document.querySelectorAll(`.user-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.user-card-edit`))return;let r=t.dataset.userId;he(r),Yn(),y(),Oe(),e(`home`)})}),document.getElementById(`btn-users-import`)?.addEventListener(`click`,()=>In(e)),document.querySelectorAll(`.user-card-edit`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.dataset.editId,i=c().find(e=>e.id===r),a=prompt(`Noul nume al profilului:`,i?i.name:``);a&&a.trim()&&(o(r,a),e(`users`))})}),document.getElementById(`btn-show-new-user`)?.addEventListener(`click`,()=>{let e=document.getElementById(`new-user-form`);e&&(e.style.display=`block`,document.getElementById(`new-user-name`)?.focus()),document.getElementById(`btn-show-new-user`).style.display=`none`}),document.querySelectorAll(`.avatar-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.avatar-option`).forEach(e=>e.classList.remove(`avatar-selected`)),e.classList.add(`avatar-selected`),t=e.dataset.avatar})});let n=()=>{let n=document.getElementById(`new-user-name`),i=n?n.value.trim():``;if(!i){n&&(n.placeholder=`Scrie un nume mai întâi 🙂`,n.focus());return}r(i,t),Yn(),y(),e(`home`)};document.getElementById(`btn-create-user`)?.addEventListener(`click`,n),document.getElementById(`new-user-name`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&n()}),document.getElementById(`btn-users-back`)?.addEventListener(`click`,()=>e(`home`))}function Yn(){let e=d();document.documentElement.setAttribute(`data-theme`,e.theme||`light`)}function Xn(e,t){let n=b(t.sectionId);if(!n)return e(`home`),`<p>Secțiunea nu a fost găsită.</p>`;let r=``;if(n.themes&&n.themes.length&&(r+=`
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
    `),n.units&&n.units.length){n.themes&&n.themes.length&&(r+=`<h2 class="home-extra-title">🏆 Provocări vizuale</h2>`);let e=d(),t=n.units,i=(n,r,i)=>{let a=_(n.id),o=r===0||_(t[r-1].id),s=e.lessonsCompleted[n.id]?.stars||0;return`
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
      `};if(n.series){let e=n.seriesSize||10,a=Math.ceil(t.length/e),o=[];for(let n=0;n<a;n++)o[n]=t.slice(n*e,n*e+e).every(e=>_(e.id));let s=e=>e===0||o[e-1],c=[],l=0;for(let r=0;r<a;r++)if(s(r)){let s=t.slice(r*e,r*e+e),u=s.filter(e=>_(e.id)).length,d=localStorage.getItem(`ui_series_${n.id}_${r}`),f=d===null?o[r]:d===`1`;c.push(`
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
  `}function Zn(e,t){let n=b(t.sectionId);n&&(document.getElementById(`btn-back-section`)?.addEventListener(`click`,()=>e(`home`)),document.querySelectorAll(`.series-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.series,r=document.querySelector(`.series-units[data-series="${t}"]`);if(!r)return;let i=r.classList.toggle(`is-collapsed`);localStorage.setItem(`ui_series_${n.id}_${t}`,i?`1`:`0`),e.setAttribute(`aria-expanded`,String(!i));let a=e.querySelector(`.series-caret`);a&&(a.textContent=i?`▾`:`▴`)})}),document.querySelectorAll(`.theme-card`).forEach(t=>{t.addEventListener(`click`,()=>{e(`themeGallery`,{sectionId:n.id,themeId:t.dataset.themeId})})}),document.querySelectorAll(`.lesson-node[data-unit-id]`).forEach(t=>{t.addEventListener(`click`,()=>{e(`lesson`,{sectionId:n.id,unitId:t.dataset.unitId})})}))}function Qn(e){let t=e.slice();for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function $n(e){return b(e.sectionId)?.themes?.find(t=>t.id===e.themeId)||null}function er(e,t){let n=$n(t);if(!n)return e(`home`),`<p>Tema nu a fost găsită.</p>`;let r=n.words.map((e,t)=>{let n=x(e.de)||`🎴`;return`
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
  `}function tr(e,t){let n=$n(t);n&&(document.getElementById(`btn-back-gallery`)?.addEventListener(`click`,()=>{e(`section`,{sectionId:t.sectionId})}),document.querySelectorAll(`.tg-card`).forEach(e=>{e.addEventListener(`click`,async()=>{document.querySelectorAll(`.tg-card`).forEach(e=>e.classList.remove(`tg-playing`)),e.classList.add(`tg-playing`),await I(e.dataset.de),e.classList.remove(`tg-playing`)})}),document.getElementById(`btn-theme-quiz`)?.addEventListener(`click`,()=>{let r=n.words;e(`lesson`,{exercises:Qn(r).map(e=>{let t=Qn(r.filter(t=>t.de!==e.de)).slice(0,2).map(e=>e.de);return{type:`picturePick`,wordDe:e.de,correct:e.de,options:Qn([e.de,...t])}}),title:n.title,icon:n.icon,unitId:`theme:${n.id}`,sectionId:t.sectionId,themeId:n.id})}))}var nr={salutari:`👋 Salutări`,expresii:`💬 Expresii`,familie:`👨‍👩‍👧 Familie`,mancare:`🍽️ Mâncare`,bauturi:`🥤 Băuturi`,culori:`🎨 Culori`,animale:`🐾 Animale`,natura:`🌳 Natură`,transport:`🚗 Transport`,numere:`🔢 Numere`};function rr(e){return`
    <div class="dict-row card animate-fadeIn">
      <span class="dict-emoji">${x(e.de)||``}</span>
      <div class="dict-words">
        <span class="dict-de">${e.article?`${e.article} ${e.de}`:e.de}</span>
        <span class="dict-ro">${e.ro}</span>
      </div>
      <button class="dict-speak" data-word="${e.de}" aria-label="Ascultă">🔊</button>
    </div>
  `}function ir(e){return`
    <div class="dict-screen">
      <button class="screen-back-btn" id="btn-back-dict">← Înapoi</button>
      <h1 class="screen-title">📖 Dicționar</h1>
      <p class="screen-subtitle">${S.length} cuvinte verificate · caută în română sau germană</p>

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
  `}function ar(e){let t=document.getElementById(`dict-results`);if(t){if(e&&e.trim()){let n=se(e);t.innerHTML=n.length?n.map(rr).join(``):`<p class="dict-empty">Niciun rezultat. Încearcă alt cuvânt 🙂</p>`}else t.innerHTML=Object.entries(nr).map(([e,t])=>{let n=S.filter(t=>t.category===e);return n.length?`
        <h2 class="dict-category-title">${t}</h2>
        ${n.map(rr).join(``)}
      `:``}).join(``);t.querySelectorAll(`.dict-speak`).forEach(e=>{e.addEventListener(`click`,()=>I(e.dataset.word))})}}function or(e){document.getElementById(`btn-back-dict`)?.addEventListener(`click`,()=>e(`home`));let t=document.getElementById(`dict-search`),n=null;t?.addEventListener(`input`,()=>{clearTimeout(n),n=setTimeout(()=>ar(t.value),200)}),ar(``)}var Z=`home`,Q={};function sr(){let e=d();document.documentElement.setAttribute(`data-theme`,e.theme||`light`)}var cr=new Set([`lesson`,`results`]);function lr(e,t){return{screen:e,params:JSON.parse(JSON.stringify(t||{}))}}function $(e,t={},{replace:n=!1}={}){let r=lr(e,t),i=`#/${e}`;n||cr.has(Z)?history.replaceState(r,``,i):history.pushState(r,``,i),ur(e,t)}function ur(e,t){Z=e,Q=t,dr(),window.scrollTo(0,0)}window.addEventListener(`popstate`,e=>{let t=e.state;if(Z===`lesson`&&t?.screen!==`lesson`&&!confirm(`Ești sigur că vrei să ieși din lecție? Progresul nu va fi salvat.`)){history.pushState(lr(`lesson`,Q),``,`#/lesson`);return}if(!t?.screen||!ae().activeUserId){ur(ae().activeUserId?`home`:`users`,{});return}ur(t.screen,t.params||{})});function dr(){let e=document.getElementById(`app`);if(!e)return;let t=``;switch(Z){case`home`:t=lt($);break;case`lesson`:t=Yt($,Q);break;case`results`:t=wn($,Q);break;case`cognates`:t=kn($);break;case`profile`:t=Mn($);break;case`settings`:t=Vn($);break;case`practice`:t=Un($);break;case`users`:t=Kn($);break;case`section`:t=Xn($,Q);break;case`themeGallery`:t=er($,Q);break;case`dictionary`:t=ir($);break;default:t=lt($)}e.innerHTML=t,requestAnimationFrame(()=>{switch(Z){case`home`:ut($);break;case`lesson`:Zt($,Q);break;case`results`:Tn($,Q);break;case`cognates`:An($);break;case`profile`:Nn($);break;case`settings`:Hn($);break;case`practice`:Wn($);break;case`users`:Jn($);break;case`section`:Zn($,Q);break;case`themeGallery`:tr($,Q);break;case`dictionary`:or($);break}})}function fr(){if(sr(),Ce(),Xe(),!ae().activeUserId){$(`users`,{},{replace:!0});return}y(),Oe();let e=history.state;e?.screen&&e.screen!==`results`?$(e.screen,e.params||{},{replace:!0}):$(`home`,{},{replace:!0})}document.addEventListener(`DOMContentLoaded`,fr),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>console.warn(`SW:`,e))}),window.__navigate=$;