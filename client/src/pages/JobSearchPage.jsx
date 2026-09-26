import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from '../components/jobs/JobCard';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { SlidersHorizontal, ChevronLeft, ChevronDown } from 'lucide-react';

export const JobSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    q: queryParams.get('q') || '',
    location: queryParams.get('location') || '',
    workMode: queryParams.get('workMode') || 'all',
    experience: queryParams.get('experience') || '',
    fullTime: true,
    partTime: true,
    internship: false,
    projectWork: false,
    volunteering: false,
    screenReader: true,
    flexibleSchedule: true,
    voiceApply: false,
    remote: false,
  });

  const { jobs, loading, savedJobIds, toggleSave, fetchJobs } = useJobs(filters);

  useEffect(() => {
    fetchJobs(filters);
  }, [filters, fetchJobs]);

  const handleClear = () => {
    const reset = {
      q: '',
      location: '',
      workMode: 'all',
      experience: '',
      fullTime: true,
      partTime: true,
      internship: false,
      projectWork: false,
      volunteering: false,
      screenReader: true,
      flexibleSchedule: true,
      voiceApply: false,
      remote: false,
    };
    setFilters(reset);
    fetchJobs(reset);
  };

  const handleCheckboxChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 bg-[#F8F9FB] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 text-left">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-8">
        {/* Promo Feature Card */}
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-[#242238] via-[#1E1B2D] to-[#12111A] text-white p-6 shadow-md border border-white/5 flex flex-col justify-between h-[300px]">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-6 bottom-4 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold tracking-wide uppercase text-sky-300 mb-4 border border-white/10">
              BarrierLens
            </span>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
              Get Your best profession with AccessHire
            </h2>
            <p className="text-xs text-gray-300 mt-2 line-clamp-2">
              Verify application friction, test assistive tools, and auto-request accommodations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/barrier-lens')}
            className="w-full py-3 px-4 bg-[#75B5F8] hover:bg-[#60A5FA] text-[#12131A] font-bold rounded-2xl text-sm transition shadow-sm hover:shadow text-center cursor-pointer"
          >
            Learn more
          </button>
        </div>

        {/* Filter Heading */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Filters</h3>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Working schedule filters */}
        <div className="space-y-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Working schedule</p>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.fullTime}
              onChange={() => handleCheckboxChange('fullTime')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 group-hover:text-black">Full time</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.partTime}
              onChange={() => handleCheckboxChange('partTime')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 group-hover:text-black">Part time</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.internship}
              onChange={() => handleCheckboxChange('internship')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Internship</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.projectWork}
              onChange={() => handleCheckboxChange('projectWork')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Project work</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.volunteering}
              onChange={() => handleCheckboxChange('volunteering')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Volunteering</span>
          </label>
        </div>

        {/* Accommodations & Format Filter Group */}
        <div className="space-y-3.5 pt-2 border-t border-gray-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Accommodations & Format</p>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.screenReader}
              onChange={() => handleCheckboxChange('screenReader')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 group-hover:text-black">Screen reader verified</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.flexibleSchedule}
              onChange={() => handleCheckboxChange('flexibleSchedule')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 group-hover:text-black">Flexible schedule</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.voiceApply}
              onChange={() => handleCheckboxChange('voiceApply')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Voice apply enabled</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={() => handleCheckboxChange('remote')}
              className="w-5 h-5 rounded-md text-gray-900 border-gray-300 focus:ring-black focus:ring-offset-0 transition cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Distant / Remote</span>
          </label>
        </div>
      </aside>

      {/* MAIN LISTINGS COLUMN */}
      <section className="flex-1 flex flex-col">
        {/* Header row above cards: Title, count bubble, sort dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Recommended jobs</h1>
            <span className="px-3.5 py-1 text-xs sm:text-sm font-semibold text-gray-600 bg-white border border-gray-300/80 rounded-full shadow-sm">
              {jobs.length > 0 ? jobs.length : 387}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-900 transition">
            <span>Sort by:</span>
            <span className="text-gray-900 font-semibold flex items-center gap-1.5">
              Last updated
              <SlidersHorizontal className="w-4 h-4 text-gray-700" />
            </span>
          </div>
        </div>

        {/* 6-Card Grid: 3 columns x 2 rows */}
        {loading ? (
          <LoadingState message="Searching jobs..." />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs matched your criteria"
            description="Try broadening your search terms or clearing work location filters."
            actionLabel="Reset Filters"
            onAction={handleClear}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
            {jobs.map((job, idx) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                isSaved={savedJobIds.has((job._id || job.id).toString())}
                onToggleSave={toggleSave}
                pastelIndex={idx}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
