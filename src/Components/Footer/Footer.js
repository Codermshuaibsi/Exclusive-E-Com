import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Newsletter */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Exclusive</h2>
          <p className="text-lg mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <form className="flex items-center border border-gray-500 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full text-black outline-none"
            />
            <button className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-red-500 transition">About</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Contact</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Shop</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-red-500 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Returns</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@exclusive.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> New Delhi, India
            </li>
          </ul>
          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-red-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-red-500"><Twitter size={20} /></a>
            <a href="#" className="hover:text-red-500"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Exclusive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
