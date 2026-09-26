import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-darkCard border-l border-slate-800 shadow-2xl flex flex-col">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 id="drawer-title" className="text-lg font-bold text-slate-100">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 text-slate-400 hover:text-white rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
