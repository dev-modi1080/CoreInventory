import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { Package } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useInventory();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(login(email, password)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-container flex-center">
      <div className="card glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div className="flex-center mb-4" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
            <Package size={32} />
          </div>
          <h1 className="h2 text-center" style={{ marginBottom: 0 }}>CoreInventory</h1>
          <p className="text-muted-foreground text-center">Digitize your stock operations seamlessly.</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              required
              placeholder="manager@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input 
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
            Sign In to Workspace
          </button>
        </form>

        <div className="flex-center mt-4" style={{ marginTop: '2rem' }}>
          <Link to="/reset-password" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
