import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">Trendz</Link>
          
          <div className="hidden sm:flex gap-6 items-center font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            {user ? (
              <>
                <span>Hi, {user.name}</span>
                <button onClick={logout} className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-semibold hover:bg-gray-100 transition">Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-2xl">
            &#9776;
          </button>
        </div>

        {isOpen && (
          <div className="sm:hidden mt-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block py-2">Products</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block py-2">Cart ({cart.length})</Link>
            {user ? (
              <div className='flex flex-row justify-between'>
                <span className="py-2">Hi, {user.name}</span>
                <button onClick={() => { logout(); setIsOpen(false); }} className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
