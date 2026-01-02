"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan");
    const price = searchParams.get("price");
    const duration = searchParams.get("duration");

    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/user/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan,
                    price: price.replace(/[^0-9]/g, ""), // Extract number from string like "Rs 5,000"
                    duration: parseInt(duration), // Extract number from "1 Month"
                    paymentMethod,
                }),
            });

            if (res.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: 'Payment request submitted! Waiting for Admin Approval.',
                    icon: 'success',
                    confirmButtonColor: '#DC2626',
                    background: '#111827',
                    color: '#ffffff'
                });
                router.push("/dashboard");
            } else {
                const error = await res.json();
                Swal.fire({
                    title: 'Error!',
                    text: error.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonColor: '#DC2626',
                    background: '#111827',
                    color: '#ffffff'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: "Failed to submit payment request",
                icon: 'error',
                confirmButtonColor: '#DC2626',
                background: '#111827',
                color: '#ffffff'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!plan || !price) {
        return <div className="text-white text-center mt-20">Invalid Plan Details</div>;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-white mb-8">Complete Payment</h1>

            <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Plan Summary</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-bold">{plan}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{duration}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <span className="text-gray-400">Total Price</span>
                    <span className="text-2xl font-bold text-red-600">{price}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-6">Select Payment Method</h2>

                <div className="space-y-4 mb-8">
                    {["Cash", "Bank Transfer", "Stripe", "PayPal"].map((method) => (
                        <label
                            key={method}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === method
                                ? "border-red-600 bg-red-600/10"
                                : "border-gray-700 hover:border-gray-600"
                                }`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method}
                                checked={paymentMethod === method}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300"
                            />
                            <span className="ml-3 text-white font-medium">{method}</span>
                            {method === 'Bank Transfer' && paymentMethod === 'Bank Transfer' && (
                                <span className="ml-auto text-xs text-gray-400">(Details sent to email)</span>
                            )}
                            {method === 'Cash' && paymentMethod === 'Cash' && (
                                <span className="ml-auto text-xs text-gray-400">(Pay at Gym Desk)</span>
                            )}
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : "Confirm Payment"}
                </button>
            </form>
        </div>
    );
}
