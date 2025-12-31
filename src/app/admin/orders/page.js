"use client";

import { useState, useEffect } from "react";
import { Eye, Clock, CheckCircle, XCircle, Truck, Trash2, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/admin/orders");
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "Shipped": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Processing": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "Cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Delivered": return CheckCircle;
            case "Shipped": return Truck;
            case "Cancelled": return XCircle;
            default: return Clock;
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                toast.success(`Order ${newStatus.toLowerCase()} successfully`);
            } else {
                toast.error("Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Error updating order status");
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setOrders(orders.filter(order => order._id !== orderId));
                toast.success("Order deleted successfully");
            } else {
                toast.error("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Error deleting order");
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
                <p className="text-gray-400">Track and manage customer orders.</p>
            </header>

            {isLoading ? (
                <div className="text-white text-center py-12">Loading orders...</div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-400">
                            <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-300">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Total</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map((order, index) => {
                                    const StatusIcon = getStatusIcon(order.status);
                                    return (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-mono text-sm text-white">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white">{order.user?.name || "Unknown User"}</div>
                                                <div className="text-xs">{order.user?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white">
                                                ${order.totalAmount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                    <StatusIcon size={12} />
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {order.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order._id, 'Processing')}
                                                                title="Accept Order"
                                                                className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order._id, 'Cancelled')}
                                                                title="Reject Order"
                                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                        title="Delete Order"
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
