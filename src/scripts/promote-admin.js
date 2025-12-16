const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

// User Schema (Simplified for the script)
const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "trainer", "manager"],
            default: "user",
        },
    },
    { collection: "users" } // Force collection name to ensure we hit the right one
);

// Prevent overwriting model if already compiled
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function promoteToAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to database.");

        const emailToPromote = "muneebtech005@gmail.com"; // admin access email

        // Find and update the user
        const user = await User.findOneAndUpdate(
            { email: emailToPromote },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            console.log(`❌ User with email ${emailToPromote} not found.`);
            console.log("-> Please sign up this user on the website first.");
        } else {
            console.log(`✅ Success! User ${user.email} is now an ADMIN.`);
            console.log("-> You can now log in and access /admin");
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
        process.exit();
    }
}

promoteToAdmin();
