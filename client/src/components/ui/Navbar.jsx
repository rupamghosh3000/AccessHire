import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Search, FileText, Sliders, Sparkles, User, LogOut, Menu, X, Layers, MapPin, Briefcase, ChevronDown, Bell, Mic } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useVoice } from '../../hooks/useVoice';
import { AccessibilityPassportModal } from '../accessibility/AccessibilityPassportModal';
import { Button } from './Button';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { voiceState, startListening, stopListening, lastTranscript } = useVoice();
  const navigate = useNavigate();
  const location = useLocation();

  const isListening = voiceState === 'LISTENING';

  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(quickSearch)}`);
    }
  };

  const isJobSearchOrDashboard = location.pathname === '/jobs' || location.pathname === '/dashboard' || location.pathname === '/';

  return (
    <>
      <header className="bg-[#18191D] text-white px-6 sm:px-10 pt-6 pb-8 rounded-b-[36px] shadow-lg relative z-20 text-left">
        {/* Top Row: Brand, Voice Indicator, Main Nav & Profile */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Brand & Voice Mode pill */}
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 p-0.5">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                AccessHire<span className="text-sky-400 ml-0.5">AI</span>
              </span>
            </Link>

            <span
              onClick={isListening ? stopListening : startListening}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 transition rounded-full text-xs font-medium cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse'
                  : 'bg-white/10 hover:bg-white/15 text-emerald-400 border border-emerald-500/20'
              }`}
              title={isListening ? 'Listening... Click to stop voice control' : 'Click to start voice command listening'}
            >
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
              {isListening ? (lastTranscript ? `"${lastTranscript}"` : 'Listening... 🎙️') : 'Voice Mode: Ready 🎙️'}
            </span>
          </div>

          {/* Center Main Navigation */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center space-x-7 text-sm font-medium text-gray-300">
            <Link to="/jobs" className={`transition ${location.pathname === '/jobs' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              Find job
            </Link>
            <Link to="/barrier-lens" className={`transition ${location.pathname === '/barrier-lens' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              BarrierLens
            </Link>
            <Link to="/try-before-apply/66e1a0000000000000000001" className="hover:text-white transition">
              Try Before Apply
            </Link>
            <Link to="/applications" className={`transition ${location.pathname === '/applications' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              Adaptive Hub
            </Link>
            <Link to="/accessibility-passport" className={`transition ${location.pathname === '/accessibility-passport' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              Passport
            </Link>
            <Link to="/resume-center" className={`transition ${location.pathname === '/resume-center' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              Resumes
            </Link>
            <Link to="/ai-assistant" className={`transition ${location.pathname === '/ai-assistant' ? 'text-white font-semibold' : 'hover:text-white'}`}>
              AI Assistant
            </Link>
          </nav>

          {/* Right Utilities & User Profile */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300 font-medium">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Mumbai, IN</span>
            </div>

            <button
              type="button"
              onClick={() => setIsPassportModalOpen(true)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-bold text-sky-400 border border-white/10 transition cursor-pointer"
              title="Increase Font Scale & High Contrast Mode"
            >
              A+
            </button>

            <button
              type="button"
              onClick={() => setIsPassportModalOpen(true)}
              aria-label="Account Settings"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/applications')}
              aria-label="Notifications"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div
                  onClick={() => navigate('/dashboard')}
                  className="relative cursor-pointer pl-1"
                  title={`Logged in as ${user.name}`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 ring-2 ring-white/20 flex items-center justify-center font-bold text-white text-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#18191D] rounded-full"></span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  title="Sign out"
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-white hover:bg-white/10 text-xs">
                  Sign In
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/register')} className="text-xs">
                  Register
                </Button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-full bg-white/5 text-gray-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Second Row: Horizontal Search & Filters Toolbar */}
        {isJobSearchOrDashboard && (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="flex items-center justify-between bg-[#23242A] hover:bg-[#2A2B33] transition px-4 py-2.5 rounded-full border border-white/5 cursor-pointer">
                <div className="flex items-center gap-3 overflow-hidden w-full">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Search jobs / roles"
                    className="bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-400 w-full"
                  />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
              </div>
            </form>

            <div
              onClick={() => navigate('/jobs?workMode=remote')}
              className="flex items-center justify-between bg-[#23242A] hover:bg-[#2A2B33] transition px-4 py-2.5 rounded-full border border-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-200 truncate">Work location</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            </div>

            <div
              onClick={() => navigate('/jobs?experience=Entry')}
              className="flex items-center justify-between bg-[#23242A] hover:bg-[#2A2B33] transition px-4 py-2.5 rounded-full border border-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-200 truncate">Experience</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            </div>

            <div
              onClick={() => navigate('/jobs')}
              className="flex items-center justify-between bg-[#23242A] hover:bg-[#2A2B33] transition px-4 py-2.5 rounded-full border border-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Sliders className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-200 truncate">Per month</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            </div>

            {/* Salary Range Slider */}
            <div className="flex flex-col justify-center px-3 py-1">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-400 font-medium">Salary range</span>
                <span className="text-white font-semibold tracking-wide">₹6L–₹26L</span>
              </div>
              <div className="dual-range-track">
                <div className="dual-range-progress"></div>
                <div className="dual-thumb-left"></div>
                <div className="dual-thumb-right"></div>
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 p-4 bg-[#23242A] text-white rounded-2xl border border-white/10 space-y-2 text-left">
            <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">Find job</Link>
            <Link to="/barrier-lens" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">BarrierLens</Link>
            <Link to="/try-before-apply/66e1a0000000000000000001" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">Try Before Apply</Link>
            <Link to="/applications" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">Adaptive Hub</Link>
            <Link to="/accessibility-passport" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">Passport</Link>
            <Link to="/resume-center" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">Resumes</Link>
            <Link to="/ai-assistant" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-medium hover:text-sky-400">AI Assistant</Link>
          </div>
        )}
      </header>

      <AccessibilityPassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
      />
    </>
  );
};
