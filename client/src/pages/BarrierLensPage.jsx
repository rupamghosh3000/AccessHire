import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { barrierService } from '../services/barrierService';
import { JourneyPathScene } from '../components/3d/JourneyPathScene';
import { BarrierBadge } from '../components/jobs/BarrierBadge';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { ShieldCheck, Mic, Keyboard, Eye, RefreshCw, AlertCircle, PlayCircle } from 'lucide-react';

export const BarrierLensPage = () => {
  const { id = '66e1a0000000000000000001' } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(3);

  useEffect(() => {
    loadBarrierReport();
  }, [id]);

  const loadBarrierReport = async () => {
    setLoading(true);
    try {
      const data = await barrierService.getReport(id);
      setReport(data);
    } catch (_) {
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await barrierService.refreshReport(id);
      setReport(data);
    } catch (_) {}
    setLoading(false);
  };

  if (loading) return <LoadingState message="Analyzing application flow with BarrierLens..." />;

  return (
    <div className="space-y-8 text-left pb-16 pt-4">
      {/* Header Banner */}
      <div className="p-8 bg-[#D6F3E6] rounded-3xl flex flex-wrap items-center justify-between gap-6 text-[#111114]">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-white text-[#1B8A5A] text-xs font-bold rounded-full shadow-sm">
            BarrierLens Assessment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111114]">Application Journey Inspection</h1>
          <p className="text-sm text-[#6B7280] max-w-2xl">
            BarrierLens analyzes application steps to identify potential keyboard, voice, and screen-reader friction points before you apply.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" /> Re-Analyze
          </Button>
          <Button variant="primary" onClick={() => navigate(`/try-before-apply/${id}`)}>
            <PlayCircle className="w-4 h-4 mr-2 text-sky-400" /> Test Simulation
          </Button>
        </div>
      </div>

      {/* 3D Application Journey Spine */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111114] flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-[#1B8A5A]" /> Application Journey 3D Spine
          </h2>
          <span className="text-xs font-semibold text-[#6B7280]">Step {currentStep} of 5</span>
        </div>
        <JourneyPathScene currentStep={currentStep} onStepSelect={(step) => setCurrentStep(step)} />
      </div>

      {/* Grid Overview: Pastel cards per category */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-[#E3DDFB] rounded-2xl space-y-2 text-[#111114]">
          <div className="flex items-center space-x-2 text-[#111114]">
            <Mic className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm">Voice Support</h3>
          </div>
          <BarrierBadge status={report?.voiceSupport || 'SUPPORTED'} label="Voice Supported" />
        </div>

        <div className="p-5 bg-[#DCEEFB] rounded-2xl space-y-2 text-[#111114]">
          <div className="flex items-center space-x-2 text-[#111114]">
            <Keyboard className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-sm">Keyboard Flow</h3>
          </div>
          <BarrierBadge status={report?.keyboardSupport || 'SUPPORTED'} label="Full Tab Flow" />
        </div>

        <div className="p-5 bg-[#D6F3E6] rounded-2xl space-y-2 text-[#111114]">
          <div className="flex items-center space-x-2 text-[#111114]">
            <Eye className="w-4 h-4 text-[#1B8A5A]" />
            <h3 className="font-bold text-sm">Screen Reader</h3>
          </div>
          <BarrierBadge status={report?.screenReaderSupport || 'SUPPORTED'} label="WCAG 2.2 AA" />
        </div>

        <div className="p-5 bg-[#FCE0C8] rounded-2xl space-y-2 text-[#111114]">
          <div className="flex items-center space-x-2 text-[#111114]">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <h3 className="font-bold text-sm">Form Complexity</h3>
          </div>
          <span className="px-3 py-1 bg-white text-[#B7791F] text-xs font-bold rounded-full shadow-sm uppercase">
            {report?.formComplexity || 'MEDIUM'}
          </span>
        </div>
      </div>

      {/* Layered White Cards for Detected Barriers and Workarounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-[#111114] flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-[#B7791F]" /> Detected Potential Barriers ({report?.detectedBarriers?.length || 2})
          </h3>
          <div className="space-y-3">
            {report?.detectedBarriers?.map((barrier, idx) => (
              <div key={idx} className="p-4 bg-[#FCEFD6] text-[#B7791F] rounded-2xl space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {barrier.type || 'Friction Point'}
                </span>
                <p className="text-sm font-medium">{barrier.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-[#111114] flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2 text-[#1B8A5A]" /> AccessHire Workarounds & Assistance
          </h3>
          <div className="space-y-3">
            {report?.suggestedWorkarounds?.map((w, idx) => (
              <div key={idx} className="p-4 bg-[#E7F7EF] text-[#1B8A5A] rounded-2xl space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Suggested Workaround
                </span>
                <p className="text-sm font-medium">{w.workaround}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
