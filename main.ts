import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fontsource-variable/orbitron";

gsap.registerPlugin(ScrollTrigger);

const SECTION_COUNT = 5;
const PAGE_TRANSITION_DURATION = 820;
const WHEEL_TRIGGER_DISTANCE = 24;
const WHEEL_RELEASE_DELAY = 180;
const HOME_FOCUS = new THREE.Vector2(688 / 1536, 1 - 748 / 1024);
const TEXTURE_FOCUS = new THREE.Vector2(690 / 1536, 1 - 740 / 1024);
const FOCUS_STATES = [
  HOME_FOCUS,
  new THREE.Vector2(0.66, 0.3),
  new THREE.Vector2(0.34, 0.31),
  new THREE.Vector2(0.39, 0.29),
  new THREE.Vector2(0.63, 0.28),
];
const ZOOM_STATES = [1, 1.055, 1.11, 1.165, 1.22];
const forceMotion = new URLSearchParams(window.location.search).has("motion");
const reducedMotion = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.querySelector<HTMLCanvasElement>("[data-line-world]");
const panels = [...document.querySelectorAll<HTMLElement>("[data-panel]")];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-go]")];
const siteNavLinks = [...document.querySelectorAll<HTMLAnchorElement>(".site-nav [data-go]")];

if (!canvas) throw new Error("Missing line-world canvas");

let renderer: THREE.WebGLRenderer | undefined;
let material: THREE.ShaderMaterial | undefined;
let scene: THREE.Scene | undefined;
let camera: THREE.OrthographicCamera | undefined;
let lastProgress = 0;
let velocity = 0;
let currentIndex = 0;
let targetIndex = 0;
let transitionFrame: number | undefined;
let transitionStartedAt = 0;
let transitionStartY = 0;
let transitionTargetY = 0;
let transitionDuration = PAGE_TRANSITION_DURATION;
let isTransitioning = false;
let wheelGestureArmed = true;
let wheelAccumulator = 0;
let wheelReleaseTimer: number | undefined;

const cameraFocus = new THREE.Vector2();

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const getWorldState = (position: number) => {
  const segment = Math.min(Math.floor(position), SECTION_COUNT - 2);
  const local = segment === SECTION_COUNT - 2 && position >= SECTION_COUNT - 1 ? 1 : position - segment;
  const eased = smoothstep(0, 1, local);
  const push = Math.pow(Math.max(0, Math.sin(local * Math.PI)), 0.72);
  const startFocus = FOCUS_STATES[segment];
  const endFocus = FOCUS_STATES[Math.min(segment + 1, SECTION_COUNT - 1)];

  cameraFocus.lerpVectors(startFocus, endFocus, eased);

  return {
    focus: cameraFocus,
    push: reducedMotion ? 0 : push,
    rotation: reducedMotion ? 0 : segment + eased,
    baseZoom: THREE.MathUtils.lerp(
      ZOOM_STATES[segment],
      ZOOM_STATES[Math.min(segment + 1, SECTION_COUNT - 1)],
      eased,
    ),
  };
};

const updatePanels = (position: number) => {
  const activeIndex = THREE.MathUtils.clamp(Math.round(position), 0, SECTION_COUNT - 1);

  panels.forEach((panel, index) => {
    const delta = position - index;
    const distance = Math.abs(delta);
    const opacity = 1 - smoothstep(0.035, 0.34, distance);
    const shiftX = THREE.MathUtils.clamp(-delta * 52, -28, 28);
    const shiftY = smoothstep(0, 0.5, distance) * 10;

    panel.style.opacity = opacity.toFixed(3);
    panel.style.setProperty("--shift-x", `${shiftX.toFixed(2)}px`);
    panel.style.setProperty("--shift-y", `${shiftY.toFixed(2)}px`);
    panel.classList.toggle("is-visible", opacity > 0.01);
    panel.classList.toggle("is-active", index === activeIndex);
    panel.setAttribute("aria-hidden", String(index !== activeIndex));
  });

  siteNavLinks.forEach((link) => {
    const target = Number(link.dataset.go ?? 0);
    link.classList.toggle("is-active", activeIndex > 0 && target === activeIndex);
  });

  document.documentElement.dataset.section = String(activeIndex + 1).padStart(2, "0");
};

const applyWorldState = (position: number) => {
  if (!material) return;
  const state = getWorldState(position);
  material.uniforms.uProgress.value = position;
  material.uniforms.uRotation.value = state.rotation;
  material.uniforms.uPush.value = state.push;
  material.uniforms.uBaseZoom.value = state.baseZoom;
  material.uniforms.uVelocity.value = velocity;
  material.uniforms.uScreenFocus.value.copy(state.focus);
  document.documentElement.dataset.worldProgress = position.toFixed(3);
  document.documentElement.dataset.worldFocus = `${state.focus.x.toFixed(3)},${state.focus.y.toFixed(3)}`;
  document.documentElement.dataset.worldPush = state.push.toFixed(3);
};

