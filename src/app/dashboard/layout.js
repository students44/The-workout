"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    HomeIcon,
    UserIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: HomeIcon },
    { name: "Workouts", href: "/dashboard/workouts", icon: ChartBarIcon },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-800">
                    <span className="text-xl font-bold text-white tracking-wider">THE WORKOUT</span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col px-6 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors ${isActive
                                        ? "bg-red-600 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-gray-800 p-6">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        Sign out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-400 lg:hidden hover:text-white"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1" />
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Profile dropdown or user info could go here */}
                            <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700" />
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
