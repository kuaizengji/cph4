import{m as p,b as u,c as g,n as r,r as n,g as t,j as m,p as i,h as $,d as h}from"./world-8EV5EYE9.js";const l=document.querySelector("[data-line-world]"),o=document.querySelector("[data-page-root]"),d=document.body.dataset.product??document.body.dataset.job,c=document.body.dataset.page,b=c==="blogs"||c==="notes",f=!!document.body.dataset.job;if(!l)throw new Error("Missing line-world canvas");if(!o)throw new Error("Missing page root");const y=()=>{const e=i.find(s=>s.slug===d);if(!e){o.innerHTML='<p class="page-empty">Unknown product.</p>';return}document.title=`${e.name} — CPH4.AI`,document.querySelector(".site-nav a[data-section='products']")?.classList.add("is-active");const a=i.map(s=>`<li>${s.slug===e.slug?`<span class="page-sibling is-current">${t(s.name)}</span>`:`<a href="${$(s.slug)}">${t(s.name)}</a>`}</li>`).join("");o.innerHTML=`
    <p class="eyebrow"><a href="${n("index.html#products")}">Products</a> / ${t(e.status)}</p>
    ${h(e,{heading:"h1",showStatus:!1})}
    <ul class="page-siblings">${a}</ul>
  `},w=()=>{document.title="Blogs — CPH4.AI",document.querySelector(".site-nav a[data-section='blogs']")?.classList.add("is-active");const e=r.length===0?'<p class="page-empty">Nothing filed yet.</p>':`<ul class="note-list">${r.map(a=>`
              <li>
                <a href="${n(`blog/${a.slug}.html`)}">
                  <time datetime="${t(a.date)}">${t(a.date)}</time>
                  <span class="note-title">${t(a.title)}</span>
                  <p>${t(a.excerpt)}</p>
                </a>
              </li>`).join("")}</ul>`;o.innerHTML=`
    <p class="eyebrow">Blogs</p>
    <h1>Blogs</h1>
    ${e}
  `},v=()=>{const e=m.find(s=>s.slug===d);if(document.querySelector(".site-nav a[data-section='careers']")?.classList.add("is-active"),!e){o.innerHTML='<p class="page-empty">Unknown role.</p>';return}document.title=`${e.title} — Careers — CPH4.AI`;const a=e.paragraphs.map(s=>`<p>${t(s)}</p>`).join("");o.innerHTML=`
    <p class="eyebrow"><a href="${n("index.html#careers")}">Careers</a> / ${t(e.type)}</p>
    <h1>${t(e.title)}</h1>
    <p class="page-lede">${t(e.location)} · ${t(e.oneLiner)}</p>
    <div class="page-body">${a}</div>
    <a class="outline-cta outline-cta-wide" href="mailto:nemoarce2007@gmail.com?subject=${encodeURIComponent(e.title)}">Write to us</a>
  `};b?w():f?v():y();p();u();g(l).then(e=>{e?.setPosition(1),window.addEventListener("resize",()=>e?.resize())});
