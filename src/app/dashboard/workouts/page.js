"use client";

import { useState, useEffect } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import { PlusIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function WorkoutsPage() {
    const [showForm, setShowForm] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWorkouts = async () => {
        try {
            const res = await fetch("/api/workouts");
            if (res.ok) {
                const data = await res.json();
                setWorkouts(data);
            }
        } catch (error) {
            console.error("Error fetching workouts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleSuccess = () => {
        setShowForm(false);
        fetchWorkouts();
    };

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Workouts
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Track your progress and log your daily sessions.
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        {showForm ? "Cancel" : "Log Workout"}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="mb-8 animate-fade-in">
                    <WorkoutForm onSuccess={handleSuccess} />
                </div>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center text-gray-400 py-10">Loading workouts...</div>
                ) : workouts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                        <PlusIcon className="mx-auto h-12 w-12 text-gray-600" />
                        <h3 className="mt-2 text-sm font-semibold text-white">No workouts</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by logging your first workout.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Log Workout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
                            <div
                                key={workout._id}
                                className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white truncate">{workout.name}</h3>
                                        <span className="inline-flex items-center rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-700">
                                            {new Date(workout.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="h-4 w-4" />
                                            {workout.duration} min
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="h-4 w-4" />
                                            {workout.exercises.length} exercises
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {workout.exercises.slice(0, 3).map((exercise, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-gray-300">{exercise.name}</span>
                                                <span className="text-gray-500">
                                                    {exercise.sets} x {exercise.reps} @ {exercise.weight}kg
                                                </span>
                                            </div>
                                        ))}
                                        {workout.exercises.length > 3 && (
                                            <div className="text-xs text-center text-gray-500 pt-2 border-t border-gray-900">
                                                + {workout.exercises.length - 3} more exercises
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
