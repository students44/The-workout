"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, ShoppingBag, TrendingUp, Clock } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Total Orders",
            value: stats.totalOrders.toLocaleString(),
            icon: ShoppingBag,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Pending Orders",
            value: stats.pendingOrders.toLocaleString(),
            icon: Clock,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
    ];

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            {isLoading ? (
                <div className="text-white text-center py-12">Loading stats...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-400">{stat.title}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Recent Activity Placeholder (Could be expanded later) */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/5 hover:border-white/20">
                        <h3 className="font-bold text-white mb-1">Add Product</h3>
                        <p className="text-sm text-gray-400">List a new item in the store</p>
                    </button>
                    <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/5 hover:border-white/20">
                        <h3 className="font-bold text-white mb-1">View Recent Orders</h3>
                        <p className="text-sm text-gray-400">Check latest purchases</p>
                    </button>
                    <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors border border-white/5 hover:border-white/20">
                        <h3 className="font-bold text-white mb-1">Manage Users</h3>
                        <p className="text-sm text-gray-400">Review user accounts</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
