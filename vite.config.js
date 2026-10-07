import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE is set when the site lives in a sub-folder, e.g. /sunaina-aggarwal/ on GitHub Pages.
export default defineConfig({ base: process.env.VITE_BASE || '/', plugins: [react()] });
