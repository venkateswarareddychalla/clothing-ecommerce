import { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/api/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="border p-3 rounded w-full mb-3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={size} onChange={e => setSize(e.target.value)} className="border p-2 rounded">
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <input type="number" placeholder="Min ₹" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border p-2 rounded" />
          <input type="number" placeholder="Max ₹" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border p-2 rounded" />
        </div>
        <button onClick={() => { setSearch(''); setCategory(''); setSize(''); setMinPrice(''); setMaxPrice(''); }} className={`mt-3 p-2 rounded text-white w-full md:w-auto md:px-6 font-semibold ${search || category || size || minPrice || maxPrice ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400'}`}>Clear Filters</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>

      <div className="flex justify-center gap-2">
        {[...Array(total)].map((_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
