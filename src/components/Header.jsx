import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react"; // Import Menu (burger) and X (close) icons

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50 flex items-center justify-between w-full h-20 px-6 bg-white shadow-md md:px-12">
      {/* Logo */}
      <Link to="/" className="flex items-center" onClick={closeMenu}>
        <img
          src="/logo.jpg"
          alt="Logo"
          className="object-cover w-12 h-12 transition-transform duration-300 rounded-full hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden gap-10 md:flex">
        {["Home", "Products", "About", "Contact"].map((item) => (
          <Link
            key={item}
            to={`/${item === "Home" ? "" : item.toLowerCase()}`}
            className="relative text-lg font-bold text-[#1b2d7f] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-[#1b2d7f] hover:after:w-full after:transition-all after:duration-300"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Cart */}
      <Link
        to="/cart"
        className="flex items-center gap-2 text-[#1b2d7f] hover:text-blue-700 transition-colors duration-300"
        onClick={closeMenu}
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="hidden font-semibold md:inline">Cart</span>
      </Link>

      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-[#1b2d7f] focus:outline-none absolute right-14 top-6"
      >
        {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute left-0 w-full bg-white shadow-md top-20 md:hidden animate-slide-down">
          <div className="flex flex-col items-center gap-6 py-6">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="text-[#1b2d7f] font-semibold text-lg hover:text-blue-700"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
