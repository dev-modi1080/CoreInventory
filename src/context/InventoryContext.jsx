import React, { createContext, useState, useContext, useEffect } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Mock Data Initialization
  const [products, setProducts] = useState([
    { id: '1', name: 'Steel Rods', sku: 'ST-001', category: 'Raw Material', uom: 'kg', stock: 500, location: 'Main Store' },
    { id: '2', name: 'Office Chair', sku: 'FUR-001', category: 'Furniture', uom: 'pcs', stock: 50, location: 'Warehouse 1' },
    { id: '3', name: 'Laptop Pro', sku: 'EL-001', category: 'Electronics', uom: 'pcs', stock: 15, location: 'Warehouse 2' },
  ]);

  const [transactions, setTransactions] = useState([]);

  // Auth Functions
  const login = (email, password) => {
    // Mock login
    setUser({ name: 'Admin User', email, role: 'Inventory Manager' });
    return true;
  };

  const logout = () => setUser(null);

  // Inventory Functions
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const executeTransaction = (type, productId, quantity, details) => {
    const transaction = {
      id: Date.now().toString(),
      type, // 'RECEIPT', 'DELIVERY', 'TRANSFER', 'ADJUSTMENT'
      productId,
      quantity,
      date: new Date().toISOString(),
      ...details
    };
    
    setTransactions(prev => [transaction, ...prev]);

    // Update Stock
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        let newStock = p.stock;
        if (type === 'RECEIPT') newStock += Number(quantity);
        if (type === 'DELIVERY') newStock -= Number(quantity);
        if (type === 'ADJUSTMENT') newStock = Number(quantity); // Set exact match or adjust relative
        
        let newLocation = p.location;
        if (type === 'TRANSFER' && details.toLocation) {
             newLocation = details.toLocation;
        }

        return { ...p, stock: newStock, location: newLocation };
      }
      return p;
    }));
  };

  const value = {
    user,
    login,
    logout,
    products,
    addProduct,
    transactions,
    executeTransaction,
    kpis: {
      totalProducts: products.length,
      lowStock: products.filter(p => p.stock < 20).length,
      pendingReceipts: 3, // Mock value
      pendingDeliveries: 5 // Mock value
    }
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
