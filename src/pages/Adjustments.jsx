import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { SlidersHorizontal } from 'lucide-react';

export default function Adjustments() {
  const { products, executeTransaction } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newStock, setNewStock] = useState('');

  const productDetails = products.find(p => p.id === selectedProduct);

  const handleAdjustment = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (newStock === '') return alert('Enter a valid stock number');
    
    executeTransaction('ADJUSTMENT', selectedProduct, newStock, { 
      previousStock: productDetails.stock 
    });
    alert('Stock adjusted successfully!');
    setSelectedProduct('');
    setNewStock('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h1 className="h1">Stock Adjustments</h1>
        <p className="text-muted-foreground">Fix mismatches between recorded stock and physical counts.</p>
      </div>

      <div className="card glass-panel" style={{ maxWidth: '600px' }}>
        <h2 className="h2 flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <SlidersHorizontal size={24} /> Record Physical Count
        </h2>
        
        <form onSubmit={handleAdjustment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Select Product & Location</label>
            <select required value={selectedProduct} onChange={e => {
              setSelectedProduct(e.target.value);
              const p = products.find(prod => prod.id === e.target.value);
              setNewStock(p?.stock || '');
            }}>
              <option value="" disabled>-- Choose a product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku}) @ {p.location}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>System Recorded Stock</label>
              <input type="text" disabled value={productDetails?.stock ?? ''} style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--danger)' }}>Actual Counted Stock</label>
              <input 
                type="number" 
                required 
                min="0"
                value={newStock} 
                onChange={e => setNewStock(e.target.value)} 
                placeholder="Enter actual physical count" 
                style={{ borderColor: 'var(--danger)' }}
              />
            </div>
          </div>
          
          {productDetails && Number(newStock) !== productDetails.stock && (
            <div className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '0.75rem', display: 'block', textAlign: 'center' }}>
              Difference: {Number(newStock) - productDetails.stock} units
            </div>
          )}

          <button type="submit" className="btn btn-outline" style={{ marginTop: '1rem', border: '1px solid var(--danger)', color: 'var(--danger)' }}>
            Confirm Layout Mismatch -&gt; Adjust Ledger
          </button>
        </form>
      </div>
    </div>
  );
}
