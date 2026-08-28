export type ProductStatus = "Live" | "Coming" | "Demo" | "Building";

export const SITE_URL = "https://cph4.ai";

export const siteSeo = {
  title: "CPH4.AI — Intelligence, without end.",
  description:
    "An organization that evolves itself. A self that never stops becoming. CPH4.AI builds AI that unlocks unused capacity.",
} as const;

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  line: string;
  seoTitle: string;
  paragraphs: string[];
  external?: { label: string; href: string };
};

export type Note = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  oneLiner: string;
  paragraphs: string[];
};

export type CapabilityGroup = "Applied" | "Media" | "Foundation";

export type Capability = {
  slug: string;
  name: string;
  group: CapabilityGroup;
  line: string;
  paragraphs: string[];
};

export const products: Product[] = [
  {
    slug: "kuaizengji",
    name: "Kuaizengji",
    status: "Live",
    line: "Coursework-native AI for students in English-medium and overseas programs.",
    seoTitle: "Kuaizengji — Coursework-native AI | CPH4.AI",
    paragraphs: [
      "Kuaizengji sits inside the work students already have: readings, problem sets, exams in English-medium and overseas programs. Not a generic chat window.",
      "It is live. The product site is separate from this company site.",
    ],
    external: { label: "Open", href: "https://www.kuaizengji.com/" },
  },
  {
    slug: "bnbu-me",
    name: "BNBU.ME",
    status: "Live",
    line: "A BNBU campus client, synced across macOS, Windows, Android, and iOS.",
    seoTitle: "BNBU.ME — BNBU campus client | CPH4.AI",
    paragraphs: [
      "Courses, timetable, email, homework, campus info, learning materials, and AI academic collaboration — in one client. The academic layer connects to Kuaizengji.",
      "It is live. Daily campus work that used to sit across separate systems, in one continuous, unified, and secure experience.",
    ],
    external: { label: "Open", href: "https://bnbu.me/" },
  },
  {
    slug: "verdict",
    name: "Verdict",
    status: "Live",
    line: "Financial opinions, settled against real prices.",
    seoTitle: "Verdict — Financial opinions | CPH4.AI",
    paragraphs: [
      "Verdict produces financial opinions that can be checked against prices that actually traded.",
      "It is live. The product site is separate from this company site.",
    ],
    external: { label: "Open", href: "https://verdictfinance.top/" },
  },
  {
    slug: "taoran",
    name: "Taoran Agent",
    status: "Demo",
    line: "Exam-prep that follows a named teacher’s method, not a generic tutor.",
    seoTitle: "Taoran Agent — Teacher-method exam prep | CPH4.AI",
    paragraphs: [
      "Most tutors average a subject. Taoran Agent follows one teacher’s method through exam prep.",
      "A demo is open. Not a public product yet.",
    ],
    external: { label: "Open demo", href: "https://demotrial.vercel.app" },
  },
  {
    slug: "kuaizengji-3",
    name: "Kuaizengji 3.0",
    status: "Coming",
    line: "A general learning agent: any source in, structured knowledge out. September 2026.",
    seoTitle: "Kuaizengji 3.0 — General learning agent | CPH4.AI",
    paragraphs: [
      "3.0 generalizes the work. Lecture, paper, recording — in. Structured knowledge — out.",
      "Dated September 2026. Not live.",
    ],
  },
];

export const capabilities: Capability[] = [
  {
    slug: "rpa",
    name: "RPA",
    group: "Applied",
    line: "Automated ops across Xiaohongshu, WeChat, Reddit, YouTube.",
    paragraphs: [
      "Accounts, replies, posting, and the ops a team already runs — Xiaohongshu, WeChat, Reddit, YouTube — without a person on every tab.",
      "Applied work. Not a product you open. The automation sits behind the work.",
    ],
  },
  {
    slug: "aeo",
    name: "AEO",
    group: "Applied",
    line: "Public acquisition — so models recommend the brand.",
    paragraphs: [
      "Acquisition used to mean ranking in search. Now it also means being the name a model gives when someone asks.",
      "We write and place the public record so the brand is what gets recommended. Not ads. Presence.",
    ],
  },
  {
    slug: "asr",
    name: "ASR",
    group: "Media",
    line: "Speech to text.",
    paragraphs: [
      "Speech in. Text out. Lectures, calls, source that starts as voice.",
      "Infrastructure for everything that has to be read before it can be used.",
    ],
  },
  {
    slug: "tts",
    name: "TTS",
    group: "Media",
    line: "Text to speech.",
    paragraphs: [
      "Text in. Speech out. For presenters, prep, and anything that has to be heard.",
      "Paired with clone and video. Not a standalone voice app.",
    ],
  },
  {
    slug: "voice-clone",
    name: "Voice Clone",
    group: "Media",
    line: "A voice that can be reused.",
    paragraphs: [
      "A voice captured once, then reused — so the same speaker can appear in new cuts without a new session.",
      "Used with TTS. The voice is the asset. The clone is the reuse.",
    ],
  },
  {
    slug: "ontology",
    name: "Ontology",
    group: "Foundation",
    line: "The model underneath.",
    paragraphs: [
      "The model underneath the stack. What the work is made of, and how the pieces relate.",
      "Foundation, not a name on the nav. Everything above sits on it.",
    ],
  },
];

/** Add an entry here and a matching HTML file under blog/ when a post ships. */
export const notes: Note[] = [
  {
    slug: "why-come-back-to-cursor",
    title: "Why you should come back to Cursor",
    date: "2026-08-23",
    excerpt:
      "I left Cursor for Claude Code and Codex, then came back. Here is the setup and the method I actually use.",
  },
];

