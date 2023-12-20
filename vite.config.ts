import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginWasmPack from 'vite-plugin-wasm-pack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
  vitePluginWasmPack("hexalon")],
})
