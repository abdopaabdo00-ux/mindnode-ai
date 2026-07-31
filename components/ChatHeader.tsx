'use client';

import React from 'react';
import { Menu, Trash2, Zap, BrainCircuit } from 'lucide-react';

interface ChatHeaderProps {
  onClear: () => void;
  activeModel: string;
}

export const ChatHeader = ({ onClear, activeModel }: ChatHeaderProps) => {
  const getModelLabel = () => {
    if (activeModel === 'auto') return 'توجيه ذكي';
    return activeModel;
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full border-b border-white/5 bg-[#0d0f18]/80 backdrop-blur-xl z-20 shrink-0">
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-base font-bold text-white tracking-wide leading-none">
              MindNode<span className="text-purple-400">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-1">محور الذكاء الاصطناعي</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs">
          <Zap className="w-3.5 h-3.5 fill-purple-300" />
          <span>{getModelLabel()}</span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors text-xs px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>مسح</span>
        </button>
      </div>
    </header>
  );
};
