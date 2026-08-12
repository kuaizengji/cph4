# CPH4.AI

CPH4.AI company website motion prototype. The desktop experience uses Three.js and GSAP to present a five-stop, full-page journey through a continuous monochrome line world.

## Development

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Add `?motion=1` to force motion when the operating system has reduced-motion enabled.

## Build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`. The checked-in `dist/` matches the source commit so the current design can be previewed without rebuilding.
