"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    const stats = [
        { name: 'Total Workouts', value: '12', change: '+2', changeType: 'increase' },
        { name: 'Hours Trained', value: '24.5', change: '+4.5', changeType: 'increase' },
        { name: 'Calories Burned', value: '12,500', change: '+12%', changeType: 'increase' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Welcome back, {session?.user?.name || 'Athlete'}
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Here's what's happening with your training today.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-lg bg-black border border-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-red-600/10 p-3">
                                <div className="h-6 w-6 text-red-600" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-400">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
                            <p className="text-2xl font-semibold text-white">{item.value}</p>
                            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-500">
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-medium leading-6 text-white mb-4">Recent Activity</h2>
                <div className="overflow-hidden rounded-md border border-gray-800 bg-black">
                    <ul role="list" className="divide-y divide-gray-800">
                        {[1, 2, 3].map((item) => (
                            <li key={item} className="px-6 py-4 hover:bg-gray-900/50 transition-colors">
                                <div className="flex items-center gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-white">Upper Body Power</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">Completed 2 hours ago</p>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
