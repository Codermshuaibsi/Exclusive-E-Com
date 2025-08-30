"use client";
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, ArrowLeft, Star, Share2, Truck, Shield, RotateCcw } from "lucide-react";

const PDPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(location.state?.product || null);
  const [mainImage, setMainImage] = useState("/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviewMode, setReviewMode] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!product && id) {
      axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then((res) => {
          setProduct(res.data);
          setMainImage(res.data.images?.[0]?.url || "/placeholder.png");
          setReviews(res.data.reviews || []);
        })
        .catch((err) => console.error("Error fetching product:", err));
    } else if (product) {
      setMainImage(product.images?.[0]?.url || "/placeholder.png");
      setReviews(product.reviews || []);
    }
  }, [product, id]);

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((q) => q + 1);
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = () => setWishlist(!wishlist);

  const handleReviewSubmit = () => {
    if (!newReview.comment || newReview.rating === 0) return;
    setReviews((prev) => [...prev, newReview]);
    setNewReview({ rating: 0, comment: "" });
    setReviewMode(false);
  };

  const calculateDiscount = () => {
    if (product?.DiscountedPrice && product?.OriginalPrice) {
      return Math.round(((product.OriginalPrice - product.DiscountedPrice) / product.OriginalPrice) * 100);
    }
    return 0;
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 hover:translate-x-1"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" /> 
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl group">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              
              {/* Image Overlay Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Share2 size={18} className="text-gray-700" />
                </button>
              </div>

              {/* Discount Badge */}
              {calculateDiscount() > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  {calculateDiscount()}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      img.url === mainImage 
                        ? "border-blue-500 shadow-lg ring-2 ring-blue-200" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setMainImage(img.url)}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title}-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Product Title & Brand */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  by <span className="text-blue-600">{product.brand?.name || "Unknown Brand"}</span>
                </p>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={`${
                            averageRating >= star ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({averageRating}) · {reviews.length} reviews
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-4 mb-2 flex-wrap">
                {product.DiscountedPrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ₹{product.DiscountedPrice?.toLocaleString()}
                    </span>
                    <span className="text-gray-500 line-through text-lg sm:text-xl">
                      ₹{product.OriginalPrice?.toLocaleString()}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Save ₹{(product.OriginalPrice - product.DiscountedPrice)?.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₹{product.OriginalPrice?.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border">
                <Truck className="text-green-500 mb-2" size={24} />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border">
                <RotateCcw className="text-blue-500 mb-2" size={24} />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border">
                <Shield className="text-purple-500 mb-2" size={24} />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Warranty</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quantity</h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleQuantity("dec")}
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="text-lg sm:text-2xl font-bold min-w-[2.5rem] sm:min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantity("inc")}
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm sm:text-base lg:text-lg ${
                  addedToCart ? "scale-105 from-green-500 to-emerald-500" : ""
                }`}
              >
                <ShoppingCart size={18} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 sm:gap-3 border-2 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm sm:text-base ${
                  wishlist 
                    ? "text-red-600 border-red-300 bg-red-50 hover:bg-red-100" 
                    : "text-gray-700 border-gray-300 bg-white hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Heart size={18} className={wishlist ? "fill-current" : ""} />
                <span className="hidden sm:inline">{wishlist ? "Wishlisted" : "Add to Wishlist"}</span>
                <span className="sm:hidden">{wishlist ? "❤️" : "♡"}</span>
              </button>
            </div>

            {/* Product Information Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 px-6 py-4 text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeTab === 'description'
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-6 py-4 text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeTab === 'reviews'
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="animate-fadeIn">
                    <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="animate-fadeIn space-y-6">
                    {/* Reviews Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                        {reviews.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={18}
                                  className={`${
                                    averageRating >= star ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-600">{averageRating} out of 5</span>
                          </div>
                        )}
                      </div>
                      {!reviewMode && (
                        <button
                          onClick={() => setReviewMode(true)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>

                    {/* Reviews List */}
                    {!reviewMode && (
                      <div className="space-y-4">
                        {reviews.length === 0 ? (
                          <div className="text-center py-12">
                            <Star className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500 text-lg">No reviews yet.</p>
                            <p className="text-gray-400 text-sm">Be the first to review this product!</p>
                          </div>
                        ) : (
                          reviews.map((rev, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={`${
                                      rev.rating >= star ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date().toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Review Form */}
                    {reviewMode && (
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 space-y-4 animate-slideDown">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-gray-900">Write Your Review</h4>
                          <button
                            onClick={() => setReviewMode(false)}
                            className="text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={24}
                                  className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                                    newReview.rating >= star ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-300"
                                  }`}
                                  onClick={() => setNewReview({ ...newReview, rating: star })}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                            <textarea
                              placeholder="Share your experience with this product..."
                              className="w-full border-2 border-gray-200 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32"
                              value={newReview.comment}
                              onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                              }
                            />
                          </div>
                          
                          <button
                            onClick={handleReviewSubmit}
                            disabled={!newReview.comment || newReview.rating === 0}
                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .aspect-square {
            aspect-ratio: 1 / 1;
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PDPPage;