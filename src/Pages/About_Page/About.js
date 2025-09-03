"use client";
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, TrendingUp, Star, Users, PenTool } from "lucide-react";

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
];

const BlogPage = () => {
  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 via-white to-blue-50 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-6 py-2 border-2 border-pink-500 rounded-full text-pink-600 font-semibold mb-6 animate-bounce">
            Blog & Insights
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-down">
            Stay Inspired with{" "}
            <span className="text-pink-600">Our Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-up">
            Explore trends, expert opinions, and helpful guides in fashion,
            electronics, lifestyle, and beyond.
          </p>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-down">
          Featured Articles
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-500 overflow-hidden group transform hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-6 text-left">
                <p className="text-sm text-pink-600 font-medium mb-2">
                  {blog.category} • {blog.date}
                </p>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-3 text-sm">{blog.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    By {blog.author}
                  </span>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Read Our Blog */}
      <section className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12 animate-fade-down">
          Why Read Our Blog?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <BookOpen className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Expert Knowledge",
              desc: "Get insights from industry professionals.",
            },
            {
              icon: <TrendingUp className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Latest Trends",
              desc: "Stay updated with the newest lifestyle trends.",
            },
            {
              icon: <Star className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Top Reviews",
              desc: "Read honest reviews before you shop.",
            },
            {
              icon: <Users className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Community Voices",
              desc: "Discover stories from people like you.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-2 transition duration-500 animate-fade-up"
            >
              {item.icon}
              <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-600 py-16 px-6 text-center text-white">
        <PenTool className="w-14 h-14 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-down">
          Want to Contribute?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 animate-fade-up">
          Share your stories, reviews, or insights with our readers and become
          part of our community.
        </p>
        <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition transform hover:scale-105">
          Write for Us
        </button>
      </section>
    </div>
  );
};

export default BlogPage;
