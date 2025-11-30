import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { navigate } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedSize(res.data.sizes[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) return alert('Select a size');
    try {
      await addToCart(product, selectedSize, qty);
      alert('Added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to add to cart');
    }
  };

  if (!product) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Back</button>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full rounded" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <p className="mb-2">Category: {product.category}</p>
          <p className="mb-4">Stock: {product.stock}</p>
          
          <div className="mb-4">
            <label className="block mb-2 font-bold">Select Size:</label>
            <div className="flex gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 border rounded ${selectedSize === s ? 'bg-blue-600 text-white' : ''}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Quantity:</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="bg-gray-300 px-4 py-2 rounded font-bold">-</button>
              <span className="text-xl font-bold w-12 text-center">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="bg-gray-300 px-4 py-2 rounded font-bold">+</button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="bg-green-600 text-white px-6 py-3 rounded text-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
