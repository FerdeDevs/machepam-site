'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ExternalLink, Loader } from "lucide-react";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données factices de produits
  const productsDummyData = [
    {
      _id: "1",
      name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
      category: "Headphone",
      price: 349.99,
      offerPrice: 299.99,
      image: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"]
    },
    {
      _id: "2",
      name: "Apple AirPods Pro with MagSafe Charging Case",
      category: "Earphone",
      price: 249.99,
      offerPrice: 199.99,
      image: ["https://images.unsplash.com/photo-1631362522714-e9c217177bd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"]
    },
    {
      _id: "3",
      name: "Samsung Galaxy Watch 4 Classic",
      category: "Watch",
      price: 349.99,
      offerPrice: 279.99,
      image: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"]
    },
    {
      _id: "4",
      name: "iPhone 14 Pro Max - 256GB",
      category: "Smartphone",
      price: 1199.99,
      offerPrice: 1099.99,
      image: ["https://images.unsplash.com/photo-1678911820864-e4c18b205849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"]
    },
    {
      _id: "5",
      name: "MacBook Pro 14-inch M2 Pro",
      category: "Laptop",
      price: 1999.99,
      offerPrice: 1899.99,
      image: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"]
    }
  ];

  const fetchSellerProduct = async () => {
    // Simuler un chargement
    setTimeout(() => {
      setProducts(productsDummyData);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  // Composant de chargement simplifié
  const Loading = () => (
    <motion.div 
      className="flex justify-center items-center h-64 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Loader className="w-10 h-10 text-orange-600 animate-spin" />
    </motion.div>
  );

  // Footer simplifié
  const Footer = () => (
    <motion.footer 
      className="w-full bg-gray-100 p-4 text-center text-gray-600 text-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      © 2025 Tech Shop. All rights reserved.
    </motion.footer>
  );

  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? <Loading /> : (
        <motion.div 
          className="w-full md:p-10 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="pb-4 text-lg font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            All Products
          </motion.h2>
          <motion.div 
            className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <motion.tr 
                    key={index} 
                    className="border-t border-gray-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2">
                        <img
                          src={product.image[0]}
                          alt="Product Image"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <span className="truncate w-full">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3">${product.offerPrice}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <motion.button 
                        onClick={() => router.push(`/product/${product._id}`)} 
                        className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="hidden md:block">Visit</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </motion.div>
  );
};

export default ProductList;