import {
  capabilities,
  capabilityIntroHtml,
  mountFooter,
  mountJobs,
  mountNavToggle,
  mountNotes,
  productIntroHtml,
  products,
} from "./site";
import { SECTION_COUNT, shouldCreateWorld } from "./world-config";

type LineWorld = {
  setPosition: (position: number, impulse?: number) => void;
  resize: () => void;
};

const forceMotion = new URLSearchParams(window.location.search).has("motion");
const reducedMotion = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const canvas = document.querySelector<HTMLCanvasElement>("[data-line-world]");
const main = document.querySelector<HTMLElement>("[data-main]");
const panels = [...document.querySelectorAll<HTMLElement>("[data-panel]")];
const siteNavLinks = [...document.querySelectorAll<HTMLAnchorElement>(".site-nav a[data-section]")];

if (!canvas) throw new Error("Missing line-world canvas");
if (!main) throw new Error("Missing main");

let world: LineWorld | null = null;
let lastProgress = 0;
let lastActiveIndex = -1;
let mainHeight = 0;
let scrollTick = 0;

const measureMain = () => {
  mainHeight = main.offsetHeight;
};

const updateActiveSection = (position: number) => {
  const activeIndex = clamp(Math.round(position), 0, SECTION_COUNT - 1);
  if (activeIndex === lastActiveIndex) return;
  lastActiveIndex = activeIndex;

  panels.forEach((panel, index) => {
    panel.classList.toggle("is-active", index === activeIndex);
  });

  siteNavLinks.forEach((link) => {
    const href = link.getAttribute("href") ?? "";
    const targetId = href.slice(1);
    const targetPanel = panels.find((panel) => panel.id === targetId);
    const targetIndex = targetPanel ? Number(targetPanel.dataset.panel ?? -1) : -1;
    link.classList.toggle("is-active", activeIndex > 0 && targetIndex === activeIndex);
  });

  document.documentElement.dataset.section = String(activeIndex + 1).padStart(2, "0");
};

const syncScroll = () => {
  const progress = clamp(window.scrollY / Math.max(1, mainHeight - window.innerHeight), 0, 1);
  const nextProgress = progress * (SECTION_COUNT - 1);
  lastProgress = nextProgress;
  world?.setPosition(nextProgress);
  updateActiveSection(nextProgress);
};

const onScroll = () => {
  if (scrollTick) return;
  scrollTick = requestAnimationFrame(() => {
    scrollTick = 0;
    syncScroll();
  });
};

const scrollToSection = (hash: string, behavior: ScrollBehavior = "smooth") => {
  if (!hash.startsWith("#") || hash.length < 2) return false;
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  target.scrollIntoView({ behavior, block: "start" });
  return true;
};

const mountProductDetail = () => {
  const detail = document.querySelector<HTMLElement>("[data-product-detail]");
  const list = document.querySelector<HTMLElement>("[data-product-list]");
  if (!detail || !list) return;

  const items = [...list.querySelectorAll<HTMLElement>("li[data-slug]")];
  let activeSlug = "";

  const show = (slug: string, animate = true) => {
    const product = products.find((entry) => entry.slug === slug);
    if (!product || product.slug === activeSlug) return;
    activeSlug = product.slug;
    detail.classList.remove("is-fresh");
    detail.innerHTML = productIntroHtml(product, { heading: "h2" });
    detail.dataset.slug = product.slug;
    if (animate) {
      requestAnimationFrame(() => detail.classList.add("is-fresh"));
    }
    items.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.slug === product.slug);
    });
  };

  items.forEach((item) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    item.addEventListener("pointerenter", () => show(slug));
    item.addEventListener("focusin", () => show(slug));
  });

  const initialProduct = products[0]?.slug;
  if (initialProduct) show(initialProduct, false);
};

const mountCapabilityDetail = () => {
  const detail = document.querySelector<HTMLElement>("[data-capability-detail]");
  const list = document.querySelector<HTMLElement>("[data-capability-list]");
  if (!detail || !list) return;

  const items = [...list.querySelectorAll<HTMLElement>("li[data-slug]")];
  let activeSlug = "";

  const show = (slug: string, animate = true) => {
    const capability = capabilities.find((entry) => entry.slug === slug);
    if (!capability || capability.slug === activeSlug) return;
    activeSlug = capability.slug;
    detail.classList.remove("is-fresh");
    detail.innerHTML = capabilityIntroHtml(capability, { heading: "h2" });
    detail.dataset.slug = capability.slug;
    if (animate) {
      requestAnimationFrame(() => detail.classList.add("is-fresh"));
    }
    items.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.slug === capability.slug);
    });
  };

  items.forEach((item) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    item.addEventListener("pointerenter", () => show(slug));
    item.addEventListener("focusin", () => show(slug));
  });

  const initialCapability = capabilities[0]?.slug;
  if (initialCapability) show(initialCapability, false);
};

mountFooter();
mountJobs();
mountNotes();
mountNavToggle();
mountProductDetail();
mountCapabilityDetail();

if (shouldCreateWorld()) {
  void import("./world").then(({ createLineWorld }) =>
    createLineWorld(canvas).then((instance) => {
      world = instance;
      world?.setPosition(lastProgress);
    }),
  );
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest<HTMLAnchorElement>("a[href^='#']");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  if (!document.querySelector(href)) return;

  event.preventDefault();
  scrollToSection(href, reducedMotion ? "auto" : "smooth");
  history.replaceState(null, "", href);
});

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => {
  measureMain();
  world?.resize();
  syncScroll();
});

if (location.hash) {
  history.scrollRestoration = "manual";
  scrollToSection(location.hash, "auto");
}

measureMain();
syncScroll();
document.documentElement.dataset.inputMode = "scroll";
