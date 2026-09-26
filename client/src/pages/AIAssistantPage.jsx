import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../services/aiService';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, Send, Bot, User, ArrowRight, Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

export const AIAssistantPage = () => {
  const navigate = useNavigate();
  const { voiceState, startListening, stopListening, lastTranscript, speak } = useVoice();

  const isListening = voiceState === 'LISTENING';

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AccessHire AI Assistant. I can help you search for software engineering positions, explain complex application questions, evaluate barrier reports, or summarize your resume alignment.",
      actions: [
        { label: 'Find Java Jobs', target: '/jobs?q=Java' },
        { label: 'Open BarrierLens', target: '/barrier-lens' },
        { label: 'Configure Passport', target: '/accessibility-passport' },
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync spoken transcript to input field
  useEffect(() => {
    if (lastTranscript) {
      setInputQuery(lastTranscript);
    }
  }, [lastTranscript]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery;
    setInputQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await aiService.askAssistant(userMsg, { currentPage: 'AI Assistant Page' });
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          actions: res.suggestedActions || [],
        },
      ]);
      // Speak assistant reply out loud
      speak(res.reply);
    } catch (_) {
      const fallbackText = "I'm available to help you navigate AccessHire AI! Try exploring our job discovery listings or BarrierLens breakdown.";
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackText,
          actions: [{ label: 'Explore Jobs', target: '/jobs' }],
        },
      ]);
      speak(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left pb-16 max-w-4xl mx-auto pt-4">
      <div className="p-7 bg-[#E3DDFB] rounded-3xl space-y-2 text-[#111114]">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-full shadow-sm">
            AI Candidate Assistant
          </span>
          <span className="text-xs font-medium text-indigo-900 bg-white/60 px-3 py-1 rounded-full flex items-center gap-1.5">
            🎙️ Voice Assistant Enabled
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111114]">AccessHire AI Assistant</h1>
        <p className="text-sm text-[#6B7280]">
          Ask questions about job listings, application phrasing, resume alignment, or navigation. Speak or type your query below!
        </p>
      </div>

      <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-4 min-h-[420px] flex flex-col justify-between shadow-sm">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`p-2 rounded-full flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#111114] text-white'
                    : 'bg-[#E3DDFB] text-[#111114]'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#111114] text-white'
                    : 'bg-[#F1F1F4] text-[#111114]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                    {msg.role === 'user' ? 'Candidate' : 'AI Assistant'}
                  </span>
                  {msg.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => speak(msg.content)}
                      className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1 p-1 rounded hover:bg-black/5 cursor-pointer"
                      title="Read message out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p>{msg.content}</p>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3">
                    {msg.actions.map((act, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={msg.role === 'user' ? 'secondary' : 'primary'}
                        onClick={() => navigate(act.target || act.action)}
                        className="text-xs py-1 px-3"
                      >
                        {act.label} <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-600 font-semibold animate-pulse p-2">
              <Sparkles className="w-4 h-4" />
              <span>Analyzing query...</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center space-x-2 pt-4 border-t border-[#ECECF0]">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-2xl border transition flex items-center justify-center cursor-pointer min-w-[44px] ${
              isListening
                ? 'bg-rose-600 text-white border-rose-600 animate-pulse ring-4 ring-rose-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={isListening ? 'Listening... Click to stop mic' : 'Click mic to speak your prompt'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <Input
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={isListening ? 'Listening to your voice...' : 'Ask a question or speak your query...'}
            className={isListening ? 'border-rose-400 bg-rose-50/50 font-medium' : ''}
          />

          <Button type="submit" variant="primary" isLoading={loading} className="min-w-[48px] px-4 bg-[#111114] hover:bg-slate-800">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
