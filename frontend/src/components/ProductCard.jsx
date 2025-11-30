import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="border rounded p-4 hover:shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-lg font-bold mt-2">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
    </Link>
  );
};

export default ProductCard;
