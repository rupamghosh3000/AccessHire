import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AccessibilityStatementPage = () => {
  return (
    <div className="space-y-8 text-left pb-16 max-w-4xl mx-auto">
      <div className="p-8 bg-darkCard border border-slate-800 rounded-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-md border border-emerald-800">
          WCAG 2.2 AA Compliance Statement
        </span>
        <h1 className="text-3xl font-extrabold text-white">Accessibility Statement</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          AccessHire AI is committed to ensuring digital accessibility for people with disabilities. We continuously improve the user experience for everyone and apply the relevant accessibility standards.
        </p>
      </div>

      <div className="p-8 bg-darkCard border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-2">Conformance Status</h2>
        <p>
          The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. AccessHire AI is conformant with <strong>WCAG 2.2 Level AA</strong>.
        </p>

        <h3 className="text-lg font-bold text-slate-100 pt-2">Implemented Safeguards</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Keyboard Navigation:</strong> All interactive elements can be operated using a keyboard alone with visible focus rings.</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Screen Reader Announcements:</strong> ARIA live regions announce dynamic status changes.</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>3D Fallback:</strong> Full 2D HTML/SVG representation available when WebGL is unsupported or reduced motion is enabled.</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Explicit Submission:</strong> Applications require explicit candidate confirmation and are never auto-submitted by AI.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
