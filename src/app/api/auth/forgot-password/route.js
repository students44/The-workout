import User from "@/models/User";
import connect from "@/lib/db";
import crypto from "crypto";
import sendEmail from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        console.log("Forgot Password Error: User not found with email", email);
        return NextResponse.json({ message: "Email could not be sent" }, { status: 404 });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set Token Expire Date (e.g., 10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    await user.save();

    // Create reset url to email to provided email
    // Assuming frontend is running on origin from request or env
    // For now, let's try to get origin from request headers or fallback to localhost
    const origin = req.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${origin}/reset-password/${resetToken}`;

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please make a PUT request to the following link:</p>
    <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
  `;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message,
        });

        return NextResponse.json({ success: true, data: "Email Sent" }, { status: 200 });
    } catch (error) {
        console.error("Forgot Password Error: Detailed error sending email:", error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return NextResponse.json({ message: "Email could not be sent" }, { status: 500 });
    }
}
