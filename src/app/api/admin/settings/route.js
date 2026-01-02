import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        // Allow public access for maintenance mode check?
        // Actually, site config like siteName might be public.
        // But for admin settings page, we definitely need admin access.
        // For now, let's keep GET public or semi-private, but for editing strict admin.

        await dbConnect();

        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        // Strict Admin Check
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        await dbConnect();

        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(body);
        } else {
            // Update existing
            Object.assign(settings, body);
            await settings.save();
        }

        return NextResponse.json(settings);

    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
