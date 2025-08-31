import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For React Router
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Star,
    ChevronRight,
    Truck,
    Shield,
    RotateCcw,
    CreditCard,
    ArrowRight,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    PhoneCall,
} from "lucide-react";
import { Testimonials } from "../../Components/Testimols/Testimols";
import axios from "axios";
import Carousel from "../../Components/Carousel/Carousel";

export const Home = () => {
    const navigate = useNavigate(); // Add router navigation
    const [openMenu, setOpenMenu] = useState(null);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [categories, setCategories] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [products, setproducts] = useState([]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    // Featured Products
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const featuredData = await axios.get(
                    "https://exclusive-e-com-backend.onrender.com/api/featured/product/getallproduct"
                );
                setproducts(featuredData.data);
            } catch (error) {
                console.error("Error fetching featured products", error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    // Category and SubCategory
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data: categoriesData } = await axios.get(
                    "https://exclusive-e-com-backend.onrender.com/api/category/all/category"
                );

                const categoriesWithSubs = await Promise.all(
                    categoriesData.map(async (cat) => {
                        const { data: subData } = await axios.get(
                            `https://exclusive-e-com-backend.onrender.com/api/subcategory/category/${cat._id}`
                        );
                        return { ...cat, subcategories: subData };
                    })
                );

                setCategories(categoriesWithSubs);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { hours, mins, secs };
    };
    const { hours, mins, secs } = formatTime(timeLeft);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing with ${newsletterEmail}!`);
        setNewsletterEmail("");
    };

    const blogs = [
        { title: "Top 10 Tech Trends for 2025", excerpt: "Discover the latest technology trends that will shape the future...", image: "/api/placeholder/300/200", date: "Jan 15, 2025" },
        { title: "Fashion Guide: Spring Collection", excerpt: "Get ready for spring with our curated fashion guide...", image: "/api/placeholder/300/200", date: "Jan 12, 2025" },
        { title: "Home Office Setup Essentials", excerpt: "Create the perfect workspace with these must-have items...", image: "/api/placeholder/300/200", date: "Jan 10, 2025" },
    ];

    // Redirect to PDP Page with product
    const handlePDPRedirect = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🔝 Top bar */}
            <div className="bg-gray-900 text-white py-2 px-3 sm:px-6">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-6">
                        <span className="flex items-center">
                            <PhoneCall className="w-4 h-4 mr-1" /> +1 234 567 8900
                        </span>
                        <span className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" /> support@shop.com
                        </span>
                    </div>
                    <div className="flex space-x-3 mt-1 sm:mt-0">
                        <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                        <Twitter className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                        <Instagram className="w-4 h-4 cursor-pointer hover:text-pink-400" />
                        <Youtube className="w-4 h-4 cursor-pointer hover:text-red-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-6">
                {/* 🧭 Navbar */}
                <nav className="bg-white flex flex-wrap justify-center mx-auto shadow-md relative z-20 p-3 sm:p-4 gap-4 sm:gap-8 rounded-lg my-4">
                    {categories.map((menu) => (
                        <div key={menu._id} className="relative">
                            <button
                                onClick={() => toggleMenu(menu._id)}
                                className="hover:text-red-600 font-medium text-gray-700 transition text-sm sm:text-base"
                            >
                                {menu.name}
                            </button>

                            {openMenu === menu._id && menu.subcategories?.length > 0 && (
                                <div className="absolute left-0 mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-lg p-2 border z-30">
                                    {menu.subcategories.map((sub) => (
                                        <a
                                            key={sub._id}
                                            href="#"
                                            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-sm"
                                        >
                                            {sub.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* 🎡 Carousel */}
                <div className="hero py-4 sm:py-6">
                    <Carousel />
                </div>

                {/* 🚚 Features */}
                <div className="features-section py-6 sm:py-10">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            {
                                icon: <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />,
                                title: "Free Shipping",
                                description: "On orders over $50",
                            },
                            {
                                icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />,
                                title: "Secure Payment",
                                description: "100% secure checkout",
                            },
                            {
                                icon: (
                                    <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500" />
                                ),
                                title: "30-Day Returns",
                                description: "Easy returns policy",
                            },
                            {
                                icon: (
                                    <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                                ),
                                title: "Payment Options",
                                description: "Multiple methods",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition text-center"
                            >
                                <div className="flex justify-center mb-3">{feature.icon}</div>
                                <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ⚡ Flash Sale */}
                <div className="banner p-4 sm:p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl my-6 sm:my-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative z-10 text-white text-center px-3">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            FLASH SALE!
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl mb-4">
                            Don&apos;t miss out on these amazing deals
                        </p>

                        {/* Timer */}
                        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                            {["Hours", "Minutes", "Seconds"].map((unit, idx) => {
                                const value = idx === 0 ? hours : idx === 1 ? mins : secs;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center border border-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-w-[60px] sm:min-w-[80px] bg-black bg-opacity-30"
                                    >
                                        <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                                            {value.toString().padStart(2, "0")}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-200">
                                            {unit}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <button className="bg-white text-red-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 text-sm sm:text-base">
                            Shop Flash Sale
                        </button>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="products-section my-12 px-4 md:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
                            Featured Products
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                        {products.map((product, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden relative group"
                                onClick={() => handlePDPRedirect(product)} // Redirect on click
                            >
                                {/* Product Image */}
                                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                                    <img
                                        src={product.images?.[0]?.url || "/placeholder.png"}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {product.featured && (
                                            <span className="bg-yellow-400 text-black text-[10px] sm:text-xs px-2 py-1 rounded-full shadow font-semibold">
                                                Featured
                                            </span>
                                        )}
                                        {product.badge && (
                                            <span
                                                className={`text-white text-[10px] sm:text-xs px-2 py-1 rounded-full shadow 
                                                ${product.badge === "Sale"
                                                        ? "bg-red-500"
                                                        : product.badge === "New"
                                                            ? "bg-green-500"
                                                            : product.badge === "Best Seller"
                                                                ? "bg-blue-500"
                                                                : "bg-purple-500"
                                                    }`}
                                            >
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-3 sm:p-4">
                                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1 truncate">
                                        {product.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center mb-2 sm:mb-3">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star
                                                key={idx}
                                                className={`w-3 h-3 sm:w-4 sm:h-4 ${idx < Math.floor(product.rating || 0)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
                                            ({product.reviews || 0})
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 sm:space-x-2">
                                            {product.DiscountedPrice && product.DiscountedPrice < product.OriginalPrice ? (
                                                <>
                                                    <span className="text-lg sm:text-xl font-bold text-gray-800">
                                                        ₹{product.DiscountedPrice}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                        ₹{product.OriginalPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-lg sm:text-xl font-bold text-gray-800">
                                                    ₹{product.OriginalPrice}
                                                </span>
                                            )}
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                {/* ⭐ Testimonials */}
                <div className="testimonials-section py-10 sm:py-12">
                    <Testimonials />
                </div>

                {/* 📰 Blog */}
                <div className="blog-section py-8 sm:py-12">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Latest from Our Blog
                        </h2>
                        <button className="flex items-center text-red-600 hover:text-red-700 font-medium text-sm sm:text-base">
                            View All Posts <ChevronRight className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogs.map((blog, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-3 hover:text-red-600 transition">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{blog.excerpt}</p>
                                    <button className="mt-4 text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 📩 Newsletter */}
                <div className="newsletter-section py-10 sm:py-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl my-6 sm:my-8">
                    <div className="text-center text-white px-4">
                        <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-red-500" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                            Subscribe to our newsletter and be the first to know about new
                            products, exclusive deals, and special offers.
                        </p>
                        <form
                            onSubmit={handleNewsletterSubmit}
                            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                        >
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 sm:py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
