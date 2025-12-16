"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function ProductPage({ params }) {
    const { id } = use(params);
    const { addToCart } = useCart();
    const { data: session } = useSession();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products/${id}`);
                const result = await response.json();

                if (result.success) {
                    setProduct(result.data);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (session) {
            if (product) {
                addToCart(product);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
            }
        } else {
            toast.error("Please login first");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white py-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    <p className="mt-4 text-gray-400">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-black text-white py-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-6">{error || "Product not found"}</p>
                    <Link
                        href="/store"
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                        Back to Store
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/store"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 h-[400px] lg:h-[600px] flex items-center justify-center relative">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-8"
                            />
                        ) : (
                            <span className="text-gray-600 text-xl">Image Coming Soon</span>
                        )}

                        {/* Out of Stock Overlay */}
                        {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl transform -rotate-12">
                                    OUT OF STOCK
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-start pt-4">
                        <div className="mb-2">
                            <span className="text-red-500 font-medium tracking-wide uppercase text-sm">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center mb-8">
                            <span className="text-3xl font-bold text-red-500">${product.price}</span>
                            {product.stock > 0 && product.stock < 10 && (
                                <span className="ml-4 text-orange-500 text-sm font-medium">
                                    Only {product.stock} left in stock!
                                </span>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-300 mb-10">
                            <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                            <p className="text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center transition-all transform active:scale-95 ${product.stock === 0
                                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                        : showSuccess
                                            ? "bg-green-600 text-white"
                                            : "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                                        }`}
                                >
                                    {showSuccess ? (
                                        <>
                                            <Check size={24} className="mr-2" />
                                            Added to Cart
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={24} className="mr-2" />
                                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-2 gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="block text-gray-400 mb-1">SKU</span>
                                    {product._id.substring(0, 8).toUpperCase()}
                                </div>
                                <div>
                                    <span className="block text-gray-400 mb-1">Availability</span>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
