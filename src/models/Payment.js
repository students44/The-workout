import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan: {
            type: String,
            enum: ["Basic", "Standard", "Premium"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number, // In months
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Cash", "Bank Transfer", "Stripe", "PayPal"],
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        transactionId: {
            type: String,
        },
        screenshot: {
            type: String, // URL to screenshot if uploaded
        },
    },
    { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
