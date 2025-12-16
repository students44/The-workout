import Link from "next/link";
import { Check } from "lucide-react";

export default function MembershipPage() {
    const plans = [
        {
            name: "Basic",
            price: "$29",
            period: "/month",
            features: ["Access to gym floor", "Locker room access", "Free WiFi", "1 Guest pass/month"],
            cta: "Select Basic",
            popular: false,
        },
        {
            name: "Premium",
            price: "$59",
            period: "/month",
            features: [
                "All Basic features",
                "Unlimited Group Classes",
                "Sauna & Steam Room",
                "Nutrition Consultation",
                "5 Guest passes/month",
            ],
            cta: "Select Premium",
            popular: true,
        },
        {
            name: "VIP",
            price: "$99",
            period: "/month",
            features: [
                "All Premium features",
                "2 Personal Training Sessions",
                "Private Locker",
                "Towel Service",
                "Unlimited Guest passes",
            ],
            cta: "Select VIP",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Flexible membership options designed to fit your lifestyle and fitness goals. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                    ? "bg-gray-900 border-2 border-red-600 transform md:-translate-y-4"
                                    : "bg-gray-900 border border-gray-800"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    <span className="text-gray-400 ml-2">{plan.period}</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/signup?plan=${plan.name.toLowerCase()}`}
                                className={`block w-full py-4 rounded-lg text-center font-bold transition-all ${plan.popular
                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                        : "bg-white text-black hover:bg-gray-200"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
