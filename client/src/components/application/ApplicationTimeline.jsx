import React from 'react';
import { CheckCircle2, Clock, Calendar, Building2, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const ApplicationTimeline = ({ application, onUpdateStatus }) => {
  const job = application.jobId || {};
  const currentStatus = application.status || 'started';

  const stages = [
    { key: 'started', label: 'Draft Saved' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'interview', label: 'Interview' },
    { key: 'offer', label: 'Decision / Offer' },
  ];

  const getStageIndex = (status) => {
    const idx = stages.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getStageIndex(currentStatus);

  return (
    <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-6 text-left shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECF0] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#111114] bg-[#F1F1F4] px-3 py-1 rounded-full border border-[#ECECF0]">
            Status: {currentStatus.replace('_', ' ').toUpperCase()}
          </span>
          <h3 className="text-2xl font-bold text-[#111114] mt-2">
            {job.title || 'Job Position'}
          </h3>
          <p className="text-sm text-[#6B7280] flex items-center mt-1">
            <Building2 className="w-4 h-4 mr-1 text-[#111114]" /> {job.company || 'Company'} —{' '}
            <MapPin className="w-4 h-4 mx-1 text-[#111114]" /> {job.location || 'Location'}
          </p>
        </div>

        <div className="text-xs text-[#6B7280] space-y-1 text-right">
          <p className="flex items-center justify-end">
            <Calendar className="w-3.5 h-3.5 mr-1" /> Started:{' '}
            {new Date(application.startedAt || application.createdAt).toLocaleDateString()}
          </p>
          {application.submittedAt && (
            <p className="flex items-center justify-end text-[#1B8A5A] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Submitted:{' '}
              {new Date(application.submittedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Application Timeline</h4>
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {stages.map((stage, idx) => {
            const isDone = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <li
                key={stage.key}
                className={cn(
                  'p-3.5 rounded-2xl border text-center space-y-1 font-semibold text-xs transition-colors',
                  isDone ? 'bg-[#E7F7EF] border-[#1B8A5A]/20 text-[#1B8A5A]' : 'bg-[#F1F1F4] border-transparent text-[#6B7280]',
                  isCurrent && 'ring-2 ring-[#111114] border-[#111114] text-[#111114] font-bold'
                )}
              >
                <div className="flex items-center justify-center space-x-1">
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-[#1B8A5A]" /> : <Clock className="w-4 h-4 text-[#6B7280]" />}
                  <span>{stage.label}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {onUpdateStatus && (
        <div className="pt-4 border-t border-[#ECECF0] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">Update status manually:</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateStatus(application.id || application._id, 'interview')}
            >
              Interview Scheduled
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(application.id || application._id, 'offer')}
            >
              Offer Received
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
