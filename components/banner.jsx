"use client"
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* <motion.img
        className="max-w-56"
        src="https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=1469&auto=format&fit=crop"
        alt="jbl_soundbox_image"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      /> */}
      <motion.div
        className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Améliorez Votre Expérience de Jeu
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          Du son immersif aux contrôles précis—tout ce dont vous avez besoin pour gagner
        </p>
        <motion.button
          className="group flex items-center justify-center gap-1 px-4 py-1.5 bg-orange-600 rounded-full text-xs text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Buy now
          <ArrowRight className="group-hover:translate-x-1 transition text-white w-4 h-4" />
        </motion.button>
      </motion.div>
      <motion.img
        className="hidden md:block max-w-80"
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
        alt="md_controller_image"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      {/* <motion.img
        className="md:hidden"
        src="https://images.pexels.com/photos/2520829/pexels-photo-2520829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="sm_controller_image"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      /> */}
    </motion.div>
  );
};

export default Banner;