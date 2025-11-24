import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/prioritize.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain rounded-full"/>
          <h1 className="text-2xl font-semibold tracking-wide">Task-Flow</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-gray-900  font-semibold hover:bg-gray-200 transition">
            Login
          </Link>

          <Link to="/register" className="px-4 py-2 rounded-lg border border-white  font-semibold hover:bg-white hover:text-gray-900 transition">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {/* Hamburger Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              // X icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 text-center">
          <Link to="/login"
            className="block px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg mx-4 hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}>
            Login
          </Link>

          <Link to="/register"
            className="block px-4 py-2 border border-white font-semibold rounded-lg mx-4 hover:bg-white hover:text-gray-900 transition"
            onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
