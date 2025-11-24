import React from 'react';
import { BotIcon } from './Icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-6 justify-start animate-fade-in">
      <div className="flex max-w-[85%] flex-row gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-red-50 text-red-600 border border-red-100 shadow-sm">
          <BotIcon className="w-5 h-5" />
        </div>
        <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-sm">
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;