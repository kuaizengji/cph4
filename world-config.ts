export const SECTION_COUNT = 6;

export const shouldCreateWorld = () => {
  if (new URLSearchParams(window.location.search).has("motion")) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 1099px)").matches) return false;
  const connection = "connection" in navigator
    ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    : undefined;
  return !connection?.saveData;
};