const renderWorld = () => {
  if (!renderer || !material || !scene || !camera) return;
  applyWorldState(lastProgress);
  renderer.render(scene, camera);
};

const initWorld = async () => {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    document.documentElement.classList.add("no-webgl");
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const texture = await new THREE.TextureLoader().loadAsync(
    new URL("./assets/home-line-field.png", import.meta.url).href,
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  material = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTextureSize: { value: new THREE.Vector2(texture.image.width, texture.image.height) },
      uScreenFocus: { value: HOME_FOCUS.clone() },
      uTextureFocus: { value: TEXTURE_FOCUS },
      uProgress: { value: 0 },
      uRotation: { value: 0 },
      uPush: { value: 0 },
      uBaseZoom: { value: 1 },
      uVelocity: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform vec2 uTextureSize;
      uniform vec2 uScreenFocus;
      uniform vec2 uTextureFocus;
      uniform float uProgress;
      uniform float uRotation;
      uniform float uPush;
      uniform float uBaseZoom;
      uniform float uVelocity;
      uniform float uTime;

      const float PI = 3.141592653589793;
      const float TAU = 6.283185307179586;

      float inFrame(vec2 uv) {
        return step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
      }

      void main() {
        float zoom = uBaseZoom;
        float angle = -uRotation * PI * 0.5;
        float c = cos(angle);
        float s = sin(angle);
        mat2 rotation = mat2(c, -s, s, c);

        float screenAspect = uResolution.x / uResolution.y;
        float textureAspect = uTextureSize.x / uTextureSize.y;
        vec2 coverScale = screenAspect > textureAspect
          ? vec2(1.0, textureAspect / screenAspect)
          : vec2(screenAspect / textureAspect, 1.0);

        vec2 localUv = vUv - uScreenFocus;
        vec2 rotatedUv = rotation * localUv;
        vec2 sampleUv = uTextureFocus + (rotatedUv / zoom) * coverScale;

        vec3 source = texture2D(uTexture, clamp(sampleUv, 0.0, 1.0)).rgb * inFrame(sampleUv);

        float line = max(source.r, max(source.g, source.b));
        float lineMask = smoothstep(0.012, 0.19, line);
        vec2 aspectLocal = localUv * vec2(screenAspect, 1.0);
        float radius = length(aspectLocal);

        float phase = uTime * 0.11 + uProgress * 0.92;
        float wave = 0.5 + 0.5 * cos(radius * 63.0 - phase * TAU);
        wave = pow(wave, 20.0);
        float frontRadius = fract(phase * 0.65) * 1.18;
        float front = exp(-pow((radius - frontRadius) * 38.0, 2.0));
        float echoRadius = fract(phase * 0.65 + 0.36) * 1.18;
        float echo = exp(-pow((radius - echoRadius) * 46.0, 2.0)) * 0.42;
        float pulseStrength = 0.72 + uPush * 1.02 + min(uVelocity, 1.0) * 1.5;

        vec3 color = source * (2.35 + uPush * 0.18);
        color += vec3(lineMask * (wave * 1.05 + front * 2.15 + echo * 1.35) * pulseStrength);
        color += vec3((front + echo) * (0.052 + uVelocity * 0.045));

        float focusGlow = exp(-radius * 54.0) * (0.26 + uPush * 0.82 + uVelocity * 0.22);
        color += vec3(focusGlow * (0.72 + lineMask));
        color *= 1.0 - smoothstep(0.82, 1.25, radius) * 0.12;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  const clock = new THREE.Clock();
  const render = () => {
    if (!material) return;
    velocity *= 0.925;
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderWorld();
    requestAnimationFrame(render);
  };

  render();
};

const syncScroll = (self?: ScrollTrigger) => {
  const progress = self?.progress ?? window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  const nextProgress = THREE.MathUtils.clamp(progress, 0, 1) * (SECTION_COUNT - 1);
  const delta = Math.abs(nextProgress - lastProgress);
  velocity = Math.max(velocity, THREE.MathUtils.clamp(delta * 22, 0, 1));
  lastProgress = nextProgress;
  updatePanels(nextProgress);
  renderWorld();
};

const maxScrollY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

const sectionScrollY = (index: number) => {
  const clampedIndex = THREE.MathUtils.clamp(index, 0, SECTION_COUNT - 1);
  return (maxScrollY() * clampedIndex) / (SECTION_COUNT - 1);
};

const cancelTransition = () => {
  if (transitionFrame !== undefined) {
    window.cancelAnimationFrame(transitionFrame);
    transitionFrame = undefined;
  }
  isTransitioning = false;
};

const finishTransition = () => {
  window.scrollTo({ top: transitionTargetY, behavior: "auto" });
  transitionFrame = undefined;
  isTransitioning = false;
  currentIndex = targetIndex;
  document.documentElement.dataset.scrollState = "settled";
  document.documentElement.dataset.targetSection = String(currentIndex + 1).padStart(2, "0");
  syncScroll();
};

const animateTransition = (time: number) => {
  const elapsed = time - transitionStartedAt;
  const progress = THREE.MathUtils.clamp(elapsed / transitionDuration, 0, 1);
  const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);

  window.scrollTo({
    top: THREE.MathUtils.lerp(transitionStartY, transitionTargetY, eased),
    behavior: "auto",
  });

  if (progress < 1) {
    transitionFrame = window.requestAnimationFrame(animateTransition);
  } else {
    finishTransition();
  }
};

const goToIndex = (index: number, immediate = false) => {
  const nextIndex = THREE.MathUtils.clamp(Math.round(index), 0, SECTION_COUNT - 1);
  cancelTransition();
  targetIndex = nextIndex;
  transitionStartY = window.scrollY;
  transitionTargetY = sectionScrollY(nextIndex);

  if (immediate || Math.abs(transitionTargetY - transitionStartY) < 1) {
    finishTransition();
    return;
  }

  const pageDistance = Math.abs(nextIndex - lastProgress);
  transitionDuration = THREE.MathUtils.clamp(
    PAGE_TRANSITION_DURATION + Math.max(0, pageDistance - 1) * 90,
    PAGE_TRANSITION_DURATION,
    1120,
  );
  isTransitioning = true;
  document.documentElement.dataset.scrollState = "transitioning";
  document.documentElement.dataset.targetSection = String(nextIndex + 1).padStart(2, "0");
  transitionStartedAt = performance.now();
  transitionFrame = window.requestAnimationFrame(animateTransition);
};

const scheduleWheelRelease = () => {
  if (wheelReleaseTimer !== undefined) window.clearTimeout(wheelReleaseTimer);
  wheelReleaseTimer = window.setTimeout(() => {
    wheelReleaseTimer = undefined;
    if (isTransitioning) {
      scheduleWheelRelease();
      return;
    }
    wheelAccumulator = 0;
    wheelGestureArmed = true;
  }, WHEEL_RELEASE_DELAY);
};

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  scheduleWheelRelease();

  if (isTransitioning || !wheelGestureArmed) return;

  const scale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? 16
    : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
      ? window.innerHeight
      : 1;
  wheelAccumulator += event.deltaY * scale;

  if (Math.abs(wheelAccumulator) < WHEEL_TRIGGER_DISTANCE) return;

  const direction = Math.sign(wheelAccumulator);
  wheelAccumulator = 0;
  wheelGestureArmed = false;
  goToIndex(currentIndex + direction, reducedMotion);
};

