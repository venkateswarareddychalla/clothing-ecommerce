import { useContext, useState, useEffect } from 'react';
import axios from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQty, removeItem } = useContext(CartContext);
  const { user, navigate } = useContext(AuthContext);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = [...new Set(cart.map(item => {
        if (user) {
          return typeof item.product === 'string' ? item.product : item.product?._id;
        }
        return item.product;
      }))];
      const productData = {};
      for (const id of productIds) {
        if (id && typeof id === 'string') {
          try {
            const { data } = await axios.get(`/api/products/${id}`);
            productData[id] = data;
          } catch (err) {
            console.error(err);
          }
        }
      }
      setProducts(productData);
    };
    if (cart.length > 0) fetchProducts();
  }, [cart, user]);

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" alt="Empty Cart" className="w-64 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => navigate('/products')} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded text-sm">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={user ? item._id : `${item.product}-${item.size}`} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(user ? item._id : item.product, Math.max(1, item.qty - 1))} className="bg-gray-300 px-3 py-1 rounded font-bold">-</button>
                <span className="font-bold w-8 text-center">{item.qty}</span>
                <button onClick={() => {
                  const productId = user ? (typeof item.product === 'string' ? item.product : item.product?._id) : item.product;
                  const stock = products[productId]?.stock;
                  updateQty(user ? item._id : item.product, item.qty + 1, stock);
                }} className="bg-gray-300 px-3 py-1 rounded font-bold">+</button>
              </div>
              <p className="font-bold">₹{item.qty * item.price}</p>
              <button onClick={() => removeItem(user ? item._id : item.product, user ? null : item.size)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
        <button onClick={handleCheckout} className="mt-4 bg-green-600 text-white px-6 py-3 rounded text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
