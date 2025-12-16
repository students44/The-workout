import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ status: { $ne: "Cancelled" } });
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // Let's add new orders count (e.g. created in last 24h or simple "Pending" orders)
        const pendingOrders = await Order.countDocuments({ status: "Pending" });

        return NextResponse.json({
            totalUsers,
            totalOrders,
            totalRevenue,
            pendingOrders
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
    }
}
