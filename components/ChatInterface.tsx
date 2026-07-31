'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  modelInfo?: {
    model: string;
    provider: string;
    reason: string;
  };
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('auto');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: data.content,
        modelInfo: {
          model: data.model,
          provider: data.provider,
          reason: data.reason,
        },
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'عذراً، حدث خطأ في الاتصال. تأكد من إعدادات API Keys أو حاول مرة أخرى.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden relative" dir="rtl">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <ChatHeader onClear={handleClear} activeModel={activeModel} />

      <main className="flex-1 overflow-y-auto relative z-10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-8">
            <WelcomeScreen onSuggestionClick={handleSend} />
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                role={msg.role}
                content={msg.content}
                modelInfo={msg.modelInfo}
              />
            ))}

            {isLoading && (
              <div className="flex justify-end items-end gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
                <div className="bg-[#151722] border border-white/5 text-slate-400 px-5 py-3.5 rounded-2xl rounded-tl-sm text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce-dot" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce-dot animate-delay-100" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce-dot animate-delay-200" />
                    <span className="mr-1">جاري التوجيه والرد...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </main>

      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSend}
        isLoading={isLoading}
        textareaRef={textareaRef}
      />
    </div>
  );
};
