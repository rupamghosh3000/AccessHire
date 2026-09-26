import React, { useId } from 'react';
import { cn } from '../../lib/utils';

export const Checkbox = React.forwardRef(
  ({ label, id: customId, className, checked, onChange, ...props }, ref) => {
    const defaultId = useId();
    const checkboxId = customId || defaultId;

    return (
      <div className="flex items-center space-x-3 cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={onChange}
          className={cn(
            'w-5 h-5 rounded border-slate-700 bg-darkCard text-brand-600 focus:ring-brand-500 focus:ring-offset-darkBg cursor-pointer',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium text-slate-200 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
