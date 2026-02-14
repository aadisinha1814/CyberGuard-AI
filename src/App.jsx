import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Shield, 
  Phone, 
  Globe, 
  MessageSquare, 
  Info, 
  ExternalLink, 
  ChevronRight, 
  Search, 
  Filter, 
  AlertTriangle, 
  Home, 
  BookOpen, 
  Flag,
  Send,
  Loader2,
  Menu,
  X,
  CreditCard,
  UserX,
  Lock,
  MessageCircle,
  HelpCircle,
  Clock,
  LayoutDashboard,
  Zap,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Wrench,
  User,
  Activity,
  Map,
  Scale,
  Building2,
  Fingerprint,
  RefreshCcw,
  Sparkles,
  ShieldAlert,
  Newspaper,
  Cpu,
  Eye
} from 'lucide-react';

// --- Configuration & Constants ---
const REGIONS = {
  IT: {
    id: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    certName: 'ACN (Agenzia per la Cybersicurezza Nazionale)',
    certAgency: 'Polizia Postale (CNAIPIC)',
    lang: 'Italian',
    langNote: 'Primary Language: Italian (Official resources are mostly in Italian).',
    reportingLink: 'https://www.commissariatodips.it/',
    stats: { portals: 6, helplines: 3, updates: 18, incidents: '3,240' }
  },
  LV: {
    id: 'LV',
    name: 'Latvia',
    flag: '🇱🇻',
    certName: 'National Cyber Security Centre (NCSC)',
    certAgency: 'CERT.LV (Incident Response)',
    lang: 'Latvian',
    langNote: 'Language Tip: CERT.LV maintains an excellent English version of their site.',
    reportingLink: 'https://latvija.gov.lv/',
    stats: { portals: 6, helplines: 4, updates: 15, incidents: '1,120' }
  }
};

