/*
  TAILWIND CSS CONFIGURATION FILE – CYBERGUARD PLATFORM

  Purpose:
  This file configures Tailwind CSS utility generation
  and styling behavior across the application.

  Responsibilities:
  - Defines where Tailwind scans for class usage
  - Allows theme customization and extension
  - Enables plugin integration if required
*/

/*
  Type annotation helps IDEs provide autocomplete
  and validation for Tailwind configuration.
*/
 /** @type {import('tailwindcss').Config} */

export default {

  /*
    Content paths specify files Tailwind scans
    to generate only the required CSS classes.

    This improves performance by removing unused styles.
  */
  content: [
    "./index.html",               // Root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All React source files
  ],

  /*
    Theme customization section.

    Currently empty but can include:
    - Custom colors
    - Typography settings
    - Spacing scales
    - Animation presets
  */
  theme: {
    extend: {},
  },

  /*
    Plugin section for additional Tailwind features.
    Examples include:
    - Forms plugin
    - Typography plugin
    - Custom UI component plugins

    Currently not required for this project.
  */
  plugins: [],
}
