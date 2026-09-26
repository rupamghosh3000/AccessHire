import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#111114] border-t border-slate-800 pt-10 pb-8 text-slate-400 text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span className="text-base font-bold text-white">AccessHire AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accessible job application assistant for Track PS003. Adapting job discovery to how candidates work best.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Application Tools</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/barrier-lens" className="hover:text-white transition-colors">BarrierLens Inspection</Link></li>
              <li><Link to="/try-before-apply/66e1a0000000000000000001" className="hover:text-white transition-colors">Try Before You Apply</Link></li>
              <li><Link to="/adaptive-apply/66e1a0000000000000000001" className="hover:text-white transition-colors">Adaptive Application</Link></li>
              <li><Link to="/accessibility-passport" className="hover:text-white transition-colors">Accessibility Passport</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Candidate Services</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/jobs" className="hover:text-white transition-colors">Discover Jobs</Link></li>
              <li><Link to="/resume-center" className="hover:text-white transition-colors">Resume Center</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Application Tracker</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-white transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Accessibility Standard</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/accessibility-statement" className="hover:text-white transition-colors">WCAG 2.2 AA Compliance</Link></li>
              <li><span className="text-slate-500">Keyboard Traps: Zero</span></li>
              <li><span className="text-slate-500">2D Fallback: 100% Usable</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 AccessHire AI. Built for PS003: Accessible Job Application Assistant.</p>
          <p>WCAG 2.2 Level AA Standard</p>
        </div>
      </div>
    </footer>
  );
};
