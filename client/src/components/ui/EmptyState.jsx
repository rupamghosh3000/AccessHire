import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search query or accessibility filters.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-darkCard/40 border border-slate-800 rounded-3xl text-center space-y-4 my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
        <Search className="w-7 h-7" />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