const INITIAL_DATA = {
  IT: {
    helplines: [
      { id: 1, type: 'Emergency', name: 'Emergency Services', contact: '112', availability: '24/7', languages: 'Italian, English', desc: 'Immediate police intervention or physical threat.', icon: 'phone', country: 'Italy', flag: '🇮🇹' },
      { id: 2, type: 'Support', name: 'Stalking Helpline', contact: '1522', availability: '24/7', languages: 'Italian', desc: 'Support for stalking and domestic violence victims.', icon: 'phone', country: 'Italy', flag: '🇮🇹' },
      { id: 3, type: 'Protection', name: 'Child Protection', contact: '114', availability: '24/7', languages: 'Italian', desc: 'Emergency assistance for children in danger.', icon: 'phone', country: 'Italy', flag: '🇮🇹' }
    ],
    portals: [
      { id: 'it-p1', category: 'General Cybercrime', title: 'Polizia Postale', action: 'Online Reporting Portal', url: 'https://www.commissariatodips.it/', desc: 'Reporting for scams, phishing, and general online fraud.', country: 'Italy', flag: '🇮🇹' },
      { id: 'it-p2', category: 'Technical Incidents', title: 'ACN (National Agency)', action: 'Report an Incident', url: 'https://www.acn.gov.it/', desc: 'DDoS, malware intrusions, and critical infrastructure attacks.', country: 'Italy', flag: '🇮🇹' },
      { id: 'it-p3', category: 'Financial Fraud', title: "Banca d'Italia / ABF", action: 'Complaint Portal', url: 'https://www.arbitrobancariofinanziario.it/', desc: 'Official complaints regarding banking security and fraud.', country: 'Italy', flag: '🇮🇹' },
      { id: 'it-p4', category: 'Data Breach / GDPR', title: 'Garante Privacy', action: 'Data Breach Notification', url: 'https://www.garanteprivacy.it/', desc: 'Official GDPR breach notifications and privacy violations.', country: 'Italy', flag: '🇮🇹' },
      { id: 'it-p5', category: 'Online Harassment', title: 'Polizia di Stato', action: 'YouPol App / Help', url: 'https://www.poliziadistato.it/articolo/youpol', desc: 'Bullying, harassment, and drug-related digital reports.', country: 'Italy', flag: '🇮🇹' },
      { id: 'it-p6', category: 'National Security', title: 'CNAIPIC', action: 'Official Contact', url: 'https://www.poliziapostale.it/', desc: 'Protection of national critical infrastructure.', country: 'Italy', flag: '🇮🇹' }
    ],
    articles: [
      { id: 'it-1', type: 'GOVT ADVISORY', title: 'New Ransomware Variant Targeting SMBs', date: '2026-02-06', source: 'ACN', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
      { id: 'it-2', type: 'EDUCATIONAL', title: 'Securing Your SPID Identity', date: '2026-02-04', source: 'CyberGuard Tips', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
      { id: 'it-3', type: 'CASE STUDY', title: 'Major Botnet Dismantled in Milan Operations', date: '2026-01-28', source: 'Polizia Postale', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800' },
      { id: 'it-4', type: 'TECH ALERT', title: 'Critical Patch for Public Sector Cloud Systems', date: '2026-01-20', source: 'ACN', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' },
      { id: 'it-5', type: 'GOVT ADVISORY', title: 'Fake Tax Agency SMS Campaign: Alert', date: '2026-01-15', source: 'Agenzia Entrate', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800' },
      { id: 'it-6', type: 'EDUCATIONAL', title: 'Digital Privacy for Italian Minors', date: '2026-01-05', source: 'Garante Privacy', img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  LV: {
    helplines: [
      { id: 101, type: 'Emergency', name: 'Emergency Services', contact: '112', availability: '24/7', languages: 'LV, EN, RU', desc: 'Purpose: Immediate police intervention or physical threat.', icon: 'phone', country: 'Latvia', flag: '🇱🇻' },
      { id: 102, type: 'Technical', name: 'CERT.LV Incident Line', contact: '+371 67085888', availability: '24/7', languages: 'Latvian, English', desc: 'Purpose: Technical assistance for hacking, DDoS, or system breaches.', icon: 'wrench', country: 'Latvia', flag: '🇱🇻' },
      { id: 103, type: 'Police', name: 'State Police (Non-Emergency)', contact: '+371 67075333', availability: 'Working Hours', languages: 'Latvian, English', desc: 'Questions regarding reporting procedures or non-urgent crimes.', icon: 'phone', country: 'Latvia', flag: '🇱🇻' },
      { id: 104, type: 'Victim Support', name: 'Victim Support Line', contact: '116006', availability: '24/7', languages: 'Latvian, English', desc: 'General emotional and legal support for crime victims.', icon: 'user', country: 'Latvia', flag: '🇱🇻' }
    ],
    portals: [
      { id: 'lv-p1', category: 'General Cybercrime', title: 'Latvija.gov.lv', action: 'Official E-Application', url: 'https://latvija.gov.lv/', desc: 'File electronic reports to police and state institutions.', country: 'Latvia', flag: '🇱🇻' },
      { id: 'lv-p2', category: 'Technical Incidents', title: 'CERT.LV', action: 'Incident Report Form', url: 'https://cert.lv/en/report-incident', desc: 'DDoS, Malware, Intrusions, and technical vulnerabilities.', country: 'Latvia', flag: '🇱🇻' },
      { id: 'lv-p3', category: 'Financial Fraud', title: 'Finance Latvia Association', action: 'Security Advisory', url: 'https://www.financelatvia.eu/en/', desc: 'Banking sector coordination and security advisories.', country: 'Latvia', flag: '🇱🇻' },
      { id: 'lv-p4', category: 'Data Breach / GDPR', title: 'DVI (Inspectorate)', action: 'Breach Notification Form', url: 'https://www.dvi.gov.lv/', desc: 'Data protection inspectorate for privacy violations.', country: 'Latvia', flag: '🇱🇻' },
      { id: 'lv-p5', category: 'Online Harassment', title: 'Drossinternets.lv', action: 'Report Illegal Content', url: 'https://drossinternets.lv/', desc: 'Reporting harmful content and ensuring safety for minors.', country: 'Latvia', flag: '🇱🇻' },
      { id: 'lv-p6', category: 'National Security', title: 'Ministry of Defence / NCSC', action: 'NCSC Latvia Portal', url: 'https://www.mod.gov.lv/', desc: 'National cybersecurity policy and defense coordination.', country: 'Latvia', flag: '🇱🇻' }
    ],
    articles: [
      { id: 'lv-1', type: 'HIGH-PROFILE CASE', title: 'Major Crypto Fraud Ring Dismantled in Riga', date: '2026-02-05', source: 'Latvian Police', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800' },
      { id: 'lv-2', type: 'GOVT ADVISORY', title: 'Phishing Campaign Targeting Latvian Banking', date: '2026-02-01', source: 'CERT.LV', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
      { id: 'lv-3', type: 'TECH ALERT', title: 'DDoS Mitigation Strategies for Latvian SMBs', date: '2026-01-28', source: 'NCSC', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000' },
      { id: 'lv-4', type: 'EDUCATIONAL', title: 'Safe use of eParaksts and eID', date: '2026-01-20', source: 'LVRTC', img: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1200' },
      { id: 'lv-5', type: 'AWARENESS', title: 'Safer Internet for Latvian Schools', date: '2026-01-10', source: 'Drossinternets', img: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=800' },
      { id: 'lv-6', type: 'GOVT ADVISORY', title: 'Parcel Delivery Fraud: Omniva Alert', date: '2026-01-02', source: 'State Police', img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=800' }
    ]
  }
};

// --- AI ChatBot Component ---

const ChatBot = ({ region, articles, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I am your CyberGuard Assistant for ${region.name}. I can help you identify scams, find reporting portals, or get you in touch with emergency services. How can I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (customMsg = null) => {
    const textToSend = customMsg || input.trim();
    if (!textToSend || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    if (!customMsg) setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const regionData = INITIAL_DATA[region.id];
      const systemPrompt = `Assistant for ${region.name}. Emergency: 112. Data: ${JSON.stringify(regionData.helplines)} and portals. Goal: Empathy, step-by-step guidance for cybercrime victims.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: textToSend }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const result = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={100} /></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className="bg-blue-500 p-2 rounded-xl"><MessageSquare size={20} className="text-white" /></div>
          <div><p className="font-black text-sm uppercase tracking-widest">AI Assistance</p><p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{region.name} Sector</p></div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10"><X size={20} /></button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
              m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>{m.content}</div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-white border border-slate-100 p-4 rounded-[2rem] rounded-tl-none flex items-center space-x-2"><Loader2 className="animate-spin text-blue-500" size={16} /></div></div>}
      </div>
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex space-x-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask for help..." className="flex-1 text-sm bg-transparent border-none focus:ring-0 px-4 font-medium" />
          <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('homepage');
  const [activeRegion, setActiveRegion] = useState(REGIONS.IT);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [articles, setArticles] = useState({ IT: INITIAL_DATA.IT.articles, LV: INITIAL_DATA.LV.articles });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  const refreshNews = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date().toLocaleTimeString());
    setIsSyncing(false);
  };

  const currentData = { ...INITIAL_DATA[activeRegion.id], articles: articles[activeRegion.id] };
  const sortedArticles = useMemo(() => [...currentData.articles].sort((a, b) => new Date(b.date) - new Date(a.date)), [currentData.articles]);
  const allHelplines = useMemo(() => [...INITIAL_DATA.IT.helplines, ...INITIAL_DATA.LV.helplines], []);
  const allPortals = useMemo(() => [...INITIAL_DATA.IT.portals, ...INITIAL_DATA.LV.portals], []);

  const Navbar = () => (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('homepage')}>
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg"><Shield size={24} /></div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">CyberGuard</span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          {['homepage', 'dashboard', 'resources'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize font-bold text-sm transition-all relative ${activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab}{activeTab === tab && <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <select value={activeRegion.id} onChange={(e) => setActiveRegion(REGIONS[e.target.value])} className="bg-slate-100 border-none rounded-full px-4 py-2 text-xs font-black uppercase focus:ring-0 cursor-pointer tracking-widest">
            <option value="IT">Italy</option><option value="LV">Latvia</option>
          </select>
          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center space-x-2 shadow-xl shadow-red-100 uppercase tracking-widest">
            <Phone size={14} /><span>Emergency: 112</span>
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Aesthetic Ticker */}
      <div className="bg-slate-900 text-white py-2 px-6 border-b border-white/5 relative z-[60]">
        <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
          <div className="flex items-center animate-pulse mr-8 text-red-400 shrink-0">
            <ShieldAlert size={14} className="mr-2" />
            <span className="text-[10px] font-black tracking-widest uppercase">System Intelligence Active</span>
          </div>
          <div className="flex space-x-12 animate-marquee whitespace-nowrap">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">National Threat Level: <span className="text-amber-500">Elevated (2)</span></span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Latest Sync: <span className="text-blue-400">{lastUpdated}</span></span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Status: <span className="text-emerald-400">Stable</span></span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Region Awareness: <span className="text-white">{activeRegion.name} Node Verified</span></span>
          </div>
        </div>
      </div>

      <Navbar />

      {activeTab === 'homepage' && (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-16 lg:pt-28 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block border border-slate-100">REGION-AWARE PLATFORM</span>
              <h1 className="text-7xl lg:text-[110px] font-serif font-medium text-slate-900 leading-[0.85] mb-10 tracking-tight tracking-tighter">Unified <br /> <span className="italic text-slate-400 font-normal">Cybercrime</span> <br /> Resources</h1>
              <p className="text-slate-500 text-xl max-w-lg mb-20 font-medium leading-relaxed font-serif">Official helplines, reporting portals, and advisories for Italy and Latvia. AI-powered guidance for cybercrime victims.</p>
              
              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] max-w-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Sparkles size={120} /></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">SELECT YOUR REGION</p>
                <div className="flex items-center space-x-3 mb-10">
                  <select value={activeRegion.id} onChange={(e) => setActiveRegion(REGIONS[e.target.value])} className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-base font-bold focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer">
                    <option value="IT">Italy</option><option value="LV">Latvia</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-[10px] text-slate-400 font-black uppercase mb-2">INCIDENTS REPORTED</p><p className="text-5xl font-black text-blue-500 tracking-tighter leading-none">{activeRegion.stats.incidents}</p></div>
                  <button onClick={() => setIsChatOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center space-x-3 hover:bg-black transition-all hover:scale-105 shadow-xl group">
                    <MessageCircle size={20} className="text-blue-400" />
                    <span>Ask AI Help</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[80px] overflow-hidden shadow-2xl bg-slate-900 aspect-square flex items-center justify-center p-0 group">
                <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover rounded-[80px] opacity-70 group-hover:scale-110 transition-duration-1000" alt="Secure Padlock" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <div className="w-48 h-48 border-2 border-blue-400/20 rounded-full flex items-center justify-center animate-pulse"><Lock size={80} className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" /></div>
                  <p className="mt-8 text-blue-400 text-6xl font-serif tracking-tighter opacity-60">CyberSecur</p>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-4 bg-slate-900/50 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 text-white min-w-[300px] shadow-2xl">
                <div className="flex items-center space-x-3 text-xs text-blue-400 font-black uppercase tracking-[0.2em] mb-4"><Phone size={16} /><span>24/7 EMERGENCY HELPLINE</span></div>
                <p className="text-7xl font-black mb-3 tracking-tighter">112</p><p className="text-xs text-slate-300 font-medium leading-relaxed max-w-[200px]">Report active cybercrime incidents immediately</p>
              </div>
            </div>
          </section>

          {/* Oval Layout Section */}
          <section className="bg-slate-50 py-32 overflow-hidden border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="w-full aspect-square lg:aspect-[4/5] rounded-[10rem] lg:rounded-[20rem] overflow-hidden border-[20px] border-white shadow-2xl relative group">
                  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover scale-105 group-hover:scale-110" alt="Cyber Monitoring" />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
                </div>
                <div className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 w-64 animate-bounce">
                   <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Monitoring</span>
                   </div>
                   <p className="text-sm font-bold text-slate-600 leading-tight">Response Teams active in {activeRegion.name}.</p>
                </div>
              </div>
              <div>
                <h2 className="text-7xl font-serif font-medium mb-12 leading-[1.05] tracking-tight">Centralized <br /><span className="italic text-slate-400 font-normal">Cybercrime Resources</span></h2>
                <div className="space-y-8 mb-16 text-slate-500 text-xl font-medium leading-relaxed">
                  <p>Aggregated data from {activeRegion.certName} and agency partners.</p>
                  <p className="text-slate-400">Verified helplines, official portals, and technical advisories localized for you.</p>
                </div>
                <div className="grid grid-cols-2 gap-12">
                  {[{ icon: Globe, title: 'Region-Aware', desc: 'Italy & Latvia' }, { icon: Zap, title: 'Live Updates', desc: 'Official feeds' }, { icon: MessageSquare, title: 'AI Guidance', desc: 'Victim support' }, { icon: Fingerprint, title: 'E-Signing', desc: 'Secure reporting' }].map((item, i) => (
                    <div key={i} className="group">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
                        <item.icon size={26} />
                      </div>
                      <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center text-xs space-x-2 text-slate-400 mb-4 font-bold uppercase tracking-widest">
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setActiveTab('homepage')}>Home</span><ChevronRight size={12} /><span className="text-slate-900">Dashboard</span>
          </div>
          <div className="flex justify-between items-end mb-12 gap-8">
            <div>
              <h1 className="text-6xl font-serif font-medium tracking-tight">Cybercrime Dashboard</h1>
              <p className="text-slate-500 mt-2 font-medium font-serif italic text-xl">Verified national reporting infrastructure monitor.</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-white border p-1 rounded-xl flex items-center space-x-1 shadow-sm uppercase tracking-widest">
                <p className="text-[10px] font-black text-slate-400 px-3">REGION</p>
                <select value={activeRegion.id} onChange={(e) => setActiveRegion(REGIONS[e.target.value])} className="border-none text-sm font-black bg-slate-100 rounded-lg px-4 focus:ring-0 cursor-pointer py-1.5"><option value="IT">Italy</option><option value="LV">Latvia</option></select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-6"><AlertTriangle size={24}/></div>
               <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Latest Advisory</p>
               <p className="text-xs text-slate-500 font-medium mb-6 line-clamp-2">{sortedArticles[0]?.title}</p>
               <button onClick={() => setActiveTab('resources')} className="text-blue-600 text-xs font-black flex items-center uppercase tracking-widest">Details <ArrowRight size={14} className="ml-1"/></button>
               <div className="absolute top-6 right-6 px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-black tracking-widest uppercase">NEW</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6"><Phone size={24}/></div>
               <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Emergency</p>
               <p className="text-4xl font-serif font-medium text-emerald-600 mb-2 tracking-tighter">112</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative">
               <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6"><Activity size={24}/></div>
               <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Active reports</p>
               <p className="text-4xl font-serif font-medium text-blue-600 mb-2 tracking-tighter">{activeRegion.stats.incidents}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Sparkles size={80} /></div>
               <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 shadow-xl"><MessageCircle size={24}/></div>
               <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">AI Assistant</p>
               <button onClick={() => setIsChatOpen(true)} className="text-blue-600 text-xs font-black flex items-center uppercase tracking-widest mt-6">Talk Now <ArrowRight size={14} className="ml-1"/></button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-serif font-medium tracking-tight">Recent Advisories</h2>
            <button onClick={() => setActiveTab('resources')} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">View Intelligence Library</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sortedArticles.slice(0, 3).map((art, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="rounded-[3rem] overflow-hidden aspect-video mb-6 relative shadow-sm">
                  <img src={art.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={art.title} />
                  <div className="absolute top-6 left-6 flex space-x-2">
                    <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">{art.type}</span>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{art.date}</p>
                  <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">{art.title}</h3>
                  <p className="text-slate-500 text-sm font-black uppercase tracking-widest">{art.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
          {/* Resource Library Header */}
          <div className="flex items-center text-xs space-x-2 text-slate-400 mb-4 font-bold uppercase tracking-widest">
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setActiveTab('homepage')}>Home</span><ChevronRight size={12} /><span className="text-slate-900">Resources</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h1 className="text-7xl font-serif font-medium tracking-tight mb-4">Intelligence Library</h1>
              <p className="text-slate-500 text-xl font-serif italic">Verified technical news and national reporting protocols.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => refreshNews()} className={`flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all ${isSyncing ? 'opacity-50 pointer-events-none' : ''}`}>
                <RefreshCcw size={16} className={isSyncing ? 'animate-spin' : ''} />
                <span>{isSyncing ? 'Synchronizing Repository...' : 'Refresh Intelligence'}</span>
              </button>
            </div>
          </div>

          {/* Section: Expanded News & Articles */}
          <div className="mb-32">
             <div className="flex items-center justify-between mb-16 border-b border-slate-100 pb-8">
                <h2 className="text-4xl font-serif font-medium tracking-tight">Technical Advisories & News</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector: {activeRegion.name}</span>
                  <div className="w-px h-4 bg-slate-200" />
                  <div className="flex space-x-1">
                     {['All', 'Govt', 'Tech', 'Case Studies'].map(f => (
                       <button key={f} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 hover:bg-slate-50 rounded-lg">{f}</button>
                     ))}
                  </div>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
               {sortedArticles.map((art) => (
                 <div key={art.id} className="group cursor-pointer">
                   <div className="rounded-[2.5rem] overflow-hidden aspect-[16/10] mb-8 relative shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-slate-100">
                     <img src={art.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={art.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="absolute top-6 left-6">
                        <span className={`backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-sm border border-white/20 ${
                          art.type.includes('GOVT') ? 'bg-red-600/90' : 'bg-slate-900/80'
                        }`}>
                          {art.type}
                        </span>
                     </div>
                     <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl">
                          <Eye size={18} />
                        </div>
                     </div>
                   </div>
                   <div className="px-2">
                     <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        <div className="flex items-center"><Newspaper size={14} className="mr-2 text-blue-500" /> {art.source}</div>
                        <div className="flex items-center"><Clock size={14} className="mr-2" /> {art.date}</div>
                     </div>
                     <h3 className="text-3xl font-serif font-medium mb-6 leading-[1.2] tracking-tight group-hover:text-blue-600 transition-colors">{art.title}</h3>
                     <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-blue-600 transition-all border-b-2 border-slate-100 group-hover:border-blue-500 pb-1">
                        <span>Read Advisory</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Emergency Directory */}
          <div className="mb-32">
            <h2 className="text-4xl font-serif font-medium tracking-tight mb-16 border-b border-slate-100 pb-8">Emergency Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allHelplines.map((line) => (
                <div key={line.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                  <div className="flex justify-between mb-8">
                    <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {line.icon === 'wrench' ? <Wrench size={28} /> : line.icon === 'user' ? <User size={28} /> : <Phone size={28} />}
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center border ${
                      line.country === 'Italy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      <span className="mr-2">{line.flag}</span> {line.country}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 leading-tight h-12">{line.name}</h3>
                  <p className="text-4xl font-serif font-medium text-blue-600 mb-8 tracking-tighter">{line.contact}</p>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed mb-10 h-16 overflow-hidden">{line.desc}</p>
                  <a href={`tel:${line.contact}`} className="w-full block text-center bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg">Direct Connect</a>
                </div>
              ))}
            </div>
          </div>

          {/* Portal & Use-Case Mapping */}
          <div className="mb-32">
            <h2 className="text-4xl font-serif font-medium tracking-tight mb-16 border-b border-slate-100 pb-8">Portal & Use-Case Mapping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {allPortals.map((portal) => (
                <div key={portal.id} className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm group hover:border-blue-500 transition-all relative overflow-hidden">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center space-x-3 text-[10px] font-black text-blue-600 uppercase tracking-widest"><Cpu size={16} /><span>{portal.category}</span></div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center border ${
                      portal.country === 'Italy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}><span className="mr-2">{portal.flag}</span> {portal.country}</div>
                  </div>
                  <h3 className="text-3xl font-serif font-medium mb-4 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">{portal.title}</h3>
                  <p className="text-blue-600 text-sm font-black mb-8 uppercase tracking-widest inline-block border-b-2 border-blue-50">{portal.action}</p>
                  <p className="text-base font-serif font-medium text-slate-500 leading-relaxed mb-12 h-20 overflow-hidden">{portal.desc}</p>
                  <a href={portal.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-blue-600 transition-colors">
                    <span>Visit Official Portal</span><ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-24">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-10">
                <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg"><Shield size={32} /></div>
                <span className="text-3xl font-black tracking-tighter">CyberGuard</span>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-sm font-medium font-serif italic">Unified cybercrime resources for Italy and Latvia. Helping victims find official assistance with AI guidance.</p>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-10">PLATFORM</h4>
              <ul className="space-y-6 text-base font-bold text-slate-600">
                <li onClick={() => setActiveTab('homepage')} className="cursor-pointer hover:text-blue-600 transition-colors">Homepage</li>
                <li onClick={() => setActiveTab('dashboard')} className="cursor-pointer hover:text-blue-600 transition-colors">Dashboard</li>
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] text-center shadow-sm relative group overflow-hidden">
                <div className="flex items-center justify-center space-x-3 text-xs text-red-500 font-black uppercase tracking-[0.2em] mb-6">
                  <Phone size={16} />
                  <span>EMERGENCY HUB</span>
                </div>
                <div className="bg-red-500 text-white py-6 rounded-2xl text-6xl font-black mb-6 tracking-tighter shadow-xl shadow-red-100 group-hover:scale-105 transition-transform">112</div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest font-black opacity-50 italic">Priority Dispatch Active</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <p>© 2026 CyberGuard Intelligence Network. Sync: {lastUpdated}</p>
            <div className="flex space-x-12 mt-6 md:mt-0">
               <span>Privacy Protocol</span>
               <span>Service Terms</span>
               <span className="text-red-400">Emergency Disclaimer</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent AI Assistant Trigger */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all z-50 group overflow-hidden border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-30"></div>
        {isChatOpen ? <X size={32} className="relative z-10" /> : <MessageSquare size={32} className="relative z-10" />}
        {!isChatOpen && (
          <div className="absolute right-24 bg-white px-6 py-3 rounded-2xl text-[10px] font-black text-slate-900 shadow-2xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 tracking-[0.2em] uppercase">
            ASK AI ASSISTANCE
          </div>
        )}
      </button>

      <ChatBot region={activeRegion} articles={sortedArticles} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
