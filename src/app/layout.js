import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthProvider";
import CartProvider from "@/context/CartContext";
import ToasterProvider from "@/components/ToasterProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";

import MaintenanceWrapper from "@/components/MaintenanceWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "The Workout - Premium Fitness",
    description: "Your ultimate destination for fitness, supplements, and training.",
};

export default async function RootLayout({ children }) {
    await dbConnect();
    const settings = await Settings.findOne();
    const session = await getServerSession(authOptions);

    const isMaintenance = settings?.maintenanceMode;
    const isAdmin = session?.user?.role === 'admin';

    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <AuthProvider>
                    <CartProvider>
                        <MaintenanceWrapper isMaintenance={isMaintenance} isAdmin={isAdmin}>
                            <Navbar />
                            <ToasterProvider />
                            <main className="min-h-screen">
                                {children}
                            </main>
                            <Footer />
                        </MaintenanceWrapper>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
