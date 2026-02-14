/*
  APPLICATION ENTRY POINT – CYBERGUARD PLATFORM

  Purpose:
  This file initializes the React application and mounts
  the main App component into the HTML root container.

  Responsibilities:
  - Import global styles
  - Initialize React rendering engine
  - Attach React application to DOM
  - Enable development safety checks
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/*
  Global stylesheet import.
  Includes Tailwind CSS configuration
  and custom UI styling.
*/
import './index.css'

/*
  Main application component.
  Contains the full cybersecurity
  dashboard interface and logic.
*/
import App from './App.jsx'


/*
  React application bootstrap process:

  1. Locate the root DOM element from index.html
  2. Create a React rendering root
  3. Render App component inside StrictMode
*/
createRoot(document.getElementById('root')).render(

  /*
    StrictMode enables additional checks during development:
    - Detects unsafe lifecycle usage
    - Identifies side-effect issues
    - Highlights deprecated APIs

    This improves code reliability.
  */
  <StrictMode>
    <App />
  </StrictMode>,

)
