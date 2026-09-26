import React, { createContext, useState, useEffect, useContext } from 'react';
import { accessibilityService } from '../services/accessibilityService';

export const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    voiceEnabled: true,
    keyboardFirst: true,
    screenReaderOptimized: false,
    highContrast: false,
    reducedMotion: false,
    fontScale: 1.0,
    voiceSpeed: 1.0,
    preferredLanguage: 'en',
  });
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Synchronize CSS variables and root classes with active profile
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', profile.fontScale.toString());

    if (profile.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [profile.fontScale, profile.highContrast]);

  const updateAccessibility = async (updates) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);

    // Announce preference changes for screen readers
    const keysChanged = Object.keys(updates).join(', ');
    announceStatus(`Accessibility settings updated: ${keysChanged}`);

    try {
      await accessibilityService.updateProfile(updates);
    } catch (_) {
      // Local preference state maintained even if backend is offline
    }
  };

  const announceStatus = (message) => {
    setAnnouncement(message);
    setTimeout(() => {
      setAnnouncement('');
    }, 4000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        profile,
        updateAccessibility,
        loading,
        setProfile,
        announcement,
        announceStatus,
      }}
    >
      {children}
      {/* Live region screen reader announcer */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="a11y-live-announcer"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
};