/** Real openings only. Empty until a JD ships. */
export const jobs: Job[] = [];

export const rootHref = (path: string) => {
  const nested = document.body.dataset.root === "nested";
  return nested ? `../${path}` : `./${path}`;
};

export const sectionHref = (id: string) => {
  const nested = document.body.dataset.root === "nested";
  return nested ? `../index.html#${id}` : `#${id}`;
};

export const productHref = (slug: string) => rootHref(`products/${slug}.html`);

export const jobHref = (slug: string) => rootHref(`careers/${slug}.html`);

export const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Shared intro body for homepage hover pane and product subpages. */
export const productIntroHtml = (
  product: Product,
  options: {
    heading?: "h1" | "h2" | "h3";
    showName?: boolean;
    showStatus?: boolean;
  } = {},
) => {
  const heading = options.heading ?? "h2";
  const showName = options.showName ?? true;
  const showStatus = options.showStatus ?? true;
  const paragraphs = product.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const cta = product.external
    ? `<a class="outline-cta" href="${escapeHtml(product.external.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.external.label)}</a>`
    : "";
  const status = showStatus
    ? `<p class="product-detail-status">${escapeHtml(product.status)}</p>`
    : "";
  const name = showName
    ? `<${heading} class="product-detail-name">${escapeHtml(product.name)}</${heading}>`
    : "";

  return `
    ${status}
    ${name}
    <p class="page-lede">${escapeHtml(product.line)}</p>
    <div class="page-body">${paragraphs}</div>
    ${cta}
  `;
};

/** Full product intro page body (eyebrow + intro + siblings). Used by page.ts and mirrored in static HTML. */
export const productPageInnerHtml = (
  product: Product,
  options: { nested?: boolean } = {},
) => {
  const nested =
    options.nested ??
    (typeof document !== "undefined" && document.body?.dataset.root === "nested");
  const toRoot = (path: string) => (nested ? `../${path}` : `./${path}`);
  const toProduct = (slug: string) => toRoot(`products/${slug}.html`);

  const siblings = products
    .map((entry) => {
      const current = entry.slug === product.slug;
      return `<li>${
        current
          ? `<span class="page-sibling is-current">${escapeHtml(entry.name)}</span>`
          : `<a href="${toProduct(entry.slug)}">${escapeHtml(entry.name)}</a>`
      }</li>`;
    })
    .join("");

  return `
    <p class="eyebrow"><a href="${toRoot("index.html#products")}">Products</a> / ${escapeHtml(product.status)}</p>
    ${productIntroHtml(product, { heading: "h1", showStatus: false })}
    <ul class="page-siblings">${siblings}</ul>
  `;
};

/** Homepage hover pane for Capabilities (no subpages, no CTA). */
export const capabilityIntroHtml = (
  capability: Capability,
  options: {
    heading?: "h1" | "h2" | "h3";
  } = {},
) => {
  const heading = options.heading ?? "h2";
  const paragraphs = capability.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  return `
    <p class="capability-detail-group">${escapeHtml(capability.group)}</p>
    <${heading} class="capability-detail-name">${escapeHtml(capability.name)}</${heading}>
    <p class="page-lede">${escapeHtml(capability.line)}</p>
    <div class="page-body">${paragraphs}</div>
  `;
};

export const mountJobs = () => {
  const root = document.querySelector("[data-jobs]");
  if (!root) return;
  if (jobs.length === 0) {
    root.remove();
    return;
  }

  root.innerHTML = jobs
    .map(
      (job) => `
        <li>
          <a class="job-title" href="${jobHref(job.slug)}">${job.title}</a>
          <span class="job-meta">${job.location} · ${job.type}</span>
          <p class="job-line">${job.oneLiner}</p>
        </li>`,
    )
    .join("");
};

export const mountNotes = () => {
  const root = document.querySelector("[data-notes]");
  if (!root) return;
  if (notes.length === 0) return;

  root.innerHTML = `<ul class="note-list">${notes
    .map(
      (note) => `
        <li>
          <a href="${rootHref(`blog/${note.slug}.html`)}">
            <time datetime="${escapeHtml(note.date)}">${escapeHtml(note.date)}</time>
            <span class="note-title">${escapeHtml(note.title)}</span>
            <p>${escapeHtml(note.excerpt)}</p>
          </a>
        </li>`,
    )
    .join("")}</ul>`;
};

export const mountFooter = () => {
  const root = document.querySelector("[data-footer]");
  if (!root) return;

  const productLinks = products
    .map(
      (product) =>
        `<li><a href="${productHref(product.slug)}">${product.name}</a></li>`,
    )
    .join("");

  root.innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <h2>Products</h2>
        <ul>${productLinks}</ul>
      </div>
      <div class="footer-col">
        <h2>Capabilities</h2>
        <ul>
          <li><a href="${sectionHref("capabilities")}">The stack</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Company</h2>
        <ul>
          <li><a href="${sectionHref("company")}">Company</a></li>
          <li><a href="${sectionHref("careers")}">Careers</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Blogs</h2>
        <ul>
          <li><a href="${sectionHref("blogs")}">All posts</a></li>
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
  `;
};

export const mountNavToggle = () => {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const nav = document.querySelector<HTMLElement>(".site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    document.documentElement.toggleAttribute("data-nav-open", open);
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!document.documentElement.hasAttribute("data-nav-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.querySelector(".contact-link")?.addEventListener("click", () => setOpen(false));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.matchMedia("(max-width: 1099px)").addEventListener("change", (event) => {
    if (!event.matches) setOpen(false);
  });
};
