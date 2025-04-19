"use client"
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp", // URL casque
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp", // URL PS5
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp", // URL MacBook
    },
  ];

  // Settings for the react-slick slider
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "30px",
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="slider-container relative w-full">
      <Slider {...settings}>
        {sliderData.map((slide, index) => (
          <div key={slide.id} className="px-2">
            <motion.div
              className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 rounded-xl md:h-auto h-[20vh] md:aspect-auto aspect-[16/9]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="md:pl-8 mt-4 md:mt-0 md:flex-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="md:text-base text-xs text-orange-600 pb-1">{slide.offer}</p>
                <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-lg font-semibold line-clamp-2 md:line-clamp-none">
                  {slide.title}
                </h1>
                <div className="flex items-center mt-2 md:mt-6">
                  <motion.button
                    className="px-3 md:px-4 py-1 md:py-1.5 bg-orange-600 rounded-full text-white font-medium text-[10px] md:text-xs"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {slide.buttonText1}
                  </motion.button>
                  <motion.button
                    className="group flex items-center gap-1 md:gap-2 px-3 md:px-6 py-1 md:py-2.5 font-medium text-[10px] md:text-xs"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {slide.buttonText2}
                    <ArrowRight className="group-hover:translate-x-1 transition" size={12} />
                  </motion.button>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center md:flex-1 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img
                  className="md:w-72 w-auto h-full object-contain max-h-[10vh] md:max-h-none"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Custom styling for react-slick */}
      <style jsx global>{`
        .slider-container .slick-slide {
          padding: 10px;
        }
        .slider-container .slick-center {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        .slider-container .slick-dots li button:before {
          color: #ea580c;
        }
        .slider-container .slick-dots li.slick-active button:before {
          color: #ea580c;
        }
        .slider-container .slick-prev, 
        .slider-container .slick-next {
          z-index: 10;
        }
        .slider-container .slick-prev {
          left: 15px;
        }
        .slider-container .slick-next {
          right: 15px;
        }
        @media (max-width: 768px) {
          .slider-container .slick-center {
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderSlider;
