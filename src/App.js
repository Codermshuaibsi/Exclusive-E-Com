import React, { useState, useEffect } from "react";
import Signup from "./Pages/Signup_Page/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login_Page/Login";
import { Home } from "./Pages/Home_Page/Home";
import About from "./Pages/About_Page/About";
import PDPPage from "./Pages/PDP_Page/PDP";
import ContactPage from "./Pages/Contact_Page/Contact";
import BlogPage from "./Pages/Blog_Page/Blog";
import ProductPage from "./Pages/Product_Page/Product";

const SimpleLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {

  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
  //       <div className="text-center animate-pulse">
  //         {/* Logo / Text */}
  //         <h1 className="text-6xl animate-bounce md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent">
  //           LUXE
  //         </h1>

  //         {/* Progress Bar */}
  //         <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
  //           <div className="h-full bg-gradient-to-r from-white to-gray-600 animate-loaderBar"></div>
  //         </div>

  //         <p className="mt-4 text-gray-400 text-lg">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // Routers setup
    <div className="container">
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<PDPPage />} />
      </Routes>
    </div>
  );
};

export default SimpleLoader;
