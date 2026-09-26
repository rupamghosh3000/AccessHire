import React from 'react';
import { Sliders, Mic, Keyboard, Layers, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export const InteractionModeSwitcher = ({ activeMode = 'standard', onModeChange }) => {
  const modes = [
    { id: 'standard', label: 'Standard', icon: <Layers className="w-4 h-4" />, desc: 'Standard interactive presentation' },
    { id: 'simplified', label: 'Simplified', icon: <Sparkles className="w-4 h-4" />, desc: 'Plain-language prompts & step guidance' },
    { id: 'voice', label: 'Voice-First', icon: <Mic className="w-4 h-4" />, desc: 'Hands-free voice recognition step flow' },
    { id: 'keyboard', label: 'Keyboard-First', icon: <Keyboard className="w-4 h-4" />, desc: 'Full focus traps & key shortcuts' },
  ];

  return (
    <div
      role="region"
      aria-label="Interaction mode selector"
      className="p-4 bg-[#F1F1F4] border border-[#ECECF0] rounded-2xl space-y-3 text-left"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center">
          <Sliders className="w-4 h-4 mr-1.5 text-[#111114]" /> Adaptive Interaction Mode
        </h3>
        <span className="text-xs font-bold text-[#111114] uppercase">Active: {activeMode}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {modes.map((m) => {
          const isActive = activeMode === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              aria-pressed={isActive}
              className={cn(
                'p-3 rounded-full border text-left transition-all space-y-0.5 min-h-[44px] flex items-center justify-center space-x-2 px-4 cursor-pointer',
                isActive
                  ? 'bg-[#111114] text-white border-[#111114] shadow-sm'
                  : 'bg-white text-[#111114] border-[#ECECF0] hover:bg-slate-100'
              )}
            >
              {m.icon}
              <span className="font-bold text-xs">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
