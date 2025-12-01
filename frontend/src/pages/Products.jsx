import { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [search, category, size, minPrice, maxPrice, page]);

  const fetchProducts = async () => {
    const params = { page, search, category, size, minPrice, maxPrice };
    const { data } = await axios.get('/api/products', { params });
    setProducts(data.products);
    setTotal(data.pages);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Discover Products</h1>
        
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <input type="text" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} className="border-2 border-gray-200 p-3 rounded-xl w-full mb-4 focus:border-blue-500 focus:outline-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select value={category} onChange={e => setCategory(e.target.value)} className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none">
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            <select value={size} onChange={e => setSize(e.target.value)} className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none">
              <option value="">All Sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <input type="number" placeholder="Min ₹" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none" />
            <input type="number" placeholder="Max ₹" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none" />
          </div>
          <button onClick={() => { setSearch(''); setCategory(''); setSize(''); setMinPrice(''); setMaxPrice(''); }} className={`mt-4 p-3 rounded-xl text-white w-full md:w-auto md:px-8 font-semibold transition ${search || category || size || minPrice || maxPrice ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' : 'bg-gray-300'}`}>Clear Filters</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>

        <div className="flex justify-center gap-2">
          {[...Array(total)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg font-semibold transition ${page === i + 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
