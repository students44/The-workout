"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const { cartCount } = useCart();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Membership", href: "/membership" },
        { name: "Store", href: "/store" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    if (session) {
        navLinks.push({ name: "Dashboard", href: "/dashboard" });
    }

    return (
        <nav className="bg-black/95 text-white sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold tracking-wider text-red-600 uppercase italic">
                            The Workout
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                        pathname === link.href
                                            ? "bg-red-600 text-white"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => {
                                if (session) {
                                    router.push("/cart");
                                } else {
                                    toast.error("Please login first");
                                }
                            }}
                            className="p-2 text-gray-300 hover:text-white transition-colors relative group"
                        >
                            <ShoppingCart size={20} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link href="/login" className="p-2 text-gray-300 hover:text-white transition-colors">
                            <User size={20} />
                        </Link>
                        <Link
                            href="/membership"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Book Trainer
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-b border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-base font-medium",
                                    pathname === link.href
                                        ? "bg-red-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-4 px-3 py-2 border-t border-gray-800 mt-2">
                            <button
                                className="text-gray-300 hover:text-white relative inline-block"
                                onClick={() => {
                                    setIsOpen(false);
                                    if (session) {
                                        router.push("/cart");
                                    } else {
                                        toast.error("Please login first");
                                    }
                                }}
                            >
                                <ShoppingCart size={20} />
                                {mounted && cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Link href="/login" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                                <User size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
