import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

const htmlEntries = ["products", "blog", "careers"].flatMap((dir) => {
  try {
    return readdirSync(resolve(root, dir))
      .filter((name) => name.endsWith(".html"))
      .map((name) => [name === "index.html" ? dir : `${dir}/${name.slice(0, -5)}`, resolve(root, dir, name)] as const);
  } catch {
    return [];
  }
});

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        ...Object.fromEntries(htmlEntries),
      },
    },
  },
});
