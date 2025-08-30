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
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/">Home</Link>
            </li>

            {/* Shop with dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("shop")}
                className="flex items-center gap-1 hover:underline underline-offset-2"
              >
                Shop <ChevronDown size={16} />
              </button>
              {dropdown === "shop" && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-60 z-50">
                  <h3 className="font-semibold px-2 py-1">Electronics</h3>
                  <Link to="/products/mobiles" className="block px-3 py-1 hover:bg-gray-100 rounded">Mobiles</Link>
                  <Link to="/products/laptops" className="block px-3 py-1 hover:bg-gray-100 rounded">Laptops</Link>
                  <Link to="/products/accessories" className="block px-3 py-1 hover:bg-gray-100 rounded">Accessories</Link>
                  <h3 className="font-semibold px-2 py-1 mt-2">Clothing</h3>
                  <Link to="/products/men" className="block px-3 py-1 hover:bg-gray-100 rounded">Men</Link>
                  <Link to="/products/women" className="block px-3 py-1 hover:bg-gray-100 rounded">Women</Link>
                  <Link to="/products/kids" className="block px-3 py-1 hover:bg-gray-100 rounded">Kids</Link>
                </div>
              )}
            </li>

            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
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
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t shadow-md px-4 py-3 space-y-2 animate-slideDown">
          <ul className="flex flex-col gap-2">
            <li><Link to="/">Home</Link></li>

            {/* Mobile dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("mobileShop")}
                className="flex justify-between w-full px-2 py-2 bg-gray-50 rounded-md"
              >
                Shop
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${dropdown === "mobileShop" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out 
                  ${dropdown === "mobileShop" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="pl-4 mt-1 space-y-1">
                  <h3 className="font-semibold">Electronics</h3>
                  <Link to="/products/mobiles" className="block px-2 py-1 hover:bg-gray-100 rounded">Mobiles</Link>
                  <Link to="/products/laptops" className="block px-2 py-1 hover:bg-gray-100 rounded">Laptops</Link>
                  <Link to="/products/accessories" className="block px-2 py-1 hover:bg-gray-100 rounded">Accessories</Link>
                  <h3 className="font-semibold mt-2">Clothing</h3>
                  <Link to="/products/men" className="block px-2 py-1 hover:bg-gray-100 rounded">Men</Link>
                  <Link to="/products/women" className="block px-2 py-1 hover:bg-gray-100 rounded">Women</Link>
                  <Link to="/products/kids" className="block px-2 py-1 hover:bg-gray-100 rounded">Kids</Link>
                </div>
              </div>
            </li>

            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {!token && <li><Link to="/signup">Signup</Link></li>}
            {token && <li><Link to="/logout">Logout</Link></li>}
          </ul>

          {/* Mobile Search */}
          <div className="flex items-center border rounded-full px-3 py-1 mt-2">
            <input type="text" placeholder="Search..." className="outline-none text-sm w-full" />
            <Search className="ml-2 w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
