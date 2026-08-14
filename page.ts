import {
  escapeHtml,
  jobs,
  mountFooter,
  mountNavToggle,
  productHref,
  productIntroHtml,
  products,
  rootHref,
} from "./site";
import { createLineWorld } from "./world";

const canvas = document.querySelector<HTMLCanvasElement>("[data-line-world]");
const pageRoot = document.querySelector("[data-page-root]");
const slug = document.body.dataset.product ?? document.body.dataset.job;
const isJob = Boolean(document.body.dataset.job);

if (!canvas) throw new Error("Missing line-world canvas");
if (!pageRoot) throw new Error("Missing page root");

const renderProduct = () => {
  const product = products.find((entry) => entry.slug === slug);
  if (!product) {
    pageRoot.innerHTML = `<p class="page-empty">Unknown product.</p>`;
    return;
  }

  document.title = `${product.name} — CPH4.AI`;
  document.querySelector(".site-nav a[data-section='products']")?.classList.add("is-active");

  const siblings = products
    .map((entry) => {
      const current = entry.slug === product.slug;
      return `<li>${
        current
          ? `<span class="page-sibling is-current">${escapeHtml(entry.name)}</span>`
          : `<a href="${productHref(entry.slug)}">${escapeHtml(entry.name)}</a>`
      }</li>`;
    })
    .join("");

  pageRoot.innerHTML = `
    <p class="eyebrow"><a href="${rootHref("index.html#products")}">Products</a> / ${escapeHtml(product.status)}</p>
    ${productIntroHtml(product, { heading: "h1", showStatus: false })}
    <ul class="page-siblings">${siblings}</ul>
  `;
};

const renderJob = () => {
  const job = jobs.find((entry) => entry.slug === slug);
  document.querySelector(".site-nav a[data-section='careers']")?.classList.add("is-active");

  if (!job) {
    pageRoot.innerHTML = `<p class="page-empty">Unknown role.</p>`;
    return;
  }

  document.title = `${job.title} — Careers — CPH4.AI`;
  const paragraphs = job.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  pageRoot.innerHTML = `
    <p class="eyebrow"><a href="${rootHref("index.html#careers")}">Careers</a> / ${escapeHtml(job.type)}</p>
    <h1>${escapeHtml(job.title)}</h1>
    <p class="page-lede">${escapeHtml(job.location)} · ${escapeHtml(job.oneLiner)}</p>
    <div class="page-body">${paragraphs}</div>
    <a class="outline-cta outline-cta-wide" href="mailto:nemoarce2007@gmail.com?subject=${encodeURIComponent(job.title)}">Write to us</a>
  `;
};

if (isJob) renderJob();
else renderProduct();

mountFooter();
mountNavToggle();

createLineWorld(canvas).then((world) => {
  world?.setPosition(1);
  window.addEventListener("resize", () => world?.resize());
});
