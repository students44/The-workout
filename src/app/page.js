import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Dumbbell, Users, Clock, Zap, CheckCircle } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.png"
                        alt="Premium Gym Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-600/30 backdrop-blur-sm">
                        <span className="text-red-500 font-semibold tracking-wide uppercase text-sm">
                            Elevate Your Potential
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                        UNLEASH YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                            INNER BEAST
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                        Join the elite fitness community. Expert trainers, premium equipment, and a supportive environment to help you reach your peak potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/membership"
                            className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                Start Your Journey <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center"
                        >
                            Book a Free Trial
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Why Choose <span className="text-red-600">The Workout</span>?
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            We don't just provide equipment; we provide an ecosystem for your success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Dumbbell className="w-10 h-10 text-white" />,
                                title: "Premium Equipment",
                                desc: "Train with the latest, high-end machinery designed for biomechanical perfection.",
                                color: "from-blue-600 to-blue-900"
                            },
                            {
                                icon: <Users className="w-10 h-10 text-white" />,
                                title: "Expert Community",
                                desc: "Surround yourself with motivated individuals and certified trainers who care.",
                                color: "from-red-600 to-red-900"
                            },
                            {
                                icon: <Zap className="w-10 h-10 text-white" />,
                                title: "24/7 Access",
                                desc: "Your fitness journey doesn't have a schedule. Train whenever inspiration strikes.",
                                color: "from-amber-600 to-amber-900"
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Social Proof Section */}
            <section className="py-20 border-y border-gray-900 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Active Members", value: "2,000+" },
                            { label: "Expert Trainers", value: "15+" },
                            { label: "Classes Weekly", value: "50+" },
                            { label: "Success Stories", value: "500+" },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-red-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-900/10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform?</h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Don't wait for tomorrow. The perfect time to start is now.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 transition-colors"
                    >
                        Join Now <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
