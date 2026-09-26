import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProgressStepper = ({ steps = [], currentStep = 1, onStepClick }) => {
  return (
    <nav aria-label="Application progress" className="w-full py-4">
      <ol className="flex items-center justify-between w-full relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li key={step.title || idx} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(stepNum)}
                disabled={!onStepClick || stepNum > currentStep}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${stepNum}: ${step.title}`}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 min-h-[40px] min-w-[40px]',
                  isCompleted && 'bg-brand-600 border-brand-500 text-white',
                  isCurrent && 'bg-darkBg border-brand-400 text-brand-400 ring-4 ring-brand-500/20',
                  !isCompleted && !isCurrent && 'bg-slate-900 border-slate-700 text-slate-500'
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
              </button>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center hidden md:block max-w-[100px]',
                  isCurrent ? 'text-brand-300 font-semibold' : 'text-slate-400'
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
