import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const MatchEvidence = ({ matchReport }) => {
  if (!matchReport) return null;

  const { matchedRequirements = [], potentialGaps = [], uncertainRequirements = [], explanation } = matchReport;

  return (
    <div className="space-y-6 text-left">
      {/* Overview Explanation */}
      {explanation && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl">
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            {explanation}
          </p>
        </div>
      )}

      {/* Matched Requirements */}
      {matchedRequirements.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" /> Matched Requirements ({matchedRequirements.length})
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {matchedRequirements.map((item, idx) => (
              <div key={idx} className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1">
                <span className="text-sm font-bold text-emerald-950 block">{item.skill}</span>
                <p className="text-xs text-emerald-900 font-medium italic">"{item.evidence}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Potential Gaps */}
      {potentialGaps.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-800 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" /> Potential Gaps ({potentialGaps.length})
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {potentialGaps.map((item, idx) => (
              <div key={idx} className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
                <span className="text-sm font-bold text-amber-950 block">{item.skill}</span>
                <p className="text-xs text-amber-900 font-medium">{item.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uncertain Requirements */}
      {uncertainRequirements.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center">
            <HelpCircle className="w-4 h-4 mr-2 text-slate-600" /> Uncertain Alignment ({uncertainRequirements.length})
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {uncertainRequirements.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="text-sm font-bold text-slate-900 block">{item.skill}</span>
                <p className="text-xs text-slate-700 font-medium">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

