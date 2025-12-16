import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-gray-800 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-wider text-red-600 uppercase italic mb-4 block">
                            The Workout
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            Your ultimate destination for fitness, supplements, and training. Join us to transform your body and mind.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/membership" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                                    Membership Plans
                                </Link>
                            </li>
                            <li>
                                <Link href="/store" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                                    Online Store
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                                    Fitness Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">Personal Training</li>
                            <li className="text-gray-400 text-sm">Group Classes</li>
                            <li className="text-gray-400 text-sm">Nutrition Plans</li>
                            <li className="text-gray-400 text-sm">Online Coaching</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-2 text-red-600 mt-0.5" />
                                <span className="text-gray-400 text-sm">123 Fitness Blvd, Gym City, GC 12345</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2 text-red-600" />
                                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2 text-red-600" />
                                <span className="text-gray-400 text-sm">info@theworkout.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} The Workout. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
