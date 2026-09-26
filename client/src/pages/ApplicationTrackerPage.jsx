import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../services/applicationService';
import { useAuth } from '../hooks/useAuth';
import { ApplicationTimeline } from '../components/application/ApplicationTimeline';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

export const ApplicationTrackerPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadApplications();
  }, [isAuthenticated]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await applicationService.getApplications();
      setApplications(data.applications || []);
    } catch (_) {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await applicationService.updateApplication(appId, { status: newStatus });
      await loadApplications();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  return (
    <div className="space-y-8 text-left pb-16 pt-4">
      <div className="p-7 bg-[#111114] text-white rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4FA8F5] bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Application Tracker
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Application Status & History</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Track saved drafts, active submissions, interview stages, and decision updates in one clear timeline.
          </p>
        </div>

        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          <Plus className="w-4 h-4 mr-2" /> Start Application
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading applications..." />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No applications tracked yet"
          description="Search positions and click 'Apply Now' to start your first guided flow."
          actionLabel="Browse Jobs"
          onAction={() => navigate('/jobs')}
        />
      ) : (
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            Active Applications ({applications.length})
          </p>

          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <ApplicationTimeline
                key={app._id || app.id}
                application={app}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
