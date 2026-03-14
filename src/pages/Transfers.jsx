import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { ArrowRightLeft } from 'lucide-react';

export default function Transfers() {
  const { products, executeTransaction } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [toLocation, setToLocation] = useState('');

  const productDetails = products.find(p => p.id === selectedProduct);

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (toLocation === productDetails.location) {
      return alert('Destination location must be different from current location.');
    }
    
    // For transfer, quantity represents the entire stock being moved, or we can just update location.
    // Simplifying: moving all stock of this product item to a new location.
    executeTransaction('TRANSFER', selectedProduct, productDetails.stock, { toLocation });
    alert('Internal transfer recorded log successfully!');
    setSelectedProduct('');
    setToLocation('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h1 className="h1">Internal Transfers</h1>
        <p className="text-muted-foreground">Move stock between warehouses or racks.</p>
      </div>

      <div className="card glass-panel" style={{ maxWidth: '600px' }}>
        <h2 className="h2 flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <ArrowRightLeft size={24} /> Move Stock
        </h2>
        
        <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Select Product</label>
            <select required value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="" disabled>-- Choose a product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Current Loc: {p.location})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>From Location</label>
              <input type="text" disabled value={productDetails?.location || ''} style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>To Location</label>
              <input 
                type="text" 
                required 
                value={toLocation} 
                onChange={e => setToLocation(e.target.value)} 
                placeholder="e.g. Production Floor" 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-outline" style={{ marginTop: '1rem', border: '1px solid var(--text-primary)' }}>
            Log Internal Transfer
          </button>
        </form>
      </div>
    </div>
  );
}
