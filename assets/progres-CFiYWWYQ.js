import{_ as e,r as t,t as n}from"./sections-GsQmv5Zb.js";var r=`demolingo_read_key`,i=`/api/progress.php`,a=6e4,o=document.getElementById(`dash`);matchMedia(`(prefers-color-scheme: dark)`).matches&&document.documentElement.setAttribute(`data-theme`,`dark`);var s=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function c(){try{return localStorage.getItem(r)||``}catch{return``}}function l(e){try{e?localStorage.setItem(r,e):localStorage.removeItem(r)}catch{}}var u=t(),d=n(),f=new Map;for(let e of u)f.set(e.id,{title:`${e.icon||``} ${e.title}${e.titleDe?` · ${e.titleDe}`:``}`,where:`Lecții`});for(let e of d)for(let t of e.units||[])f.set(t.id,{title:`${t.icon||``} ${t.title}`,where:e.title});function p(e){if(!e)return`—`;let t=Math.round((Date.now()-new Date(e).getTime())/6e4);if(t<1)return`chiar acum`;if(t<60)return`acum ${t} min`;let n=Math.round(t/60);if(n<24)return`acum ${n} ${n===1?`oră`:`ore`}`;let r=Math.round(n/24);return`acum ${r} ${r===1?`zi`:`zile`}`}var m=e=>new Date(e).toLocaleString(`ro-RO`,{dateStyle:`medium`,timeStyle:`short`}),h=e=>e>=60?`${Math.floor(e/60)} h ${Math.round(e%60)} min`:`${Math.round(e)} min`;function g(e){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}function _(e=``){o.innerHTML=`
    <main class="dash">
      <h1 class="dash-title">📈 Progres</h1>
      <div class="dash-card">
        <p class="dash-muted">Introdu cheia de citire (din fișierul de configurare de pe server).</p>
        ${e?`<p class="dash-error">${s(e)}</p>`:``}
        <form id="key-form">
          <input type="password" id="key-input" class="dash-input" placeholder="Cheia de citire" autocomplete="off" required>
          <button class="dash-btn" type="submit">Vezi progresul</button>
        </form>
      </div>
    </main>`,document.getElementById(`key-form`).addEventListener(`submit`,e=>{e.preventDefault(),l(document.getElementById(`key-input`).value.trim()),w()})}function v(e,t,n=``,r=`var(--text-primary)`){return`
    <div class="dash-tile">
      <span class="dash-tile-label">${e}</span>
      <span class="dash-tile-value" style="color:${r}">${t}</span>
      ${n?`<span class="dash-tile-sub">${n}</span>`:``}
    </div>`}function y(e){let t=[];for(let n=29;n>=0;n--){let r=new Date;r.setDate(r.getDate()-n);let i=g(r);t.push({key:i,d:r,...e[i]||{}})}let n=Math.max(10,...t.map(e=>e.minutes||0)),r=t.filter(e=>(e.minutes||0)>0||(e.answers||0)>0).length,i=t.reduce((e,t)=>e+(t.minutes||0),0),a=t.map(e=>{let t=e.minutes||0,r=t>0?Math.max(4,t/n*100):0;return`<div class="dash-bar-col" title="${s(`${e.d.toLocaleDateString(`ro-RO`,{weekday:`short`,day:`numeric`,month:`short`})}: ${h(t)} · ${e.answers||0} răspunsuri · ${e.lessons||0} lecții · ${Math.round(e.xp||0)} XP`)}">
      <div class="dash-bar" style="height:${r}%"></div>
      <span class="dash-bar-day">${e.d.getDate()}</span>
    </div>`}).join(``);return`
    <div class="dash-card">
      <div class="dash-card-head">
        <h2>⏱️ Minute pe zi — ultimele 30 de zile</h2>
        <span class="dash-muted">${r===1?`1 zi activă`:`${r} zile active`} · ${h(i)}</span>
      </div>
      ${Object.keys(e).length?`<div class="dash-chart">${a}</div>`:`<p class="dash-muted">Istoricul zilnic începe de la actualizarea aplicației.</p>`}
    </div>`}function b(e){let t=e.lessonsCompleted||{},n=e=>t[e]?.completed;return`
    <div class="dash-card">
      <h2>🧭 Unde a ajuns</h2>
      ${[{title:`🗺️ Lecții (traseul principal)`,total:u.length,done:u.filter(e=>n(e.id)).length},...d.filter(e=>e.units?.length).map(e=>({title:`${e.icon} ${e.title}`,total:e.units.length,done:e.units.filter(e=>n(e.id)).length}))].map(e=>{let t=e.total?Math.round(e.done/e.total*100):0;return`<div class="dash-row">
          <span class="dash-row-title">${s(e.title)}</span>
          <div class="dash-meter"><div style="width:${t}%"></div></div>
          <span class="dash-row-num">${e.done}/${e.total}</span>
        </div>`}).join(``)}
    </div>`}function x(e){let t=Object.entries(e.lessonsCompleted||{}).filter(([,e])=>e.completedAt).sort((e,t)=>t[1].completedAt.localeCompare(e[1].completedAt)).slice(0,10);return t.length?`
    <div class="dash-card">
      <h2>✅ Ultimele lecții terminate</h2>
      ${t.map(([e,t])=>{let n=f.get(e);return`<div class="dash-list-row">
          <div><strong>${s(n?n.title:e===`review`?`🔄 Repetiție`:e===`mistakes`?`🛠️ Repară greșelile`:e)}</strong><span class="dash-muted"> · ${s(n?.where||`Practică`)}</span></div>
          <div class="dash-muted">${`⭐`.repeat(t.stars||0)} ${t.bestScore??``}% · ${p(t.completedAt)}</div>
        </div>`}).join(``)}
    </div>`:``}function S(e){let t=(e.mistakes||[]).slice(0,8);return t.length?`
    <div class="dash-card">
      <h2>❌ Greșeli recente (de reparat)</h2>
      ${t.map(e=>{let t=e.exercise||{},n=t.lines?t.lines.find(e=>e.blank):null,r=t.prompt||t.question||t.promptRo||t.promptDe||t.word||t.sentence||t.de||t.wordDe||t.scene||t.type,i=t.answer||t.correct||n?.answer||``;return`<div class="dash-list-row">
          <div>${s(r)}</div>
          <div class="dash-muted">✅ ${s(i)} · ${p(e.timestamp)}</div>
        </div>`}).join(``)}
    </div>`:``}function C(t){let n=t.state||{},r=(n.activityLog||{})[g(new Date)]||{},i=(n.totalCorrect||0)+(n.totalWrong||0),a=i?Math.round(n.totalCorrect/i*100):0,c=t.profile?.name||`Cursant`;o.innerHTML=`
    <main class="dash">
      <header class="dash-header">
        <div>
          <h1 class="dash-title">${s(t.profile?.avatar||`🙂`)} ${s(c)}</h1>
          <p class="dash-muted">Ultima sincronizare: <strong>${p(t.receivedAt)}</strong> (${m(t.receivedAt)})</p>
        </div>
        <div class="dash-actions">
          <button class="dash-btn dash-btn-ghost" id="btn-refresh">🔄 Reîncarcă</button>
          <button class="dash-btn dash-btn-ghost" id="btn-forget">Uită cheia</button>
        </div>
      </header>

      <section class="dash-tiles">
        ${v(`Azi`,h(r.minutes||0),`${r.answers||0} răspunsuri · ${r.lessons||0} lecții`,`var(--color-primary)`)}
        ${v(`Nivel`,`${n.level||1}`,`${s(e(n.level||1))} · ${Math.round(n.xp||0)} XP`,`var(--color-xp)`)}
        ${v(`Serie`,`🔥 ${n.streak||0}`,`zile la rând (la ultima deschidere)`,`var(--color-streak)`)}
        ${v(`Timp total`,h(n.totalMinutes||0),`obiectiv: ${n.dailyGoalMinutes||10} min/zi`)}
        ${v(`Lecții terminate`,`${n.totalLessonsCompleted||0}`)}
        ${v(`Acuratețe`,`${a}%`,`${n.totalAttempts||0} încercări în total`,`var(--color-secondary)`)}
      </section>

      ${y(n.activityLog||{})}
      ${b(n)}
      ${x(n)}
      ${S(n)}
    </main>`,document.getElementById(`btn-refresh`).addEventListener(`click`,w),document.getElementById(`btn-forget`).addEventListener(`click`,()=>{l(``),_()})}async function w(){let e=c();if(!e)return _();try{let t=await fetch(i,{headers:{"X-Key":e},cache:`no-store`});if(t.status===403)return l(``),_(`Cheie greșită.`);if(t.status===404){o.innerHTML=`<main class="dash"><h1 class="dash-title">📈 Progres</h1>
        <div class="dash-card"><p class="dash-muted">Încă nu s-a trimis niciun progres. Activează sincronizarea pe calculatorul cursantului (Setări → Sincronizare).</p></div></main>`;return}if(!t.ok)throw Error(`Serverul a răspuns ${t.status}`);C(await t.json())}catch(e){o.innerHTML=`<main class="dash"><h1 class="dash-title">📈 Progres</h1>
      <div class="dash-card"><p class="dash-error">${s(e.message)}</p>
      <button class="dash-btn" id="btn-retry">Încearcă din nou</button></div></main>`,document.getElementById(`btn-retry`).addEventListener(`click`,w)}}var T=document.createElement(`style`);T.textContent=`
  body { background: var(--bg-secondary); }
  .dash { max-width: 960px; margin: 0 auto; padding: 24px 16px 48px; display: flex; flex-direction: column; gap: 16px; }
  .dash-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
  .dash-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); }
  .dash-actions { display: flex; gap: 8px; }
  .dash-muted { color: var(--text-secondary); font-size: 0.9rem; }
  .dash-error { color: var(--color-error); margin: 8px 0; }
  .dash-card { background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 16px; padding: 16px; }
  .dash-card h2 { font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }
  .dash-card-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .dash-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  @media (max-width: 640px) { .dash-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .dash-tile { background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .dash-tile-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); font-weight: 700; }
  .dash-tile-value { font-size: 1.6rem; font-weight: 800; font-variant-numeric: tabular-nums; }
  .dash-tile-sub { font-size: 0.8rem; color: var(--text-secondary); }
  .dash-chart { display: flex; align-items: flex-end; gap: 3px; height: 160px; }
  .dash-bar-col { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px; min-width: 0; }
  .dash-bar { width: 100%; max-width: 22px; background: var(--color-primary); border-radius: 4px 4px 0 0; }
  .dash-bar-day { font-size: 0.65rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }
  .dash-row { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(60px, 2fr) auto; gap: 10px; align-items: center; padding: 6px 0; }
  .dash-row-title { font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dash-row-num { font-variant-numeric: tabular-nums; color: var(--text-secondary); font-size: 0.9rem; }
  .dash-meter { height: 10px; background: var(--border-color); border-radius: 999px; overflow: hidden; }
  .dash-meter > div { height: 100%; background: var(--color-primary); border-radius: 999px; }
  .dash-list-row { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-top: 1px solid var(--border-color); flex-wrap: wrap; color: var(--text-primary); }
  .dash-list-row:first-of-type { border-top: none; }
  .dash-input { width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 12px; font-size: 1rem; margin: 8px 0; background: var(--bg-primary); color: var(--text-primary); }
  .dash-btn { padding: 10px 16px; border-radius: 12px; border: none; background: var(--color-primary); color: #fff; font-weight: 700; cursor: pointer; font-size: 0.95rem; }
  .dash-btn-ghost { background: var(--bg-card); color: var(--text-primary); border: 2px solid var(--border-color); }
`,document.head.appendChild(T),w(),setInterval(()=>{document.visibilityState===`visible`&&c()&&w()},a);