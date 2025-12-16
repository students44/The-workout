"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function StorePage() {
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const url = selectedCategory === "All"
                ? "/api/products"
                : `/api/products?category=${selectedCategory}`;

            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setProducts(result.data);
            } else {
                setError("Failed to load products");
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("An error occurred while loading products");
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">The Workout Store</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Premium supplements, apparel, and equipment to fuel your fitness journey.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4">
                    {["All", "Supplements", "Apparel", "Equipment", "Accessories"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${selectedCategory === cat
                                ? "bg-red-600 border-red-600 text-white"
                                : "border-gray-700 hover:bg-red-600 hover:border-red-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                        <p className="mt-4 text-gray-400">Loading products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-500 text-xl">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-xl">No products found in this category.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group hover:border-red-600 transition-colors"
                                    >
                                        <div className="h-64 bg-gray-800 relative flex items-center justify-center">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-600">Image Coming Soon</span>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold">{product.name}</h3>
                                                <span className="text-red-500 font-bold">${product.price}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                                            <p className="text-xs text-gray-500 mb-4">Stock: {product.stock || 0}</p>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/store/${product._id}`}
                                                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-center font-medium transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (session) {
                                                            addToCart(product);
                                                            toast.success("Added to cart");
                                                        } else {
                                                            toast.error("Please login first");
                                                        }
                                                    }}
                                                    disabled={product.stock === 0}
                                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                    title={product.stock === 0 ? "Out of stock" : "Add to cart"}
                                                >
                                                    <ShoppingCart size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
