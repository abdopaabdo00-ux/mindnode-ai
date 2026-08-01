'use client';

import React from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text?: string) => void;
  isLoading: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const ChatInput = ({ value, onChange, onSend, isLoading, textareaRef }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 pt-2" dir="rtl">
      <div className="relative flex items-end bg-[#151722]/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden transition-all duration-200 focus-within:border-purple-500/30 focus-within:bg-[#151722] focus-within:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
        <div className="flex items-center gap-1 pr-3 py-3 pl-1">
          <button
            onClick={() => onSend()}
            disabled={!value.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              value.trim() && !isLoading
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                : 'bg-white/5 text-slate-500 cursor-not-allowed'
            }`}
            title="إرسال"
          >
            <Send className="w-4 h-4 -rotate-90" />
          </button>
          <button
            className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
            title="تسجيل صوتي"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
            title="إرفاق ملف"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        <textarea
          ref={textareaRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك هنا..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none resize-none py-3.5 px-2 text-sm leading-relaxed min-h-[48px] max-h-[120px] disabled:opacity-50"
        />
      </div>

      <div className="flex items-center justify-between mt-2 px-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
          <span>جاهز</span>
        </div>
        <div className="text-[11px] text-slate-500">
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-slate-400 font-mono text-[10px]">Enter</span>
          <span> للإرسال · </span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-slate-400 font-mono text-[10px]">Shift+Enter</span>
          <span> سطر جديد</span>
        </div>
      </div>
    </div>
  );
};
