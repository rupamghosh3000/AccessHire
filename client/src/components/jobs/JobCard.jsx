import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck, MapPin, Building2, PlayCircle, ArrowUpRight } from 'lucide-react';
import { formatSalary } from '../../lib/utils';
import { BarrierBadge } from './BarrierBadge';

export const JobCard = ({ job, isSaved, onToggleSave, pastelIndex = 0 }) => {
  const navigate = useNavigate();
  const jobId = job._id || job.id;

  const pastels = [
    'bg-[#FFF3E8]', // Peach
    'bg-[#EAF8F2]', // Mint
    'bg-[#F1EEFC]', // Lavender
    'bg-[#EAF4FD]', // Ice Blue
    'bg-[#FEEDF2]', // Rose
    'bg-[#F4F5F8]', // Light Zinc
  ];

  const bgStyle = pastels[pastelIndex % pastels.length];

  const getCompanyInitial = (company) => {
    if (!company) return 'A';
    return company.charAt(0).toUpperCase();
  };

  return (
    <article
      aria-labelledby={`job-title-${jobId}`}
      className={`bg-${bgStyle.replace('bg-', '')} rounded-[26px] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200 text-left text-gray-900 ${bgStyle}`}
    >
      <div>
        {/* Top Date & Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-white text-[12px] font-semibold text-gray-700 rounded-full shadow-2xs">
            {job.createdAt ? new Date(job.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '20 May, 2024'}
          </span>
          <button
            type="button"
            onClick={() => onToggleSave && onToggleSave(jobId)}
            aria-label={isSaved ? `Unsave ${job.title}` : `Bookmark ${job.title}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xs transition cursor-pointer ${
              isSaved ? 'bg-black text-white' : 'bg-white text-gray-700 hover:text-black'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-white fill-current" />
            ) : (
              <Bookmark className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>

        {/* Company info with brand circle */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wide">{job.company}</p>
            <h3 id={`job-title-${jobId}`} className="text-xl font-bold text-gray-900 mt-0.5 leading-snug line-clamp-2">
              <Link to={`/jobs/${jobId}`} className="hover:underline focus:outline-none">
                {job.title}
              </Link>
            </h3>
          </div>
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm select-none shadow-sm shrink-0 ml-2">
            {getCompanyInitial(job.company)}
          </div>
        </div>

        {/* Tags / Chips */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          <span className="px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-white/70 border border-gray-300/40 rounded-full">
            {job.workMode || 'Full time'}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-white/70 border border-gray-300/40 rounded-full">
            {job.experienceLevel || 'Senior level'}
          </span>
          {job.requiredSkills?.slice(0, 2).map((skill) => (
            <span key={skill} className="px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-white/70 border border-gray-300/40 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Row: Rate & Details button */}
      <div className="flex items-center justify-between pt-6 mt-4 border-t border-black/5">
        <div>
          <p className="text-lg font-bold text-gray-900">{formatSalary(job.salaryRange)}</p>
          <p className="text-xs text-gray-500 font-medium flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-gray-400" /> {job.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/try-before-apply/${jobId}`)}
            aria-label={`Try simulation for ${job.title}`}
            className="px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold rounded-full hover:bg-gray-100 transition shadow-sm flex items-center cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 mr-1 text-sky-600" /> Try
          </button>

          <button
            type="button"
            onClick={() => navigate(`/jobs/${jobId}`)}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-full transition shadow-sm cursor-pointer flex items-center"
          >
            Details <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </article>
  );
};
