/*
  POSTCSS CONFIGURATION FILE – CYBERGUARD PLATFORM

  Purpose:
  This file configures PostCSS processing for the project.
  PostCSS acts as a CSS transformation tool that allows
  integration of advanced styling frameworks like Tailwind CSS.

  In this project:
  - Tailwind CSS utilities are processed through PostCSS
  - CSS optimization and compatibility improvements are enabled
  - Styling consistency is maintained across browsers
*/

export default {

  /*
    Plugins define CSS processing behavior.

    @tailwindcss/postcss:
    Enables Tailwind CSS utility class compilation
    and integrates Tailwind styling into the build pipeline.
  */
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
