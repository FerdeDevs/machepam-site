"use client"
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/792832/pexels-photo-792832.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/792832/pexels-photo-792832.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/792832/pexels-photo-792832.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <motion.div 
      className="mt-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }, index) => (
          <motion.div 
            key={id} 
            className="relative group rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          >
            <img
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <motion.div 
              className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
            >
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <motion.button 
                className="flex items-center gap-1.5 bg-orange-600 px-4 py-1.5 rounded-full text-xs cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Acheter<ArrowUpRight className="h-3 w-3" />
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedProduct;