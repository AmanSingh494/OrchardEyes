import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // Changed from plugin-react to plugin-react-swc

export default defineConfig({
  plugins: [react()],
})