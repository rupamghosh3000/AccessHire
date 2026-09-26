import React from 'react';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const JobFilters = ({ filters, onChange, onClear }) => {
  const workModes = [
    { id: 'all', label: 'All Modes' },
    { id: 'remote', label: 'Remote Only' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'On-site' },
  ];

  const experienceLevels = [
    { id: '', label: 'All Levels' },
    { id: 'Entry Level', label: 'Entry Level / 0-2 yrs' },
    { id: '1–3 years', label: '1–3 Years' },
    { id: 'Senior', label: 'Senior Level' },
  ];

  return (
    <div
      role="search"
      aria-label="Job search filters"
      className="p-6 bg-white border border-[#ECECF0] rounded-2xl space-y-6 text-left"
    >
      <div className="flex items-center justify-between border-b border-[#ECECF0] pb-3">
        <h3 className="text-base font-bold text-[#111114] flex items-center">
          <Filter className="w-4 h-4 mr-2 text-[#4FA8F5]" /> Filters
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-[#6B7280] hover:text-[#111114] flex items-center"
        >
          <X className="w-3.5 h-3.5 mr-1" /> Reset
        </button>
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Keywords or Skills
        </label>
        <input
          type="text"
          placeholder="e.g. Java, React, SQL..."
          value={filters.q || ''}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          className="w-full px-4 py-2.5 bg-white border border-[#ECECF0] rounded-full text-xs text-[#111114] placeholder-[#6B7280] focus:outline-none focus:border-[#4FA8F5]"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Location
        </label>
        <input
          type="text"
          placeholder="e.g. Mumbai, Pune..."
          value={filters.location || ''}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="w-full px-4 py-2.5 bg-white border border-[#ECECF0] rounded-full text-xs text-[#111114] placeholder-[#6B7280] focus:outline-none focus:border-[#4FA8F5]"
        />
      </div>

      {/* Work Mode Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Work Mode
        </label>
        <div className="space-y-1.5 pt-1">
          {workModes.map((mode) => {
            const isChecked = (filters.workMode || 'all') === mode.id;
            return (
              <label
                key={mode.id}
                className="flex items-center space-x-3 text-xs font-medium text-[#111114] cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChange({ ...filters, workMode: mode.id })}
                  className="w-4 h-4 rounded border-slate-300 text-[#111114] focus:ring-[#4FA8F5] cursor-pointer"
                />
                <span>{mode.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2 pt-2 border-t border-[#ECECF0]">
        <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Experience Level
        </label>
        <div className="space-y-1.5 pt-1">
          {experienceLevels.map((exp) => {
            const isChecked = (filters.experience || '') === exp.id;
            return (
              <label
                key={exp.id}
                className="flex items-center space-x-3 text-xs font-medium text-[#111114] cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChange({ ...filters, experience: exp.id })}
                  className="w-4 h-4 rounded border-slate-300 text-[#111114] focus:ring-[#4FA8F5] cursor-pointer"
                />
                <span>{exp.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
