import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { aiService } from '../services/aiService';
import { barrierService } from '../services/barrierService';
import { useAuth } from '../hooks/useAuth';
import { SkillChip } from '../components/jobs/SkillChip';
import { BarrierBadge } from '../components/jobs/BarrierBadge';
import { MatchEvidence } from '../components/jobs/MatchEvidence';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { formatSalary } from '../lib/utils';
import { Bookmark, BookmarkCheck, Sparkles, ShieldCheck, PlayCircle, Send, MapPin, Building2, Briefcase, FileCheck, ArrowLeft } from 'lucide-react';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [aiExplanation, setAiExplanation] = useState(null);
  const [explaining, setExplaining] = useState(false);
  const [matchReport, setMatchReport] = useState(null);
  const [matching, setMatching] = useState(false);
  const [barrierReport, setBarrierReport] = useState(null);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobById(id);
      setJob(data);

      try {
        const report = await barrierService.getReport(id);
        setBarrierReport(report);
      } catch (_) {}
    } catch (err) {
      setError(err.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await jobService.saveJob(id);
      setIsSaved(res.isSaved);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleExplainJob = async () => {
    setExplaining(true);
    try {
      const result = await aiService.explainJob(id);
      setAiExplanation(result);
    } catch (err) {
      console.error('Explain error:', err);
    } finally {
      setExplaining(false);
    }
  };

  const handleCheckAlignment = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setMatching(true);
    try {
      const result = await aiService.matchJob(id);
      setMatchReport(result);
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setMatching(false);
    }
  };

  if (loading) return <LoadingState message="Fetching detailed job listing..." />;
  if (error || !job) return <ErrorState message={error || 'Job position not found'} onRetry={loadJobDetails} />;

  return (
    <div className="space-y-8 text-left pb-16 pt-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-[#6B7280] hover:text-[#111114]">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
      </Button>

      {/* Main Header Card */}
      <div className="p-8 bg-[#DCEEFB] rounded-3xl space-y-6 text-[#111114]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-white text-[#111114] text-xs font-semibold rounded-full shadow-sm">
              {job.workMode} Position
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111114]">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280] font-medium">
              <span className="flex items-center"><Building2 className="w-4 h-4 mr-1 text-[#111114]" /> {job.company}</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#111114]" /> {job.location}</span>
              <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-[#111114]" /> {job.experienceLevel}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveToggle}
            className="px-4 py-2.5 bg-white text-[#111114] rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-sm cursor-pointer hover:bg-slate-100"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-600" /> : <Bookmark className="w-4 h-4 text-[#111114]" />}
            <span className="text-xs font-bold">{isSaved ? 'Saved' : 'Save Job'}</span>
          </button>
        </div>

        {/* Action Buttons Strip */}
        <div className="pt-4 border-t border-black/5 flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={handleExplainJob} isLoading={explaining}>
            <Sparkles className="w-4 h-4 mr-2" /> Explain Job
          </Button>

          <Button variant="secondary" onClick={handleCheckAlignment} isLoading={matching}>
            <FileCheck className="w-4 h-4 mr-2" /> Check My Alignment
          </Button>

          <Button variant="outline" onClick={() => navigate('/barrier-lens')}>
            <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" /> View BarrierLens
          </Button>

          <Button variant="outline" onClick={() => navigate(`/try-before-apply/${id}`)}>
            <PlayCircle className="w-4 h-4 mr-2 text-sky-600" /> Try Application
          </Button>

          <Button variant="primary" onClick={() => navigate(`/adaptive-apply/${id}`)} className="bg-[#111114] text-white ml-auto">
            <Send className="w-4 h-4 mr-2" /> Apply Now
          </Button>
        </div>
      </div>

      {/* AI Explanation Box */}
      {aiExplanation && (
        <div className="p-7 bg-[#E3DDFB] rounded-3xl space-y-4 text-[#111114]">
          <h3 className="text-lg font-bold text-[#111114] flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-indigo-600" /> AI Plain-Language Job Summary
          </h3>
          <p className="text-sm text-[#111114] leading-relaxed font-medium">
            {aiExplanation.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-white/90 rounded-2xl space-y-2 border border-black/5">
              <span className="font-bold text-[#111114] block uppercase">Key Responsibilities</span>
              <ul className="list-disc list-inside space-y-1 text-[#6B7280]">
                {aiExplanation.keyResponsibilities?.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-white/90 rounded-2xl space-y-2 border border-black/5">
              <span className="font-bold text-[#111114] block uppercase">Clarified Terminology</span>
              <div className="space-y-1.5">
                {aiExplanation.termExplanations?.map((t, i) => (
                  <p key={i} className="text-[#6B7280]">
                    <strong className="text-[#111114]">{t.term}:</strong> {t.explanation}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Match Alignment Report */}
      {matchReport && (
        <div className="p-7 bg-white border border-[#ECECF0] rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-[#111114] flex items-center">
            <FileCheck className="w-5 h-5 mr-2 text-[#1B8A5A]" /> Evidence-Based Alignment Breakdown
          </h3>
          <MatchEvidence matchReport={matchReport} />
        </div>
      )}

      {/* Detailed Description & Required Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 bg-white border border-[#ECECF0] rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-[#111114]">Position Description</h3>
          <p className="text-sm text-[#6B7280] whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="p-6 bg-[#F1F1F4] rounded-3xl space-y-6 text-[#111114]">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#6B7280]">Required Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills?.map((s) => <SkillChip key={s} skill={s} variant="required" />)}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/5">
            <h4 className="text-xs font-bold uppercase text-[#6B7280]">Preferred Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.preferredSkills?.map((s) => <SkillChip key={s} skill={s} variant="preferred" />)}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/5">
            <h4 className="text-xs font-bold uppercase text-[#6B7280]">BarrierLens Verification</h4>
            <BarrierBadge status="SUPPORTED" label="Keyboard & Voice Supported" />
          </div>
        </div>
      </div>
    </div>
  );
};
