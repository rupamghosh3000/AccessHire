import React from 'react';
import { cn } from '../../lib/utils';

export const SkillChip = ({ skill, variant = 'required', className }) => {
  const isRequired = variant === 'required';

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-colors',
        isRequired
          ? 'bg-[#E3DDFB] text-[#111114] border-transparent'
          : 'bg-[#DCEEFB] text-[#111114] border-transparent',
        className
      )}
    >
      {skill}
    </span>
  );
};
