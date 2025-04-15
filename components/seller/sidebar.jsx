'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlusCircle, ListOrdered, PackageCheck } from 'lucide-react';

const SideBar = () => {
    const pathname = usePathname();
    
    // Menu items with Lucide React icons instead of Image components
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: <PlusCircle size={24} /> },
        { name: 'Product List', path: '/seller/product-list', icon: <ListOrdered size={24} /> },
        { name: 'Orders', path: '/seller/orders', icon: <PackageCheck size={24} /> },
    ];

    return (
        <motion.div 
            className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            {menuItems.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <motion.div
                            className={
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                            whileHover={!isActive ? { 
                                backgroundColor: "rgba(249, 115, 22, 0.05)", 
                                x: 2,
                                transition: { duration: 0.2 }
                            } : {}}
                        >
                            <div className={`w-7 h-7 flex items-center justify-center ${isActive ? "text-orange-600" : "text-gray-700"}`}>
                                {item.icon}
                            </div>
                            <motion.p 
                                className='md:block hidden text-center'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 * (index + 1) }}
                            >
                                {item.name}
                            </motion.p>
                        </motion.div>
                    </Link>
                );
            })}
            
            <motion.div 
                className="mt-auto p-4 md:flex hidden flex-col items-center text-center text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
                    alt="Seller Dashboard" 
                    className="w-16 h-16 rounded-full mb-2 object-cover"
                />
                <p>Tech Shop Seller Dashboard</p>
                <p>v1.2.0</p>
            </motion.div>
        </motion.div>
    );
};

export default SideBar;