"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const router = useRouter();
    const currency = "$"; // Valeur par défaut pour remplacer useAppContext

    return (
        <motion.div
            onClick={() => { router.push('/product/' + product.id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div 
                className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={product.image || product.images[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                />
                <motion.button 
                    className="absolute top-2 right-2 bg-white p-2 rounded-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Heart className="h-3 w-3 text-gray-500" />
                </motion.button>
            </motion.div>

            <motion.p 
                className="md:text-base font-medium pt-2 w-full truncate"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                {product.name}
            </motion.p>
            
            <motion.p 
                className="w-full text-xs text-gray-500/70 max-sm:hidden truncate"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                {product.description || "High-quality product with premium features"}
            </motion.p>
            
            <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <p className="text-xs">{product.rating}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={`h-3 w-3 ${
                                index < Math.floor(product.rating)
                                    ? "text-orange-600 fill-orange-600"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div 
                className="flex items-end justify-between w-full mt-1"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <p className="text-base font-medium">{currency}{product.price}</p>
                <motion.button 
                    className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
                    whileHover={{ scale: 1.05, backgroundColor: "rgb(248 250 252)" }}
                    transition={{ duration: 0.2 }}
                >
                   Acheter
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default ProductCard;