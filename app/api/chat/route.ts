import { NextRequest, NextResponse } from 'next/server';
import { routeQuestion, getFallbackModel } from '@/lib/ai-router';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'الرسالة فارغة أو غير صالحة' },
        { status: 400 }
      );
    }

    const route = routeQuestion(message);
    let response: Response | null = null;
    let usedRoute = route;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        if (usedRoute.provider === 'groq') {
          response = await fetchGroq(message, history, usedRoute.model);
        } else if (usedRoute.provider === 'gemini') {
          response = await fetchGemini(message, history, usedRoute.model);
        } else if (usedRoute.provider === 'openrouter') {
          response = await fetchOpenRouter(message, history, usedRoute.model);
        }

        if (response && response.ok) {
          break;
        }

        throw new Error('Failed to get valid response');
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          break;
        }
        usedRoute = getFallbackModel(usedRoute.provider);
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        {
          content: 'عذراً، جميع النماذج مشغولة حالياً. حاول مرة أخرى بعد لحظات.',
          model: 'error',
          provider: 'none',
        },
        { status: 200 }
      );
    }

    let aiContent = '';
    
    if (usedRoute.provider === 'groq') {
      const data = await response.json();
      aiContent = data.choices?.[0]?.message?.content || 'لا يوجد رد';
    } else if (usedRoute.provider === 'gemini') {
      const data = await response.json();
      aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لا يوجد رد';
    } else if (usedRoute.provider === 'openrouter') {
      const data = await response.json();
      aiContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || 'لا يوجد رد';
    }

    return NextResponse.json({
      content: aiContent,
      model: usedRoute.model,
      provider: usedRoute.provider,
      reason: usedRoute.reason,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

async function fetchGroq(message: string, history: any[], model: string) {
  const apiKey = process.env.GROQ_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY missing');
  }

  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'أنت MindNodeAI، مساعد ذكاء اصطناعي متعدد القدرات. اجب بالعربية دائماً ما لم يطلب المستخدم غير ذلك. كن مفيداً ودقيقاً.',
        },
        ...history,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });
}

async function fetchGemini(message: string, history: any[], model: string) {
  const apiKey = process.env.GEMINI_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY missing');
  }

  const formattedHistory = history.map((h: any) => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }],
  }));

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          ...formattedHistory,
          {
            role: 'user',
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    }
  );
}

async function fetchOpenRouter(message: string, history: any[], model: string) {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY missing');
  }

  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://mindnode-ai.vercel.app',
      'X-Title': 'MindNodeAI',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'أنت MindNodeAI، مساعد ذكاء اصطناعي. اجب بالعربية دائماً ما لم يطلب المستخدم غير ذلك.',
        },
        ...history,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });
}
