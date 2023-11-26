"use client";
import React, { useState, useEffect } from "react";

const images = [
  "https://images.pexels.com/photos/2047909/pexels-photo-2047909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://mistertech.co.za/wp-content/uploads/2021/04/IMG_6179-scaled.jpg",
  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?cs=srgb&dl=pexels-veeterzy-303383.jpg&fm=jpg",
];

const texts = [
  "Innovative Tech Solutions",
  "Discover the Latest Gadgets",
  "Your Source for Tech Excellence",
];

function HeroPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    // <div className="relative h-screen overflow-hidden">
    //   {images.map((image, index) => (
    //     <div
    //       key={index}
    //       className={`absolute top-0 left-0 h-full w-full transition-transform ${
    //         currentSlide === index ? "translate-x-0" : "translate-x-full"
    //       }`}
    //     >
    //       <img
    //         src={image}
    //         alt={`Image ${index + 1}`}
    //         className="w-full h-full object-cover"
    //       />
    //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-4 rounded text-white">
    //         {texts[index]}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="relative h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 h-full w-full transition-transform ${
            currentSlide === index ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 p-4 w-1/2 h-full flex items-center text-slate-300 text-7xl font-bold">
            {texts[index]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroPage;
