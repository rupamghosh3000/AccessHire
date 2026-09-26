import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { ApplicationSimulator } from '../components/application/ApplicationSimulator';
import { LoadingState } from '../components/ui/LoadingState';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const TryBeforeApplyPage = () => {
  const { id = '66e1a0000000000000000001' } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (_) {}
    setLoading(false);
  };

  if (loading) return <LoadingState message="Initializing Sandbox Simulator..." />;

  return (
    <div className="space-y-6 text-left pb-16 pt-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-[#6B7280] hover:text-[#111114]">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="p-6 bg-[#DCEEFB] rounded-2xl space-y-2 text-[#111114]">
        <span className="px-3 py-1 bg-white text-sky-700 text-xs font-bold rounded-full shadow-sm">
          Try Before You Apply Sandbox
        </span>
        <h1 className="text-3xl font-extrabold text-[#111114]">
          Application Preview: {job?.title || 'Junior Developer'}
        </h1>
        <p className="text-sm text-[#6B7280]">
          Company: <strong>{job?.company || 'NovaByte Technologies'}</strong> — Location: <strong>{job?.location || 'Mumbai'}</strong>
        </p>
      </div>

      <ApplicationSimulator job={job} isRealApplication={false} />
    </div>
  );
};
