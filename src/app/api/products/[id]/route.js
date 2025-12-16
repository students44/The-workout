import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// Mock data for when database is unavailable or product not found in DB
// Keeping this consistent with the products list endpoint
const MOCK_PRODUCTS = [
    {
        _id: "1",
        name: "Whey Protein Isolate",
        price: 49.99,
        category: "Supplements",
        image: "/store/protein.png",
        description: "High quality whey protein for muscle recovery. Contains 25g of protein per serving.",
        stock: 50,
    },
    {
        _id: "2",
        name: "Pre-Workout Energy",
        price: 39.99,
        category: "Supplements",
        image: "/store/preworkout.png",
        description: "Explosive energy and focus for your workouts. Contains caffeine and beta-alanine.",
        stock: 30,
    },
    {
        _id: "3",
        name: "Performance Gym Gloves",
        price: 24.99,
        category: "Equipment",
        image: "/store/gloves.png",
        description: "Protect your hands and improve your grip. Breathable material for comfort.",
        stock: 100,
    },
    {
        _id: "4",
        name: "Stainless Steel Shaker",
        price: 19.99,
        category: "Accessories",
        image: "/store/shaker.png",
        description: "Durable and leak-proof shaker bottle. Keeps drinks cold for hours.",
        stock: 75,
    },
    {
        _id: "5",
        name: "Compression Shirt",
        price: 34.99,
        category: "Apparel",
        image: "/store/shirt.png",
        description: "Moisture-wicking fabric for maximum comfort. Improves blood circulation.",
        stock: 40,
    },
    {
        _id: "6",
        name: "Lifting Belt",
        price: 44.99,
        category: "Equipment",
        image: "",
        description: "Support your core during heavy lifts. Adjustable fit for safety.",
        stock: 25,
    },
    {
        _id: "7",
        name: "BCAA Recovery",
        price: 29.99,
        category: "Supplements",
        image: "",
        description: "Essential amino acids for muscle recovery. Reduces muscle soreness.",
        stock: 60,
    },
    {
        _id: "8",
        name: "Training Shorts",
        price: 39.99,
        category: "Apparel",
        image: "",
        description: "Lightweight and breathable workout shorts. Perfect for any type of training.",
        stock: 45,
    },
];

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        let product = null;

        try {
            await dbConnect();

            // Try to find in database first
            product = await Product.findById(id);
        } catch (dbError) {
            console.log(`Database lookup failed for id ${id}, checking mock data. Error: ${dbError.message}`);
        }

        // If not found in DB or DB failed, check mock data
        if (!product) {
            product = MOCK_PRODUCTS.find((p) => p._id === id);
        }

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product details:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch product details",
            },
            { status: 500 }
        );
    }
}
