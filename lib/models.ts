export interface ModelConfig {
  id: string;
  name: string;
  provider: 'groq' | 'gemini' | 'openrouter';
  modelId: string;
  category: string;
  icon: string;
  description?: string;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'groq-llama33',
    name: 'Llama 3.3 70B (Groq)',
    provider: 'groq',
    modelId: 'llama-3.3-70b-versatile',
    category: 'عام',
    icon: '⚡',
    description: 'نموذج خارق وسريع للمهام العامة'
  },
  {
    id: 'groq-llama31',
    name: 'Llama 3.1 8B (Groq)',
    provider: 'groq',
    modelId: 'llama-3.1-8b-instant',
    category: 'برمجة',
    icon: '💻',
    description: 'استجابة فائقة السرعة للأكواد والبرمجة'
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'gemini',
    modelId: 'gemini-1.5-flash',
    category: 'تحليل',
    icon: '🧠',
    description: 'ممتاز في التحليل والنصوص الطويلة'
  },
  {
    id: 'openrouter-mistral',
    name: 'Mistral Nemo (OpenRouter)',
    provider: 'openrouter',
    modelId: 'mistralai/mistral-nemo',
    category: 'إبداعي',
    icon: '🎨',
    description: 'مخصص للكتابة والمحتوى الإبداعي'
  },
];

export const CATEGORY_MAP: Record<string, string[]> = {
  'عام': ['groq-llama33', 'gemini-flash'],
  'برمجة': ['groq-llama31', 'groq-llama33'],
  'تحليل': ['gemini-flash', 'groq-llama33'],
  'إبداعي': ['openrouter-mistral', 'groq-llama33'],
};

export function detectCategory(text: string): string {
  const codeKeywords = ['code', 'function', 'class', 'const', 'let', 'var', 'برمجة', 'كود', 'دالة', 'خطأ'];
  if (codeKeywords.some(kw => text.toLowerCase().includes(kw))) return 'برمجة';

  const analysisKeywords = ['حلل', 'ملخص', 'مقارنة', 'جدول', 'بيانات'];
  if (analysisKeywords.some(kw => text.toLowerCase().includes(kw))) return 'تحليل';

  return 'عام';
}
