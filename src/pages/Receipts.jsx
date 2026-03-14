import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { ArrowDownToLine, Package, Search } from 'lucide-react';

export default function Receipts() {
  const { products, executeTransaction } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleReceipt = (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert('Select a product');
    
    executeTransaction('RECEIPT', selectedProduct, quantity, { supplier });
    alert('Receipt processed successfully!');
    setQuantity('');
    setSelectedProduct('');
    setSupplier('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h1 className="h1">Incoming Goods (Receipts)</h1>
        <p className="text-muted-foreground">Log items arriving from vendors to increase stock.</p>
      </div>

      <div className="card glass-panel" style={{ maxWidth: '600px' }}>
        <h2 className="h2 flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--success)' }}>
          <ArrowDownToLine size={24} /> Create Receipt
        </h2>
        
        <form onSubmit={handleReceipt} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Supplier / Vendor Name</label>
            <input 
              type="text" 
              required 
              value={supplier} 
              onChange={e => setSupplier(e.target.value)} 
              placeholder="e.g. Acme Steel Corp" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Select Product</label>
            <select required value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="" disabled>-- Choose a product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku}) - Current: {p.stock} {p.uom}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Quantity Received</label>
            <input 
              type="number" 
              required 
              min="1" 
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              placeholder="Enter quantity" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', background: 'var(--success)', color: 'var(--bg-main)' }}>
            Validate Receipt -&gt; Add Stock
          </button>
        </form>
      </div>
    </div>
  );
}
