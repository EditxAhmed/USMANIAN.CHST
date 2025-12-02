import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import { ChatSidebar } from './components/NewsSidebar';
import { Message, Role, ChatSession } from './types';
import { SendIcon, MicIcon, StopIcon, ImageIcon, SchoolLogo, TrashIcon, PaintBrushIcon, BotIcon, CodeIcon } from './components/Icons';

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// --- SHARED COMPONENTS ---

const BackgroundDecor: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
     <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
     <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] opacity-20"></div>
  </div>
);

// --- VIEW COMPONENTS ---

// 1. Splash Screen Component (Dark AI Theme)
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none p-4 overflow-hidden">
      
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center md:justify-around gap-12 md:px-10 relative z-10">
        
        {/* Left/Center Section - Main Controls */}
        <div className="flex flex-col items-center md:items-start animate-fade-in-up z-10 max-w-md text-center md:text-left order-2 md:order-1 relative">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-3 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-2xl border border-white/10 shadow-2xl">
            USMANIAN.CHAT
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base font-bold text-slate-400 tracking-[0.2em] uppercase mb-12 px-2">
            By Usman Public School System
          </p>

          {/* Continue Button */}
          <button 
            onClick={onComplete}
            className="group relative px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-95 flex items-center gap-3 overflow-hidden mx-auto md:mx-0 z-20"
          >
            <span className="relative z-10">CONTINUE</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Right Section - Logo Display */}
        <div className="relative z-10 flex flex-col items-center justify-center animate-fade-in-delayed mt-8 md:mt-0 order-1 md:order-2">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-8">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
            <SchoolLogo className="w-full h-full relative z-10 drop-shadow-2xl" />
          </div>
          
          {/* Quote Container */}
          <div className="text-center max-w-lg relative mt-4 px-4">
             <span className="absolute -top-8 -left-0 md:-left-6 text-6xl text-slate-700 font-serif leading-none opacity-50">“</span>
            <span className="absolute -bottom-8 -right-0 md:-right-6 text-6xl text-slate-700 font-serif leading-none opacity-50">”</span>
            
            <p className="text-2xl md:text-3xl font-serif italic text-slate-300 font-medium leading-snug tracking-wide">
              Shaping the leaders of Ummah
            </p>
          </div>
        </div>
      </div>

      <BackgroundDecor />
    </div>
  );
};

// 2. Sign Up Panel Component
const SignUpPanel: React.FC<{ onSignUp: (name: string) => void }> = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      onSignUp(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950 p-4 animate-fade-in text-white">
      <BackgroundDecor />

      <div className="bg-slate-900/90 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-8 relative z-10 border border-slate-800">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 text-red-600">
            <SchoolLogo />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm mt-1">Join the USMANIAN.CHAT community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-white font-medium placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-white font-medium placeholder-slate-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/30 active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            <span>Continue</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-500 mt-6 px-4 leading-relaxed">
          By signing up, you agree to follow the school's digital usage policy.
        </p>
      </div>
    </div>
  );
};

