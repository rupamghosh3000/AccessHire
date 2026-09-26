import { useState, useEffect } from 'react';
import { useAccessibility } from './useAccessibility';

export const use3DSupport = () => {
  const { profile } = useAccessibility();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (_) {
      setHasWebGL(false);
    }
  }, []);

  const is3DSupported = hasWebGL && !profile.reducedMotion;

  return {
    is3DSupported,
    hasWebGL,
    isReducedMotion: profile.reducedMotion,
  };
};
