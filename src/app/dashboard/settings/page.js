"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { BellIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Settings
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    Manage your application preferences.
                </p>
            </div>

            <div className="space-y-8">
                {/* Notifications Section */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
                        <BellIcon className="w-6 h-6 text-red-500" />
                        Notifications
                    </div>

                    <div className="space-y-6">
                        <Switch.Group as="div" className="flex items-center justify-between">
                            <span className="flex flex-col">
                                <Switch.Label as="span" className="text-sm font-medium leading-6 text-white" passive>
                                    Workout Reminders
                                </Switch.Label>
                                <Switch.Description as="span" className="text-sm text-gray-400">
                                    Receive email notifications to remind you of scheduled workouts.
                                </Switch.Description>
                            </span>
                            <Switch
                                checked={emailNotifications}
                                onChange={setEmailNotifications}
                                className={`${emailNotifications ? 'bg-red-600' : 'bg-gray-700'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                            >
                                <span className={`${emailNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                            </Switch>
                        </Switch.Group>

                        <div className="border-t border-gray-800 pt-6">
                            <Switch.Group as="div" className="flex items-center justify-between">
                                <span className="flex flex-col">
                                    <Switch.Label as="span" className="text-sm font-medium leading-6 text-white" passive>
                                        Marketing Emails
                                    </Switch.Label>
                                    <Switch.Description as="span" className="text-sm text-gray-400">
                                        Receive news, updates, and special offers from The Workout.
                                    </Switch.Description>
                                </span>
                                <Switch
                                    checked={marketingEmails}
                                    onChange={setMarketingEmails}
                                    className={`${marketingEmails ? 'bg-red-600' : 'bg-gray-700'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                                >
                                    <span className={`${marketingEmails ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                </Switch>
                            </Switch.Group>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
                        <ShieldCheckIcon className="w-6 h-6 text-red-500" />
                        Security
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="text-sm font-medium text-white">Delete Account</h4>
                                <p className="text-sm text-gray-400 mt-1">Permanently remove your account and all data.</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-600/20 rounded-lg text-sm font-medium hover:bg-red-600/20 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
