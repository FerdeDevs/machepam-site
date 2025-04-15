'use client'
import ProductCard from "@/components/productCard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const AllProducts = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Tableau de produits statique avec des URLs d'images réelles
    const products = [
        {
            id: 1,
            name: "Classic Leather Sofa",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "furniture"
        },
        {
            id: 2,
            name: "Modern Dining Table",
            price: 599.99,
            image: "https://images.unsplash.com/photo-1532372320572-cda25653a694?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "furniture"
        },
        {
            id: 3,
            name: "Minimalist Desk Lamp",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "lighting"
        },
        {
            id: 4,
            name: "Cozy Throw Blanket",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1580905322150-ae13ccbf633e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "textiles"
        },
        {
            id: 5,
            name: "Handcrafted Ceramic Vase",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1612546242025-22c363baacd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "decor"
        },
        {
            id: 6,
            name: "Wooden Coffee Table",
            price: 349.99,
            image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "furniture"
        },
        {
            id: 7,
            name: "Abstract Wall Art",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "art"
        },
        {
            id: 8,
            name: "Designer Armchair",
            price: 459.99,
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            category: "furniture"
        }
    ];

    // Get unique categories for filter
    const categories = ["all", ...new Set(products.map(product => product.category))];

    // Filter products based on search term and category
    useEffect(() => {
        let result = products;

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-12">
                <motion.div
                    className="hidden sm:flex flex-col items-end pt-12 w-full"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-2xl font-medium">Tous les produits</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </motion.div>

                {/* Search and filter section */}
                <motion.div
                    className="w-full mt-8 flex flex-col md:flex-row gap-4 justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Search bar */}
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Rechercher les produits..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-1.5 pl-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-1.5 border border-gray-200 rounded-full text-xs cursor-pointer capitalize transition-all ${selectedCategory === category
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-50 hover:bg-gray-100 hover:border-gray-200 text-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results count */}
                <p className="text-gray-500 mt-4">
                    Affichage de {filteredProducts.length} sur {products.length} produits
                </p>

                {/* Products grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            {/* <div className="gap-2 flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-orange-600 border-gray-200"></div>
                                <p className="text-gray-500">Chargement...</p>
                            </div> */}
                                   <p className="text-gray-500">Aucun produit ne correspond à vos critères</p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("all");
                                }}
                                className="mt-4 text-orange-600 cursor-pointer hover:underline"
                            >
                                Effacer les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;