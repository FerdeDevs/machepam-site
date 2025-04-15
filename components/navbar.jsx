"use client"
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Création d'un tableau pour simuler l'état isSeller
  const [isSeller] = React.useState(true);

  return (
    <motion.nav 
      className="fixed bg-white z-999 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <img
        className="cursor-pointer w-8 md:w-4"
        onClick={() => router.push('/')}
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
        alt="logo"
      />
      <motion.div 
        className="flex items-center gap-4 lg:gap-8 max-md:hidden"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link href="/" className={`hover:text-gray-900 transition cursor-pointer ${pathname === '/' ? 'text-orange-600 font-medium' : ''}`}>
          Accueil
        </Link>
        <Link href="/all-products" className={`hover:text-gray-900 transition cursor-pointer ${pathname === '/all-products' ? 'text-orange-600 font-medium' : ''}`}>
          Produits
        </Link>
        <Link href="/about" className={`hover:text-gray-900 transition cursor-pointer ${pathname === '/about' ? 'text-orange-600 font-medium' : ''}`}>
          À propos
        </Link>
        <Link href="/contact" className={`hover:text-gray-900 transition cursor-pointer ${pathname === '/contact' ? 'text-orange-600 font-medium' : ''}`}>
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className={`text-xs border border-gray-200 px-4 py-1.5 rounded-full cursor-pointer hover:border-gray-300 transition-all hover:bg-gray-100 ${pathname === '/seller' ? 'text-orange-600 border-orange-600' : ''}`}>Boutique 🛍️</button>}

      </motion.div>

      <motion.ul 
        className="hidden md:flex items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <User className="w-4 h-4" />
          Profile
        </button>
      </motion.ul>

      <motion.div 
        className="flex items-center md:hidden gap-3"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {isSeller && <button onClick={() => router.push('/seller')} className={`text-xs border px-4 py-1.5 rounded-full ${pathname === '/seller' ? 'text-orange-600 border-orange-600' : ''}`}>Seller Dashboard</button>}
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <User />
          Account
        </button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;