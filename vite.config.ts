/**
 * vite.config.ts
 * 
 * Vite build configuration for the Brewtelligence React application.
 * Configures development server, React plugin, environment variables,
 * and path aliases.
 */

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode (development/production)
    // The third argument '' loads all env vars, not just those prefixed with VITE_
    const env = loadEnv(mode, '.', '');
    
    return {
      /**
       * Development server configuration
       * - port: Run on port 3000 to match the Express server
       * - host: Bind to all interfaces for external access
       */
      server: {
        port: 3000,
        host: '0.0.0.0',
      },

      /**
       * Vite plugins
       * - react(): Enables React Fast Refresh for instant HMR updates
       */
      plugins: [react()],

      /**
       * Define global constants that get replaced at build time
       * This makes the Gemini API key available to client-side code
       * Note: Be careful with sensitive keys in client bundles
       */
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },

      /**
       * Module resolution configuration
       * - '@' alias: Allows importing from project root using '@/path/to/file'
       */
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
