"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        alert("Message sent! (This is a demo)");
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions? We're here to help. Visit us, call us, or send us a message.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Address</h4>
                                        <p className="text-gray-400">Islamabad G-13-2 main double road</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Phone</h4>
                                        <p className="text-gray-400">03452645064</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Email</h4>
                                        <p className="text-gray-400">muneebtech005@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Opening Hours</h4>
                                        <p className="text-gray-400">Mon - Fri: 5:00 AM - 11:00 PM</p>
                                        <p className="text-gray-400">Sat - Sun: 7:00 AM - 9:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-800 h-64 rounded-xl flex items-center justify-center text-gray-500">
                            <p>Google Map Embed Placeholder</p>
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/15551234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold transition-colors"
                        >
                            <MessageCircle className="w-6 h-6 mr-2" />
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                        <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="Membership Inquiry"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
