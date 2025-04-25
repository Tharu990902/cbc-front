import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // optional icon, or use an img

export default function Header() {
  return (
    <div className="relative flex items-center justify-between w-full bg-white shadow-md px-25 h-[80px]">
      {/* Logo */}
      <Link to="/" className="absolute left-4 top-2">
        <img
          src="../../public/logo.jpg"
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full cursor-pointer"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center justify-center w-full gap-10">
        <Link
          to="/"
          className="text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary"
        >
          Contact
        </Link>
      </div>

      {/* Cart Link */}
      <div className="absolute right-6 top-6">
        <Link to="/cart" className="flex items-center gap-1 text-[#1b2d7f] font-bold hover:text-blue-600">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </Link>
      </div>
    </div>
  );
}
