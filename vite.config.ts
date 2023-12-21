import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import builtins from "builtin-modules";
import vitePluginWasmPack from 'vite-plugin-wasm-pack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
  vitePluginWasmPack("hexalon")],

  build: {
    lib: {
      entry: "src/main",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
        assetFileNames: "styles.css",
      },
      external: [
        "obsidian",
        "electron",
        "hexalon.js",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr",
        ...builtins,
      ],
    },

    outDir: "test_vault/.obsidian/plugins/hexalon",
    sourcemap: "inline",
  }
})
