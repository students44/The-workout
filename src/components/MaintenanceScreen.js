"use client";

import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MaintenanceScreen() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-5xl font-bold mb-6 italic">THE <span className="text-red-600">WORKOUT</span></h1>
            <h2 className="text-3xl font-bold mb-4">Under Maintenance</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                We are currently upgrading our systems to serve you better.
                Please check back shortly.
            </p>
            <div className="w-16 h-1 bg-red-600 rounded-full mb-12"></div>

            <div className="flex gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={18} />
                    <span>Go Back</span>
                </button>
                <button
                    onClick={() => router.push('/login')}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors text-sm font-medium"
                >
                    <Lock size={18} />
                    <span>Admin Login</span>
                </button>
            </div>
        </div>
    );
}
