import React from "react";
import Slider from "react-slick";
import { Quote, Star, UserCircle } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "John Doe",
    text: "This product is amazing! The quality exceeded my expectations.",
    avatar: "/avatar1.jpg",
    rating: 5,
  },
  {
    name: "Jane Smith",
    text: "Highly recommend to everyone. Fast delivery and excellent support.",
    avatar: "/avatar2.jpg",
    rating: 4,
  },
  {
    name: "Alex Johnson",
    text: "Exceptional quality and support. Will buy again!",
    avatar: "/avatar3.jpg",
    rating: 5,
  },
];

export const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "ease-in-out",
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-10 md:py-16 px-4 md:px-20 bg-gray-100">
      {/* Left Side Image */}
      <div className="flex justify-center mb-6 md:mb-0 md:w-1/2">
        <UserCircle className="w-20 h-20 md:w-28 md:h-28 text-gray-600 animate-bounce" />
      </div>

      {/* Right Side Slider */}
      <div className="w-full md:w-1/2 md:pl-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left animate-fadeIn">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl 
                         transition-transform transform hover:-translate-y-1 duration-500 mx-2"
            >
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-3 animate-pulse" />
              <p className="text-gray-700 mb-5 italic text-base md:text-lg leading-relaxed animate-fadeIn">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-green-500 animate-fadeIn"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};


