(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const T="modulepreload",S=function(e,t){return new URL(e,t).href},b={},L=function(t,s,n){let a=Promise.resolve();if(s&&s.length>0){let v=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),m=l?.nonce||l?.getAttribute("nonce");a=v(s.map(c=>{if(c=S(c,n),c in b)return;b[c]=!0;const u=c.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(n)for(let h=o.length-1;h>=0;h--){const g=o[h];if(g.href===c&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${p}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":T,u||(d.as="script"),d.crossOrigin="",d.href=c,m&&d.setAttribute("nonce",m),document.head.appendChild(d),u)return new Promise((h,g)=>{d.addEventListener("load",h),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return a.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})},A=[{slug:"kuaizengji",name:"Kuaizengji",status:"Live",line:"Coursework-native AI for students in English-medium and overseas programs.",seoTitle:"Kuaizengji — Coursework-native AI | CPH4.AI",paragraphs:["Kuaizengji sits inside the work students already have: readings, problem sets, exams in English-medium and overseas programs. Not a generic chat window.","It is live. The product site is separate from this company site."],external:{label:"Open",href:"https://www.kuaizengji.com/"}},{slug:"kuaizengji-3",name:"Kuaizengji 3.0",status:"Coming",line:"A general learning agent: any source in, structured knowledge out. September 2026.",seoTitle:"Kuaizengji 3.0 — General learning agent | CPH4.AI",paragraphs:["3.0 generalizes the work. Lecture, paper, recording — in. Structured knowledge — out.","Dated September 2026. Not live."]},{slug:"taoran",name:"Taoran Agent",status:"Demo",line:"Exam-prep that follows a named teacher’s method, not a generic tutor.",seoTitle:"Taoran Agent — Teacher-method exam prep | CPH4.AI",paragraphs:["Most tutors average a subject. Taoran Agent follows one teacher’s method through exam prep.","In demo. Not a public product yet."]},{slug:"verdict",name:"Verdict",status:"Building",line:"Financial opinions, settled against real prices.",seoTitle:"Verdict — Financial opinions | CPH4.AI",paragraphs:["Verdict is being built to produce financial opinions that can be checked against prices that actually traded.","In progress. Nothing to open yet."]}],C=[{slug:"rpa",name:"RPA",group:"Applied",line:"Automated ops across Xiaohongshu, WeChat, Reddit, YouTube.",paragraphs:["Accounts, replies, posting, and the ops a team already runs — Xiaohongshu, WeChat, Reddit, YouTube — without a person on every tab.","Applied work. Not a product you open. The automation sits behind the work."]},{slug:"aeo",name:"AEO",group:"Applied",line:"Public acquisition — so models recommend the brand.",paragraphs:["Acquisition used to mean ranking in search. Now it also means being the name a model gives when someone asks.","We write and place the public record so the brand is what gets recommended. Not ads. Presence."]},{slug:"digital-humans",name:"Digital humans",group:"Applied",line:"Generated presenters from video, speech, and voice clone.",paragraphs:["Presenters assembled from video, speech, and a cloned voice — so a face and a method can appear without a studio day for every cut.","Used where a person should show up and cannot always be in the room. Not a consumer avatar you buy."]},{slug:"video-gen",name:"Video Gen",group:"Media",line:"Image and video synthesis.",paragraphs:["Images and video generated to the brief, then cut into the work that needs them.","A media layer. Not a generator we sell."]},{slug:"asr",name:"ASR",group:"Media",line:"Speech to text.",paragraphs:["Speech in. Text out. Lectures, calls, source that starts as voice.","Infrastructure for everything that has to be read before it can be used."]},{slug:"tts",name:"TTS",group:"Media",line:"Text to speech.",paragraphs:["Text in. Speech out. For presenters, prep, and anything that has to be heard.","Paired with clone and video. Not a standalone voice app."]},{slug:"voice-clone",name:"Voice Clone",group:"Media",line:"A voice that can be reused.",paragraphs:["A voice captured once, then reused — so the same speaker can appear in new cuts without a new session.","Used with digital humans and TTS. The voice is the asset. The clone is the reuse."]},{slug:"ontology",name:"Ontology",group:"Foundation",line:"The model underneath.",paragraphs:["The model underneath the stack. What the work is made of, and how the pieces relate.","Foundation, not a name on the nav. Everything above sits on it."]}],$=[],y=[],w=e=>document.body.dataset.root==="nested"?`../${e}`:`./${e}`,f=e=>document.body.dataset.root==="nested"?`../index.html#${e}`:`#${e}`,k=e=>w(`products/${e}.html`),P=e=>w(`careers/${e}.html`),i=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E=(e,t={})=>{const s=t.heading??"h2",n=t.showName??!0,a=t.showStatus??!0,r=e.paragraphs.map(v=>`<p>${i(v)}</p>`).join(""),o=e.external?`<a class="outline-cta" href="${i(e.external.href)}" target="_blank" rel="noopener noreferrer">${i(e.external.label)}</a>`:"",l=a?`<p class="product-detail-status">${i(e.status)}</p>`:"",m=n?`<${s} class="product-detail-name">${i(e.name)}</${s}>`:"";return`
    ${l}
    ${m}
    <p class="page-lede">${i(e.line)}</p>
    <div class="page-body">${r}</div>
    ${o}
  `},N=(e,t={})=>{const s=t.nested??(typeof document<"u"&&document.body?.dataset.root==="nested"),n=o=>s?`../${o}`:`./${o}`,a=o=>n(`products/${o}.html`),r=A.map(o=>`<li>${o.slug===e.slug?`<span class="page-sibling is-current">${i(o.name)}</span>`:`<a href="${a(o.slug)}">${i(o.name)}</a>`}</li>`).join("");return`
    <p class="eyebrow"><a href="${n("index.html#products")}">Products</a> / ${i(e.status)}</p>
    ${E(e,{heading:"h1",showStatus:!1})}
    <ul class="page-siblings">${r}</ul>
  `},x=(e,t={})=>{const s=t.heading??"h2",n=e.paragraphs.map(a=>`<p>${i(a)}</p>`).join("");return`
    <p class="capability-detail-group">${i(e.group)}</p>
    <${s} class="capability-detail-name">${i(e.name)}</${s}>
    <p class="page-lede">${i(e.line)}</p>
    <div class="page-body">${n}</div>
  `},j=()=>{const e=document.querySelector("[data-jobs]");if(e){if(y.length===0){e.remove();return}e.innerHTML=y.map(t=>`
        <li>
          <a class="job-title" href="${P(t.slug)}">${t.title}</a>
          <span class="job-meta">${t.location} · ${t.type}</span>
          <p class="job-line">${t.oneLiner}</p>
        </li>`).join("")}},I=()=>{const e=document.querySelector("[data-notes]");e&&$.length!==0&&(e.innerHTML=`<ul class="note-list">${$.map(t=>`
        <li>
          <a href="${w(`blog/${t.slug}.html`)}">
            <time datetime="${i(t.date)}">${i(t.date)}</time>
            <span class="note-title">${i(t.title)}</span>
            <p>${i(t.excerpt)}</p>
          </a>
        </li>`).join("")}</ul>`)},H=()=>{const e=document.querySelector("[data-footer]");if(!e)return;const t=A.map(s=>`<li><a href="${k(s.slug)}">${s.name}</a></li>`).join("");e.innerHTML=`
    <div class="footer-grid">
      <div class="footer-col">
        <h2>Products</h2>
        <ul>${t}</ul>
      </div>
      <div class="footer-col">
        <h2>Capabilities</h2>
        <ul>
          <li><a href="${f("capabilities")}">The stack</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Company</h2>
        <ul>
          <li><a href="${f("company")}">Company</a></li>
          <li><a href="${f("careers")}">Careers</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Blogs</h2>
        <ul>
          <li><a href="${f("blogs")}">All posts</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Contact</h2>
        <ul>
          <li><a class="footer-mail" href="mailto:nemoarce2007@gmail.com">nemoarce2007@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-meta">&copy; 2026 CPH4.AI</p>
  `},O=()=>{const e=document.querySelector("[data-nav-toggle]"),t=document.querySelector(".site-nav");if(!e||!t)return;const s=n=>{document.documentElement.toggleAttribute("data-nav-open",n),t.classList.toggle("is-open",n),e.setAttribute("aria-expanded",n?"true":"false"),e.setAttribute("aria-label",n?"Close menu":"Open menu")};e.addEventListener("click",()=>{s(!document.documentElement.hasAttribute("data-nav-open"))}),t.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>s(!1))}),document.querySelector(".contact-link")?.addEventListener("click",()=>s(!1)),window.addEventListener("keydown",n=>{n.key==="Escape"&&s(!1)}),window.matchMedia("(max-width: 1099px)").addEventListener("change",n=>{n.matches||s(!1)})},q=6,M=()=>new URLSearchParams(window.location.search).has("motion")?!0:window.matchMedia("(prefers-reduced-motion: reduce)").matches||window.matchMedia("(max-width: 1099px)").matches?!1:!("connection"in navigator?navigator.connection:void 0)?.saveData;export{q as S,L as _,j as a,I as b,O as c,E as d,C as e,x as f,i as g,N as h,y as j,H as m,A as p,w as r,M as s};
