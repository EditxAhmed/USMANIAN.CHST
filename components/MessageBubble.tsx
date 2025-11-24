import React from 'react';
import { Message, Role } from '../types';
import { UserIcon, BotIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

// Simple formatter to handle code blocks and basic paragraphs without a heavy markdown library
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split by code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // It's a code block
          const content = part.slice(3, -3).replace(/^[a-z]+\n/, ''); // Try to strip language line
          return (
            <div key={index} className="my-4 overflow-hidden rounded-lg bg-slate-800 border border-slate-700 shadow-sm">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-700 text-xs text-slate-400 font-mono flex justify-between items-center">
                <span>Code</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-emerald-300 whitespace-pre-wrap">
                  {content.trim()}
                </pre>
              </div>
            </div>
          );
        } else {
          // Regular text, split by double newlines for paragraphs
          const paragraphs = part.split(/\n\n+/);
          return (
            <span key={index}>
              {paragraphs.map((p, pIndex) => {
                if (!p.trim()) return null;
                // Bold processing
                const boldParts = p.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={pIndex} className="mb-2 last:mb-0 leading-relaxed">
                        {boldParts.map((b, bIdx) => {
                            if (b.startsWith('**') && b.endsWith('**')) {
                                return <strong key={bIdx} className="font-semibold text-red-700">{b.slice(2, -2)}</strong>;
                            }
                            return <span key={bIdx}>{b}</span>;
                        })}
                    </p>
                )
              })}
            </span>
          );
        }
      })}
    </>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm
          ${isUser ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border border-red-100'}
        `}>
          {isUser ? <UserIcon className="w-5 h-5" /> : <BotIcon className="w-5 h-5" />}
        </div>

        {/* Bubble */}
        <div className={`
          flex flex-col
          ${isUser ? 'items-end' : 'items-start'}
        `}>
          <div className={`
            relative px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base
            ${isUser 
              ? 'bg-red-600 text-white rounded-tr-sm shadow-red-200' 
              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
            }
            ${message.error ? 'border-red-500 bg-red-50 text-red-800' : ''}
          `}>
             {message.image && (
               <div className="mb-3 overflow-hidden rounded-lg border border-slate-200">
                 <img src={message.image} alt="Generated Content" className="w-full h-auto object-cover max-h-[512px]" />
               </div>
             )}
             
             <FormattedText text={message.text} />
             
             {message.isStreaming && (
                <span className="inline-block w-1.5 h-4 ml-1 -mb-0.5 bg-red-400 animate-pulse" />
             )}
          </div>
          
          {/* Role Label */}
          <span className="text-xs text-slate-400 mt-1 px-1">
            {isUser ? 'You' : 'USMANIAN.CHAT'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;