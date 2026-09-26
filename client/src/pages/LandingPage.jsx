import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroNetworkScene } from '../components/3d/HeroNetworkScene';
import { Button } from '../components/ui/Button';
import { useVoice } from '../hooks/useVoice';
import { ShieldCheck, PlayCircle, Sliders, Mic, Sparkles, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { startListening } = useVoice();
  const [activeNode, setActiveNode] = useState('discover');

  const nodeDetails = {
    discover: {
      title: '1. Discover Jobs Directly',
      desc: 'Filter opportunities by skills, work arrangement, or hands-free voice input. Job listings display required competencies and work mode immediately.',
    },
    understand: {
      title: '2. Understand Application Terms',
      desc: 'Plain-language summaries and evidence-based requirement matching help you compare job expectations with your background without guessing.',
    },
    check: {
      title: '3. BarrierLens Accessibility Inspection',
      desc: 'Identify potential keyboard traps, missing form labels, and multi-step complexity before starting an application.',
    },
    apply: {
      title: '4. Adaptive Guided Application',
      desc: 'Complete applications in your chosen interaction mode — Standard, Simplified, Voice-First, or Keyboard-First — with full step previews.',
    },
  };

  return (
    <div className="space-y-16 pb-16 text-left pt-4">
      {/* Light, airy hero over white background */}
      <section className="pt-4 md:pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F1F1F4] text-[#111114]">
              <ShieldCheck className="w-4 h-4 mr-2 text-indigo-600" /> Accessible Job Application Assistant
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111114] tracking-tight leading-tight">
              Jobs shouldn't require a specific way of using technology.
            </h1>

            <p className="text-base sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              AccessHire adapts job discovery and applications to the way you work best — voice, keyboard, screen reader, or plain language.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button size="lg" variant="primary" onClick={() => navigate('/register')} className="text-sm px-8 py-3.5">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" onClick={startListening} className="text-sm px-7 py-3.5">
                <Mic className="w-4 h-4 mr-2" /> Try Voice Mode
              </Button>
            </div>
          </div>

          {/* 3D Pathway Scene on bright light container */}
          <div className="space-y-4 pt-2">
            <HeroNetworkScene activeNode={activeNode} onNodeSelect={(id) => setActiveNode(id)} />

            <div className="p-6 bg-[#F1F1F4] border border-[#ECECF0] rounded-2xl space-y-1.5 max-w-3xl mx-auto">
              <h3 className="text-base font-bold text-[#111114] flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
                {nodeDetails[activeNode]?.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {nodeDetails[activeNode]?.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Features 3-up Grid (Pastel paper cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#111114]">Built for Candidate Clarity</h2>
          <p className="text-sm text-[#6B7280]">
            Core features engineered to remove job portal friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-[#D6F3E6] rounded-2xl space-y-4 text-left text-[#111114]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B8A5A] shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">BarrierLens Inspection</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Inspect application steps for keyboard traps, missing labels, and form length before you begin.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/barrier-lens')} className="text-xs">
              Open BarrierLens →
            </Button>
          </div>

          <div className="p-7 bg-[#DCEEFB] rounded-2xl space-y-4 text-left text-[#111114]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-600 shadow-sm">
              <PlayCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Try Before You Apply</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Review a simulated multi-step application preview to understand form expectations upfront.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/try-before-apply/66e1a0000000000000000001')} className="text-xs">
              Test Simulation →
            </Button>
          </div>

          <div className="p-7 bg-[#E3DDFB] rounded-2xl space-y-4 text-left text-[#111114]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Adaptive Presentation</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Choose between Standard, Simplified, Voice-First, or Keyboard-First interfaces.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/adaptive-apply/66e1a0000000000000000001')} className="text-xs">
              Explore Modes →
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 bg-[#111114] text-white rounded-3xl text-center space-y-5 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">
            Experience job applications built around your preferences
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Configure your Accessibility Passport, upload your resume, and explore open developer positions.
          </p>
          <div>
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')} className="px-8 py-3 text-sm">
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
