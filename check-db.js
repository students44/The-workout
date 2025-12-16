const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

let MONGODB_URI = "mongodb://localhost:27017/theworkout";

try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        const match = envConfig.match(/MONGODB_URI=(.*)/);
        if (match && match[1]) {
            MONGODB_URI = match[1].trim().replace(/['"]/g, ''); // remove quotes if any
            console.log("Using MONGODB_URI from .env.local");
        }
    }
} catch (e) {
    console.error("Could not read .env.local:", e.message);
}

async function checkDb() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to database");

        // Define basic schema to read users (or use existing model if we were using import)
        // Since this is a standalone script using require, we'll define a quick schema or try to require the model if it was CommonJS. 
        // But our project is ES modules (import/export). 
        // To avoid module issues, I'll just define a temporary schema here.

        const userSchema = new mongoose.Schema({ name: String, email: String, role: String, membership: String }, { strict: false });
        const User = mongoose.models.User || mongoose.model('User', userSchema);

        const users = await User.find({});
        console.log("\n--- USERS ---");
        console.table(users.map(u => ({
            id: u._id.toString(),
            name: u.name,
            email: u.email,
            role: u.role,
            membership: u.membership
        })));

        console.log("\nTotal Users:", users.length);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\nDisconnected");
    }
}

checkDb();
