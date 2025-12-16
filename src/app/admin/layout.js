import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
    title: "Admin Dashboard | The Workout",
    description: "Admin management panel",
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
