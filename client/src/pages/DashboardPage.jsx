import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAccessibility } from '../hooks/useAccessibility';
import { useJobs } from '../hooks/useJobs';
import { applicationService } from '../services/applicationService';
import { JobCard } from '../components/jobs/JobCard';
import { DashboardJourneyScene } from '../components/3d/DashboardJourneyScene';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { Bookmark, Layers, ShieldCheck, Sliders, Sparkles, ArrowRight, User } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { profile } = useAccessibility();
  const { jobs, loading: jobsLoading, savedJobIds, toggleSave } = useJobs();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await applicationService.getApplications();
      setApplications(data.applications || []);
    } catch (_) {
      setApplications([]);
    }
  };

  const candidateName = user?.name || 'Candidate';
  const activeApp = applications[0];

  return (
    <div className="space-y-8 text-left pb-16 pt-4">
      {/* Top Banner Header */}
      <div className="p-8 bg-[#111114] text-white rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4FA8F5] bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Candidate Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome back, {candidateName}
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Your Accessibility Passport preferences apply automatically across job search, explanations, and guided forms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/jobs')}>
            Browse Jobs <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/accessibility-passport')} className="text-white border-slate-700 hover:bg-slate-800">
            <Sliders className="w-4 h-4 mr-1 text-[#4FA8F5]" /> Passport
          </Button>
        </div>
      </div>

      {/* 3D Dashboard Spatial Journey Map Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111114] flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-indigo-600" /> Application Journey Stage
          </h2>
          <span className="text-xs font-semibold text-[#6B7280]">Spatial Overview</span>
        </div>
        <DashboardJourneyScene />
      </div>

      {/* Grid Summary Row: Pastel cards mirroring reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#DCEEFB] rounded-2xl space-y-4 flex flex-col justify-between text-[#111114]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-600 shadow-sm font-bold">
                <Bookmark className="w-5 h-5" />
              </span>
              <span className="text-3xl font-extrabold text-[#111114]">{savedJobIds.size}</span>
            </div>
            <h3 className="text-lg font-bold text-[#111114]">Saved Jobs</h3>
            <p className="text-xs text-[#6B7280]">Positions bookmarked for review or application.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/jobs')} className="w-full text-xs">
            View Saved Jobs
          </Button>
        </div>

        <div className="p-6 bg-[#D6F3E6] rounded-2xl space-y-4 flex flex-col justify-between text-[#111114]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B8A5A] shadow-sm font-bold">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-3xl font-extrabold text-[#111114]">{applications.length}</span>
            </div>
            <h3 className="text-lg font-bold text-[#111114]">Active Applications</h3>
            <p className="text-xs text-[#6B7280]">
              {activeApp
                ? `Latest: ${activeApp.jobId?.title || 'Position'} (${activeApp.status})`
                : 'No active applications in progress.'}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/applications')} className="w-full text-xs">
            Open Applications
          </Button>
        </div>

        <div className="p-6 bg-[#E3DDFB] rounded-2xl space-y-4 flex flex-col justify-between text-[#111114]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm font-bold">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="px-3 py-1 bg-white text-[#1B8A5A] text-xs font-bold rounded-full shadow-sm">ACTIVE</span>
            </div>
            <h3 className="text-lg font-bold text-[#111114]">Accessibility Passport</h3>
            <div className="space-y-1 text-xs text-[#6B7280]">
              <p>• Voice Mode: <strong>{profile.voiceEnabled ? 'Enabled' : 'Disabled'}</strong></p>
              <p>• Keyboard First: <strong>{profile.keyboardFirst ? 'Enabled' : 'Disabled'}</strong></p>
              <p>• High Contrast: <strong>{profile.highContrast ? 'Active' : 'Off'}</strong></p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/accessibility-passport')} className="w-full text-xs">
            Configure Passport
          </Button>
        </div>
      </div>

      {/* Recommended Jobs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111114]">Recommended Jobs</h2>
            <p className="text-xs text-[#6B7280]">Matched with your technical profile</p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-indigo-600 hover:underline">
            View All Jobs →
          </Link>
        </div>

        {jobsLoading ? (
          <LoadingState message="Loading job listings..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 3).map((job, idx) => (
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
      </div>
    </div>
  );
};
