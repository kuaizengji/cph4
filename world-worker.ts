import { startLineWorld, type LineWorld } from "./world-engine";

type WorkerIn =
  | {
      type: "init";
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      pixelRatio: number;
      reducedMotion: boolean;
    }
  | { type: "setPosition"; position: number; impulse?: number }
  | { type: "resize"; width: number; height: number; pixelRatio: number }
  | { type: "visibility"; hidden: boolean };

let world: LineWorld | null = null;

self.onmessage = async (event: MessageEvent<WorkerIn>) => {
  const message = event.data;

  if (message.type === "init") {
    try {
      world = await startLineWorld(message.canvas, {
        width: message.width,
        height: message.height,
        pixelRatio: message.pixelRatio,
        reducedMotion: message.reducedMotion,
      });
      self.postMessage({ type: "ready" });
    } catch {
      self.postMessage({ type: "error" });
    }
    return;
  }

  if (!world) return;

  if (message.type === "setPosition") {
    world.setPosition(message.position, message.impulse);
    return;
  }

  if (message.type === "resize") {
    world.resize(message.width, message.height, message.pixelRatio);
    return;
  }

  if (message.type === "visibility") {
    world.setHidden(message.hidden);
  }
};
