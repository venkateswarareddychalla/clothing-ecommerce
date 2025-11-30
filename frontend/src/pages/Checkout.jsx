import { useContext, useState } from 'react';
import axios from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { navigate } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/orders');
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="border rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{item.name} ({item.size}) x{item.qty}</span>
            <span>₹{item.qty * item.price}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-green-600 text-white p-3 rounded text-lg disabled:bg-gray-400">
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
