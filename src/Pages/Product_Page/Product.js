"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Star, ArrowRight, Search, Filter, Grid, List, X, Heart, ChevronDown, ChevronRight } from "lucide-react";

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [price, setPrice] = useState(5000);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Enhanced filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Wishlist
  const [wishlist, setWishlist] = useState(new Set());

  // Fetch categories & subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categoriesData } = await axios.get(
          "https://exclusive-e-com-backend.onrender.com/api/category/all/category"
        );

        const categoriesWithSubs = await Promise.all(
          categoriesData.map(async (cat) => {
            try {
              const { data: subData } = await axios.get(
                `https://exclusive-e-com-backend.onrender.com/api/subcategory/category/${cat._id}`
              );
              return { ...cat, subcategories: subData };
            } catch (subError) {
              return { ...cat, subcategories: [] };
            }
          })
        );

        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://exclusive-e-com-backend.onrender.com/api/featured/product/getallproduct"
        );
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Enhanced filtering
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const inCategory = !selectedCategory || product.category?._id === selectedCategory;
      const inSubCategory = !selectedSubCategory || product.subcategory?._id === selectedSubCategory;
      const productPrice = product.DiscountedPrice || product.OriginalPrice;
      const inPrice = productPrice <= price;
      const matchesSearch = !searchQuery || 
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const hasRating = !selectedRating || (product.rating || 0) >= selectedRating;

      return inCategory && inSubCategory && inPrice && matchesSearch && hasRating;
    });

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.DiscountedPrice || a.OriginalPrice) - (b.DiscountedPrice || b.OriginalPrice));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.DiscountedPrice || b.OriginalPrice) - (a.DiscountedPrice || a.OriginalPrice));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedSubCategory, price, searchQuery, selectedRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory, price, searchQuery, selectedRating, sortBy]);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setPrice(5000);
    setSearchQuery("");
    setSelectedRating(0);
    setSortBy("default");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="p-3 md:p-4">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-all ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="default">Default</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
              
              <span className="text-xs text-gray-600 hidden sm:block">
                {filteredProducts.length} items
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filter Sidebar */}
        <aside className={`bg-white shadow-md transition-all duration-300 ease-in-out ${
          showFilters ? 'w-72 md:w-64' : 'hidden md:block md:w-64'
        } ${showFilters ? 'fixed inset-y-0 left-0 z-50 md:relative' : ''}`}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Filters</h2>
              <div className="flex gap-2">
                <button onClick={clearFilters} className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
                  Clear
                </button>
                <button onClick={() => setShowFilters(false)} className="md:hidden">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <div key={cat._id}>
                    <div
                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategory === cat._id 
                          ? "bg-blue-100 text-blue-800" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === cat._id ? null : cat._id);
                        setSelectedSubCategory(null);
                      }}
                    >
                      <span className="truncate">{cat.name}</span>
                      {cat.subcategories?.length > 0 && (
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            selectedCategory === cat._id ? 'rotate-90' : ''
                          }`}
                        />
                      )}
                    </div>
                    
                    {/* Subcategories with slide animation */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      selectedCategory === cat._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {cat.subcategories?.map((sub) => (
                        <div
                          key={sub._id}
                          className={`ml-4 mt-1 p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                            selectedSubCategory === sub._id 
                              ? "bg-blue-50 text-blue-700" 
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            setSelectedSubCategory(
                              selectedSubCategory === sub._id ? null : sub._id
                            )
                          }
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">Price (₹{price})</h3>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Rating */}
            <div className="mb-5">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">Rating</h3>
              <div className="space-y-1">
                {[4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      selectedRating === rating ? "bg-yellow-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  >
                    <input
                      type="radio"
                      checked={selectedRating === rating}
                      onChange={() => {}}
                      className="mr-2 accent-yellow-500"
                    />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3 h-3 ${
                            idx < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-600">& up</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-4">
          {/* Results Info */}
          <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {filteredProducts.length} products found
              </span>
              {(selectedCategory || searchQuery || selectedRating) && (
                <button onClick={clearFilters} className="text-blue-500 hover:text-blue-700 transition-colors">
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
              : "space-y-3"
          }>
            {paginatedProducts.map((product, i) => (
              <div
                key={product._id || i}
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group ${
                  viewMode === "list" ? "flex" : ""
                }`}
                onClick={() => alert(`View ${product.title}`)}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-32 h-24 flex-shrink-0" : "h-32 sm:h-40"
                }`}>
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-1 left-1 flex flex-col gap-1">
                    {product.featured && (
                      <span className="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                        Featured
                      </span>
                    )}
                    {product.badge && (
                      <span
                        className={`text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium
                          ${
                            product.badge === "Sale" ? "bg-red-500"
                            : product.badge === "New" ? "bg-green-500"
                            : product.badge === "Best Seller" ? "bg-blue-500"
                            : "bg-purple-500"
                          }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Discount */}
                  {product.DiscountedPrice && product.DiscountedPrice < product.OriginalPrice && (
                    <div className="absolute top-1 right-1">
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                        -{Math.round(((product.OriginalPrice - product.DiscountedPrice) / product.OriginalPrice) * 100)}%
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={(e) => toggleWishlist(product._id, e)}
                    className={`absolute bottom-1 right-1 p-1.5 rounded-full transition-all duration-200 ${
                      wishlist.has(product._id)
                        ? "bg-red-500 text-white scale-110"
                        : "bg-white/80 text-gray-600 hover:bg-white hover:scale-105"
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${wishlist.has(product._id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 flex-1">
                  <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-1">
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3 h-3 ${
                          idx < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.reviews || 0})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {product.DiscountedPrice && product.DiscountedPrice < product.OriginalPrice ? (
                        <>
                          <span className="text-sm font-bold text-gray-800">
                            ₹{product.DiscountedPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            ₹{product.OriginalPrice.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-gray-800">
                          ₹{product.OriginalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              
              <span className="px-3 py-2 text-sm text-gray-600">
                {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {showFilters && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}