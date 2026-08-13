import * as THREE from "three";

export const SECTION_COUNT = 5;
const HOME_FOCUS = new THREE.Vector2(688 / 1536, 1 - 748 / 1024);
const TEXTURE_FOCUS = new THREE.Vector2(690 / 1536, 1 - 740 / 1024);
const FOCUS_STATES = [
  HOME_FOCUS,
  new THREE.Vector2(0.39, 0.29),
  new THREE.Vector2(0.5, 0.3),
  new THREE.Vector2(0.62, 0.3),
  new THREE.Vector2(0.66, 0.28),
];
const ZOOM_STATES = [1, 1.08, 1.12, 1.17, 1.22];

export type LineWorld = {
  setPosition: (position: number, impulse?: number) => void;
  resize: () => void;
};

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const createLineWorld = async (canvas: HTMLCanvasElement): Promise<LineWorld | null> => {
  const forceMotion = new URLSearchParams(window.location.search).has("motion");
  const reducedMotion = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cameraFocus = new THREE.Vector2();

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    document.documentElement.classList.add("no-webgl");
    return null;
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

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let lastProgress = 0;
  let velocity = 0;

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

  const material = new THREE.ShaderMaterial({
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

  const apply = (position: number) => {
    const state = getWorldState(position);
    material.uniforms.uProgress.value = position;
    material.uniforms.uRotation.value = state.rotation;
    material.uniforms.uPush.value = state.push;
    material.uniforms.uBaseZoom.value = state.baseZoom;
    material.uniforms.uVelocity.value = velocity;
    material.uniforms.uScreenFocus.value.copy(state.focus);
  };

  const clock = new THREE.Clock();
  const render = () => {
    velocity *= 0.925;
    material.uniforms.uTime.value = clock.getElapsedTime();
    apply(lastProgress);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  return {
    setPosition: (position, impulse = 0) => {
      const next = THREE.MathUtils.clamp(position, 0, SECTION_COUNT - 1);
      const delta = Math.abs(next - lastProgress);
      velocity = Math.max(velocity, THREE.MathUtils.clamp(delta * 22 + impulse, 0, 1));
      lastProgress = next;
    },
    resize: () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    },
  };
};
