# MindNode AI - مجمع ذكاء اصطناعي مجاني

> ⚡ لا حدود. لا مفاتيح تدور. لا رفض. فقط حرية.

---

## 🚨 مهم جداً - اقرأ هذا

**جهازك ضعيف (3 أنوية) لا تشغل المشروع عليه!**  
Next.js Dev Server يستهلك CPU عالي جداً وهذا طبيعي.

**الحل الوحيد: انشر المشروع على سحابة مجانية**

---

## 🚀 الطريقة الأسهل: النشر على Vercel (مجاني)

### الخطوة 1: احفظ المشروع على GitHub
1. افتح [github.com](https://github.com) وسو حساب
2. اعمل New Repository (اسمها `mindnode-ai`)
3. ارفع الملفات:

```bash
cd mindnode-ai
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mindnode-ai.git
git push -u origin main
```

### الخطوة 2: انشر على Vercel
1. ادخل [vercel.com](https://vercel.com) وسو حساب بـ GitHub
2. اضغط **Add New Project**
3. اختار `mindnode-ai` repo
4. اضغط **Deploy**

### الخطوة 3: أضف مفاتيح API
1. في Vercel → اذهب لـ **Settings → Environment Variables**
2. أضف المفاتيح التالية:

| Variable | القيمة |
|----------|--------|
| `GROQ_API_KEY` | مفتاح Groq |
| `GEMINI_API_KEY` | مفتاح Gemini |
| `OPENROUTER_API_KEY` | مفتاح OpenRouter |

3. اضغط **Redeploy**

---

## 🔑 كيف تحصل المفاتيح المجانية

### 1️⃣ Groq (أسرع للمحادثات)
- رابط: [console.groq.com/keys](https://console.groq.com/keys)
- مجاني: 30 طلب/دقيقة

### 2️⃣ Gemini (الأفضل للكتابة الإبداعية)
- رابط: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- مجاني: 1500 طلب/يوم

### 3️⃣ OpenRouter (وصول لـ 100+ نموذج)
- رابط: [openrouter.ai/keys](https://openrouter.ai/keys)
- مجاني: نماذج كثيرة بدون حدود

> **هذه مفاتيح رسمية ثابتة** - تحصلها مرة واحدة وما تتغير!

---

## 🏠 إذا أردت تجربة محلية (على جهاز قوي فقط)

```bash
npm install
npm run build
npx serve dist
```

⚠️ **لا تشغل `npm run dev` على جهازك الضعيف!**

---

## 🧠 النماذج المتاحة

| النموذج | الاستخدام | Provider |
|---------|-----------|----------|
| Llama 3 70B | محادثات عامة | Groq |
| Mixtral 8x7B | برمجة وتحليل | Groq |
| Gemma 2 9B | سريع للمهام البسيطة | Groq |
| Gemini 1.5 Flash | كتابة إبداعية | Google |
| Gemini 1.5 Pro | تحليل معقد | Google |
| Qwen 2.5 72B | برمجة (البديل) | OpenRouter |
| Mistral Nemo | متعدد اللغات | OpenRouter |

---

## 📁 هيكل المشروع

```
mindnode-ai/
├── app/
│   ├── page.tsx           ← الصفحة الرئيسية
│   ├── layout.tsx         ← التخطيط العام
│   ├── globals.css        ← التنسيقات
│   └── api/chat/
│       └── route.ts       ← API للمحادثة
├── components/
│   ├── ChatInterface.tsx  ← واجهة المحادثة
│   ├── ChatInput.tsx      ← حقل الإدخال
│   ├── MessageBubble.tsx  ← فقاعة الرسالة
│   ├── ChatHeader.tsx     ← رأس الصفحة
│   ├── ModelSelector.tsx  ← اختيار النموذج
│   └── WelcomeScreen.tsx  ← شاشة الترحيب
├── lib/
│   ├── ai-router.ts       ← الموجه الذكي
│   └── models.ts          ← تعريف النماذج
├── next.config.mjs        ← إعداد Next.js
├── tailwind.config.ts     ← إعداد Tailwind
└── .env.example           ← قالب المفاتيح
```

---

## ❓ لماذا يختار الموجه الذكي نموذج مختلف؟

هذا **عمداً**! التطبيق يحلل سؤالك ويختار أفضل نموذج مجاني:

- 🧮 **برمجة** → Groq (Llama 3 70B) - أسرع
- ✍️ **كتابة** → Gemini Flash - أجود
- 🧠 **علمي/تحليلي** → OpenRouter (Qwen) - أدق
- ⚡ **سريع** → Gemma 2 9B - أخف

---

## 💡 نصائح مهمة

1. **لا تشغل على جهازك الضعيف** - استخدم Vercel
2. **جمع 3 مفاتيح** - يعطيك fallback إذا وصلت لحد
3. **المفتاح يبقى ثابت** - ما يحتاج تغيير كل يوم
4. **الـ API route** يشتغل server-side على Vercel - ما يحمل جهازك

---

صنع بحب ❤️ للحرية.
