import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import { AccessibilityProvider } from '../store/AccessibilityContext';
import { VoiceProvider } from '../store/VoiceContext';

import { SkipLink } from '../components/accessibility/SkipLink';
import { FloatingPassportBar } from '../components/accessibility/FloatingPassportBar';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { JobSearchPage } from '../pages/JobSearchPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { BarrierLensPage } from '../pages/BarrierLensPage';
import { TryBeforeApplyPage } from '../pages/TryBeforeApplyPage';
import { AdaptiveApplyPage } from '../pages/AdaptiveApplyPage';
import { ResumeCenterPage } from '../pages/ResumeCenterPage';
import { ApplicationTrackerPage } from '../pages/ApplicationTrackerPage';
import { AccessibilityPassportPage } from '../pages/AccessibilityPassportPage';
import { AIAssistantPage } from '../pages/AIAssistantPage';
import { AccessibilityStatementPage } from '../pages/AccessibilityStatementPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <VoiceProvider>
            <div className="p-0 sm:p-4 lg:p-6 bg-[#DEE3EB] min-h-screen flex justify-center text-slate-900 font-sans">
              <div className="w-full max-w-[1720px] bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col min-h-[960px] relative">
                <SkipLink />
                <Navbar />

                <main id="main-content" tabIndex={-1} className="flex-1 bg-[#F8F9FB] flex flex-col">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/jobs" element={<JobSearchPage />} />
                    <Route path="/jobs/:id" element={<JobDetailsPage />} />
                    <Route path="/barrier-lens" element={<BarrierLensPage />} />
                    <Route path="/barrier-lens/:id" element={<BarrierLensPage />} />
                    <Route path="/try-before-apply/:id" element={<TryBeforeApplyPage />} />
                    <Route path="/adaptive-apply/:id" element={<AdaptiveApplyPage />} />
                    <Route path="/resume-center" element={<ResumeCenterPage />} />
                    <Route path="/applications" element={<ApplicationTrackerPage />} />
                    <Route path="/accessibility-passport" element={<AccessibilityPassportPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                <Footer />
              </div>

              <FloatingPassportBar />
            </div>
          </VoiceProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}

export default App;
