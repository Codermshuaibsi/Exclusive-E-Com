"use client";
import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 10 Trends in Electronics for 2025",
    desc: "Explore the latest innovations in gadgets, smart devices, and future-ready electronics.",
    img: "https://images.unsplash.com/photo-1581093588401-22d08b4b1cbf",
    author: "Tech Insider",
    date: "Aug 30, 2025",
    category: "Electronics",
  },
  {
    id: 2,
    title: "5 Must-Have Fashion Accessories This Year",
    desc: "Discover trending styles in handbags, watches, and eyewear.",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    author: "Style Hub",
    date: "Aug 15, 2025",
    category: "Fashion",
  },
  {
    id: 3,
    title: "Best Furniture Picks for Modern Homes",
    desc: "Minimalist designs and smart furniture solutions that redefine spaces.",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    author: "Home Decor Daily",
    date: "July 25, 2025",
    category: "Furniture",
  },
  {
    id: 4,
    title: "Top Smartphones Worth Buying in 2025",
    desc: "A curated list of the best phones with unbeatable performance.",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3c6b3e44",
    author: "Gizmo World",
    date: "Aug 5, 2025",
    category: "Mobiles",
  },
  {
    id: 5,
    title: "Must-Know Beauty Hacks for Busy People",
    desc: "Quick and effective beauty tips for your daily routine.",
    img: "https://images.unsplash.com/photo-1606813902911-4fbb3b6e96a0",
    author: "Beauty Secrets",
    date: "Aug 10, 2025",
    category: "Beauty",
  },
];

const BlogPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
        <p className="mt-4 text-lg md:text-xl opacity-90">
          Insights, trends, and stories from the world of shopping & lifestyle.
        </p>
      </div>

      {/* Blog Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-indigo-600 font-medium mb-2">
                {blog.category} • {blog.date}
              </p>
              <h3 className="text-lg font-bold group-hover:text-indigo-700 transition">
                {blog.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm">{blog.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  By {blog.author}
                </span>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-3 text-lg">
            Subscribe to our newsletter to get the latest updates directly to your inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-64 md:w-80 rounded-l-lg text-gray-700 focus:outline-none"
            />
            <button className="bg-yellow-400 px-6 py-3 rounded-r-lg font-semibold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
