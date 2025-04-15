'use client'
import React, { useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MinusCircle, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const router = useRouter();
  
  // Simulation des données et fonctions du contexte
  const [cartItems, setCartItems] = useState({
    "1": 2,
    "2": 1,
    "3": 3
  });
  
  const products = [
    {
      _id: "1",
      name: "Modern Desk Lamp",
      offerPrice: 59.99,
      price: 79.99,
      image: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1287&auto=format&fit=crop"
      ]
    },
    {
      _id: "2",
      name: "Ergonomic Office Chair",
      offerPrice: 199.99,
      price: 249.99,
      image: [
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1287&auto=format&fit=crop"
      ]
    },
    {
      _id: "3",
      name: "Wireless Bluetooth Speaker",
      offerPrice: 69.99,
      price: 89.99,
      image: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1287&auto=format&fit=crop"
      ]
    }
  ];

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      const newCartItems = { ...cartItems };
      delete newCartItems[productId];
      setCartItems(newCartItems);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId, index) => {
                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <motion.tr 
                      key={itemId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <motion.div
                          initial={{ scale: 0.9 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </motion.div>
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">${product.offerPrice}</td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          <motion.button 
                            onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <MinusCircle size={16} className="text-gray-600" />
                          </motion.button>
                          <input 
                            onChange={e => updateCartQuantity(product._id, Number(e.target.value))} 
                            type="number" 
                            value={cartItems[itemId]} 
                            className="w-8 border text-center appearance-none"
                          />
                          <motion.button 
                            onClick={() => addToCart(product._id)}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <PlusCircle size={16} className="text-gray-600" />
                          </motion.button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <motion.button 
            onClick={() => router.push('/all-products')} 
            className="group flex items-center mt-6 gap-2 text-orange-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition" size={16} />
            Continue Shopping
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <OrderSummary />
        </motion.div>
      </div>
    </>
  );
};

export default Cart;