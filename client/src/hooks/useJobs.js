import { useState, useEffect, useCallback } from 'react';
import { jobService } from '../services/jobService';

export const useJobs = (initialParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(new Set());

  const fetchJobs = useCallback(async (params = initialParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs(params);
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || 'Failed to load job listings');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSaved = useCallback(async () => {
    try {
      const savedData = await jobService.getSavedJobs();
      const savedList = savedData.savedJobs || [];
      const ids = new Set(savedList.map((j) => (j._id || j.id).toString()));
      setSavedJobIds(ids);
    } catch (_) {}
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchSaved();
  }, [fetchJobs, fetchSaved]);

  const toggleSave = async (jobId) => {
    const stringId = jobId.toString();
    try {
      const res = await jobService.saveJob(stringId);
      setSavedJobIds((prev) => {
        const next = new Set(prev);
        if (res.isSaved) next.add(stringId);
        else next.delete(stringId);
        return next;
      });
      return res.isSaved;
    } catch (err) {
      console.error('Save job error:', err);
      return false;
    }
  };

  return {
    jobs,
    loading,
    error,
    savedJobIds,
    fetchJobs,
    toggleSave,
    isSaved: (id) => savedJobIds.has(id.toString()),
  };
};
