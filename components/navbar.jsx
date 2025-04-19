"use client";
import React, { memo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  LogOut,
  CreditCard,
  Settings,
  ChevronDown,
  Heart,
  Store,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

// Memoize the NavLink component to prevent unnecessary re-renders
const NavLink = memo(({ href, children, pathname }) => {
  const router = useRouter();

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`hover:text-gray-900 transition cursor-pointer ${isActive ? "text-orange-600 font-medium" : ""}`}
    >
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Création d'un tableau pour simuler l'état isSeller
  const [isSeller] = React.useState(true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <motion.nav
      className="fixed bg-white/40 backdrop-blur-3xl z-999 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-100 text-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // Reduced from 0.5
    >
      {/* Logo */}
      <div
        className="cursor-pointer w-8 md:w-4"
        onClick={() => router.push("/")}
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
        <NavLink href="/" pathname={pathname}>
          Accueil
        </NavLink>
        <NavLink href="/all-products" pathname={pathname}>
          Produits
        </NavLink>
        <NavLink href="/about" pathname={pathname}>
          À propos
        </NavLink>
        <NavLink href="/contact" pathname={pathname}>
          Contact
        </NavLink>

        {isSeller && (
          <button
            // onClick={() => router.push('/seller')}
            className={`text-xs border border-gray-200 px-4 py-1.5 rounded-full cursor-pointer hover:border-gray-300 transition-all hover:bg-gray-100 ${pathname === "/seller" ? "text-orange-600 border-orange-600" : ""}`}
          >
            Boutique 🛍️
          </button>
        )}
      </motion.div>
      {/* Mobile User Button with Animation */}
      <motion.div
        className="flex items-center md:hidden gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isSeller && (
          <button
            // onClick={() => router.push('/seller')}
            className={`text-xs border border-gray-200 px-4 py-1.5 rounded-full cursor-pointer hover:border-gray-300 transition-all hover:bg-gray-100 ${pathname === "/seller" ? "text-orange-600 border-orange-600" : ""}`}
          >
            Boutique 🛍️
          </button>
        )}
        <motion.button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 hover:text-gray-900 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-4 h-4" />
          {user ? (
            <motion.span
              className="max-w-[120px] truncate"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              {user.email}
            </motion.span>
          ) : (
            "Connexion"
          )}
        </motion.button>
      </motion.div>
      {/* User Profile with Dropdown */}
      <motion.div
        className="hidden md:flex items-center gap-4 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        ref={dropdownRef}
      >
        <button
          onClick={() =>
            user ? setIsDropdownOpen(!isDropdownOpen) : router.push("/login")
          }
          className="flex items-center gap-2 hover:text-gray-900 transition"
        >
          <User className="w-4 h-4" />
          {user ? (
            <>
              <span className="max-w-[120px] truncate">{user.email}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </>
          ) : (
            "Connexion"
          )}
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && user && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.div
                className="p-3 border-b border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email}
                </p>
                <button
                  onClick={() => router.push("/profile")}
                  className="text-xs text-red-600 -mt-4 hover:underline"
                >
                  Votre profile n'est pas à jour
                </button>
              </motion.div>

              <div className="py-1">
                {[
                  {
                    icon: <User className="w-4 h-4" />,
                    text: "Mon profil",
                    path: "/profile",
                    delay: 0.15,
                  },
                  {
                    icon: <CreditCard className="w-4 h-4" />,
                    text: "Mes cartes",
                    path: "/cards",
                    delay: 0.2,
                  },
                  {
                    icon: <Heart className="w-4 h-4" />,
                    text: "Favoris",
                    path: "/favorites",
                    delay: 0.25,
                  },
                  {
                    icon: <Store className="w-4 h-4" />,
                    text: "Créer sa Boutique 🛍️",
                    path: "/create-shop",
                    delay: 0.3,
                  },
                  {
                    icon: <Settings className="w-4 h-4" />,
                    text: "Paramètres",
                    path: "/settings",
                    delay: 0.35,
                  },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push(item.path);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors text-left relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {item.icon}
                    {item.text}
                    {item.text === "Mon profil" && (
                      <div className="absolute top-1/2 left-1 -translate-y-1/2 bg-red-600 items-center justify-center w-1 h-1 rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="py-1 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.2 }}
              >
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(254, 226, 226, 0.5)",
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default memo(Navbar);
