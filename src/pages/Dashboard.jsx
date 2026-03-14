import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Filter, ChevronRight, Package, ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft } from 'lucide-react';

export default function Dashboard() {
  const { kpis, transactions } = useInventory();
  const [filterType, setFilterType] = useState('ALL');

  const filteredTransactions = filterType === 'ALL' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'RECEIPT': return <div className="badge badge-success" style={{ padding: '0.5rem', borderRadius: '50%' }}><ArrowDownToLine size={16} /></div>;
      case 'DELIVERY': return <div className="badge badge-warning" style={{ padding: '0.5rem', borderRadius: '50%' }}><ArrowUpFromLine size={16} /></div>;
      case 'TRANSFER': return <div className="badge badge-default" style={{ padding: '0.5rem', borderRadius: '50%' }}><ArrowRightLeft size={16} /></div>;
      case 'ADJUSTMENT': return <div className="badge badge-danger" style={{ padding: '0.5rem', borderRadius: '50%' }}><Package size={16} /></div>;
      default: return <Package size={16} />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'RECEIPT': return <span className="badge badge-success">Receipt</span>;
      case 'DELIVERY': return <span className="badge badge-warning">Delivery</span>;
      case 'TRANSFER': return <span className="badge badge-default">Transfer</span>;
      case 'ADJUSTMENT': return <span className="badge badge-danger">Adjustment</span>;
      default: return type;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="h1">Dashboard Overview</h1>
        <p className="text-muted-foreground">A snapshot of your inventory operations.</p>
      </div>
      
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
           <p className="text-muted-foreground" style={{ fontWeight: 600 }}>Total Products</p>
           <h3 className="h1" style={{ margin: '0.5rem 0' }}>{kpis.totalProducts}</h3>
           <p style={{ fontSize: '0.875rem', color: 'var(--success)' }}>Active catalog size</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--danger)' }}>
           <p className="text-muted-foreground" style={{ fontWeight: 600 }}>Low / Out of Stock</p>
           <h3 className="h1" style={{ margin: '0.5rem 0' }}>{kpis.lowStock}</h3>
           <p style={{ fontSize: '0.875rem', color: 'var(--danger)' }}>Items need attention</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--warning)' }}>
           <p className="text-muted-foreground" style={{ fontWeight: 600 }}>Pending Receipts</p>
           <h3 className="h1" style={{ margin: '0.5rem 0' }}>{kpis.pendingReceipts}</h3>
           <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Incoming expected</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
           <p className="text-muted-foreground" style={{ fontWeight: 600 }}>Pending Deliveries</p>
           <h3 className="h1" style={{ margin: '0.5rem 0' }}>{kpis.pendingDeliveries}</h3>
           <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Outgoing scheduled</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="h2" style={{ margin: 0 }}>Recent Activity</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Filter size={18} color="var(--text-secondary)" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '0.5rem', width: 'auto' }}>
              <option value="ALL">All Documents</option>
              <option value="RECEIPT">Receipts</option>
              <option value="DELIVERY">Deliveries</option>
              <option value="TRANSFER">Transfers</option>
              <option value="ADJUSTMENT">Adjustments</option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
           <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
             <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
             <p>No recent activity found.</p>
           </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Product ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Quantity</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Details</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(0, 10).map(t => (
                  <tr key={t.id} style={{ borderTop: '1px solid var(--border)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                    <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {getTransactionIcon(t.type)}
                      {getTypeLabel(t.type)}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{t.productId}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{new Date(t.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{t.quantity}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                       {t.location && <span>Loc: {t.location}</span>}
                       {t.toLocation && <span> → {t.toLocation}</span>}
                       {!t.location && !t.toLocation && "-"}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                       <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}><ChevronRight size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .table-row-hover:hover { background-color: var(--bg-hover); }
      `}} />
    </div>
  );
}
