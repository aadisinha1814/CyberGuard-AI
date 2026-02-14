/*
  VITE CONFIGURATION FILE – CYBERGUARD PLATFORM

  Purpose:
  This file configures the Vite build tool used for
  developing and bundling the React application.

  Responsibilities:
  - Enables React JSX compilation
  - Optimizes development server performance
  - Controls build behavior and plugin integration
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
  Optional Tailwind/PostCSS plugin import.
  Typically Tailwind is configured via PostCSS,
  but this import is retained for flexibility
  if future direct plugin integration is required.
*/
import tailwindcss from '@tailwindcss/postcss'


export default defineConfig({

  /*
    Plugin configuration section.

    react():
    Enables React support including:
    - JSX transformation
    - Fast Refresh hot reloading
    - Development optimizations
  */
  plugins: [
    react(),
    // Agar upar wala step kaam na kare, toh yahan tailwindcss() add kar sakte hain

    /*
      Tailwind CSS integration is usually handled
      through PostCSS configuration. If styling
      issues occur in future builds, Tailwind plugin
      can optionally be added here.
    */
    // tailwindcss()
  ],
})
