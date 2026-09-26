import React from 'react';

export const LoadingState = ({ message = 'Loading content...' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-12 space-y-4 my-8"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-brand-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-300">{message}</p>
    </div>
  );
};
