'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Package, Loader } from "lucide-react";

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Devise
    const currency = "$";

    // Données factices de commandes
    const orderDummyData = [
        {
            _id: "order1",
            items: [
                {
                    product: {
                        name: "Sony WH-1000XM4 Headphones",
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    },
                    quantity: 1
                },
                {
                    product: {
                        name: "Apple AirPods Pro",
                        image: "https://images.unsplash.com/photo-1631362522714-e9c217177bd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    },
                    quantity: 2
                }
            ],
            address: {
                fullName: "John Doe",
                area: "123 Tech Street",
                city: "San Francisco",
                state: "CA",
                phoneNumber: "555-123-4567"
            },
            amount: 599.97,
            date: "2025-03-15T08:30:00Z"
        },
        {
            _id: "order2",
            items: [
                {
                    product: {
                        name: "MacBook Pro 14-inch",
                        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    },
                    quantity: 1
                }
            ],
            address: {
                fullName: "Jane Smith",
                area: "456 Apple Avenue",
                city: "New York",
                state: "NY",
                phoneNumber: "555-987-6543"
            },
            amount: 1999.99,
            date: "2025-03-18T14:45:00Z"
        },
        {
            _id: "order3",
            items: [
                {
                    product: {
                        name: "Samsung Galaxy Watch 4",
                        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    },
                    quantity: 1
                },
                {
                    product: {
                        name: "iPhone 14 Pro Max",
                        image: "https://images.unsplash.com/photo-1678911820864-e4c18b205849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    },
                    quantity: 1
                }
            ],
            address: {
                fullName: "Robert Brown",
                area: "789 Digital Drive",
                city: "Austin",
                state: "TX",
                phoneNumber: "555-456-7890"
            },
            amount: 1379.98,
            date: "2025-04-01T10:15:00Z"
        }
    ];

    const fetchSellerOrders = async () => {
        // Simuler un chargement
        setTimeout(() => {
            setOrders(orderDummyData);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchSellerOrders();
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
            className="w-full bg-gray-100 p-4 text-center text-gray-600 text-sm mt-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            © 2025 Tech Shop. All rights reserved.
        </motion.footer>
    );

    return (
        <motion.div 
            className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? <Loading /> : (
                <motion.div 
                    className="md:p-10 p-4 space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2 
                        className="text-lg font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        Orders
                    </motion.h2>
                    <motion.div 
                        className="max-w-4xl rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        {orders.map((order, index) => (
                            <motion.div 
                                key={index} 
                                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                            >
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <div className="bg-orange-100/50 p-2 rounded-md flex items-center justify-center">
                                        <Package className="w-12 h-12 text-orange-600" />
                                    </div>
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Items: {order.items.length}</span>
                                    </p>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 * (index + 1) }}
                                >
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span>{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </motion.div>
                                <motion.p 
                                    className="font-medium my-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 * (index + 1) }}
                                >
                                    {currency}{order.amount}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.4 * (index + 1) }}
                                >
                                    <p className="flex flex-col">
                                        <span>Method: COD</span>
                                        <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                                        <span className="text-orange-600 font-medium">Payment: Pending</span>
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
            <Footer />
        </motion.div>
    );
};

export default Orders;