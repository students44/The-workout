import ProfileForm from "@/components/ProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { UserCircleIcon, CreditCardIcon } from "@heroicons/react/24/outline";

async function getUser() {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await dbConnect();
    const user = await User.findById(session.user.id).lean();
    return JSON.parse(JSON.stringify(user));
}

export default async function ProfilePage() {
    const user = await getUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Profile Settings
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    Manage your account information and subscription.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Profile Form */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                        <UserCircleIcon className="w-6 h-6 text-red-500" />
                        Account Details
                    </div>
                    <ProfileForm user={user} />
                </div>

                {/* Membership Status Sidebar */}
                <div>
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                        <CreditCardIcon className="w-6 h-6 text-red-500" />
                        Membership Status
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                        <div className="text-center mb-6">
                            <div className="inline-block p-3 rounded-full bg-gray-800 mb-4">
                                <UserCircleIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{user.name}</h3>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>

                        <div className="border-t border-gray-800 pt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400">Current Plan</span>
                                <span className="px-3 py-1 rounded-full bg-red-600/10 text-red-500 text-sm font-medium border border-red-600/20 capitalize">
                                    {user.membership || "Free"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Member Since</span>
                                <span className="text-white text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full py-2.5 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
