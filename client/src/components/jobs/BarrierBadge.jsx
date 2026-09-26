import React from 'react';
import { ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BarrierBadge = ({ status = 'SUPPORTED', label }) => {
  const normalized = status.toUpperCase().replace(/\s+/g, '_');

  const configs = {
    SUPPORTED: {
      color: 'bg-[#E7F7EF] text-[#1B8A5A] border border-[#1B8A5A]/20',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#1B8A5A]" />,
      text: label || 'ACCESSIBLE',
    },
    POTENTIAL_ISSUE: {
      color: 'bg-[#FCEFD6] text-[#B7791F] border border-[#B7791F]/20',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1 text-[#B7791F]" />,
      text: label || 'POTENTIAL BARRIER',
    },
    COULD_NOT_VERIFY: {
      color: 'bg-[#E7EAFB] text-[#3B5BDB] border border-[#3B5BDB]/20',
      icon: <HelpCircle className="w-3.5 h-3.5 mr-1 text-[#3B5BDB]" />,
      text: label || 'COULD NOT VERIFY',
    },
    UNKNOWN: {
      color: 'bg-[#E7EAFB] text-[#3B5BDB] border border-[#3B5BDB]/20',
      icon: <HelpCircle className="w-3.5 h-3.5 mr-1 text-[#3B5BDB]" />,
      text: label || 'UNKNOWN',
    },
  };

  const current = configs[normalized] || configs.SUPPORTED;

  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide', current.color)}>
      {current.icon}
      <span>{current.text}</span>
    </span>
  );
};
