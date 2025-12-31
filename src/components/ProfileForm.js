"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfileForm({ user }) {
    const router = useRouter();
    const { data: session } = useSession(); // Access session data
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        confirmPassword: "",
        image: user?.image || "",
    });

    const { update } = useSession();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
                confirmPassword: "",
                image: user.image || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setFormData(prev => ({ ...prev, image: data.url }));
        } catch (error) {
            console.error("Upload error:", error);
            setMessage({ type: "error", text: "Failed to upload image" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password || undefined,
                    image: formData.image,
                }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setMessage({ type: "success", text: "Profile updated successfully" });
                setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));

                // Update session with new image
                await update({ image: formData.image });

                router.refresh();
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.message || "Update failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-8 rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-6 flex items-center gap-x-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
                        {formData.image ? (
                            <img src={formData.image} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="file-upload"
                            className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 cursor-pointer transition-colors"
                        >
                            Change Photo
                        </label>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. Max 5MB.</p>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        New Password (leave blank to keep current)
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                        Confirm New Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 bg-black/50 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-3"
                        />
                    </div>
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-md ${message.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                    {message.text}
                </div>
            )}

            <div className="flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
