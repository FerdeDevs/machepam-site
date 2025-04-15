import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <motion.img 
        onClick={() => router.push('/')} 
        className='w-28 lg:w-32 cursor-pointer' 
        src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop" 
        alt="logo"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.button 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1'
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span>Logout</span>
        <LogOut size={16} />
      </motion.button>
    </div>
  )
}

export default Navbar;