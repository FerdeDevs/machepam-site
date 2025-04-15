import React from "react";
import { useRouter } from "next/router";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const router = useRouter();

  const socialLinks = [
    { 
      id: 1, 
      icon: <Facebook size={24} />, 
      url: "#",
      alt: "facebook_icon" 
    },
    { 
      id: 2, 
      icon: <Twitter size={24} />, 
      url: "#",
      alt: "twitter_icon" 
    },
    { 
      id: 3, 
      icon: <Instagram size={24} />, 
      url: "#",
      alt: "instagram_icon" 
    }
  ];

  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img 
          className="hidden md:block" 
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=100&auto=format&fit=crop"
          alt="logo" 
        />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © greatstack.dev All Right Reserved.
        </p>
      </motion.div>
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {socialLinks.map((social) => (
          <motion.a 
            href={social.url} 
            key={social.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * social.id }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Footer;