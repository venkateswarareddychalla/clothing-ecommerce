import { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products?limit=10')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Featured Collection</h1>
          <p className="text-gray-600 text-lg">Discover our handpicked selection</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
