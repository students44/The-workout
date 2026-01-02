"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Mail, Shield, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [settings, setSettings] = useState({
        siteName: "",
        supportEmail: "",
        maintenanceMode: false,
        emailNotifications: true,
        orderNotifications: true
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setSettings(data);
            } catch (error) {
                toast.error("Failed to load settings");
            } finally {
                setIsFetching(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });

            if (!res.ok) throw new Error("Failed to update");

            const data = await res.json();
            setSettings(data);
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="text-white text-center py-12">Loading settings...</div>;
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">Manage your store preferences and configuration.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">General Settings</h2>
                            <p className="text-sm text-gray-400">Basic store information</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Support Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    name="supportEmail"
                                    value={settings.supportEmail}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Notifications</h2>
                            <p className="text-sm text-gray-400">Manage email alerts</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                            <div>
                                <h3 className="text-white font-medium">Order Notifications</h3>
                                <p className="text-sm text-gray-400">Receive emails when new orders are placed</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="orderNotifications"
                                    checked={settings.orderNotifications}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                            <div>
                                <h3 className="text-white font-medium">Email Updates</h3>
                                <p className="text-sm text-gray-400">Receive platform updates and news</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Security & Access</h2>
                            <p className="text-sm text-gray-400">Control platform access</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                        <div>
                            <h3 className="text-white font-medium">Maintenance Mode</h3>
                            <p className="text-sm text-gray-400">Disable store access for customers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>
                </motion.div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <Save size={20} />
                        )}
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
