import dbConnect from "@/lib/db";
import Workout from "@/models/Workout";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { name, duration, date, exercises } = await req.json();

        const workout = await Workout.create({
            user: session.user.id,
            name,
            duration,
            date,
            exercises,
        });

        return NextResponse.json(workout, { status: 201 });
    } catch (error) {
        console.error("Error creating workout:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const workouts = await Workout.find({ user: session.user.id }).sort({ date: -1 });

        return NextResponse.json(workouts, { status: 200 });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
