import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../services/api';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!order) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <h1 className="text-2xl font-bold">Order Placed Successfully! ✓</h1>
      </div>

      <div className="border rounded p-6">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p className="mb-2"><strong>Order ID:</strong> {order._id}</p>
        <p className="mb-4"><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        
        <h3 className="font-bold mb-2">Items:</h3>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{item.name} ({item.size}) x{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{order.totalPrice}</span>
          </div>
        </div>

        <p className="mt-6 text-gray-600">A confirmation email has been sent to your registered email address.</p>
      </div>

      <Link to="/products" className="block mt-6 text-center bg-blue-600 text-white p-3 rounded">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
