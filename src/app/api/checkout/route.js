import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { items, total } = body;

        if (!items || items.length === 0) {
            return NextResponse.json(
                { success: false, message: "Cart is empty" },
                { status: 400 }
            );
        }



        await dbConnect();

        // Validate product IDs
        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item._id)) {
                return NextResponse.json(
                    { success: false, message: "Invalid product in cart. Please clear your cart and try again." },
                    { status: 400 }
                );
            }
        }

        // Verify user exists
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Create order
        const order = await Order.create({
            user: user._id,
            items: items.map((item) => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            })),
            totalAmount: total,
            status: "Pending",
        });

        // Update product stock (optional but recommended)
        for (const item of items) {
            await Product.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.quantity }
            });
        }

        return NextResponse.json({
            success: true,
            data: order,
            message: "Order placed successfully , We will contact you soon ",
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Order creation failed" },
            { status: 500 }
        );
    }
}
