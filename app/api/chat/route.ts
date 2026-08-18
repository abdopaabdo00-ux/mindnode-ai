import { NextRequest, NextResponse } from 'next/server';

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

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { content: 'مفتاح GROQ_API_KEY غير موجود في إعدادات المنصة (Render).', model: 'error', provider: 'none' },
        { status: 200 }
      );
    }

    // الاتصال المباشر والمضمون بنموذج Groq السريع
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error Details:', errorData);
      return NextResponse.json(
        {
          content: `عذراً، حدث خطأ من مزود الخدمة (Groq): ${response.status}`,
          model: 'error',
          provider: 'groq',
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || 'لا يوجد رد';

    return NextResponse.json({
      content: aiContent,
      model: 'llama-3.1-8b-instant',
      provider: 'groq',
      reason: 'الاستجابة المباشرة عبر نموذج Groq السريع',
    });

  } catch (error) {
    console.error('API Server Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم الداخلي' },
      { status: 500 }
    );
  }
}
