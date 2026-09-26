import React from 'react';
import { Modal } from '../ui/Modal';
import { Switch } from '../ui/Switch';
import { useAccessibility } from '../../hooks/useAccessibility';
import { Sliders, Volume2, Eye, Keyboard, Type, Zap } from 'lucide-react';

export const AccessibilityPassportModal = ({ isOpen, onClose }) => {
  const { profile, updateAccessibility } = useAccessibility();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Accessibility Passport Preferences"
    >
      <div className="space-y-4 text-left">
        <p className="text-sm text-slate-300">
          Configure how AccessHire AI adapts its interface to your preferred interaction style. These preferences persist across all screens and sessions.
        </p>

        <div className="grid grid-cols-1 gap-3 pt-2">
          <Switch
            label="Voice-First Navigation"
            description="Enable Web Speech voice commands to search, explain jobs, and navigate screens."
            checked={profile.voiceEnabled}
            onChange={(val) => updateAccessibility({ voiceEnabled: val })}
          />

          <Switch
            label="Keyboard-First Mode"
            description="Optimize focus ordering and enable quick keyboard shortcuts across all workflows."
            checked={profile.keyboardFirst}
            onChange={(val) => updateAccessibility({ keyboardFirst: val })}
          />

          <Switch
            label="High Contrast Display"
            description="Maximize text contrast with black & white styling and visible borders."
            checked={profile.highContrast}
            onChange={(val) => updateAccessibility({ highContrast: val })}
          />

          <Switch
            label="Reduced Motion"
            description="Pause 3D scene animations, ambient effects, and spatial movement."
            checked={profile.reducedMotion}
            onChange={(val) => updateAccessibility({ reducedMotion: val })}
          />

          <Switch
            label="Screen Reader Optimized"
            description="Enhance live ARIA announcements and simplified step descriptions."
            checked={profile.screenReaderOptimized}
            onChange={(val) => updateAccessibility({ screenReaderOptimized: val })}
          />
        </div>

        {/* Sliders for Font Scale & Voice Speed */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-200">
              <span className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-brand-400" />
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
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              aria-label="Adjust text scaling"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-200">
              <span className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Speech Speed ({profile.voiceSpeed}x)</span>
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.6"
              step="0.1"
              value={profile.voiceSpeed}
              onChange={(e) => updateAccessibility({ voiceSpeed: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              aria-label="Adjust speech speed"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
