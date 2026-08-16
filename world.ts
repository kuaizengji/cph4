import { SECTION_COUNT } from "./world-config";

export { SECTION_COUNT };

export type LineWorld = {
  setPosition: (position: number, impulse?: number) => void;
  resize: () => void;
};

const pixelRatio = () => Math.min(window.devicePixelRatio, window.innerWidth <= 1099 ? 1.25 : 1.75);

const fail = () => {
  document.documentElement.classList.add("no-webgl");
  return null;
};

export const createLineWorld = async (canvas: HTMLCanvasElement): Promise<LineWorld | null> => {
  if (typeof Worker === "undefined" || typeof canvas.transferControlToOffscreen !== "function") {
    return fail();
  }

  const forceMotion = new URLSearchParams(window.location.search).has("motion");
  const reducedMotion = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let offscreen: OffscreenCanvas;
  try {
    offscreen = canvas.transferControlToOffscreen();
  } catch {
    return fail();
  }

  const worker = new Worker(new URL("./world-worker.ts", import.meta.url), { type: "module" });

  const ready = new Promise<boolean>((resolve) => {
    worker.addEventListener("message", (event: MessageEvent<{ type: string }>) => {
      if (event.data.type === "ready") resolve(true);
      if (event.data.type === "error") resolve(false);
    });
    worker.addEventListener("error", () => resolve(false));
  });

  worker.postMessage(
    {
      type: "init",
      canvas: offscreen,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: pixelRatio(),
      reducedMotion,
    },
    [offscreen],
  );

  if (!(await ready)) {
    worker.terminate();
    return fail();
  }

  const onVisibility = () => {
    worker.postMessage({ type: "visibility", hidden: document.hidden });
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    setPosition: (position, impulse = 0) => {
      worker.postMessage({ type: "setPosition", position, impulse });
    },
    resize: () => {
      worker.postMessage({
        type: "resize",
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: pixelRatio(),
      });
    },
  };
};
