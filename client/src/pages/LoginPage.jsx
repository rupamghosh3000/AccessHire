import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, LogIn, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemoAccount = async () => {
    setEmail('demo@accesshire.ai');
    setPassword('Password123!');
    setLoading(true);
    try {
      await login('demo@accesshire.ai', 'Password123!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in with demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-[#E3DDFB] rounded-full text-[#111114] mb-2">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#111114]">Sign In to AccessHire</h1>
        <p className="text-sm text-[#6B7280]">Access your saved jobs, applications, and Accessibility Passport.</p>
      </div>

      <div className="p-8 bg-white border border-[#ECECF0] rounded-3xl shadow-sm space-y-6">
        {error && (
          <div className="p-4 bg-[#FBE2E2] border border-[#C23A3A]/20 rounded-2xl text-xs text-[#C23A3A] font-semibold" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. demo@accesshire.ai"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />

          <Button type="submit" variant="primary" isLoading={loading} className="w-full">
            <LogIn className="w-4 h-4 mr-2" /> Sign In
          </Button>
        </form>

        <div className="pt-4 border-t border-[#ECECF0] text-center space-y-3">
          <p className="text-xs text-[#6B7280]">Or use instant hackathon demo credentials:</p>
          <Button
            type="button"
            variant="secondary"
            onClick={handleUseDemoAccount}
            isLoading={loading}
            className="w-full text-xs"
          >
            <Sparkles className="w-4 h-4 mr-2 text-indigo-600" /> Sign In as Demo Candidate
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-[#6B7280]">
        Don't have an account yet?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
          Register for free
        </Link>
      </p>
    </div>
  );
};
