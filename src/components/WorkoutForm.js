"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function WorkoutForm({ onSuccess }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [exercises, setExercises] = useState([
        { name: "", sets: "", reps: "", weight: "" }
    ]);

    const addExercise = () => {
        setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
    };

    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const updateExercise = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    duration: Number(duration),
                    exercises: exercises.map(ex => ({
                        ...ex,
                        sets: Number(ex.sets),
                        reps: Number(ex.reps),
                        weight: Number(ex.weight)
                    })),
                }),
            });

            if (res.ok) {
                setName("");
                setDuration("");
                setExercises([{ name: "", sets: "", reps: "", weight: "" }]);
                router.refresh();
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            console.error("Failed to log workout", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                        Workout Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                            placeholder="e.g., Chest Day"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="duration" className="block text-sm font-medium leading-6 text-white">
                        Duration (minutes)
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            id="duration"
                            required
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                            placeholder="e.g., 60"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold leading-7 text-white">Exercises</h3>
                    <button
                        type="button"
                        onClick={addExercise}
                        className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-400"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Add Exercise
                    </button>
                </div>

                {exercises.map((exercise, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-12 items-end bg-black/30 p-4 rounded-lg">
                        <div className="sm:col-span-4">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Exercise Name</label>
                            <input
                                type="text"
                                required
                                value={exercise.name}
                                onChange={(e) => updateExercise(index, "name", e.target.value)}
                                className="block w-full rounded-md border-0 bg-gray-900 py-1.5 text-white ring-1 ring-inset ring-gray-700 focus:ring-red-600 sm:text-sm px-2"
                                placeholder="Bench Press"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Sets</label>
                            <input
                                type="number"
                                required
                                value={exercise.sets}
                                onChange={(e) => updateExercise(index, "sets", e.target.value)}
                                className="block w-full rounded-md border-0 bg-gray-900 py-1.5 text-white ring-1 ring-inset ring-gray-700 focus:ring-red-600 sm:text-sm px-2"
                                placeholder="3"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Reps</label>
                            <input
                                type="number"
                                required
                                value={exercise.reps}
                                onChange={(e) => updateExercise(index, "reps", e.target.value)}
                                className="block w-full rounded-md border-0 bg-gray-900 py-1.5 text-white ring-1 ring-inset ring-gray-700 focus:ring-red-600 sm:text-sm px-2"
                                placeholder="10"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                required
                                value={exercise.weight}
                                onChange={(e) => updateExercise(index, "weight", e.target.value)}
                                className="block w-full rounded-md border-0 bg-gray-900 py-1.5 text-white ring-1 ring-inset ring-gray-700 focus:ring-red-600 sm:text-sm px-2"
                                placeholder="60"
                            />
                        </div>
                        <div className="sm:col-span-1 flex justify-end pb-2">
                            {exercises.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExercise(index)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-800">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging..." : "Log Workout"}
                </button>
            </div>
        </form>
    );
}
