import { AVAILABLE_MODELS, CATEGORY_MAP, detectCategory } from './models';

export interface RouterResult {
  model: string;
  provider: string;
  reason: string;
}

export function routeQuestion(question: string): RouterResult {
  try {
    const category = detectCategory(question);
    const modelIds = CATEGORY_MAP[category] || CATEGORY_MAP['عام'];
    const selectedModelId = modelIds[0];
    const model = AVAILABLE_MODELS.find(m => m.id === selectedModelId);
    
    if (!model) {
      return {
        model: 'llama-3.1-8b-instant',
        provider: 'groq',
        reason: 'النموذج الافتراضي للسرعة',
      };
    }
    
    return {
      model: model.modelId,
      provider: model.provider,
      reason: `تم اختيار ${model.name} لأن سؤالك يندرج تحت فئة: ${category}`,
    };
  } catch (error) {
    return {
      model: 'llama-3.1-8b-instant',
      provider: 'groq',
      reason: 'العودة للنموذج الاحتياطي الآمن',
    };
  }
}

export function getFallbackModel(currentProvider: string): RouterResult {
  // اجعل الاعتماد الأساسي على Groq لسرعته وضمان عمله بالمفتاح المجاني
  return {
    model: 'llama-3.1-8b-instant',
    provider: 'groq',
    reason: 'العودة إلى نموذج Groq السريع',
  };
}
