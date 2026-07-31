export interface AIModel {
  id: string;
  name: string;
  provider: 'openrouter' | 'groq' | 'gemini';
  modelId: string;
  category: string[];
  description: string;
  icon: string;
  free: boolean;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'llama-3-1-8b',
    name: 'Llama 3.1 8B',
    provider: 'groq',
    modelId: 'llama-3.1-8b-instant',
    category: ['عام', 'برمجة', 'سرعة'],
    description: 'أفضل نموذج للسرعة الفائقة والردود الفورية',
    icon: '⚡',
    free: true,
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    provider: 'groq',
    modelId: 'mixtral-8x7b-32768',
    category: ['عام', 'تحليل', 'رياضيات'],
    description: 'نموذج قوي للمهام المعقدة والتحليل العميق',
    icon: '🧠',
    free: true,
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'gemini',
    modelId: 'gemini-1.5-flash',
    category: ['عام', 'صور', 'ترجمة', 'تلخيص'],
    description: 'سريع ومجاني من Google للمهام المتنوعة',
    icon: '🔥',
    free: true,
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'gemini',
    modelId: 'gemini-1.5-pro',
    category: ['عام', 'برمجة', 'تفكير', 'تحليل'],
    description: 'الأقوى من Google للبرمجة والتفكير المعقد',
    icon: '🌟',
    free: true,
  },
  {
    id: 'mistral-nemo',
    name: 'Mistral Nemo',
    provider: 'openrouter',
    modelId: 'mistralai/mistral-nemo',
    category: ['عام', 'برمجة', 'محادثة'],
    description: 'نموذج مجاني قوي من Mistral عبر OpenRouter',
    icon: '🌊',
    free: true,
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    provider: 'openrouter',
    modelId: 'meta-llama/llama-3-70b-instruct',
    category: ['عام', 'برمجة', 'كتابة', 'تحليل'],
    description: 'أقوى نموذج مجاني متاح للجميع',
    icon: '🦙',
    free: true,
  },
];

export const CATEGORY_MAP: Record<string, string[]> = {
  'صور': ['gemini-flash', 'gemini-pro'],
  'برمجة': ['gemini-pro', 'llama-3-70b', 'llama-3-1-8b', 'mixtral-8x7b'],
  'ترجمة': ['gemini-flash', 'mistral-nemo'],
  'تلخيص': ['gemini-flash', 'mixtral-8x7b'],
  'رياضيات': ['mixtral-8x7b', 'gemini-pro'],
  'كتابة': ['llama-3-70b', 'gemini-pro'],
  'تحليل': ['mixtral-8x7b', 'gemini-pro'],
  'عام': ['llama-3-1-8b', 'gemini-flash', 'mistral-nemo'],
};

export function detectCategory(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('صور') || q.includes('صورة') || q.includes('رسم') || q.includes('generate image') || q.includes('draw')) {
    return 'صور';
  }
  if (q.includes('كود') || q.includes('برمج') || q.includes('python') || q.includes('javascript') || q.includes('code') || q.includes('طور') || q.includes('bug')) {
    return 'برمجة';
  }
  if (q.includes('ترجم') || q.includes('translate') || q.includes('من انجليزي') || q.includes('من عربي')) {
    return 'ترجمة';
  }
  if (q.includes('لخص') || q.includes('ملخص') || q.includes('summarize')) {
    return 'تلخيص';
  }
  if (q.includes('رياضيات') || q.includes('حساب') || q.includes('معادلة') || q.includes('math') || q.includes('احسب') || q.includes('يساوي')) {
    return 'رياضيات';
  }
  if (q.includes('اكتب') || q.includes('مقال') || q.includes('قصة') || q.includes('نص') || q.includes('write')) {
    return 'كتابة';
  }
  if (q.includes('حلل') || q.includes('لماذا') || q.includes('اشرح') || q.includes('فسر') || q.includes('تحليل')) {
    return 'تحليل';
  }
  
  return 'عام';
}
