"use client"
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import React from "react";
import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

const Product = () => {
    const { id } = useParams();
    const router = useRouter();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    
    // Mocked products array since AppContext is removed
    const products = [
        {
            _id: "1",
            name: "Modern Desk Lamp",
            description: "Elegant modern desk lamp with adjustable brightness and color temperature settings. Perfect for your workspace or bedside table.",
            price: 79.99,
            offerPrice: 59.99,
            category: "Home Decor",
            image: [
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1287&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1287&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1287&auto=format&fit=crop"
            ]
        },
        {
            _id: "2",
            name: "Ergonomic Office Chair",
            description: "Premium ergonomic office chair with lumbar support and breathable mesh back. Adjustable height and armrests for maximum comfort.",
            price: 249.99,
            offerPrice: 199.99,
            category: "Furniture",
            image: [
                "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1287&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1287&auto=format&fit=crop"
            ]
        },
        {
            _id: "3",
            name: "Wireless Bluetooth Speaker",
            description: "Portable wireless speaker with premium sound quality and 12-hour battery life. Water-resistant design makes it perfect for outdoor use.",
            price: 89.99,
            offerPrice: 69.99,
            category: "Electronics",
            image: [
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1287&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1286&auto=format&fit=crop"
            ]
        },
        {
            _id: "4",
            name: "Ceramic Coffee Mug Set",
            description: "Set of 4 handcrafted ceramic coffee mugs in assorted colors. Microwave and dishwasher safe.",
            price: 39.99,
            offerPrice: 29.99,
            category: "Kitchenware",
            image: [
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1287&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1572119865084-43c285814d63?q=80&w=1287&auto=format&fit=crop"
            ]
        },
        {
            _id: "5",
            name: "Minimalist Wall Clock",
            description: "Modern minimalist wall clock with silent quartz movement. Clean design complements any interior style.",
            price: 49.99,
            offerPrice: 39.99,
            category: "Home Decor",
            image: [
                "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1170&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616784675038-018a983ea9b5?q=80&w=1287&auto=format&fit=crop"
            ]
        }
    ];

    // Mock function to replace addToCart from AppContext
    const addToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
        // In a real app, this would manage cart state
    };

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    return productData ? (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-24 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div 
                        className="px-5 lg:px-16 xl:px-20"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                            {/* <img
                                src={mainImage || productData.image[0]}
                                alt="Product main view"
                                className="w-full h-auto object-cover mix-blend-multiply"
                            /> */}
                        </div>

                        {/* <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                >
                                    <img
                                        src={image}
                                        alt={`Product view ${index + 1}`}
                                        className="w-full h-auto object-cover mix-blend-multiply"
                                    />
                                </motion.div>
                            ))}
                        </div> */}
                    </motion.div>

                    <motion.div 
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                            {productData.name || 'nom'}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <Star className="h-4 w-4 text-orange-600" />
                                <Star className="h-4 w-4 text-orange-600" />
                                <Star className="h-4 w-4 text-orange-600" />
                                <Star className="h-4 w-4 text-orange-600" />
                                <Star className="h-4 w-4 text-gray-300" />
                            </div>
                            <p>(4.5)</p>
                        </div>
                        <p className="text-gray-600 mt-3">
                            {productData.description || 'description'}
                        </p>
                        <p className="text-3xl font-medium mt-6">
                            ${productData.offerPrice || 'offer price'}
                            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                                ${productData.price || 'price'}
                            </span>
                        </p>
                        <hr className="bg-gray-600 my-6" />
                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full max-w-72">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Brand</td>
                                        <td className="text-gray-800/50">Generic</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Color</td>
                                        <td className="text-gray-800/50">Multi</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Category</td>
                                        <td className="text-gray-800/50">
                                            {productData.category || 'category'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <motion.div 
                            className="flex items-center mt-10 gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <button 
                                onClick={() => addToCart(productData._id)} 
                                className="w-full px-4 py-1.5 rounded-full  bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </button>
                            <button 
                                onClick={() => { 
                                    addToCart(productData._id); 
                                    router.push('/cart');
                                }} 
                                className="w-full px-4 py-1.5 rounded-full  bg-orange-500 text-white hover:bg-orange-600 transition"
                            >
                                Buy now
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <div className="flex flex-col items-center mb-4 mt-16">
                        <p className="text-3xl font-medium">Produits <span className="font-medium text-orange-600">similaires</span></p>
                        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                        {products.slice(0, 5).map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    ) : <Loading />;
};

export default Product;