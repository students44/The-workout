"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import Swal from "sweetalert2";

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const res = await fetch("/api/admin/payments");
            if (res.ok) {
                const data = await res.json();
                setPayments(data);
            } else {
                toast.error("Failed to fetch payments");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleAction = async (paymentId, action) => {
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${action.toLowerCase()} this payment.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: action === 'Approve' ? '#10B981' : '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: `Yes, ${action} it!`,
            background: '#111827',
            color: '#ffffff'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch("/api/admin/payments", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, action }),
            });

            if (res.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: `Payment has been ${action.toLowerCase()}d.`,
                    icon: 'success',
                    confirmButtonColor: '#DC2626',
                    background: '#111827',
                    color: '#ffffff'
                });
                fetchPayments(); // Refresh list
            } else {
                const data = await res.json();
                Swal.fire({
                    title: 'Error!',
                    text: data.message || "Action failed",
                    icon: 'error',
                    confirmButtonColor: '#DC2626',
                    background: '#111827',
                    color: '#ffffff'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: "Something went wrong",
                icon: 'error',
                confirmButtonColor: '#DC2626',
                background: '#111827',
                color: '#ffffff'
            });
        }
    };

    if (loading) return <div className="text-white p-8">Loading payments...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Payment Approvals</h1>

            <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">No payments found</td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        <div className="text-sm font-medium">{payment.user?.name || 'Unknown'}</div>
                                        <div className="text-sm text-gray-400">{payment.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{payment.plan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{payment.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{payment.paymentMethod}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            payment.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                        {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {payment.status === 'Pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(payment._id, 'Approve')}
                                                    className="text-green-500 hover:text-green-400"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(payment._id, 'Reject')}
                                                    className="text-red-500 hover:text-red-400"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
