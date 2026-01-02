import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password cannot be less than 6 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin", "trainer", "manager"],
            default: "user",
        },
        membership: {
            type: String,
            enum: ["none", "Basic", "Standard", "Premium"],
            default: "none",
        },
        planStartDate: Date,
        planExpiryDate: Date,
        planStatus: {
            type: String,
            enum: ["Active", "Expired", "Pending", "None"],
            default: "None",
        },
        image: {
            type: String,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