ScrollTrigger.create({
  trigger: ".scroll-track",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  invalidateOnRefresh: true,
  onUpdate: syncScroll,
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const index = Number(link.dataset.go ?? 0);
    goToIndex(index, reducedMotion);
  });
});

window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("keydown", (event) => {
  if (isTransitioning) return;

  if (["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
    event.preventDefault();
    goToIndex(currentIndex + 1, reducedMotion);
  } else if (["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey)) {
    event.preventDefault();
    goToIndex(currentIndex - 1, reducedMotion);
  } else if (event.key === "Home") {
    event.preventDefault();
    goToIndex(0, reducedMotion);
  } else if (event.key === "End") {
    event.preventDefault();
    goToIndex(SECTION_COUNT - 1, reducedMotion);
  }
});

window.addEventListener("resize", () => {
  cancelTransition();
  if (!renderer || !material) return;
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  ScrollTrigger.refresh();
  goToIndex(currentIndex, true);
});

currentIndex = THREE.MathUtils.clamp(
  Math.round(window.scrollY / Math.max(1, maxScrollY() / (SECTION_COUNT - 1))),
  0,
  SECTION_COUNT - 1,
);
targetIndex = currentIndex;
lastProgress = currentIndex;
window.scrollTo({ top: sectionScrollY(currentIndex), behavior: "auto" });
updatePanels(currentIndex);
document.documentElement.dataset.scrollState = "settled";
document.documentElement.dataset.inputMode = "paged";
document.documentElement.dataset.targetSection = String(currentIndex + 1).padStart(2, "0");
initWorld();
