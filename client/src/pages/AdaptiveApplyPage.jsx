import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { useAuth } from '../hooks/useAuth';
import { ApplicationSimulator } from '../components/application/ApplicationSimulator';
import { LoadingState } from '../components/ui/LoadingState';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AdaptiveApplyPage = () => {
  const { id = '66e1a0000000000000000001' } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadJob();
  }, [id, isAuthenticated]);

  const loadJob = async () => {
    try {
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (_) {}
    setLoading(false);
  };

  if (loading) return <LoadingState message="Preparing your Adaptive Application..." />;

  return (
    <div className="space-y-6 text-left pb-16 pt-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-[#6B7280] hover:text-[#111114]">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="p-6 bg-[#D6F3E6] rounded-2xl space-y-2 text-[#111114]">
        <span className="px-3 py-1 bg-white text-[#1B8A5A] text-xs font-bold rounded-full shadow-sm">
          Adaptive Apply Engine
        </span>
        <h1 className="text-3xl font-extrabold text-[#111114]">
          Guided Application: {job?.title || 'Junior Developer'}
        </h1>
        <p className="text-sm text-[#6B7280]">
          Company: <strong>{job?.company || 'NovaByte Technologies'}</strong> — Location: <strong>{job?.location || 'Mumbai'}</strong>
        </p>
      </div>

      <ApplicationSimulator
        job={job}
        isRealApplication={true}
        onComplete={() => navigate('/applications')}
      />
    </div>
  );
};
