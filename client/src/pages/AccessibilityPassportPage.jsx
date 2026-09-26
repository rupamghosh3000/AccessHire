import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { Switch } from '../components/ui/Switch';
import { Sliders, Volume2, Type } from 'lucide-react';

export const AccessibilityPassportPage = () => {
  const { profile, updateAccessibility } = useAccessibility();

  return (
    <div className="space-y-8 text-left pb-16 max-w-4xl mx-auto pt-4">
      <div className="p-7 bg-[#E3DDFB] rounded-3xl space-y-3 text-[#111114]">
        <span className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-full shadow-sm">
          Interface Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111114]">Accessibility Passport</h1>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Your Accessibility Passport stores interface interaction preferences in your profile.
          We do NOT classify you by disability or medical label. These settings adjust how AccessHire AI presents information and handles inputs.
        </p>
      </div>

      <div className="p-8 bg-white border border-[#ECECF0] rounded-3xl space-y-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#111114] flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-indigo-600" /> Interaction Preferences
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <Switch
            label="Voice-First Navigation & Recognition"
            description="Enable Web Speech voice commands to search, explain questions, and navigate step-by-step."
            checked={profile.voiceEnabled}
            onChange={(val) => updateAccessibility({ voiceEnabled: val })}
          />

          <Switch
            label="Keyboard-First Focus System"
            description="Enforce focus traps, visible focus rings, and tab key order across all workflows."
            checked={profile.keyboardFirst}
            onChange={(val) => updateAccessibility({ keyboardFirst: val })}
          />

          <Switch
            label="High Contrast Theme"
            description="Transform application UI to high contrast black & white styling with distinct borders."
            checked={profile.highContrast}
            onChange={(val) => updateAccessibility({ highContrast: val })}
          />

          <Switch
            label="Reduced Motion Mode"
            description="Disable 3D spatial rotation, ambient particle movements, and page transition animations."
            checked={profile.reducedMotion}
            onChange={(val) => updateAccessibility({ reducedMotion: val })}
          />

          <Switch
            label="Screen Reader Optimized Live Regions"
            description="Enhance ARIA live announcements and screen reader friendly step descriptions."
            checked={profile.screenReaderOptimized}
            onChange={(val) => updateAccessibility({ screenReaderOptimized: val })}
          />
        </div>

        <div className="pt-6 border-t border-[#ECECF0] space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[#111114]">
              <span className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-indigo-600" />
                <span>Text Scaling ({Math.round(profile.fontScale * 100)}%)</span>
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.6"
              step="0.1"
              value={profile.fontScale}
              onChange={(e) => updateAccessibility({ fontScale: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-[#F1F1F4] rounded-lg appearance-none cursor-pointer accent-[#111114]"
              aria-label="Adjust font scale"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[#111114]">
              <span className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Speech Synthesis Speed ({profile.voiceSpeed}x)</span>
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.6"
              step="0.1"
              value={profile.voiceSpeed}
              onChange={(e) => updateAccessibility({ voiceSpeed: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-[#F1F1F4] rounded-lg appearance-none cursor-pointer accent-[#111114]"
              aria-label="Adjust speech synthesis speed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
