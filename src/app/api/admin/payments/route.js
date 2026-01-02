import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";

// GET: Fetch all payments
export async function GET(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const payments = await Payment.find().populate("user", "name email").sort({ createdAt: -1 });

        return NextResponse.json(payments, { status: 200 });
    } catch (error) {
        console.error("Fetch Payments Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// PUT: Approve or Reject Payment
export async function PUT(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { paymentId, action } = await req.json(); // action: "Approve" or "Reject"

        if (!paymentId || !['Approve', 'Reject'].includes(action)) {
            return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
        }

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return NextResponse.json({ message: "Payment not found" }, { status: 404 });
        }

        if (payment.status !== 'Pending') {
            return NextResponse.json({ message: "Payment is already processed" }, { status: 400 });
        }

        // Update Payment Status
        payment.status = action === 'Approve' ? 'Approved' : 'Rejected';
        await payment.save();

        if (action === 'Approve') {
            // Update User Plan
            const upgradeDate = new Date();
            const durationMonths = payment.duration;

            // Calculate Expiry Date (Use option A: Simple replacement, starts now)
            // Or Option B: Add remaining days.
            // Following requirement "Option A: Simple (Recommended for FYP)" - Old plan ends immediately, new starts instantly.

            const expiryDate = new Date(upgradeDate);
            expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

            await User.findByIdAndUpdate(payment.user, {
                membership: payment.plan,
                planStatus: 'Active',
                planStartDate: upgradeDate,
                planExpiryDate: expiryDate,
            });
        } else {
            // If Rejected, set planStatus back to None or whatever it was? 
            // Or maybe just 'Expired' if they had no active plan?
            // Safest is to just revert planStatus to match their CURRENT membership validity, 
            // but simpler logic: if they were Pending, and rejected, set planStatus to 'Active' if they had an old plan not expired, OR 'Expired' if outdated.
            // For simplicity, let's set it to 'None' if they don't have a valid plan, or leave it. 
            // Actually, if we just set it to 'Active' (if they had a plan) or 'None' is complex.
            // Let's just set planStatus to 'None' (Assuming they were upgrading from nothing or expired)
            // OR better: check if they have a valid expiry date in future, then 'Active', else 'Expired'.
            // For now, let's just leave it 'Pending' or set to 'Expired' to indicate rejection? 
            // The requirement says: "Once approved: User plan status -> Active". Doesn't specify rejection.
            // But user dashboard shows "Pending".
            // Let's update User to planStatus: 'None' (if they have no active plan) or re-calc.
            // Quick fix: Set to previous state? 
            // Let's just set it to 'None' if it was Pending.
            // Wait, if a user has an active Basic plan and upgrades to Premium, status becomes Pending.
            // If rejected, they should still have Basic/Active.
            // Ideally we shouldn't touch user planStatus until Approval. 
            // But we did set it to Pending in POST.
            // So we need to revert it.

            // Re-fetch user to check
            const user = await User.findById(payment.user);
            let newStatus = 'None';
            if (user.planExpiryDate && new Date(user.planExpiryDate) > new Date()) {
                newStatus = 'Active';
            }
            await User.findByIdAndUpdate(payment.user, {
                planStatus: newStatus
            });
        }

        return NextResponse.json({ message: `Payment ${action}d successfully` }, { status: 200 });

    } catch (error) {
        console.error("Process Payment Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
