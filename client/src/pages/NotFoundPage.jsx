import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <h1 className="text-6xl font-extrabold text-brand-400">404</h1>
      <h2 className="text-2xl font-bold text-slate-100">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md">
        The requested page could not be located. You can navigate back to the home page or browse available jobs.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        <Home className="w-4 h-4 mr-2" /> Return to Home
      </Button>
    </div>
  );
};
