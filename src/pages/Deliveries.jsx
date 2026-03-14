import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { ArrowUpFromLine } from 'lucide-react';

export default function Deliveries() {
  const { products, executeTransaction } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customer, setCustomer] = useState('');

  const productDetails = products.find(p => p.id === selectedProduct);

  const handleDelivery = (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert('Select a product');
    if (productDetails && Number(quantity) > productDetails.stock) {
      return alert('Error: Cannot deliver more than current stock!');
    }
    
    executeTransaction('DELIVERY', selectedProduct, quantity, { customer });
    alert('Delivery processed successfully!');
    setQuantity('');
    setSelectedProduct('');
    setCustomer('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h1 className="h1">Outgoing Goods (Deliveries)</h1>
        <p className="text-muted-foreground">Process sales orders and ship items to customers.</p>
      </div>

      <div className="card glass-panel" style={{ maxWidth: '600px' }}>
        <h2 className="h2 flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--warning)' }}>
          <ArrowUpFromLine size={24} /> Create Delivery Order
        </h2>
        
        <form onSubmit={handleDelivery} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Customer Name / Order ID</label>
            <input 
              type="text" 
              required 
              value={customer} 
              onChange={e => setCustomer(e.target.value)} 
              placeholder="e.g. SO-9942 or John Doe" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Select Product</label>
            <select required value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="" disabled>-- Choose a product --</option>
              {products.filter(p => p.stock > 0).map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku}) - Available: {p.stock} {p.uom}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Quantity to Deliver</label>
            <input 
              type="number" 
              required 
              min="1" 
              max={productDetails?.stock || ""}
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              placeholder="Enter quantity" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', background: 'var(--warning)', color: 'var(--bg-main)' }}>
            Validate Delivery -&gt; Deduct Stock
          </button>
        </form>
      </div>
    </div>
  );
}
