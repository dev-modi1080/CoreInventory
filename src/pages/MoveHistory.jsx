import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { History, Search, ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, Package } from 'lucide-react';

export default function MoveHistory() {
  const { transactions } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'RECEIPT': return <div className="badge badge-success" style={{ padding: '0.4rem', borderRadius: '50%' }}><ArrowDownToLine size={14} /></div>;
      case 'DELIVERY': return <div className="badge badge-warning" style={{ padding: '0.4rem', borderRadius: '50%' }}><ArrowUpFromLine size={14} /></div>;
      case 'TRANSFER': return <div className="badge badge-default" style={{ padding: '0.4rem', borderRadius: '50%' }}><ArrowRightLeft size={14} /></div>;
      case 'ADJUSTMENT': return <div className="badge badge-danger" style={{ padding: '0.4rem', borderRadius: '50%' }}><Package size={14} /></div>;
      default: return <Package size={14} />;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div className="flex-between">
        <div>
          <h1 className="h1">Move History</h1>
          <p className="text-muted-foreground">Comprehensive ledger of all stock movements.</p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', padding: '1rem 1.5rem' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by Product ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ minWidth: '180px' }}>
          <option value="ALL">All Movements</option>
          <option value="RECEIPT">Receipts</option>
          <option value="DELIVERY">Deliveries</option>
          <option value="TRANSFER">Transfers</option>
          <option value="ADJUSTMENT">Adjustments</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-panel)', zIndex: 10 }}>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Date & Time</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Product ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Quantity</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Location Info</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Reference Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{new Date(t.date).toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'capitalize' }}>
                    {getTransactionIcon(t.type)}
                    <span style={{ fontWeight: 500 }}>{t.type.toLowerCase()}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{t.productId}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{t.quantity}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                     {t.location && <span>From: {t.location}</span>}
                     {t.toLocation && <span> → To: {t.toLocation}</span>}
                     {!t.location && !t.toLocation && "-"}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {t.supplier && <span>Supplier: {t.supplier}</span>}
                    {t.customer && <span>Customer: {t.customer}</span>}
                    {t.previousStock !== undefined && <span>Prev Stock: {t.previousStock}</span>}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <History size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                    <p>No transactions found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .table-row-hover:hover { background-color: var(--bg-hover); }
      `}} />
    </div>
  );
}
