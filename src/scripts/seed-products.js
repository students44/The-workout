const mongoose = require("mongoose");
const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });
const MONGODB_URI = "mongodb+srv://itstudents005_db_user:NdUsil2b2Jcn96aW@cluster0.t16bjc9.mongodb.net/TheWorkout";

// Define Schema directly to avoid import issues in standalone script
const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            required: true,
            enum: ["Supplements", "Apparel", "Equipment", "Accessories"],
        },
        image: { type: String, required: true },
        stock: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const PRODUCTS = [
    {
        name: "Whey Protein Isolate",
        price: 49.99,
        category: "Supplements",
        image: "/store/protein.png",
        description: "High quality whey protein for muscle recovery.",
        stock: 50,
    },
    {
        name: "Pre-Workout Energy",
        price: 39.99,
        category: "Supplements",
        image: "/store/preworkout.png",
        description: "Explosive energy and focus for your workouts.",
        stock: 30,
    },
    {
        name: "Performance Gym Gloves",
        price: 24.99,
        category: "Equipment",
        image: "/store/gloves.png",
        description: "Protect your hands and improve your grip.",
        stock: 100,
    },
    {
        name: "Stainless Steel Shaker",
        price: 19.99,
        category: "Accessories",
        image: "/store/shaker.png",
        description: "Durable and leak-proof shaker bottle.",
        stock: 75,
    },
    {
        name: "Compression Shirt",
        price: 34.99,
        category: "Apparel",
        image: "/store/shirt.png",
        description: "Moisture-wicking fabric for maximum comfort.",
        stock: 40,
    },
    {
        name: "Lifting Belt",
        price: 39.99,
        category: "Equipment",
        image: "/store/belt.png",
        description: "Support your core during heavy lifts.",
        stock: 25,
    },
    {
        name: "Creatine Monohydrate",
        price: 29.99,
        category: "Supplements",
        image: "/store/creatine.png",
        description: "Pure creatine for strength and power.",
        stock: 60,
    },
    {
        name: "Training Shorts",
        price: 34.99,
        category: "Apparel",
        image: "/store/shorts.png",
        description: "Lightweight shorts for intense training.",
        stock: 45,
    },
];

async function seed() {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert new products
        await Product.insertMany(PRODUCTS);
        console.log("Seeded products successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seed();
