import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem('cart');
      setCart(localCart ? JSON.parse(localCart) : []);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setCart(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (product, size, qty = 1) => {
    if (user) {
      try {
        await axios.post('/api/cart/add', { productId: product._id, size, qty });
        fetchCart();
      } catch (err) {
        throw err;
      }
    } else {
      const existing = cart.find(i => i.product === product._id && i.size === size);
      const newQty = existing ? existing.qty + qty : qty;
      
      if (newQty > product.stock) {
        throw new Error('Order quantity greater than stock available');
      }
      
      let newCart;
      if (existing) {
        newCart = cart.map(i => i.product === product._id && i.size === size ? { ...i, qty: newQty } : i);
      } else {
        newCart = [...cart, { product: product._id, name: product.name, size, qty: newQty, price: product.price }];
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const updateQty = async (itemId, qty, stock) => {
    if (user) {
      try {
        await axios.put('/api/cart/update', { itemId, qty });
        fetchCart();
      } catch (err) {
        if (err.response?.data?.message) alert(err.response.data.message);
        throw err;
      }
    } else {
      if (stock && qty > stock) {
        alert('Order quantity greater than stock available');
        return;
      }
      const newCart = cart.map(i => {
        if (typeof itemId === 'string' && i.product === itemId) {
          return { ...i, qty };
        }
        return i;
      });
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeItem = async (itemId, size) => {
    if (user) {
      await axios.delete('/api/cart/remove', { data: { itemId } });
      fetchCart();
    } else {
      const newCart = size ? cart.filter(i => !(i.product === itemId && i.size === size)) : cart.filter(i => i.product !== itemId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
