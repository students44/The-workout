"use client";

import { useCart } from "@/context/CartContext";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart,
                    total: cartTotal,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Order placed successfully!");
                clearCart();
                // Redirect to a success page or orders page
                // For now, redirect to dashboard or home
                router.push("/dashboard");
            } else {
                toast.error(data.message || "Checkout failed");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    href="/store"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors"
                >
                    Go to Store
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center gap-6"
                            >
                                <div className="h-24 w-24 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        "No Image"
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <p className="text-gray-400 text-sm">{item.category}</p>
                                    <div className="mt-2 font-bold text-red-500">${item.price}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-gray-800 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="p-2 text-gray-400 hover:text-white"
                                        >
                                            <MinusIcon className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-2 text-gray-400 hover:text-white"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-400 hover:text-white underline"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 h-fit">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-gray-800 pt-4 flex justify-between text-white font-bold text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isCheckingOut ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Proceed to Checkout"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
