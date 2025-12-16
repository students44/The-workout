const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

let MONGODB_URI = "mongodb://localhost:27017/theworkout";

try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        const match = envConfig.match(/MONGODB_URI=(.*)/);
        if (match && match[1]) {
            MONGODB_URI = match[1].trim().replace(/['"]/g, '');
            console.log("Using MONGODB_URI from .env.local");
        }
    }
} catch (e) {
    console.log("Using default localhost URI");
}

const products = [
    {
        name: "Whey Protein Isolate",
        description: "Premium whey protein isolate for maximum muscle recovery and growth. Low carb, low fat, and delicious taste.",
        price: 49.99,
        category: "Supplements",
        image: "/store/protein.png",
        stock: 50,
        rating: 4.8,
        reviews: 120
    },
    {
        name: "Pre-Workout Energy",
        description: "Explosive energy and focus for your toughest workouts. Contains Beta-Alanine, Citrulline, and Caffeine.",
        price: 34.99,
        category: "Supplements",
        image: "/store/preworkout.png",
        stock: 30,
        rating: 4.6,
        reviews: 85
    },
    {
        name: "Adjustable Dumbbells",
        description: "Space-saving adjustable dumbbells fitting 5-52.5 lbs in one set. Perfect for home gyms.",
        price: 299.99,
        category: "Equipment",
        image: "/store/dumbbells.png",
        stock: 10,
        rating: 4.9,
        reviews: 210
    },
    {
        name: "Training Gloves",
        description: "Durable training gloves with wrist support and grip enhancement. Protect your hands during heavy lifting.",
        price: 19.99,
        category: "Accessories",
        image: "/store/gloves.png",
        stock: 100,
        rating: 4.5,
        reviews: 45
    },
    {
        name: "Yoga Mat",
        description: "High density anti-tear exercise yoga mat with carrying strap. Non-slip surface for stability.",
        price: 24.99,
        category: "Accessories",
        image: "/store/yogamat.png",
        stock: 75,
        rating: 4.7,
        reviews: 150
    },
    {
        name: "Resistance Bands Set",
        description: "Set of 5 resistance bands with different difficulty levels. Includes door anchor and carrying bag.",
        price: 14.99,
        category: "Equipment",
        image: "/store/bands.png",
        stock: 200,
        rating: 4.4,
        reviews: 300
    },
    {
        name: "Creatine Monohydrate",
        description: "Pure micronized creatine monohydrate to improve strength, power, and muscle mass.",
        price: 29.99,
        category: "Supplements",
        image: "/store/creatine.png",
        stock: 60,
        rating: 4.8,
        reviews: 95
    },
    {
        name: "Shaker Bottle",
        description: "Leak-proof shaker bottle with blending ball for smooth protein shakes.",
        price: 9.99,
        category: "Accessories",
        image: "/store/shaker.png",
        stock: 150,
        rating: 4.3,
        reviews: 500
    }
];

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    stock: Number,
    rating: Number,
    reviews: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seedIn() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        await Product.deleteMany({});
        console.log("Cleared existing products");

        await Product.insertMany(products);
        console.log("Seeded " + products.length + " products");

        console.log("Done!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seedIn();
