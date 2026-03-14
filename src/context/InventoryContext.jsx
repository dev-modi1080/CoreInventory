import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth Functions
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const sendOtp = async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Don't allow signup via OTP if strictly manager app
      }
    });
    if (error) throw error;
    return true;
  };

  const verifyOtp = async (email, token) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;
    return true;
  };

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
    session,
    login,
    logout,
    sendOtp,
    verifyOtp,
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
