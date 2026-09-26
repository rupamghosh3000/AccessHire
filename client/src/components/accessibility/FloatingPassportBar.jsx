import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessibilityPassportModal } from './AccessibilityPassportModal';
import { useVoice } from '../../hooks/useVoice';

export const FloatingPassportBar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { voiceState, startListening, stopListening, lastTranscript } = useVoice();

  const isListening = voiceState === 'LISTENING';

  return (
    <>
      <aside
        aria-label="Floating Accessibility Passport Quick Actions"
        className="fixed bottom-6 right-6 z-40 bg-[#18191D]/95 backdrop-blur-md text-white px-5 py-3.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-4 transition hover:scale-[1.02]"
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2.5 cursor-pointer"
          title="Open Accessibility Passport Settings"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide">Passport: Active</span>
        </div>

        <div className="h-4 w-px bg-white/20"></div>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <button
            type="button"
            onClick={() => navigate('/barrier-lens')}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition cursor-pointer"
            title="Audit this page with BarrierLens"
          >
            Scan Friction (0)
          </button>
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs cursor-pointer transition ${
              isListening
                ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 animate-pulse'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            title={isListening ? 'Listening... Click to stop' : 'Click to activate voice commands'}
          >
            🎙️
          </button>
        </div>

        {isListening && (
          <span className="text-[10px] text-emerald-400 font-mono animate-pulse">
            Listening...
          </span>
        )}
      </aside>

      <AccessibilityPassportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
