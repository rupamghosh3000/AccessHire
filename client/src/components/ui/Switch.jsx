import React, { useId } from 'react';
import { cn } from '../../lib/utils';

export const Switch = ({ label, description, checked, onChange, id: customId, className }) => {
  const defaultId = useId();
  const switchId = customId || defaultId;

  return (
    <div className={cn('flex items-center justify-between p-4 bg-[#F1F1F4] border border-[#ECECF0] rounded-2xl transition-colors hover:border-slate-300', className)}>
      <div className="space-y-0.5 pr-4 text-left">
        <label htmlFor={switchId} className="text-sm font-bold text-[#111114] cursor-pointer block">
          {label}
        </label>
        {description && <p className="text-xs text-[#6B7280]">{description}</p>}
      </div>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none min-h-[28px]',
          checked ? 'bg-[#111114]' : 'bg-slate-300'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};
