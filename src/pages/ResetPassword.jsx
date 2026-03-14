import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, KeyRound } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useInventory();

  const handleSendOTP = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    login(email || 'manager@company.com', 'reset');
    navigate('/dashboard');
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
        
        {step === 1 ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
              <input type="email" required placeholder="manager@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>6-Digit OTP</label>
              <input type="text" required placeholder="123456" maxLength={6} style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
              Verify & Reset Login
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
