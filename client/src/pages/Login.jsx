import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonPrimary } from '../components/Buttons';

/**
 * Login Page
 */
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-8 shadow-2xl border border-primary/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❤️</span>
            </div>
            <h1 className="text-3xl font-bold text-light mb-2">Welcome Back</h1>
            <p className="text-light/60">Login to your DevTinder account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <ButtonPrimary
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Logging in...' : 'Login'}
            </ButtonPrimary>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-light/60 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-secondary font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-light/70 text-xs font-medium mb-2">Demo Credentials:</p>
            <p className="text-light/60 text-xs">Email: kanak@devtinder.com</p>
            <p className="text-light/60 text-xs">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
