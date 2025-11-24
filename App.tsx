import React, { useState, useRef, useEffect, useCallback } from 'react';
import { geminiService } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import { NewsSidebar } from './components/NewsSidebar';
import { Message, Role } from './types';
import { SendIcon, SchoolLogo, TrashIcon, MicIcon, StopIcon, ImageIcon } from './components/Icons';

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Splash Screen Component
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-900 select-none p-4 overflow-hidden">
      
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center md:justify-around gap-12 md:px-10">
        
        {/* Left/Center Section - Main Controls */}
        <div className="flex flex-col items-center md:items-start animate-fade-in-up z-10 max-w-md text-center md:text-left">
          {/* Logo */}
          <div className="mb-8 p-6 bg-red-50 rounded-3xl shadow-xl shadow-red-500/10 border border-red-100 transform hover:scale-105 transition-transform duration-500">
            <SchoolLogo className="w-24 h-24 text-red-600" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-3">
            USMANIAN.CHAT
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base font-bold text-slate-500 tracking-[0.2em] uppercase mb-12">
            By Usman Public School System
          </p>

          {/* Continue Button */}
          <button 
            onClick={onComplete}
            className="group relative px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/40 active:scale-95 flex items-center gap-3 overflow-hidden mx-auto md:mx-0"
          >
            <span className="relative z-10">CONTINUE</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          </button>
        </div>

        {/* Right Section - Urdu Poetry */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right animate-fade-in-right opacity-0 z-10" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
             <div className="bg-slate-50/50 md:bg-slate-50 p-6 md:p-10 rounded-3xl border border-transparent md:border-slate-100 md:shadow-sm relative backdrop-blur-sm">
                <p className="text-2xl lg:text-3xl font-bold text-slate-800 leading-[2] font-serif" dir="rtl">
                  جہاں تعلیم کے ساتھ اخلاق بھی سکھایا جائے،
                </p>
                <p className="text-xl lg:text-2xl font-medium text-red-600 mt-2 font-serif leading-[2]" dir="rtl">
                  <span className="font-sans font-black mx-2 text-red-700">Usman Public School</span>
                  ایسا ادارہ سامنے آئے۔
                </p>
             </div>
        </div>

      </div>

      <div className="absolute bottom-8 text-slate-300 text-[10px] font-semibold tracking-widest uppercase">
        AI Powered Assistant
      </div>

      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-in-right {
            animation: fadeInRight 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

// Initial welcome message
const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: Role.MODEL,
  text: "Hello! I'm USMANIAN.CHAT. Ask me anything—complex questions, creative writing, coding help, or ask me to generate an image!",
  isStreaming: false
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const textBeforeListeningRef = useRef('');

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening until stopped
      recognitionRef.current.interimResults = true; // Show results as you speak
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Construct the new value
        const prefix = textBeforeListeningRef.current;
        const spacing = prefix && !prefix.endsWith(' ') ? ' ' : '';
        
        // Calculate all text from the current recognition session
        const sessionTranscript = Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join('');
          
        setInputValue(prefix + spacing + sessionTranscript);
        
        // Auto-resize textarea
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Please use Chrome or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      textBeforeListeningRef.current = inputValue;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleImageMode = () => {
    setIsImageMode(!isImageMode);
    // Focus input when toggling
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    geminiService.startNewSession();
    setMessages([WELCOME_MESSAGE]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
        setLoginError('Please enter both username and password');
        return;
    }
    setLoginError('');
    setIsAuthenticated(true);
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    // Stop listening if sending
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
    }

    const userText = inputValue.trim();
    setInputValue('');
    const isGeneratingImage = isImageMode;
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // 1. Add User Message
    const userMsgId = Date.now().toString();
    const userMessage: Message = {
      id: userMsgId,
      role: Role.USER,
      text: userText,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 2. Add Placeholder for AI Message
    const botMsgId = (Date.now() + 1).toString();
    const botMessagePlaceholder: Message = {
      id: botMsgId,
      role: Role.MODEL,
      text: isGeneratingImage ? 'Generating image...' : '',
      isStreaming: true,
    };

    setMessages(prev => [...prev, botMessagePlaceholder]);

    try {
      if (isGeneratingImage) {
        // Image Generation
        const imageUrl = await geminiService.generateImage(userText);
        
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMsgId) {
            return { 
              ...msg, 
              text: `Generated image for: "${userText}"`, 
              image: imageUrl,
              isStreaming: false 
            };
          }
          return msg;
        }));
      } else {
        // Chat Stream
        let fullResponse = '';
        await geminiService.sendMessageStream(userText, (chunkText) => {
          fullResponse += chunkText;
          setMessages(prev => prev.map(msg => {
            if (msg.id === botMsgId) {
              return { ...msg, text: fullResponse };
            }
            return msg;
          }));
        });

        // Finalize message
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMsgId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        }));
      }

    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => prev.map(msg => {
        if (msg.id === botMsgId) {
          return { 
            ...msg, 
            text: "I'm sorry, I encountered an error connecting to the server. Please try again.", 
            error: true,
            isStreaming: false
          };
        }
        return msg;
      }));
    } finally {
      setIsLoading(false);
      // Optional: Turn off image mode after one generation
      // setIsImageMode(false); 
    }
  }, [inputValue, isLoading, isListening, isImageMode]);

  // 1. Show Splash Screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // 2. Then show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-800 p-4 selection:bg-red-500/30">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="flex flex-col items-center mb-8">
                <div className="p-4 bg-red-50 rounded-xl mb-4 border border-red-100">
                    <SchoolLogo className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome Back
                </h1>
                <p className="text-slate-500 mt-2 text-sm font-medium">Sign in to access USMANIAN.CHAT</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-center font-semibold">
                        {loginError}
                    </div>
                )}
                
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-slate-400 font-medium"
                        placeholder="Enter your username"
                        autoFocus
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-slate-400 font-medium"
                        placeholder="Enter your password"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-500/25 mt-2 active:scale-[0.98]"
                >
                    Sign In
                </button>
            </form>
        </div>
         <p className="mt-8 text-slate-500 text-xs font-medium">
           Powered by Google Gemini 2.5 Flash
         </p>
      </div>
    );
  }

  // 3. Finally show Main App
  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 overflow-hidden selection:bg-red-500/30">
      
      {/* Header */}
      <header className="flex-none h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
        <a 
          href="https://usman.edu.pk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
        >
          <div className="p-2 bg-red-50 rounded-lg border border-red-100 group-hover:bg-red-100 transition-colors">
            <SchoolLogo className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-slate-900 leading-none tracking-tight group-hover:text-red-700 transition-colors">
              USMANIAN.CHAT
            </h1>
            <span className="text-[10px] text-slate-500 font-semibold group-hover:text-red-500 transition-colors">
              Usman Public School System
            </span>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm text-slate-500 font-medium">
            {username}
          </span>
          <button 
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Layout with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Chat and Input Column */}
        <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
                <div className="max-w-4xl mx-auto flex flex-col">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {isLoading && messages[messages.length - 1].role !== Role.MODEL && (
                        <TypingIndicator />
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <footer className="flex-none p-4 md:p-6 bg-white border-t border-slate-200 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto relative">
                
                {/* Visual Glow for modes */}
                <div className={`absolute inset-0 blur-xl rounded-3xl -z-10 transition-colors duration-300 ${isImageMode ? 'bg-purple-500/10' : 'bg-red-500/5'}`}></div>
                
                <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                    isImageMode 
                    ? 'border-purple-300 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500/50' 
                    : 'border-slate-300 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50'
                }`}>
                    <div className="flex items-end p-2 gap-2">
                    
                    {/* Image Mode Toggle */}
                    <button
                        onClick={toggleImageMode}
                        className={`p-3 rounded-xl transition-all duration-200 mb-[1px] ${
                        isImageMode 
                            ? 'bg-purple-100 text-purple-600 shadow-sm' 
                            : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={isImageMode ? "Switch to text chat" : "Switch to image generation"}
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        rows={1}
                        className="flex-1 max-h-[150px] bg-transparent text-slate-800 placeholder-slate-400 p-3 focus:outline-none resize-none font-medium"
                        placeholder={
                        isListening ? "Listening..." :
                        isImageMode ? "Describe an image to generate..." :
                        `Ask USMANIAN.CHAT anything, ${username}...`
                        }
                        value={inputValue}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                    
                    {/* Voice Button */}
                    <button
                        onClick={toggleListening}
                        className={`p-3 rounded-xl transition-all duration-200 mb-[1px] ${
                        isListening 
                            ? 'bg-red-100 text-red-600 animate-pulse' 
                            : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={isListening ? "Stop recording" : "Use voice input"}
                    >
                        {isListening ? <StopIcon className="w-5 h-5" /> : <MicIcon className="w-5 h-5" />}
                    </button>

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className={`p-3 rounded-xl transition-all duration-200 mb-[1px] ${
                        !inputValue.trim() || isLoading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : isImageMode 
                                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                                : 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20'
                        }`}
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                    </div>
                </div>
                <div className="text-center mt-3 flex items-center justify-center gap-2">
                    <p className="text-xs text-slate-400 font-medium">
                    Powered by Google Gemini 2.5 Flash {isImageMode && '& Image'} • AI can make mistakes.
                    </p>
                </div>
                </div>
            </footer>
        </div>

        {/* Right Sidebar for News */}
        <NewsSidebar />
      </div>
    </div>
  );
};

export default App;