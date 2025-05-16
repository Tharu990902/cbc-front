import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const handleLogin = () => navigate("/login");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    {name: "My Orders", path: "/orders"},
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-6 md:px-12">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="object-cover w-12 h-12 transition-transform duration-300 rounded-full hover:scale-105"
          />
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-10 md:flex">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={closeMenu}
              className={`relative text-lg font-semibold ${
                location.pathname === path
                  ? "text-blue-700 after:w-full"
                  : "text-[#1b2d7f]"
              } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Cart & Login Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-1 text-[#1b2d7f] hover:text-blue-700 transition-colors duration-300"
            onClick={closeMenu}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden font-semibold md:inline">Cart</span>
          </Link>

          {/* Login Button (Image) */}
          <button
            onClick={handleLogin}
            className="flex items-center justify-center w-10 h-10 overflow-hidden transition duration-200 border-2 border-blue-600 rounded-full shadow-md hover:ring-2 hover:ring-blue-400"
          >
            <img
              src="/login-user.png"
              alt="Login"
              className="object-cover w-full h-full"
            />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="text-[#1b2d7f] md:hidden focus:outline-none"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="bg-white shadow-md md:hidden animate-slide-down">
          <div className="flex flex-col items-center gap-6 py-6">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={closeMenu}
                className={`text-lg font-semibold ${
                  location.pathname === path
                    ? "text-blue-700"
                    : "text-[#1b2d7f]"
                } hover:text-blue-700 transition`}
              >
                {name}
              </Link>
            ))}

            {/* Login on mobile too */}
            <button
              onClick={handleLogin}
              className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
