import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        default: "THE WORKOUT"
    },
    supportEmail: {
        type: String,
        default: "support@theworkout.com"
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    emailNotifications: {
        type: Boolean,
        default: true
    },
    orderNotifications: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
