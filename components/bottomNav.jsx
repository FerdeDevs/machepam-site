"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ShoppingBag, Mail, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Accueil', path: '/', icon: <Home size={20} /> },
    { name: 'Produits', path: '/all-products', icon: <ShoppingBag size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={20} /> },
    { name: 'À propos', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <motion.button
              key={item.name}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? 'text-orange-600' : 'text-gray-500'
              }`}
              onClick={() => router.push(item.path)}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 w-1/4 h-0.5 bg-orange-600"
                  layoutId="bottomNavIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;