'use client';

import React from 'react';
import { Brain, Sparkles, Code, Globe, Lightbulb, BookOpen, Briefcase, Network, MessageSquare, Calculator, PenTool } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  const suggestions = [
    { title: 'اشرح لي الذكاء الاصطناعي', icon: Network, color: 'text-purple-400', category: 'تحليل' },
    { title: 'اكتب كود Python', icon: Code, color: 'text-cyan-400', category: 'برمجة' },
    { title: 'ترجمة نص', icon: Globe, color: 'text-emerald-400', category: 'ترجمة' },
    { title: 'أفكار لمشروع', icon: Lightbulb, color: 'text-amber-400', category: 'عام' },
    { title: 'لخص موضوعاً', icon: BookOpen, color: 'text-pink-400', category: 'تلخيص' },
    { title: 'نصائح مهنية', icon: Briefcase, color: 'text-violet-400', category: 'عام' },
    { title: 'حل معادلة رياضية', icon: Calculator, color: 'text-orange-400', category: 'رياضيات' },
    { title: 'اكتب قصة قصيرة', icon: PenTool, color: 'text-rose-400', category: 'كتابة' },
    { title: 'ناقش معي موضوعاً', icon: MessageSquare, color: 'text-sky-400', category: 'عام' },
  ];

  const tags = ['Groq ⚡', 'Gemini 🔥', 'OpenRouter 🌐', 'Llama 🦙', 'Mixtral 🧠', 'Mistral 🌊'];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 py-8 text-center animate-fade-in-up">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.35)]">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 bg-cyan-400 rounded-full p-1.5 border-[3px] border-[#0d0d1a] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#0d0d1a]" fill="currentColor" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 animate-fade-in-up animate-delay-100">
        مرحباً بك في <span className="gradient-text">MindNodeAI</span>
      </h1>

      <p className="text-slate-400 text-sm md:text-[15px] max-w-lg mb-2 leading-relaxed animate-fade-in-up animate-delay-200">
        محور الذكاء الاصطناعي الذكي. نحلل سؤالك ونرسله تلقائياً لأفضل نموذج متخصص.
        <strong className="text-slate-300 block mt-1">مجاني 100% - بدون حدود - بدون رفض</strong>
      </p>

      <p className="text-slate-500 text-xs md:text-sm mb-8 animate-fade-in-up animate-delay-300">
        اكتب رسالتك أو اختر اقتراحاً للبدء.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8 animate-fade-in-up animate-delay-400">
        {suggestions.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSuggestionClick(item.title)}
              className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-purple-500/30 rounded-2xl transition-all duration-200 group text-right cursor-pointer hover:-translate-y-0.5"
            >
              <IconComponent className={`w-[18px] h-[18px] ${item.color} flex-shrink-0`} />
              <span className="text-slate-300 group-hover:text-white text-[13px] font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up animate-delay-500">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
