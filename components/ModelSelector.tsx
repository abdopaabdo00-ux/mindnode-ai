'use client';

import React from 'react';
import { AVAILABLE_MODELS } from '@/lib/models';
import { Zap, Brain, Sparkles } from 'lucide-react';

interface ModelSelectorProps {
  activeModel: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector = ({ activeModel, onModelChange }: ModelSelectorProps) => {
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'groq':
        return <Zap className="w-3 h-3 text-yellow-400" fill="currentColor" />;
      case 'gemini':
        return <Sparkles className="w-3 h-3 text-cyan-400" fill="currentColor" />;
      case 'openrouter':
        return <Brain className="w-3 h-3 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={activeModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="appearance-none bg-[#151722] border border-white/10 text-slate-300 text-xs px-3 py-2 pr-8 rounded-xl cursor-pointer focus:outline-none focus:border-purple-500/50 transition-colors"
      >
        <option value="auto">🎯 توجيه ذكي (تلقائي)</option>
        {AVAILABLE_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.icon} {model.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute mr-[100px]">
        {getProviderIcon(AVAILABLE_MODELS.find(m => m.id === activeModel)?.provider || '')}
      </div>
    </div>
  );
};
