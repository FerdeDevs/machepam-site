"use client"
import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="md:text-4xl text-2xl font-medium"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        News Letter
      </motion.h1>
      <motion.p 
        className="md:text-base text-gray-500/80 pb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
       Abonnez-vous maintenant et obtenez 20% de réduction
      </motion.p>
      <motion.div 
        className="flex items-center justify-between sm:max-w-1/3 w-full md:h-10 h-10 relative"
        // className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.input
          className="border border-gray-500/30 rounded-full h-full outline-none w-full text-sm pl-4 text-gray-500"
          // className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          whileFocus={{ borderColor: 'rgba(234, 88, 12, 0.5)' }}
          transition={{ duration: 0.2 }}
        />
        <motion.button 
        className="right-1 top-1 bottom-1 px-4 text-sm bg-orange-600 text-white rounded-full absolute"
          // className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          send
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NewsLetter;