import React from 'react';
import { Mic, MicOff, Volume2, HelpCircle } from 'lucide-react';
import { useVoice } from '../../hooks/useVoice';
import { useAccessibility } from '../../hooks/useAccessibility';
import { cn } from '../../lib/utils';

export const VoiceControl = () => {
  const { voiceState, lastTranscript, startListening, stopListening, isSupported } = useVoice();
  const { profile } = useAccessibility();

  if (!profile.voiceEnabled) return null;

  const isListening = voiceState === 'LISTENING';
  const isProcessing = voiceState === 'PROCESSING';

  return (
    <div
      role="region"
      aria-label="Voice control assistant"
      className="flex items-center space-x-3 px-4 py-2 bg-darkCard/90 border border-slate-700/80 rounded-2xl shadow-lg backdrop-blur"
    >
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
        className={cn(
          'relative p-2.5 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center',
          isListening && 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/30',
          isProcessing && 'bg-amber-600 text-white animate-spin',
          !isListening && !isProcessing && 'bg-brand-600/20 text-brand-400 hover:bg-brand-600 hover:text-white border border-brand-500/30'
        )}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <div className="text-left text-xs font-medium space-y-0.5">
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              isListening && 'bg-red-500 animate-ping',
              isProcessing && 'bg-amber-400',
              voiceState === 'READY' && 'bg-emerald-400',
              voiceState === 'NOT_SUPPORTED' && 'bg-slate-500'
            )}
          />
          <span className="font-bold tracking-wide uppercase text-slate-200 text-[10px]">
            {voiceState}
          </span>
        </div>
        <p className="text-slate-400 truncate max-w-[140px] md:max-w-[220px]">
          {lastTranscript ? `"${lastTranscript}"` : 'Say "Find Java jobs"...'}
        </p>
      </div>
    </div>
  );
};
