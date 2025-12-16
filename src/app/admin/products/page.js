"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/admin/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
                    <p className="text-gray-400">Manage your store inventory.</p>
                </div>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors font-medium">
                    <Plus size={20} />
                    Add Product
                </button>
            </header>

            {isLoading ? (
                <div className="text-white text-center py-12">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
                        >
                            <div className="relative h-48 w-full bg-black/20">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-600">
                                        <Package size={40} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${product.stock > 0
                                            ? "bg-green-500 text-white shadow-lg shadow-green-900/40"
                                            : "bg-red-500 text-white shadow-lg shadow-red-900/40"
                                        }`}>
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1 truncate">{product.name}</h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-1">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-red-500 font-bold text-lg">${product.price}</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
