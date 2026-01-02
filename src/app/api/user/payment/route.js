import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";
import sendEmail from "@/lib/sendEmail";

export async function POST(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { plan, price, duration, paymentMethod } = await req.json();

        // Validate input
        if (!plan || !price || !duration || !paymentMethod) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create Payment Record
        const payment = await Payment.create({
            user: session.user.id,
            plan,
            amount: price,
            duration,
            paymentMethod,
            status: "Pending",
        });

        // Update User status to Pending? 
        // Or just let Admin see the payment and approve it.
        // Let's update user planStatus to 'Pending' so they see it on dashboard.

        await User.findByIdAndUpdate(session.user.id, {
            planStatus: "Pending"
        });

        // Send Email Notification to Admin
        try {
            const message = `
                <h1>New Payment Request</h1>
                <p><strong>User:</strong> ${session.user.name} (${session.user.email})</p>
                <p><strong>Plan:</strong> ${plan}</p>
                <p><strong>Amount:</strong> ${price}</p>
                <p><strong>Duration:</strong> ${duration} Months</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p>Please login to the Admin Dashboard to approve or reject this request.</p>
            `;

            const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM_EMAIL || 'itstudents005@gmail.com';
            console.log(`Attempting to send admin notification to: ${adminEmail}`);

            await sendEmail({
                email: adminEmail,
                subject: `New Payment Request - ${plan} (${paymentMethod})`,
                message,
            });
        } catch (emailError) {
            console.error("Failed to send admin notification email:", emailError);
            // Don't fail the request if email fails, just log it.
        }

        return NextResponse.json({ message: "Payment request submitted successfully", payment }, { status: 201 });

    } catch (error) {
        console.error("Payment Submission Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
