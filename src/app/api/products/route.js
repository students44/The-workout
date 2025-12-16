import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// Mock data for when database is unavailable
const MOCK_PRODUCTS = [
    {
        _id: "507f1f77bcf86cd799439011",
        name: "Whey Protein Isolate",
        price: 49.99,
        category: "Supplements",
        image: "/store/protein.png",
        description: "High quality whey protein for muscle recovery.",
        stock: 50,
    },
    {
        _id: "507f1f77bcf86cd799439012",
        name: "Pre-Workout Energy",
        price: 39.99,
        category: "Supplements",
        image: "/store/preworkout.png",
        description: "Explosive energy and focus for your workouts.",
        stock: 30,
    },
    {
        _id: "507f1f77bcf86cd799439013",
        name: "Performance Gym Gloves",
        price: 24.99,
        category: "Equipment",
        image: "/store/gloves.png",
        description: "Protect your hands and improve your grip.",
        stock: 100,
    },
    {
        _id: "507f1f77bcf86cd799439014",
        name: "Stainless Steel Shaker",
        price: 19.99,
        category: "Accessories",
        image: "/store/shaker.png",
        description: "Durable and leak-proof shaker bottle.",
        stock: 75,
    },
    {
        _id: "507f1f77bcf86cd799439015",
        name: "Compression Shirt",
        price: 34.99,
        category: "Apparel",
        image: "/store/shirt.png",
        description: "Moisture-wicking fabric for maximum comfort.",
        stock: 40,
    },
    {
        _id: "507f1f77bcf86cd799439016",
        name: "Lifting Belt",
        price: 44.99,
        category: "Equipment",
        image: "",
        description: "Support your core during heavy lifts.",
        stock: 25,
    },
    {
        _id: "507f1f77bcf86cd799439017",
        name: "BCAA Recovery",
        price: 29.99,
        category: "Supplements",
        image: "",
        description: "Essential amino acids for muscle recovery.",
        stock: 60,
    },
    {
        _id: "507f1f77bcf86cd799439018",
        name: "Training Shorts",
        price: 39.99,
        category: "Apparel",
        image: "",
        description: "Lightweight and breathable workout shorts.",
        stock: 45,
    },
];

export async function GET(request) {
    try {
        // Get category from query params
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        let products;

        try {
            // Try to connect to database
            await dbConnect();

            // Build query
            let query = {};
            if (category && category !== "All") {
                query.category = category;
            }

            // Fetch products from database
            products = await Product.find(query).sort({ createdAt: -1 });

            // If no products in database, use mock data
            if (products.length === 0) {
                console.log("No products in database, using mock data");
                products = MOCK_PRODUCTS;

                // Filter mock data by category if specified
                if (category && category !== "All") {
                    products = products.filter(p => p.category === category);
                }
            }
        } catch (dbError) {
            // Database connection failed, use mock data
            console.log("Database connection failed, using mock data:", dbError.message);
            products = MOCK_PRODUCTS;

            // Filter mock data by category if specified
            if (category && category !== "All") {
                products = products.filter(p => p.category === category);
            }
        }

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
