import React, { useId } from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      id: customId,
      className,
      type = 'text',
      required = false,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const inputId = customId || defaultId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-[#6B7280]"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full px-4 py-2.5 bg-white border border-[#ECECF0] rounded-full text-xs text-[#111114] placeholder-[#6B7280] transition-colors focus:border-[#4FA8F5] focus:outline-none min-h-[44px]',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
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

Input.displayName = 'Input';
