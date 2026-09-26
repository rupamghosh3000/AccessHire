import React, { useId } from 'react';
import { cn } from '../../lib/utils';

export const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      error,
      helperText,
      id: customId,
      className,
      required = false,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const selectId = customId || defaultId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold uppercase tracking-wider text-[#6B7280]"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full px-4 py-2.5 bg-white border border-[#ECECF0] rounded-full text-xs text-[#111114] transition-colors focus:border-[#4FA8F5] focus:outline-none min-h-[44px]',
            error && 'border-red-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={typeof opt === 'string' ? opt : opt.value}
              value={typeof opt === 'string' ? opt : opt.value}
              className="bg-white text-[#111114]"
            >
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
        {helperText && !error && (
          <p id={helperId} className="text-xs text-[#6B7280]">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-red-600 font-semibold">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
