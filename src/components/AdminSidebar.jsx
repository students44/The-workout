"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    Package
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-black border-r border-white/10 text-white hidden md:flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold italic">
                    THE <span className="text-red-600">WORKOUT</span>
                </h1>
                <p className="text-xs text-gray-500  uppercase tracking-widest">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"} />
                            <span className="font-medium text-sm">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-900/10 hover:text-red-500 transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
