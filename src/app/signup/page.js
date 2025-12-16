"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";

function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const loadingToast = toast.loading("Creating account...");

        if (!name || !email || !password) {
            setError("All fields are required");
            toast.error("All fields are required", { id: loadingToast });
            setIsLoading(false);
            return;
        }

        try {
            console.log("Sending registration data:", { name, email, password, membership: plan || "none" });
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    membership: plan || "none",
                }),
            });

            if (res.ok) {
                toast.success("Account created successfully!", { id: loadingToast });
                const form = e.target;
                form.reset();
                router.push("/login?registered=true");
            } else {
                const data = await res.json();
                const errorMsg = data.message || "Registration failed";
                setError(errorMsg);
                toast.error(errorMsg, { id: loadingToast });
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error during registration: ", error);
            setError("Something went wrong");
            toast.error("Something went wrong", { id: loadingToast });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-10">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-4"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10 overflow-hidden relative group">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-colors duration-500"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors duration-500"></div>

                    <div className="relative">
                        <div className="text-center mb-8">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl sm:text-4xl font-bold text-white mb-2 italic"
                            >
                                JOIN <span className="text-red-600">THE PACK</span>
                            </motion.h2>

                            {plan ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                    className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-2"
                                >
                                    <CheckCircle size={14} className="text-red-500" />
                                    <span className="text-xs font-bold text-red-200 uppercase tracking-widest">
                                        {plan} PLAN SELECTED
                                    </span>
                                </motion.div>
                            ) : (
                                <p className="text-gray-400 text-sm">Create an account to start your journey.</p>
                            )}
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        className="block w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 outline-none hover:bg-white/10"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="block w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 outline-none hover:bg-white/10"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type="password"
                                        required
                                        placeholder="Create a password"
                                        className="block w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 outline-none hover:bg-white/10"
                                    />
                                </div>
                            </motion.div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center justify-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg text-white font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 transition-all duration-300 shadow-lg shadow-red-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 text-center text-sm text-gray-400 border-t border-white/10 pt-6"
                        >
                            Already have an account?{" "}
                            <Link href="/login" className="font-bold text-red-500 hover:text-red-400 transition-colors">
                                Sign in
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}
