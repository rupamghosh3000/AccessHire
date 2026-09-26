import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { ProgressStepper } from '../ui/ProgressStepper';
import { InteractionModeSwitcher } from './InteractionModeSwitcher';
import { ApplicationField } from './ApplicationField';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { barrierService } from '../../services/barrierService';
import { applicationService } from '../../services/applicationService';
import { aiService } from '../../services/aiService';
import { useAccessibility } from '../../hooks/useAccessibility';

export const ApplicationSimulator = ({ job, isRealApplication = false, onComplete }) => {
  const navigate = useNavigate();
  const { announceStatus } = useAccessibility();

  const [previewData, setPreviewData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Demo Candidate',
    email: 'demo@accesshire.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    degree: 'B.E. Information Technology',
    institution: 'State Engineering College',
    graduationYear: '2024',
    primarySkills: 'Java, SQL, REST APIs, React',
    workAuth: 'Yes',
    resumeId: 'Demo_Candidate_Resume.pdf',
  });
  const [accessibilityMode, setAccessibilityMode] = useState('standard');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobId = job?._id || job?.id || '66e1a0000000000000000001';

  useEffect(() => {
    loadPreview();
  }, [jobId]);

  const loadPreview = async () => {
    try {
      const res = await barrierService.getPreview(jobId);
      setPreviewData(res);
    } catch (_) {
      setPreviewData(null);
    }
  };

  const [isExtractingResume, setIsExtractingResume] = useState(false);

  const handleAutoFillFromResume = async () => {
    setIsExtractingResume(true);
    try {
      const extracted = await aiService.extractResume();
      if (extracted) {
        setFormData((prev) => ({
          ...prev,
          fullName: extracted.fullName || prev.fullName,
          email: extracted.email || prev.email,
          phone: extracted.phone || prev.phone,
          location: extracted.location || prev.location,
          degree: extracted.degree || prev.degree,
          institution: extracted.institution || prev.institution,
          graduationYear: extracted.graduationYear || prev.graduationYear,
          primarySkills: extracted.primarySkills || prev.primarySkills,
          workAuth: extracted.workAuth || prev.workAuth,
          resumeId: extracted.resumeId || prev.resumeId,
        }));
        announceStatus('AI auto-filled application fields from your resume.');
      }
    } catch (err) {
      console.error('Auto fill error:', err);
    } finally {
      setIsExtractingResume(false);
    }
  };

  const steps = previewData?.steps || [
    { stepNumber: 1, title: 'Personal Info' },
    { stepNumber: 2, title: 'Education' },
    { stepNumber: 3, title: 'Skills & Auth' },
    { stepNumber: 4, title: 'Resume' },
    { stepNumber: 5, title: 'Review & Confirm' },
  ];

  const handleFieldChange = (fieldName, val) => {
    setFormData((prev) => ({ ...prev, [fieldName]: val }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      announceStatus(`Step ${nextStep}: ${steps[nextStep - 1]?.title || 'Next Stage'}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      announceStatus(`Returned to step ${prevStep}: ${steps[prevStep - 1]?.title}`);
    }
  };

  const handleFinalSubmitClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmedSubmission = async () => {
    setIsSubmitting(true);
    try {
      if (isRealApplication) {
        const appRes = await applicationService.createApplication(jobId, accessibilityMode, formData);
        const appId = appRes.id || appRes._id;
        await applicationService.confirmSubmit(appId);
        announceStatus('Application submitted successfully!');
        if (onComplete) onComplete(appRes);
        else navigate('/applications');
      } else {
        announceStatus('Application simulation completed successfully!');
        setIsConfirmModalOpen(false);
        setCurrentStep(5);
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard hotkey listener for Keyboard-First mode
  useEffect(() => {
    if (accessibilityMode !== 'keyboard') return;

    const handleKeyDown = (e) => {
      // Alt + N or Ctrl + Enter -> Next stage
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.ctrlKey && e.key === 'Enter')) {
        e.preventDefault();
        handleNext();
      }
      // Alt + B -> Back
      else if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handlePrev();
      }
      // Alt + A -> Auto fill from resume
      else if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleAutoFillFromResume();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [accessibilityMode, currentStep]);

  // Voice speech announcer when switching step in Voice-First mode
  useEffect(() => {
    if (accessibilityMode === 'voice') {
      const activeStep = steps[currentStep - 1];
      const textToRead = `Step ${currentStep} of ${steps.length}: ${activeStep?.title}. Say 'Next stage' or 'Back' to navigate.`;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [accessibilityMode, currentStep]);

  const activeStepData = steps[currentStep - 1] || steps[0];

  return (
    <div className="space-y-6 text-left">
      {!isRealApplication && (
        <div className="p-4 bg-[#DCEEFB] text-[#111114] rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PlayCircle className="w-5 h-5 text-sky-700 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold">Application Preview — Simulation</h3>
              <p className="text-xs text-[#6B7280]">
                This is a safe sandbox preview to evaluate interaction burden and form accessibility before applying.
              </p>
            </div>
          </div>
        </div>
      )}

      <InteractionModeSwitcher
        activeMode={accessibilityMode}
        onModeChange={(mode) => {
          setAccessibilityMode(mode);
          announceStatus(`Switched to ${mode} mode.`);
        }}
      />

      {/* Voice-First Assistance Bar */}
      {accessibilityMode === 'voice' && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">Voice-First Assistant Active</h4>
              <p className="text-xs text-emerald-700">
                Spoken guidance is enabled. Voice commands: <strong>"Next stage"</strong>, <strong>"Back"</strong>, <strong>"Auto fill"</strong>, <strong>"Explain"</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard-First Shortcuts Bar */}
      {accessibilityMode === 'keyboard' && (
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs font-mono shadow-md border border-slate-700">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-sky-400 uppercase tracking-wider">Keyboard Hotkeys:</span>
            <span><kbd className="px-2 py-1 bg-slate-800 rounded text-sky-300 border border-slate-600">Alt + N</kbd> Next</span>
            <span><kbd className="px-2 py-1 bg-slate-800 rounded text-sky-300 border border-slate-600">Alt + B</kbd> Back</span>
            <span><kbd className="px-2 py-1 bg-slate-800 rounded text-sky-300 border border-slate-600">Alt + A</kbd> Auto-Fill</span>
          </div>
          <span className="text-emerald-400 font-sans text-xs">Keyboard Focus Trap Active</span>
        </div>
      )}

      <ProgressStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-6 shadow-sm">
        <div className="border-b border-[#ECECF0] pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Step {currentStep} of {steps.length}
            </span>
            <h2 className="text-2xl font-bold text-[#111114] mt-1">
              {activeStepData.title}
            </h2>
            {activeStepData.description && (
              <p className="text-sm text-[#6B7280] mt-1">{activeStepData.description}</p>
            )}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isExtractingResume}
            onClick={handleAutoFillFromResume}
            className="text-xs bg-[#E3DDFB] border-indigo-200 text-indigo-900 hover:bg-indigo-100"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-indigo-600" /> Auto-Fill from Resume
          </Button>
        </div>

        {currentStep < 5 && (
          <div className="space-y-4">
            {activeStepData.fields?.map((field) => (
              <ApplicationField
                key={field.name}
                field={field}
                value={formData[field.name] || ''}
                onChange={(val) => handleFieldChange(field.name, val)}
                accessibilityMode={accessibilityMode}
              />
            ))}
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="p-5 bg-[#F1F1F4] rounded-2xl space-y-3 text-[#111114]">
              <h3 className="text-lg font-bold text-[#111114] border-b border-black/5 pb-2">
                Candidate Application Review Summary
              </h3>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-[#6B7280]">Full Name:</dt>
                  <dd className="font-semibold text-[#111114]">{formData.fullName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6B7280]">Email Address:</dt>
                  <dd className="font-semibold text-[#111114]">{formData.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6B7280]">Education:</dt>
                  <dd className="font-semibold text-[#111114]">{formData.degree} ({formData.institution})</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6B7280]">Work Authorization:</dt>
                  <dd className="font-semibold text-[#111114]">{formData.workAuth}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6B7280]">Attached Resume:</dt>
                  <dd className="font-semibold text-[#1B8A5A] flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {formData.resumeId}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#D6F3E6] rounded-2xl text-[#111114]">
                <span className="text-xs font-bold text-[#1B8A5A] uppercase">Form Complexity</span>
                <p className="text-lg font-bold text-[#111114] mt-1">LOW (2 / 5 Score)</p>
              </div>
              <div className="p-4 bg-[#FCE0C8] rounded-2xl text-[#111114]">
                <span className="text-xs font-bold text-[#B7791F] uppercase">Detected Barriers</span>
                <p className="text-sm font-semibold text-[#111114] mt-1">1 Work Auth Question</p>
              </div>
              <div className="p-4 bg-[#E3DDFB] rounded-2xl text-[#111114]">
                <span className="text-xs font-bold text-indigo-700 uppercase">Assistance Active</span>
                <p className="text-sm font-semibold text-[#111114] mt-1">Translator & Voice</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#ECECF0]">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < 5 ? (
            <Button variant="primary" onClick={handleNext}>
              Next Stage <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFinalSubmitClick} className="bg-[#111114] hover:bg-slate-800">
              <Send className="w-4 h-4 mr-2" />
              {isRealApplication ? 'Submit Application' : 'Complete Simulation'}
            </Button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Explicit Confirmation Required"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              isLoading={isSubmitting}
              onClick={handleConfirmedSubmission}
            >
              Explicitly Confirm & Submit
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left text-[#111114]">
          <p className="text-sm">
            Per AccessHire AI security policy, applications are <strong>never submitted automatically</strong> by voice or AI assistants.
          </p>
          <div className="p-4 bg-[#F1F1F4] rounded-2xl text-xs space-y-1">
            <p className="font-semibold text-[#111114]">Position: {job?.title || 'Junior Developer'}</p>
            <p className="text-[#6B7280]">Company: {job?.company || 'NovaByte Technologies'}</p>
            <p className="text-[#6B7280]">Candidate: {formData.fullName} ({formData.email})</p>
          </div>
          <p className="text-xs text-[#B7791F]">
            By clicking "Explicitly Confirm & Submit", your application state will be saved to your Application Tracker.
          </p>
        </div>
      </Modal>
    </div>
  );
};
