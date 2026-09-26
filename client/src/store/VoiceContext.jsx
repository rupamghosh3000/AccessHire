import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const VoiceContext = createContext(null);

export const VoiceProvider = ({ children, onVoiceCommand }) => {
  const [voiceState, setVoiceState] = useState('READY'); // LISTENING | PROCESSING | READY | NOT_SUPPORTED
  const [lastTranscript, setLastTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setVoiceState('NOT_SUPPORTED');
    }
  }, []);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setVoiceState('NOT_SUPPORTED');
      speak("Voice control isn't supported in this browser. You can use keyboard or standard controls.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setVoiceState('LISTENING');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setLastTranscript(transcript);
        setVoiceState('PROCESSING');
        parseAndExecuteCommand(transcript);
      };

      recognition.onerror = (err) => {
        console.warn('[Voice Recognition Error]', err);
        setVoiceState('READY');
      };

      recognition.onend = () => {
        setVoiceState((prev) => (prev === 'LISTENING' ? 'READY' : prev));
      };

      recognition.start();
    } catch (err) {
      console.warn('[Voice Start Error]', err);
      setVoiceState('READY');
    }
  };

  const stopListening = () => {
    setVoiceState('READY');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const parseAndExecuteCommand = (cmd) => {
    setTimeout(() => {
      setVoiceState('READY');
    }, 1000);

    if (cmd.includes('stop') || cmd.includes('cancel')) {
      stopListening();
      speak('Voice listening cancelled.');
      return;
    }

    // Authentication Voice Commands
    if (cmd.includes('register') || cmd.includes('create account') || cmd.includes('sign up')) {
      speak('Navigating to candidate registration page.');
      navigate('/register');
      return;
    }

    if (cmd.includes('sign in') || cmd.includes('login') || cmd.includes('log in')) {
      speak('Navigating to sign in page.');
      navigate('/login');
      return;
    }

    // Apply & Simulation Voice Commands
    if (cmd.includes('apply to this job') || cmd.includes('apply now') || cmd.includes('guided apply')) {
      speak('Opening Adaptive Apply guided form.');
      navigate('/adaptive-apply/66e1a0000000000000000001');
      return;
    }

    if (cmd.includes('try before apply') || cmd.includes('try job') || cmd.includes('simulate')) {
      speak('Opening Try Before You Apply application simulator.');
      navigate('/try-before-apply/66e1a0000000000000000001');
      return;
    }

    // Navigation Voice Commands
    if (cmd.includes('dashboard') || cmd.includes('home')) {
      speak('Opening candidate dashboard.');
      navigate('/dashboard');
      return;
    }

    if (cmd.includes('jobs') || cmd.includes('discover jobs') || cmd.includes('browse jobs')) {
      speak('Opening job discovery page.');
      navigate('/jobs');
      return;
    }

    if (cmd.includes('barrier') || cmd.includes('barrierlens') || cmd.includes('inspect')) {
      speak('Opening BarrierLens accessibility breakdown.');
      navigate('/barrier-lens');
      return;
    }

    if (cmd.includes('application') || cmd.includes('my applications') || cmd.includes('tracker')) {
      speak('Opening application tracker and history.');
      navigate('/applications');
      return;
    }

    if (cmd.includes('resume') || cmd.includes('resume center')) {
      speak('Opening resume center.');
      navigate('/resume-center');
      return;
    }

    if (cmd.includes('assistant') || cmd.includes('ai assistant')) {
      speak('Opening AI Assistant chat.');
      navigate('/ai-assistant');
      return;
    }

    if (cmd.includes('passport') || cmd.includes('accessibility settings')) {
      speak('Opening Accessibility Passport.');
      navigate('/accessibility-passport');
      return;
    }

    // Voice Search
    if (cmd.includes('search for') || cmd.includes('find') || cmd.includes('java') || cmd.includes('python')) {
      const query = cmd
        .replace('search for', '')
        .replace('find', '')
        .replace('jobs', '')
        .trim();
      speak(`Searching job listings for ${query || 'positions'}.`);
      navigate(`/jobs?q=${encodeURIComponent(query || 'Java')}`);
      return;
    }

    if (cmd.includes('remote')) {
      speak('Filtering remote job listings.');
      navigate('/jobs?workMode=remote');
      return;
    }

    if (cmd.includes('next')) {
      speak('Moving forward.');
      if (onVoiceCommand) onVoiceCommand('next');
      return;
    }

    if (cmd.includes('back') || cmd.includes('go back')) {
      speak('Going back.');
      window.history.back();
      return;
    }

    if (cmd.includes('read this page') || cmd.includes('read page')) {
      const mainText = document.querySelector('main')?.innerText || 'AccessHire AI page content';
      speak(mainText.slice(0, 300));
      return;
    }

    if (onVoiceCommand) {
      onVoiceCommand(cmd);
    } else {
      speak(`Executed voice action: ${cmd}`);
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        voiceState,
        lastTranscript,
        isSupported,
        startListening,
        stopListening,
        speak,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
