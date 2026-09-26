import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error loading this section.',
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 bg-red-950/20 border border-red-900/40 rounded-3xl text-center space-y-4 my-6"
    >
      <div className="w-12 h-12 rounded-2xl bg-red-900/30 flex items-center justify-center text-red-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-red-200">{title}</h3>
        <p className="text-sm text-red-300/80">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="border-red-800 text-red-200 hover:bg-red-900/40">
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      )}
    </div>
  );
};
