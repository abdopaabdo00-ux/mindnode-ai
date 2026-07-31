'use client';

import React from 'react';
import { Brain, User, Zap, Sparkles, Globe } from 'lucide-react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  modelInfo?: {
    model: string;
    provider: string;
    reason: string;
  };
}

export const MessageBubble = ({ role, content, modelInfo }: MessageBubbleProps) => {
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'groq':
        return <Zap className="w-3 h-3 text-yellow-400" fill="currentColor" />;
      case 'gemini':
        return <Sparkles className="w-3 h-3 text-cyan-400" fill="currentColor" />;
      case 'openrouter':
        return <Globe className="w-3 h-3 text-purple-400" />;
      default:
        return null;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'groq':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'gemini':
        return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
      case 'openrouter':
        return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      default:
        return 'text-slate-400 border-slate-400/20 bg-slate-400/10';
    }
  };

  return (
    <div className={`flex items-end gap-3 ${role === 'user' ? 'justify-start' : 'justify-end'}`}>
      {role === 'assistant' && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
          <Brain className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex flex-col gap-1 max-w-[85%]">
        {role === 'assistant' && modelInfo && (
          <div className={`flex items-center gap-1.5 self-end px-2.5 py-1 rounded-lg border text-[10px] ${getProviderColor(modelInfo.provider)}`}>
            {getProviderIcon(modelInfo.provider)}
            <span>{modelInfo.model}</span>
          </div>
        )}
        
        <div
          className={`px-5 py-3.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap ${
            role === 'user'
              ? 'bg-purple-600 text-white rounded-tr-sm'
              : 'bg-[#151722] text-slate-200 border border-white/5 rounded-tl-sm'
          }`}
        >
          {content}
        </div>
      </div>

      {role === 'user' && (
        <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-slate-300" />
        </div>
      )}
    </div>
  );
};
