/*
  MAIN APPLICATION FILE – CYBERGUARD PLATFORM

  This React SPA provides centralized cybersecurity resources
  including emergency helplines, advisory intelligence,
  official reporting portals, and an AI assistance chatbot.

  Architecture highlights:
  - Component-based UI
  - Region-aware filtering
  - External AI API integration
  - Responsive cybersecurity dashboard
*/

import React, { useState, useEffect, useMemo, useRef } from 'react';

/*
  Lucide icons provide lightweight SVG icons for UI visualization.
  Used extensively across dashboard, chatbot, emergency cards, etc.
*/
import {
  Shield, Phone, Globe, MessageSquare, Info, ExternalLink,
  ChevronRight, Search, Filter, AlertTriangle, Home, BookOpen,
  Flag, Send, Loader2, Menu, X, CreditCard, UserX, Lock,
  MessageCircle, HelpCircle, Clock, LayoutDashboard, Zap,
  CheckCircle2, ArrowRight, MapPin, Wrench, User, Activity,
  Map, Scale, Building2, Fingerprint, RefreshCcw, Sparkles,
  ShieldAlert, Newspaper, Cpu, Eye
} from 'lucide-react';

/*
  REGION CONFIGURATION OBJECT

  Contains metadata about supported regions including:
  - National cybersecurity agencies
  - Official reporting links
  - Language context
  - Incident statistics

  Used globally for filtering dashboards and AI context.
*/
const REGIONS = {
  IT: {
    id: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    certName: 'ACN (Agenzia per la Cybersicurezza Nazionale)',
    certAgency: 'Polizia Postale (CNAIPIC)',
    lang: 'Italian',
    langNote: 'Primary Language: Italian (Official resources mostly Italian).',
    reportingLink: 'https://www.commissariatodips.it/',
    stats: { portals: 6, helplines: 3, updates: 18, incidents: '3,240' }
  },

  LV: {
    id: 'LV',
    name: 'Latvia',
    flag: '🇱🇻',
    certName: 'National Cyber Security Centre (NCSC)',
    certAgency: 'CERT.LV',
    lang: 'Latvian',
    langNote: 'CERT.LV provides English documentation.',
    reportingLink: 'https://latvija.gov.lv/',
    stats: { portals: 6, helplines: 4, updates: 15, incidents: '1,120' }
  }
};

/*
  INITIAL DATA STORE

  Contains structured datasets for:
  - Emergency helplines
  - Official reporting portals
  - Advisory articles

  This simulates backend intelligence aggregation.
*/
const INITIAL_DATA = { /* existing dataset unchanged */ };


// ======================
// AI CHATBOT COMPONENT
// ======================

/*
  ChatBot Component Responsibilities:

  - Provides conversational cybersecurity assistance
  - Uses Gemini API for response generation
  - Injects region-specific intelligence context
  - Maintains session-only chat state (no persistent storage)
*/

const ChatBot = ({ region, articles, isOpen, onClose }) => {

  // Stores chat history
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am your CyberGuard Assistant for ${region.name}.
      I can help identify scams, find reporting portals,
      or guide you to emergency services.`
    }
  ]);

  // User input state
  const [input, setInput] = useState('');

  // Loading indicator for API requests
  const [isLoading, setIsLoading] = useState(false);

  // Scroll container reference
  const scrollRef = useRef(null);

  /*
    Automatically scrolls chat window
    when new messages arrive.
  */
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);


  /*
    Core message sending logic:

    1. Capture user input
    2. Append message locally
    3. Call Gemini API
    4. Append AI response
    5. Handle failures gracefully
  */
  const handleSend = async (customMsg = null) => {

    const textToSend = customMsg || input.trim();
    if (!textToSend || isLoading) return;

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);

    if (!customMsg) setInput('');
    setIsLoading(true);

    try {

      /*
        API key stored securely in environment variables.
        Prevents exposure in source code.
      */
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // Region-specific intelligence context
      const regionData = INITIAL_DATA[region.id];

      const systemPrompt = `
        CyberGuard Assistant for ${region.name}.
        Emergency contact: 112.
        Provide empathetic, step-by-step guidance.
        Use available helplines and portals.
      `;

      /*
        Gemini API request.
        Provides user query plus system instructions.
      */
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: textToSend }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const result = await response.json();

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            result.candidates?.[0]?.content?.parts?.[0]?.text
            || "Unable to connect to AI service."
        }
      ]);

    } catch (error) {

      /*
        Error fallback:
        Prevents application crash if API fails.
      */
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Connection error." }
      ]);

    } finally {
      setIsLoading(false);
    }
  };

  // If chatbot closed, render nothing
  if (!isOpen) return null;

  /*
    UI rendering:
    Includes header, message history,
    input field, and send button.
  */
  return (
    <div>
      {/* Chatbot UI unchanged */}
    </div>
  );
};


// ======================
// MAIN APPLICATION COMPONENT
// ======================

export default function App() {

  /*
    APPLICATION STATE MANAGEMENT
  */

  // Controls active navigation tab
  const [activeTab, setActiveTab] = useState('homepage');

  // Selected region for filtering resources
  const [activeRegion, setActiveRegion] = useState(REGIONS.IT);

  // AI assistant visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Advisory article dataset
  const [articles, setArticles] = useState({
    IT: INITIAL_DATA.IT.articles,
    LV: INITIAL_DATA.LV.articles
  });

  // Simulated synchronization state
  const [isSyncing, setIsSyncing] = useState(false);

  // Timestamp for last sync
  const [lastUpdated, setLastUpdated] =
    useState(new Date().toLocaleTimeString());


  /*
    Simulated intelligence refresh.
    Represents backend scraping or API sync.
  */
  const refreshNews = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date().toLocaleTimeString());
    setIsSyncing(false);
  };


  /*
    Memoized derived data:

    useMemo prevents unnecessary recalculations,
    improving rendering efficiency.
  */

  const currentData = {
    ...INITIAL_DATA[activeRegion.id],
    articles: articles[activeRegion.id]
  };

  // Sort advisories by latest date
  const sortedArticles = useMemo(
    () =>
      [...currentData.articles]
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [currentData.articles]
  );

  // Combined emergency helplines
  const allHelplines = useMemo(
    () => [...INITIAL_DATA.IT.helplines, ...INITIAL_DATA.LV.helplines],
    []
  );

  // Combined reporting portals
  const allPortals = useMemo(
    () => [...INITIAL_DATA.IT.portals, ...INITIAL_DATA.LV.portals],
    []
  );


  /*
    NAVIGATION BAR COMPONENT

    Provides:
    - Region selection
    - Emergency contact access
    - Navigation between views
  */
  const Navbar = () => (
    <nav>
      {/* Navbar UI unchanged */}
    </nav>
  );


  /*
    MAIN UI RENDER

    Sections:
    - Homepage landing view
    - Dashboard analytics view
    - Resource intelligence library
    - Emergency directory
    - Footer
    - Persistent AI assistant button
  */
  return (
    <div>
      {/* Entire UI structure unchanged */}
    </div>
  );
}
