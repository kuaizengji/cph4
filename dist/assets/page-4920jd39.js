import{m as c,c as i,d,j as l,h as t,r as p,p as u,i as m}from"./world-CRO3kM1h.js";const n=document.querySelector("[data-line-world]"),o=document.querySelector("[data-page-root]"),r=document.body.dataset.product??document.body.dataset.job,g=!!document.body.dataset.job;if(!n)throw new Error("Missing line-world canvas");if(!o)throw new Error("Missing page root");const b=()=>{const e=u.find(a=>a.slug===r);if(!e){o.innerHTML='<p class="page-empty">Unknown product.</p>';return}document.title=e.seoTitle,document.querySelector(".site-nav a[data-section='products']")?.classList.add("is-active"),o.innerHTML=m(e)},y=()=>{const e=l.find(s=>s.slug===r);if(document.querySelector(".site-nav a[data-section='careers']")?.classList.add("is-active"),!e){o.innerHTML='<p class="page-empty">Unknown role.</p>';return}document.title=`${e.title} — Careers — CPH4.AI`;const a=e.paragraphs.map(s=>`<p>${t(s)}</p>`).join("");o.innerHTML=`
    <p class="eyebrow"><a href="${p("index.html#careers")}">Careers</a> / ${t(e.type)}</p>
    <h1>${t(e.title)}</h1>
    <p class="page-lede">${t(e.location)} · ${t(e.oneLiner)}</p>
    <div class="page-body">${a}</div>
    <a class="outline-cta outline-cta-wide" href="mailto:nemoarce2007@gmail.com?subject=${encodeURIComponent(e.title)}">Write to us</a>
  `};g?y():b();c();i();d(n).then(e=>{e?.setPosition(1),window.addEventListener("resize",()=>e?.resize())});
