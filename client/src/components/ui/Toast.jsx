import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Toast = ({ message, type = 'info', onClose }) => {
  const icons = {
    info: <Info className="w-5 h-5 text-brand-400 flex-shrink-0" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
  };

  const borderColors = {
    info: 'border-brand-500/50 bg-slate-900',
    success: 'border-emerald-500/50 bg-slate-900',
    error: 'border-red-500/50 bg-slate-900',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-xl text-slate-100 min-w-[300px]',
        borderColors[type]
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium flex-1 text-left">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
