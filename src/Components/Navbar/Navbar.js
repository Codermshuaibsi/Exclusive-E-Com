"use client";
import { Heart, Search, ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [userMenu, setUserMenu] = useState(false);

  const token = localStorage.getItem("token");

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <nav className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-bold text-gray-900">
          Exclusive
        </div>

        {/* Desktop Menu (only visible on lg+) */}
        <div className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <ul className="flex space-x-6">
            <li className="hover:underline hover:text-red-600 hover:font-semibold underline-offset-2 cursor-pointer">
              <Link to="/">Home</Link>
            </li>

            {/* Shop with dropdown */}
            <li className="hover:underline hover:text-red-600 hover:font-semibold underline-offset-2 cursor-pointer"><Link to='/products'>Products</Link></li>
            <li className="hover:underline hover:text-red-600 hover:font-semibold underline-offset-2 cursor-pointer"><Link to="/about">About</Link></li>
            <li className="hover:underline hover:text-red-600 hover:font-semibold underline-offset-2 cursor-pointer"><Link to="/blog">Blog</Link></li>
            <li className="hover:underline hover:text-red-600 hover:font-semibold underline-offset-2 cursor-pointer"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search (hidden on mobile) */}
          <div className="hidden md:flex items-center border rounded-full px-3 py-1">
            <input type="text" placeholder="Search products..." className="outline-none text-sm w-40" />
            <Search className="ml-2 w-4 h-4 text-gray-600" />
          </div>

          <Heart className="cursor-pointer hover:text-red-500" />
          <ShoppingCart className="cursor-pointer hover:text-red-500" />

          {token ? (
            <div className="relative">
              <button onClick={() => setUserMenu(!userMenu)} className="flex items-center space-x-1 cursor-pointer">
                <User className="w-6 h-6 text-gray-700" />
                <span className="hidden lg:block text-gray-700 font-medium">User</span>
              </button>
              {userMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-lg p-2 z-50">
                  <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-3 py-2 hover:bg-gray-100">Settings</Link>
                  <Link to="/orders" className="block px-3 py-2 hover:bg-gray-100">Order History</Link>
                  <button
                    onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden lg:block bg-red-600 hover:bg-red-700 text-white px-7 py-2  rounded-full text-sm">
              Login
            </Link>
          )}

          {/* Hamburger for md & below */}
          <button className="lg:hidden text-gray-800" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {/* Mobile / Tablet Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t shadow-md px-4 py-3 space-y-2 animate-slideDown">
          <ul className="flex flex-col gap-2">
            <li><Link to="/" onClick={() => setMobileMenu(false)}>Home</Link></li>

            <li><Link to="/products" onClick={() => setMobileMenu(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setMobileMenu(false)}>About</Link></li>
            <li><Link to="/blog" onClick={() => setMobileMenu(false)}>Blog</Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link></li>

            {!token && <li><Link to="/signup" onClick={() => setMobileMenu(false)}>Signup</Link></li>}
            {token && <li><Link to="/logout" onClick={() => setMobileMenu(false)}>Logout</Link></li>}
          </ul>

          {/* Mobile Search */}
          <div className="flex items-center border rounded-full px-3 py-1 mt-2">
            <input type="text" placeholder="Search..." className="outline-none text-sm w-full" />
            <Search className="ml-2 w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}

    </nav >
  );
};

export default Navbar;
