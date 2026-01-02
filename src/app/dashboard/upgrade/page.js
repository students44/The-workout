"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function UpgradePage() {
    const plans = [
        {
            name: "Basic",
            price: "Rs 2,000",
            duration: "1 Month",
            features: ["Gym access", "Basic workouts"],
            color: "gray",
        },
        {
            name: "Standard",
            price: "Rs 5,000",
            duration: "3 Months",
            features: ["Gym access", "Diet plan", "Trainers support"],
            color: "blue",
            popular: true,
        },
        {
            name: "Premium",
            price: "Rs 9,000",
            duration: "6 Months",
            features: ["Gym access", "Personal trainer", "Full access", "Diet plan"],
            color: "red",
        },
    ];

    return (
        <div className="py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Upgrade Your Plan</h1>
                <p className="text-gray-400">Choose the plan that suits your fitness goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl p-8 border ${plan.popular
                            ? "bg-gray-900 border-red-600 shadow-xl shadow-red-900/10"
                            : "bg-black border-gray-800"
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline justify-center">
                                <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                            </div>
                            <span className="text-gray-400 text-sm">{plan.duration}</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <Check className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={`/dashboard/upgrade/payment?plan=${plan.name}&price=${plan.price}&duration=${plan.duration}`}
                            className={`block w-full py-3 rounded-lg text-center font-bold transition-all ${plan.popular
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-white text-black hover:bg-gray-200"
                                }`}
                        >
                            Upgrade Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
