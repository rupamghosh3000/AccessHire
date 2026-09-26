import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
        <h1 className="text-3xl font-extrabold text-[#111114]">Create Candidate Account</h1>
        <p className="text-sm text-[#6B7280]">Set up your profile and configure your Accessibility Passport.</p>
      </div>

      <div className="p-8 bg-white border border-[#ECECF0] rounded-3xl shadow-sm space-y-6">
        {error && (
          <div className="p-4 bg-[#FBE2E2] border border-[#C23A3A]/20 rounded-2xl text-xs text-[#C23A3A] font-semibold" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Johnson"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. alex@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a secure password..."
          />

          <Button type="submit" variant="primary" isLoading={loading} className="w-full">
            <UserPlus className="w-4 h-4 mr-2" /> Create Account
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-[#6B7280]">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};
