import Link from "next/link";
import { Calendar, User } from "lucide-react";

// Mock data for blog posts
const posts = [
    {
        id: 1,
        slug: "ultimate-guide-to-muscle-building",
        title: "The Ultimate Guide to Muscle Building",
        excerpt: "Learn the science behind hypertrophy and how to structure your workouts for maximum gains.",
        category: "Workout Plans",
        author: "John Trainer",
        date: "Dec 5, 2023",
        image: "/blog/muscle.jpg", // Placeholder
    },
    {
        id: 2,
        slug: "nutrition-myths-debunked",
        title: "5 Common Nutrition Myths Debunked",
        excerpt: "Stop believing these common misconceptions about diet and weight loss.",
        category: "Diet Guides",
        author: "Sarah Nutritionist",
        date: "Dec 3, 2023",
        image: "/blog/nutrition.jpg", // Placeholder
    },
    {
        id: 3,
        slug: "home-workout-essentials",
        title: "Home Workout Essentials for Beginners",
        excerpt: "You don't need a full gym to get fit. Here are the must-have items for your home gym.",
        category: "Home Workouts",
        author: "Mike Fitness",
        date: "Nov 28, 2023",
        image: "/blog/home-gym.jpg", // Placeholder
    },
    {
        id: 4,
        slug: "importance-of-rest-days",
        title: "Why Rest Days Are Crucial for Progress",
        excerpt: "Overtraining can kill your gains. Discover why taking time off is just as important as working out.",
        category: "Fitness Tips",
        author: "Dr. Wellness",
        date: "Nov 25, 2023",
        image: "/blog/rest.jpg", // Placeholder
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Fitness Blog</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Expert advice, workout tips, and nutrition guides to help you stay on track.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-transform transform group-hover:-translate-y-2">
                                <div className="h-48 bg-gray-800 relative">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-800">
                                        Image Placeholder
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center text-gray-500 text-xs">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {post.date}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <User className="w-4 h-4 mr-2" />
                                        {post.author}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
