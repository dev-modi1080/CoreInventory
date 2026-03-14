import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowRightLeft, 
  SlidersHorizontal,
  LogOut,
  User,
  Settings
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useInventory();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/receipts', icon: <ArrowDownToLine size={20} />, label: 'Receipts' },
    { path: '/deliveries', icon: <ArrowUpFromLine size={20} />, label: 'Deliveries' },
    { path: '/transfers', icon: <ArrowRightLeft size={20} />, label: 'Transfers' },
    { path: '/adjustments', icon: <SlidersHorizontal size={20} />, label: 'Adjustments' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--primary)' }}>
            <Package size={24} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>CoreInventory</span>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>
            Menu
          </div>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all var(--transition-fast)'
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
             <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
                <User size={16} /> My Profile
             </button>
             <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
                <Settings size={16} /> Settings
             </button>
             <button className="btn btn-outline" onClick={handleLogout} style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--danger)' }}>
                <LogOut size={16} /> Logout
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ backgroundColor: 'var(--bg-main)' }}>
        <header style={{ height: 'var(--header-height)', backgroundColor: 'var(--bg-panel)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'flex-end' }}>
          {/* Topbar Search or Notifications could go here */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
             <span className="badge badge-success">System Online</span>
          </div>
        </header>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
