import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { aiService } from '../../services/aiService';

export const ApplicationField = ({
  field,
  value = '',
  onChange,
  error,
  accessibilityMode = 'standard',
}) => {
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (translation) return;
    setTranslating(true);
    try {
      const res = await aiService.translateQuestion(field.label, field.explanation || '');
      setTranslation(res);
    } catch (_) {
      setTranslation({
        plainLanguageExplanation: field.explanation || field.label,
        whatToProvide: 'Provide clear, factual information.',
      });
    } finally {
      setTranslating(false);
    }
  };

  const isSimplified = accessibilityMode === 'simplified';
  const isVoice = accessibilityMode === 'voice';
  const isKeyboard = accessibilityMode === 'keyboard';

  const speakField = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${field.label}. ${field.explanation || ''}`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`p-5 bg-white border rounded-2xl space-y-3 text-left shadow-sm transition-all ${
      isKeyboard ? 'border-slate-900 shadow-md ring-1 ring-slate-900' : 'border-[#ECECF0]'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <label className="text-sm font-bold text-[#111114] block">
            {field.label}
            {field.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>

          {isSimplified && (
            <p className="text-xs text-sky-700 font-semibold mt-1">
              💡 {field.explanation || 'Fill out this field to complete your application.'}
            </p>
          )}

          {isVoice && (
            <button
              type="button"
              onClick={speakField}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mt-1.5 inline-flex items-center gap-1 cursor-pointer"
            >
              🔊 Read Question Aloud
            </button>
          )}

          {field.potentialBarrier && (
            <span className="inline-flex items-center text-xs font-semibold text-[#B7791F] bg-[#FCEFD6] border border-[#B7791F]/20 px-2.5 py-0.5 rounded-full mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 mr-1" /> {field.potentialBarrier}
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleTranslate}
          isLoading={translating}
          className="text-xs text-indigo-600 hover:text-indigo-800"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Explain
        </Button>
      </div>

      {translation && (
        <div className="p-4 bg-[#E3DDFB] text-[#111114] rounded-xl space-y-2 text-xs">
          <p className="font-bold">
            🔍 Plain Language Explanation: {translation.plainLanguageExplanation}
          </p>
          <p className="text-[#6B7280]">
            <strong>What to enter:</strong> {translation.whatToProvide}
          </p>
          {translation.legalNote && (
            <p className="text-[10px] text-[#6B7280] italic">
              ⚖️ {translation.legalNote}
            </p>
          )}
        </div>
      )}

      {field.type === 'select' ? (
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          options={[
            { value: '', label: '-- Select Answer --' },
            { value: 'Yes', label: 'Yes — Authorized / Eligible' },
            { value: 'No', label: 'No — Require Visa / Sponsorship' },
          ]}
          error={error}
          className={isKeyboard ? 'focus:ring-4 focus:ring-slate-900 border-slate-900' : ''}
        />
      ) : field.type === 'file' ? (
        <div className="p-4 bg-[#F1F1F4] border border-[#ECECF0] rounded-2xl space-y-2 text-center">
          <p className="text-xs text-[#6B7280]">
            Verified Resume Attached: <strong className="text-[#111114]">Demo_Candidate_Resume.pdf</strong>
          </p>
          <input
            type="file"
            onChange={(e) => onChange(e.target.files[0]?.name || 'Demo_Resume.pdf')}
            className="text-xs text-[#6B7280] file:mr-4 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:bg-[#111114] file:text-white cursor-pointer"
          />
        </div>
      ) : (
        <Input
          type={field.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          error={error}
          className={isKeyboard ? 'focus:ring-4 focus:ring-slate-900 border-slate-900' : ''}
        />
      )}
    </div>
  );
};
