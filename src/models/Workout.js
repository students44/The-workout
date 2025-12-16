import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please provide a workout name"],
            trim: true,
        },
        duration: {
            type: Number, // in minutes
            default: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        exercises: [
            {
                name: {
                    type: String,
                    required: true,
                },
                sets: {
                    type: Number,
                    required: true,
                },
                reps: {
                    type: Number,
                    required: true,
                },
                weight: {
                    type: Number, // in kg or lbs
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
