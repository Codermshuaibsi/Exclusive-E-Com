import React, { useState } from "react";

const images = [
  "https://picsum.photos/id/1018/1000/600", 
  "https://picsum.photos/id/1015/1000/600", 
  "https://picsum.photos/id/1019/1000/600", 
  "https://picsum.photos/id/1020/1000/600",
  "https://picsum.photos/id/1021/1000/600"
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Next slide
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative w-full  mx-auto">
      {/* Images */}
      <div className="overflow-hidden rounded-lg relative h-64 md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-gray-800 rounded-full p-2 shadow-md"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-gray-800 rounded-full p-2 shadow-md"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
