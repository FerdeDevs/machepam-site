"use client"
import React, { memo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Memoize the NavLink component to prevent unnecessary re-renders
const NavLink = memo(({ href, children, pathname }) => {
  const isActive = pathname === href;
  return (
    <Link href={href} className={`hover:text-gray-900 transition cursor-pointer ${isActive ? 'text-orange-600 font-medium' : ''}`}>
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Création d'un tableau pour simuler l'état isSeller
  const [isSeller] = React.useState(true);

  return (
    <motion.nav 
      className="fixed bg-white z-999 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // Reduced from 0.5
    >
      {/* Logo */}
      <div 
        className="cursor-pointer w-8 md:w-4"
        onClick={() => router.push('/')}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
          alt="logo"
          width={32}
          height={32}
          priority
        />
      </div>

      {/* Navigation Links - Optimized with memoized components */}
      <motion.div 
        className="flex items-center gap-4 lg:gap-8 max-md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} // Reduced from 0.5
      >
        <NavLink href="/" pathname={pathname}>Accueil</NavLink>
        <NavLink href="/all-products" pathname={pathname}>Produits</NavLink>
        <NavLink href="/about" pathname={pathname}>À propos</NavLink>
        <NavLink href="/contact" pathname={pathname}>Contact</NavLink>

        {isSeller && (
          <button 
            onClick={() => router.push('/seller')} 
            className={`text-xs border border-gray-200 px-4 py-1.5 rounded-full cursor-pointer hover:border-gray-300 transition-all hover:bg-gray-100 ${pathname === '/seller' ? 'text-orange-600 border-orange-600' : ''}`}
          >
            Boutique 🛍️
          </button>
        )}
      </motion.div>

      {/* User Profile */}
      <motion.ul 
        className="hidden md:flex items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }} // Reduced from 0.4
      >
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <User className="w-4 h-4" />
          Profile
        </button>
      </motion.ul>

      {/* Mobile Menu */}
      <motion.div 
        className="flex items-center md:hidden gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }} // Reduced from 0.5
      >
        {isSeller && (
          <button 
            onClick={() => router.push('/seller')} 
            className={`text-xs border px-4 py-1.5 rounded-full ${pathname === '/seller' ? 'text-orange-600 border-orange-600' : ''}`}
          >
            Seller Dashboard
          </button>
        )}
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <User />
          Account
        </button>
      </motion.div>
    </motion.nav>
  );
};

export default memo(Navbar);