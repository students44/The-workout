import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        // Get category from query params
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        await dbConnect();

        // Build query
        let query = {};
        if (category && category !== "All") {
            query.category = category;
        }

        // Fetch products from database
        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error("Error in products API:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch products",
            },
            { status: 500 }
        );
    }
}
