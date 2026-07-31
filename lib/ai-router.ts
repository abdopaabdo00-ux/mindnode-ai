import { AVAILABLE_MODELS, CATEGORY_MAP, detectCategory } from './models';

export interface RouterResult {
  model: string;
  provider: string;
  reason: string;
}

export function routeQuestion(question: string): RouterResult {
  const category = detectCategory(question);
  const modelIds = CATEGORY_MAP[category] || CATEGORY_MAP['عام'];
  
  const selectedModelId = modelIds[0];
  const model = AVAILABLE_MODELS.find(m => m.id === selectedModelId);
  
  if (!model) {
    return {
      model: 'llama-3-1-8b',
      provider: 'groq',
      reason: 'النموذج الافتراضي للسرعة',
    };
  }
  
  return {
    model: model.modelId,
    provider: model.provider,
    reason: `تم اختيار ${model.name} لأن سؤالك يندرج تحت فئة: ${category}`,
  };
}

export function getFallbackModel(currentProvider: string): RouterResult {
  if (currentProvider === 'groq') {
    return {
      model: 'gemini-1.5-flash',
      provider: 'gemini',
      reason: 'الانتقال إلى البديل في Gemini',
    };
  }
  
  if (currentProvider === 'gemini') {
    return {
      model: 'mistralai/mistral-nemo',
      provider: 'openrouter',
      reason: 'الانتقال إلى البديل في OpenRouter',
    };
  }
  
  return {
    model: 'llama-3.1-8b-instant',
    provider: 'groq',
    reason: 'العودة إلى النموذج الافتراضي',
  };
}
