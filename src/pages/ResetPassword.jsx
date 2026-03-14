import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, KeyRound } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOtp, verifyOtp } = useInventory();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendOtp(email);
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container flex-center">
      <div className="card glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div className="flex-center mb-4" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--warning-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--warning)' }}>
            <KeyRound size={32} />
          </div>
          <h2 className="h2 text-center" style={{ marginBottom: 0 }}>Reset Password</h2>
          <p className="text-muted-foreground text-center">
            {step === 1 ? "Enter your email to receive an OTP." : "Enter the 6-digit OTP sent to your email."}
          </p>
        </div>
        
        {error && (
          <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '1rem', width: '100%' }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
              <input type="email" required placeholder="manager@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>6-Digit OTP</label>
              <input type="text" required placeholder="123456" maxLength={6} style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }} value={otp} onChange={e => setOtp(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>
        )}

        <div className="flex-center mt-4" style={{ marginTop: '2rem' }}>
          <Link to="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
