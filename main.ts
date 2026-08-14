import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  capabilities,
  capabilityIntroHtml,
  mountFooter,
  mountJobs,
  mountNavToggle,
  productIntroHtml,
  products,
} from "./site";
import { SECTION_COUNT, createLineWorld } from "./world";

gsap.registerPlugin(ScrollTrigger);

const forceMotion = new URLSearchParams(window.location.search).has("motion");
const reducedMotion = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.querySelector<HTMLCanvasElement>("[data-line-world]");
const main = document.querySelector<HTMLElement>("[data-main]");
const panels = [...document.querySelectorAll<HTMLElement>("[data-panel]")];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("a[href^='#']")];
const siteNavLinks = [...document.querySelectorAll<HTMLAnchorElement>(".site-nav a[data-section]")];

if (!canvas) throw new Error("Missing line-world canvas");
if (!main) throw new Error("Missing main");

let world: Awaited<ReturnType<typeof createLineWorld>>;
let lastProgress = 0;

const updateActiveSection = (position: number) => {
  const activeIndex = THREE.MathUtils.clamp(Math.round(position), 0, SECTION_COUNT - 1);

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

const syncScroll = (self?: ScrollTrigger) => {
  const progress =
    self?.progress ??
    THREE.MathUtils.clamp(
      window.scrollY / Math.max(1, main.offsetHeight - window.innerHeight),
      0,
      1,
    );
  const nextProgress = THREE.MathUtils.clamp(progress, 0, 1) * (SECTION_COUNT - 1);
  lastProgress = nextProgress;
  world?.setPosition(nextProgress);
  updateActiveSection(nextProgress);
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
  let activeSlug = products[0]?.slug ?? "";

  const show = (slug: string) => {
    const product = products.find((entry) => entry.slug === slug);
    if (!product) return;
    activeSlug = product.slug;
    detail.classList.remove("is-fresh");
    detail.innerHTML = productIntroHtml(product, { heading: "h2" });
    detail.dataset.slug = product.slug;
    void detail.offsetWidth;
    detail.classList.add("is-fresh");
    items.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.slug === product.slug);
    });
  };

  items.forEach((item) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    item.addEventListener("pointerenter", () => show(slug));
    item.addEventListener("focusin", () => show(slug));
    item.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a")) return;
      show(slug);
    });
  });

  if (activeSlug) show(activeSlug);
};

const mountCapabilityDetail = () => {
  const detail = document.querySelector<HTMLElement>("[data-capability-detail]");
  const list = document.querySelector<HTMLElement>("[data-capability-list]");
  if (!detail || !list) return;

  const items = [...list.querySelectorAll<HTMLElement>("li[data-slug]")];
  let activeSlug = capabilities[0]?.slug ?? "";

  const show = (slug: string) => {
    const capability = capabilities.find((entry) => entry.slug === slug);
    if (!capability) return;
    activeSlug = capability.slug;
    detail.classList.remove("is-fresh");
    detail.innerHTML = capabilityIntroHtml(capability, { heading: "h2" });
    detail.dataset.slug = capability.slug;
    void detail.offsetWidth;
    detail.classList.add("is-fresh");
    items.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.slug === capability.slug);
    });
  };

  items.forEach((item) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    item.addEventListener("pointerenter", () => show(slug));
    item.addEventListener("focusin", () => show(slug));
    item.addEventListener("click", () => show(slug));
  });

  if (activeSlug) show(activeSlug);
};

mountFooter();
mountJobs();
mountNavToggle();
mountProductDetail();
mountCapabilityDetail();

createLineWorld(canvas).then((instance) => {
  world = instance;
  world?.setPosition(lastProgress);
});

ScrollTrigger.create({
  trigger: main,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  invalidateOnRefresh: true,
  onUpdate: syncScroll,
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    if (!document.querySelector(href)) return;

    event.preventDefault();
    scrollToSection(href, reducedMotion ? "auto" : "smooth");
    history.replaceState(null, "", href);
  });
});

window.addEventListener("resize", () => {
  world?.resize();
  ScrollTrigger.refresh();
  syncScroll();
});

if (location.hash) {
  history.scrollRestoration = "manual";
  scrollToSection(location.hash, "auto");
  ScrollTrigger.refresh();
}

syncScroll();
document.documentElement.dataset.inputMode = "scroll";
