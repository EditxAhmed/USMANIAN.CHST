import React from 'react';
import { HistoryIcon, TrashIcon, MessageIcon, PlusIcon, PaintBrushIcon, SchoolLogo, InfoIcon, CodeIcon } from './Icons';
import { ChatSession } from '../types';

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNewChat: () => void;
  isImageMode?: boolean;
  onToggleImageMode?: () => void;
  isCodeMode?: boolean;
  onToggleCodeMode?: () => void;
  onShowAbout?: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onDeleteSession,
  onNewChat,
  isImageMode,
  onToggleImageMode,
  isCodeMode,
  onToggleCodeMode,
  onShowAbout
}) => {
  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex-col hidden xl:flex h-full shadow-lg z-20 backdrop-blur-md">
      
      {/* Header / Logo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-center flex-none">
        <a href="https://usman.edu.pk" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
          <SchoolLogo className="w-24 h-24 drop-shadow-lg" />
        </a>
      </div>

      {/* New Chat Button */}
      <div className="p-4 pb-2 flex-none">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-md shadow-red-900/20 active:scale-95 group"
        >
          <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-bold text-sm">New Chat</span>
        </button>
      </div>
      
      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
        <h3 className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          History
        </h3>
        
        {sessions.length === 0 ? (
          <div className="px-4 py-8 text-center text-slate-500 text-xs italic">
            No history yet. Start a conversation!
          </div>
        ) : (
          sessions.map((session) => (
            <div 
              key={session.id} 
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                ${currentSessionId === session.id 
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }
              `}
              onClick={() => onSelectSession(session.id)}
            >
              <MessageIcon className={`w-4 h-4 flex-shrink-0 ${currentSessionId === session.id ? 'text-red-500' : 'text-slate-500'}`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.title || "New Conversation"}
                </p>
                <p className="text-[10px] opacity-60 truncate">
                  {new Date(session.date).toLocaleDateString()}
                </p>
              </div>

              {/* Delete Button (visible on hover) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded transition-all"
                title="Delete Chat"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer / Modes */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-2">
        
        {/* About School */}
        <button 
          onClick={onShowAbout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-xs font-medium"
        >
          <InfoIcon className="w-4 h-4 text-blue-500" />
          <span>About School</span>
        </button>

        {/* Code Assistant Mode */}
        <button 
          onClick={onToggleCodeMode}
          className={`
            w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-xs font-bold border
            ${isCodeMode 
              ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
              : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-emerald-300'
            }
          `}
        >
          <div className="flex items-center gap-3">
             <CodeIcon className={`w-4 h-4 ${isCodeMode ? 'text-emerald-400' : 'text-slate-500'}`} />
             <span>Code Assistant</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${isCodeMode ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
        </button>

        {/* Image Gen Mode */}
        <button 
          onClick={onToggleImageMode}
          className={`
            w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-xs font-bold border
            ${isImageMode 
              ? 'bg-purple-900/30 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
              : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-purple-300'
            }
          `}
        >
          <div className="flex items-center gap-3">
             <PaintBrushIcon className={`w-4 h-4 ${isImageMode ? 'text-purple-400' : 'text-slate-500'}`} />
             <span>Image Mode</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${isImageMode ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-slate-600'}`} />
        </button>

      </div>
    </aside>
  );
};