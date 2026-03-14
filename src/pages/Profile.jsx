import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { User, Mail, Shield, KeyRound } from 'lucide-react';

export default function Profile() {
  const { user, session } = useInventory();

  // Handle case where user is not fully loaded
  if (!user && !session) return <div>Loading profile...</div>;

  const userEmail = user?.email || session?.user?.email || 'manager@company.com';
  const role = 'Inventory Manager'; // Currently hardcoded role

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', maxWidth: '600px' }}>
      <div>
        <h1 className="h1 flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
          <User size={32} /> My Profile
        </h1>
        <p className="text-muted-foreground">Manage your personal account details.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="h2" style={{ margin: '0 0 0.25rem 0' }}>{userEmail.split('@')[0]}</h2>
            <div className="badge badge-primary">{role}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-hover)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}>
              <Mail size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase' }}>Email Address</p>
              <p style={{ fontWeight: 500 }}>{userEmail}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-hover)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}>
              <Shield size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase' }}>Access Level</p>
              <p style={{ fontWeight: 500 }}>Full Read/Write Access</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-hover)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}>
              <KeyRound size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase' }}>Authentication</p>
              <p style={{ fontWeight: 500 }}>Supabase Auth Provider</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
