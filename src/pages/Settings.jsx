import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Settings as SettingsIcon, MapPin, Plus, Trash2 } from 'lucide-react';

export default function Settings() {
  const { user } = useInventory();
  // Using local state for warehouses to keep it simple, 
  // in a real app this would come from the context/database
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Store', type: 'Primary Warehouse' },
    { id: 2, name: 'Warehouse 1', type: 'Storage' },
    { id: 3, name: 'Warehouse 2', type: 'Storage' },
    { id: 4, name: 'Production Rack', type: 'Shop Floor' }
  ]);
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('Storage');

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    setWarehouses([
      ...warehouses, 
      { id: Date.now(), name: newLocation, type: newType }
    ]);
    setNewLocation('');
  };

  const handleDeleteLocation = (id) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', maxWidth: '800px' }}>
      <div>
        <h1 className="h1 flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
          <SettingsIcon size={32} /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your system configurations and warehouse locations.</p>
      </div>

      <div className="card">
        <h2 className="h2 flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <MapPin size={20} color="var(--primary)" /> Manage Locations
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <form onSubmit={handleAddLocation} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 2, minWidth: '200px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Location Name</label>
              <input 
                type="text" 
                required
                value={newLocation} 
                onChange={(e) => setNewLocation(e.target.value)} 
                placeholder="e.g. Zone B Rack 4" 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '150px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Type</label>
              <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                <option value="Primary Warehouse">Primary Warehouse</option>
                <option value="Storage">Storage</option>
                <option value="Shop Floor">Shop Floor</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Transit">Transit</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Add
            </button>
          </form>

          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Location Name</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map(w => (
                  <tr key={w.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{w.name}</td>
                    <td style={{ padding: '1rem' }}><span className="badge badge-default">{w.type}</span></td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                       <button 
                          className="btn btn-outline" 
                          style={{ padding: '0.4rem', color: 'var(--danger)', border: 'none' }}
                          onClick={() => handleDeleteLocation(w.id)}
                       >
                         <Trash2 size={16} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
