import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = 'primary', // primary | secondary | outline | danger | ghost
      size = 'md', // sm | md | lg
      isLoading = false,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-150 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px] px-5 py-2.5 text-sm cursor-pointer';

    const variants = {
      primary:
        'bg-[#111114] text-white hover:bg-slate-800 active:bg-black border border-transparent shadow-sm',
      secondary:
        'bg-white text-[#111114] border border-[#111114] hover:bg-slate-100 active:bg-slate-200 shadow-sm',
      outline:
        'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-[#111114] hover:border-slate-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
      ghost: 'text-slate-600 hover:text-[#111114] hover:bg-slate-100',
    };

    const sizes = {
      sm: 'text-xs min-h-[38px] px-4 py-1.5',
      md: 'text-sm min-h-[44px] px-5 py-2.5',
      lg: 'text-base min-h-[50px] px-7 py-3 font-bold',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
