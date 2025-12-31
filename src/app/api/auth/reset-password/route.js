import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await connect();

    const { resetToken, password } = await req.json();

    if (!resetToken || !password) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Get hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid Request or Token Expired" }, { status: 400 });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
        success: true,
        data: "Password Reset Success",
        token: user._id // Optionally return a session token or just success message
    }, { status: 200 });
}
