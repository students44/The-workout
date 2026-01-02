"use client";

import { usePathname } from "next/navigation";
import MaintenanceScreen from "./MaintenanceScreen";

export default function MaintenanceWrapper({ children, isMaintenance, isAdmin }) {
    const pathname = usePathname();

    // Allow access to login, api routes, and static assets
    const isExcluded =
        pathname === "/login" ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static");

    if (isMaintenance && !isAdmin && !isExcluded) {
        return <MaintenanceScreen />;
    }

    return <>{children}</>;
}