// 3. About Page Component
const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 text-slate-200 relative animate-fade-in custom-scrollbar">
      <BackgroundDecor />
      
      <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
          </div>
          <span className="font-medium">Back to Chat</span>
        </button>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
           <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-800">
              <SchoolLogo className="w-full h-full" />
           </div>
           <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                 ABOUT
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                 Discover the core values, mission, and vision that drive the Usman Public School System.
              </p>
           </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* VISION OF USMANIAN.CHAT */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl col-span-1 md:col-span-2">
              <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <span className="w-8 h-0.5 bg-red-500"></span>
                 Vision of Usmanian.Chat
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed italic">
                 "To integrate cutting-edge Artificial Intelligence with our educational ethos, providing students, parents, and faculty with instant, accurate, and ethically grounded knowledge, reflecting our commitment to modernization alongside tradition."
              </p>
           </div>

           {/* ISLAMIC MISSION */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl col-span-1 md:col-span-2">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <span className="w-8 h-0.5 bg-blue-500"></span>
                 Islamic Mission
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                 We believe that <strong>Allah (SWT)</strong> is the source of all knowledge. Our platform aims to facilitate the pursuit of <em>Ilm</em> (knowledge) that leads to success in this world and the Hereafter, fostering a community grounded in Islamic values and moral excellence.
              </p>
           </div>

           {/* School Vision */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Vision</h2>
              <p className="text-slate-400 leading-relaxed">
                 Nurturing generations to serve the role as leaders of Ummah.
              </p>
           </div>

           {/* School Mission */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Mission</h2>
              <p className="text-slate-400 leading-relaxed">
                 To motivate the students in becoming future leaders, capable of providing guidance to the Muslim Ummah in all spheres of life and lead the contemporary world in accordance with the teachings of Islam.
              </p>
           </div>

           {/* Co-Curricular */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Co-Curricular Activities</h2>
              <p className="text-slate-400 leading-relaxed">
                 The School is developing the holistic personality of the students. We schedule Students Week, Excursions Trips, Book Fairs, Writing Competitions, Spelling Bee Competition, Language Fairs, Science Fairs and Debates etc.
              </p>
           </div>

           {/* Islamic Integration */}
           <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Islamic Integration in Curriculum</h2>
              <p className="text-slate-400 leading-relaxed">
                 We believe that Allah (SWT) is the source of knowledge and all the streams of knowledge guide us to oneness of Allah (SWT). All the subjects taught in school are linked with Islamic concepts. In this way we develop moral values among the children.
              </p>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
           <p>© {new Date().getFullYear()} Usman Public School System. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

// 4. Main Chat Interface
const App: React.FC = () => {
  const [view, setView] = useState<'SPLASH' | 'SIGNUP' | 'CHAT' | 'ABOUT'>('SPLASH');
  const [userName, setUserName] = useState('');
  
  // Chat History State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  
  // Current Session State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  const [isCodeMode, setIsCodeMode] = useState(false);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history whenever sessions change
  useEffect(() => {
     localStorage.setItem('chatHistory', JSON.stringify(sessions));
  }, [sessions]);

  // Load messages when currentSessionId changes
  useEffect(() => {
    if (currentSessionId) {
      const session = sessions.find(s => s.id === currentSessionId);
      if (session) {
        setMessages(session.messages);
      }
    } else {
      // New Chat State
      setMessages([]);
      // If we just entered chat and have a name, show greeting
      if (view === 'CHAT' && userName && messages.length === 0) {
         setMessages([{
           id: 'init-1',
           role: Role.MODEL,
           text: `Hello! How can I assist you?`
         }]);
      }
    }
  }, [currentSessionId, view, userName]);

  // Sync current messages back to session
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: messages };
        }
        return s;
      }));
    }
  }, [messages, currentSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const handleNewChat = () => {
    geminiService.resetSession();
    setCurrentSessionId(null);
    setMessages([{
       id: Date.now().toString(),
       role: Role.MODEL,
       text: `Hello! How can I assist you?`
    }]);
  };

  const handleToggleImageMode = () => {
    const newVal = !isImageMode;
    setIsImageMode(newVal);
    if (newVal) setIsCodeMode(false);
  };

  const handleToggleCodeMode = () => {
    const newVal = !isCodeMode;
    setIsCodeMode(newVal);
    if (newVal) setIsImageMode(false);
  };

  // --- VOICE RECOGNITION ---
  const handleMicClick = () => {
    // If already listening, stop the recognition
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => {
         const newText = prev + (prev && !prev.endsWith(' ') ? ' ' : '') + transcript;
         return newText;
      });
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleStop = () => {
    geminiService.stopGeneration();
    setIsLoading(false);
    // Remove streaming flag from last message
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.isStreaming) {
        return prev.map(msg => msg.id === last.id ? { ...msg, isStreaming: false } : msg);
      }
      return prev;
    });
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: textToSend
    };

    let activeSessionId = currentSessionId;
    
    // Create temporary session structure if new
    let nextMessages = activeSessionId ? [...messages, userMsg] : [userMsg];

    // If starting new chat, we need to init the session NOW to prevent race condition
    if (!activeSessionId) {
       // Check if there was a greeting
       const greeting = messages.length > 0 && messages[0].role === Role.MODEL ? messages[0] : null;
       const initialMsgs = greeting ? [greeting, userMsg] : [userMsg];
       
       // Pre-add the placeholder for bot response so it exists in the session immediately
       const botMsgId = (Date.now() + 1).toString();
       const placeholderBotMsg: Message = { id: botMsgId, role: Role.MODEL, text: '', isStreaming: true };
       
       if (!isImageMode) {
          initialMsgs.push(placeholderBotMsg);
       }

       const newId = Date.now().toString();
       const newSession: ChatSession = {
          id: newId,
          title: textToSend.slice(0, 30) + (textToSend.length > 30 ? '...' : ''),
          date: new Date().toISOString(),
          messages: initialMsgs
       };
       
       setSessions(prev => [newSession, ...prev]);
       setCurrentSessionId(newId);
       activeSessionId = newId;
       nextMessages = initialMsgs; // Update local view to match
    } else {
       // Existing chat, add user msg to local view
       setMessages(nextMessages);
    }
    
    setInput('');
    setIsLoading(true);

    try {
      if (isImageMode) {
        // IMAGE GENERATION MODE
        const base64Image = await geminiService.generateImage(textToSend);
        
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: Role.MODEL,
          text: `Here is an image for: "${textToSend}"`,
          image: base64Image
        };
        setMessages(prev => [...prev, botMsg]);

      } else {
        // TEXT CHAT MODE (or Code Mode - effectively the same API call but context differs slightly in prompt)
        const botMsgId = nextMessages[nextMessages.length - 1].isStreaming 
           ? nextMessages[nextMessages.length - 1].id 
           : (Date.now() + 1).toString();

        if (!nextMessages.find(m => m.id === botMsgId)) {
            setMessages(prev => [
              ...prev, 
              { id: botMsgId, role: Role.MODEL, text: '', isStreaming: true }
            ]);
        }

        let fullText = '';
        await geminiService.sendMessageStream(textToSend, (chunk) => {
          fullText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: fullText } 
              : msg
          ));
        });

        // Finalize message
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        ));
      }

    } catch (error) {
      console.error(error);
      // Don't show error if it was a manual stop (which we can't easily detect here without custom error type, but usually handleStop manages UI)
      // For now, if loading is still true, show error. If handleStop set it false, we skip.
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = (name: string) => {
    setUserName(name);
    setView('CHAT');
  };

  // --- RENDER VIEWS ---

  if (view === 'SPLASH') {
    return <SplashScreen onComplete={() => setView('SIGNUP')} />;
  }

  if (view === 'SIGNUP') {
    return <SignUpPanel onSignUp={handleSignUp} />;
  }

  if (view === 'ABOUT') {
    return <AboutPage onBack={() => setView('CHAT')} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden relative font-sans selection:bg-red-500/30">
      <BackgroundDecor />

      {/* Sidebar */}
      <ChatSidebar 
         sessions={sessions}
         currentSessionId={currentSessionId}
         onSelectSession={(id) => {
           setCurrentSessionId(id);
           setView('CHAT');
         }}
         onDeleteSession={handleDeleteSession}
         onNewChat={handleNewChat}
         isImageMode={isImageMode}
         onToggleImageMode={handleToggleImageMode}
         isCodeMode={isCodeMode}
         onToggleCodeMode={handleToggleCodeMode}
         onShowAbout={() => setView('ABOUT')}
      />

      {/* Main Content (Chat) */}
      <main className="flex-1 flex flex-col relative w-full z-10 animate-fade-in">
          {/* Header */}
          <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-20 shadow-sm flex-shrink-0">
             <div className="flex items-center gap-3">
               <div className="md:hidden">
                 <SchoolLogo className="w-8 h-8" />
               </div>
               <div>
                 <h1 className="text-lg font-black text-white tracking-tight leading-none">
                   <a href="https://usman.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                     USMANIAN.CHAT
                   </a>
                 </h1>
                 <div className="flex items-center gap-1.5">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                     Powered by <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Gemini 2.5 Flash</a>
                   </p>
                 </div>
               </div>
             </div>

             <div className="flex items-center gap-2">
               <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-red-500/20">
                 {userName.charAt(0).toUpperCase()}
               </div>
             </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative">
             {/* Watermark Logo */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none grayscale invert">
                <SchoolLogo className="w-96 h-96" />
             </div>

             <div className="max-w-3xl mx-auto pb-4">
               {messages.map((msg) => (
                 <MessageBubble key={msg.id} message={msg} />
               ))}
               {isLoading && <TypingIndicator />}
               <div ref={messagesEndRef} />
             </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800 backdrop-blur-sm flex-shrink-0">
            <div className="max-w-3xl mx-auto relative">
               {/* Toggle Status Indicators */}
               <div className="absolute -top-10 left-0 flex gap-2">
                  <button
                    onClick={handleToggleImageMode}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border ${
                      isImageMode 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <PaintBrushIcon className="w-3 h-3" />
                    {isImageMode ? 'Image Mode On' : 'Image Mode Off'}
                  </button>

                  <button
                    onClick={handleToggleCodeMode}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border ${
                      isCodeMode 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <CodeIcon className="w-3 h-3" />
                    {isCodeMode ? 'Code Mode On' : 'Code Mode Off'}
                  </button>
               </div>

               <div className={`
                 flex items-center gap-2 px-4 py-3 rounded-2xl border shadow-lg transition-all
                 ${isImageMode 
                    ? 'bg-purple-900/20 border-purple-500/50' 
                    : isCodeMode
                        ? 'bg-emerald-900/20 border-emerald-500/50'
                        : 'bg-slate-800/50 border-slate-700 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500/50'
                 }
               `}>
                 <button 
                   onClick={handleMicClick}
                   className={`p-2 transition-all rounded-full ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
                   disabled={isLoading}
                 >
                   <MicIcon className="w-5 h-5" />
                 </button>
                 
                 <input
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                   placeholder={
                     isListening ? "Listening..." 
                     : isImageMode ? "Describe an image to generate..." 
                     : isCodeMode ? "Ask for code snippets, debugging, or logic..."
                     : "Message USMANIAN.CHAT..."
                   }
                   disabled={isLoading && !isListening} 
                   className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-slate-500"
                 />

                 <button 
                   onClick={isLoading ? handleStop : () => handleSend()}
                   disabled={!isLoading && !input.trim()}
                   className={`
                     p-2 rounded-xl transition-all
                     ${isLoading 
                       ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/30'
                       : input.trim() 
                         ? (isImageMode ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' : isCodeMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/30') 
                         : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                   `}
                 >
                   {isLoading ? <StopIcon className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
                 </button>
               </div>
               
               <p className="text-center text-[10px] text-slate-500 mt-2">
                 USMANIAN.CHAT can make mistakes. Check important info.
               </p>
            </div>
          </div>
        </main>
    </div>
  );
};

export default App;