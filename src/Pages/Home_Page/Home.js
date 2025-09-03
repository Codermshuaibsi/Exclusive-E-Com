import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    ChevronDown,
    Heart,
    ShoppingCart,
} from "lucide-react";
import { Testimonials } from "../../Components/Testimols/Testimols";
import axios from "axios";
import Carousel from "../../Components/Carousel/Carousel";

export const Home = () => {
    const navigate = useNavigate();
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [categories, setCategories] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [products, setproducts] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [openMenu, setOpenMenu] = useState(null);
    const [dropdownPos, setDropdownPos] = useState({});
    const navRef = useRef(null);


    const toggleFavorite = (productId, e) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        if (openMenu === id) {
            setOpenMenu(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const navRect = navRef.current.getBoundingClientRect();
            setDropdownPos({
                left: rect.left - navRect.left, // align with button
                width: rect.width,
            });
            setOpenMenu(id);
        }
    };


    const blogs = [
        { title: "Top 10 Tech Trends for 2025", excerpt: "Discover the latest technology trends that will shape the future...", image: "/api/placeholder/300/200", date: "Jan 15, 2025" },
        { title: "Fashion Guide: Spring Collection", excerpt: "Get ready for spring with our curated fashion guide...", image: "/api/placeholder/300/200", date: "Jan 12, 2025" },
        { title: "Home Office Setup Essentials", excerpt: "Create the perfect workspace with these must-have items...", image: "/api/placeholder/300/200", date: "Jan 10, 2025" },
    ];

    const handlePDPRedirect = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Enhanced Top bar */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-3 px-4 shadow-lg">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-3 sm:gap-0">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <span className="flex items-center hover:text-blue-300 transition-colors cursor-pointer">
                            <PhoneCall className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">+1 234 567 8900</span>
                            <span className="sm:hidden">Call Us</span>
                        </span>
                        <span className="flex items-center hover:text-blue-300 transition-colors cursor-pointer">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">support@shop.com</span>
                            <span className="sm:hidden">Email</span>
                        </span>
                    </div>
                    <div className="flex space-x-4">
                        {[
                            { Icon: Facebook, color: "hover:text-blue-400" },
                            { Icon: Twitter, color: "hover:text-sky-400" },
                            { Icon: Instagram, color: "hover:text-pink-400" },
                            { Icon: Youtube, color: "hover:text-red-400" }
                        ].map(({ Icon, color }, i) => (
                            <Icon key={i} className={`w-4 h-4 cursor-pointer transition-all transform hover:scale-110 ${color}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
                {/* Enhanced Horizontal Scrolling Navbar */}
                <nav
                    ref={navRef}
                    className="relative z-20 my-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50"
                >
                    {/* Categories - scrollable on mobile */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex items-center min-w-max px-4 py-3 gap-2 sm:gap-4">
                            {categories.map((menu) => (
                                <div key={menu._id} className="relative flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMenu(menu._id, e);
                                        }}
                                        className={`flex items-center py-2 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap
                  ${openMenu === menu._id
                                                ? "bg-red-50 text-red-600"
                                                : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                                            }`}
                                    >
                                        {menu.name}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${openMenu === menu._id ? "rotate-180 text-red-600" : ""
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dropdown */}
                    {categories.map(
                        (menu) =>
                            openMenu === menu._id && (
                                <div
                                    key={menu._id}
                                    className="absolute mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-300"
                                    style={{
                                        left: `${dropdownPos.left || 0}px`,
                                        minWidth: `${dropdownPos.width || 150}px`, // matches button width
                                        maxWidth: "90vw", // prevents overflow on small screens
                                    }}
                                >
                                    <div className="max-h-80 overflow-y-auto scrollbar-hide w-full sm:w-64">
                                        {menu.subcategories?.map((sub, idx) => (
                                            <a
                                                key={sub._id}
                                                href="#"
                                                className={`block px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 border-b border-gray-100 last:border-b-0
          ${idx === 0
                                                        ? "rounded-t-2xl"
                                                        : idx === menu.subcategories.length - 1
                                                            ? "rounded-b-2xl"
                                                            : ""
                                                    }`}
                                            >
                                                {sub.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>



                            )
                    )}

                    {/* Mobile scroll fade indicator */}
                    <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                </nav>
                {/* Enhanced Carousel */}
                <div className="hero py-6 sm:py-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <Carousel />
                    </div>
                </div>

                {/* Enhanced Features */}
                <div className="features-section py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            {
                                icon: <Truck className="w-8 h-8 sm:w-10 sm:h-10" />,
                                title: "Free Shipping",
                                description: "On orders over $50",
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50"
                            },
                            {
                                icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10" />,
                                title: "Secure Payment",
                                description: "100% secure checkout",
                                color: "from-green-500 to-emerald-500",
                                bgColor: "bg-green-50"
                            },
                            {
                                icon: <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10" />,
                                title: "30-Day Returns",
                                description: "Easy returns policy",
                                color: "from-purple-500 to-violet-500",
                                bgColor: "bg-purple-50"
                            },
                            {
                                icon: <CreditCard className="w-8 h-8 sm:w-10 sm:h-10" />,
                                title: "Payment Options",
                                description: "Multiple methods",
                                color: "from-red-500 to-pink-500",
                                bgColor: "bg-red-50"
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`${feature.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2 cursor-pointer border border-white/50`}
                            >
                                <div className={`flex justify-center mb-4 p-3 rounded-full bg-gradient-to-r ${feature.color} text-white w-fit mx-auto shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-lg">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Flash Sale */}
                <div className="banner relative p-6 sm:p-10 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl my-8 sm:my-12 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300/20 rounded-full translate-y-36 -translate-x-36 blur-2xl"></div>
                    </div>

                    <div className="relative z-10 text-white text-center">
                        <div className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold mb-4 animate-pulse">
                            LIMITED TIME OFFER
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            FLASH SALE!
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-medium opacity-90">
                            Don&apos;t miss out on these amazing deals
                        </p>

                        {/* Enhanced Timer */}
                        <div className="flex justify-center items-center gap-3 sm:gap-6 mb-8">
                            {[
                                { label: "Hours", value: hours },
                                { label: "Minutes", value: mins },
                                { label: "Seconds", value: secs }
                            ].map(({ label, value }, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center bg-white/20 backdrop-blur-md border border-white/30 px-4 py-4 sm:px-6 sm:py-6 rounded-2xl min-w-[70px] sm:min-w-[100px] shadow-lg"
                                >
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                                        {value.toString().padStart(2, "0")}
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold opacity-80 mt-1">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-white text-red-600 px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-lg hover:shadow-white/25">
                            Shop Flash Sale
                        </button>
                    </div>
                </div>

                {/* Enhanced Featured Products */}
                <div className="products-section my-12 sm:my-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black">
                            Featured Products
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                        {products.map((product, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative group border border-gray-200/60"
                                onClick={() => handlePDPRedirect(product)}
                            >
                                {/* Product Image */}
                                <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden rounded-t-2xl">
                                    <img
                                        src={product.images?.[0]?.url || "/placeholder.png"}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                                        <div className="flex gap-3">
                                            <button className="bg-white p-3 rounded-full shadow hover:bg-red-50 transition-colors">
                                                <ShoppingCart className="w-5 h-5 text-gray-800" />
                                            </button>
                                            <button
                                                onClick={(e) => toggleFavorite(product._id, e)}
                                                className="bg-white p-3 rounded-full shadow hover:bg-red-50 transition-colors"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${favorites.has(product._id)
                                                        ? "text-red-500 fill-current"
                                                        : "text-gray-700"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {product.featured && (
                                            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs px-3 py-1 rounded-full shadow font-semibold">
                                                ⭐ Featured
                                            </span>
                                        )}
                                        {product.badge && (
                                            <span
                                                className={`text-white text-xs px-3 py-1 rounded-full shadow font-semibold ${product.badge === "Sale"
                                                    ? "bg-gradient-to-r from-rose-500 to-red-600"
                                                    : product.badge === "New"
                                                        ? "bg-gradient-to-r from-emerald-500 to-green-600"
                                                        : product.badge === "Best Seller"
                                                            ? "bg-gradient-to-r from-indigo-500 to-blue-600"
                                                            : "bg-gradient-to-r from-purple-500 to-pink-600"
                                                    }`}
                                            >
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Discount Badge */}
                                    {product.DiscountedPrice &&
                                        product.DiscountedPrice < product.OriginalPrice && (
                                            <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                                                {Math.round(
                                                    ((product.OriginalPrice - product.DiscountedPrice) /
                                                        product.OriginalPrice) *
                                                    100
                                                )}
                                                % OFF
                                            </div>
                                        )}
                                </div>

                                {/* Product Info */}
                                <div className="p-5 sm:p-6">
                                    <h3 className="font-semibold text-lg sm:text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${idx < Math.floor(product.rating || 0)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-slate-500 ml-2 font-medium">
                                            ({product.reviews || 0})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {product.DiscountedPrice &&
                                                product.DiscountedPrice < product.OriginalPrice ? (
                                                <>
                                                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
                                                        ₹{product.DiscountedPrice}
                                                    </span>
                                                    <span className="text-sm text-slate-400 line-through font-medium">
                                                        ₹{product.OriginalPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                                    ₹{product.OriginalPrice}
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-red-100 p-2 rounded-full group-hover:bg-red-500 transition-colors">
                                            <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Enhanced Testimonials */}
                <div className="testimonials-section py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl my-12">
                    <Testimonials />
                </div>

                {/* Enhanced Blog */}
                <div className="blog-section py-12 sm:py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4">
                            Latest from Our Blog
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Stay informed with our latest insights, tips, and trends
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mt-6"></div>
                    </div>

                    {/* Blog Section  */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                        {blogs.map((blog, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group transform hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center mb-3">
                                        <span className="text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full">
                                            {blog.date}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-4 group-hover:text-red-600 transition-colors leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {blog.excerpt}
                                    </p>
                                    <button className="flex items-center text-red-600 hover:text-red-700 font-bold transition-all group-hover:translate-x-2">
                                        Read More <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Newsletter */}
                <div className="newsletter-section relative py-12 sm:py-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-3xl my-8 sm:my-12 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 text-center text-white px-6">
                        <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full w-fit mx-auto mb-6">
                            <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
                            Stay Updated
                        </h2>
                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
                            Subscribe to our newsletter and be the first to know about new
                            products, exclusive deals, and special offers.
                        </p>

                        <form
                            onSubmit={handleNewsletterSubmit}
                            className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4"
                        >
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-red-500/50 backdrop-blur-sm bg-white/95 shadow-lg text-base border border-gray-200"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 text-base"
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