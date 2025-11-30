import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">ClothApp</Link>
          
          <div className="hidden sm:flex gap-6 items-center">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            {user ? (
              <>
                <span>Hi, {user.name}</span>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded cursor-pointer">Logout</button>
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
                <button onClick={() => { logout(); setIsOpen(false); }} className="bg-red-600 px-2 py-2 rounded cursor-pointer text-left">Logout</button>
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
