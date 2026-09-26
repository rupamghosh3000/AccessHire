import React from 'react';
import { Search, FileSearch, ShieldCheck, PlayCircle, Layers, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Fallback2DJourney = ({ activeNode, onNodeSelect }) => {
  const nodes = [
    { id: 'discover', label: 'Discover', icon: <Search className="w-5 h-5 text-brand-400" />, desc: 'Search jobs with text, voice, or filters without portal friction.' },
    { id: 'understand', label: 'Understand', icon: <FileSearch className="w-5 h-5 text-cyan-400" />, desc: 'AI plain-language summaries and evidence-based requirement matching.' },
    { id: 'check', label: 'BarrierLens', icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, desc: 'Analyze keyboard, voice, and screen-reader form compatibility.' },
    { id: 'apply', label: 'Adaptive Apply', icon: <PlayCircle className="w-5 h-5 text-amber-400" />, desc: 'Complete guided applications in your preferred interaction mode.' },
  ];

  return (
    <div
      role="region"
      aria-label="Accessible application journey pathway"
      className="p-6 bg-darkCard/90 border border-slate-800 rounded-3xl shadow-xl space-y-6 text-left"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center">
          <Layers className="w-5 h-5 mr-2 text-brand-400" /> Accessible Spatial Journey Pathway
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md">
          2D Accessible View
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {nodes.map((node, idx) => {
          const isSelected = activeNode === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onNodeSelect && onNodeSelect(node.id)}
              aria-pressed={isSelected}
              className={cn(
                'p-5 rounded-2xl border text-left transition-all space-y-2 min-h-[140px] flex flex-col justify-between focus:outline-none',
                isSelected
                  ? 'bg-brand-950/60 border-brand-400 text-white shadow-lg ring-2 ring-brand-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="p-2 bg-slate-800/80 rounded-xl">{node.icon}</span>
                <span className="text-xs font-bold text-slate-500">0{idx + 1}</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-100">{node.label}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{node.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
