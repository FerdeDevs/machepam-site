'use client';
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

const MyOrders = () => {
    const currency = "$"; // Remplacé la référence de useAppContext
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Données simulées pour remplacer orderDummyData
    const orderDummyData = [
        {
            id: "ORD001",
            items: [
                {
                    product: { name: "Modern Desk Lamp" },
                    quantity: 1
                },
                {
                    product: { name: "Wireless Headphones" },
                    quantity: 2
                }
            ],
            address: {
                fullName: "John Doe",
                area: "123 Main Street, Apt 4B",
                city: "New York",
                state: "NY",
                phoneNumber: "+1 (555) 123-4567"
            },
            amount: 159.97,
            date: "2025-04-10T14:30:00"
        },
        {
            id: "ORD002",
            items: [
                {
                    product: { name: "Coffee Table" },
                    quantity: 1
                }
            ],
            address: {
                fullName: "Emma Wilson",
                area: "456 Park Avenue",
                city: "Boston",
                state: "MA",
                phoneNumber: "+1 (555) 987-6543"
            },
            amount: 249.99,
            date: "2025-04-08T09:15:00"
        },
        {
            id: "ORD003",
            items: [
                {
                    product: { name: "Smart Watch" },
                    quantity: 1
                },
                {
                    product: { name: "Wireless Charger" },
                    quantity: 1
                },
                {
                    product: { name: "Phone Case" },
                    quantity: 2
                }
            ],
            address: {
                fullName: "Michael Brown",
                area: "789 Elm Street",
                city: "Chicago",
                state: "IL",
                phoneNumber: "+1 (555) 555-5555"
            },
            amount: 187.96,
            date: "2025-04-05T16:45:00"
        }
    ];

    const fetchOrders = async () => {
        // Simulation d'une requête API
        setTimeout(() => {
            setOrders(orderDummyData);
            setLoading(false);
        }, 800);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <motion.div 
                    className="space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (
                        <div className="max-w-5xl border-t border-gray-300 text-sm">
                            {orders.map((order, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <div className="flex-1 flex gap-5 max-w-80">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
                                        >
                                            <Package size={64} className="text-gray-600" />
                                        </motion.div>
                                        <p className="flex flex-col gap-3">
                                            <span className="font-medium text-base">
                                                {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                            </span>
                                            <span>Items: {order.items.length}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-medium">{order.address.fullName}</span>
                                            <br />
                                            <span>{order.address.area}</span>
                                            <br />
                                            <span>{`${order.address.city}, ${order.address.state}`}</span>
                                            <br />
                                            <span>{order.address.phoneNumber}</span>
                                        </p>
                                    </div>
                                    <p className="font-medium my-auto">{currency}{order.amount}</p>
                                    <div>
                                        <p className="flex flex-col">
                                            <span>Method: COD</span>
                                            <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                                            <span>Payment: Pending</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;