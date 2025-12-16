import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export default function BlogPostPage({ params }) {
    // In a real app, fetch data based on params.slug
    const { slug } = params;

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-10">
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" /> Dec 5, 2023
                            </span>
                            <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" /> John Trainer
                            </span>
                            <span className="flex items-center text-red-500">
                                <Tag className="w-4 h-4 mr-1" /> Workout Plans
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            The Ultimate Guide to Muscle Building: {slug.replace(/-/g, " ")}
                        </h1>
                        <div className="h-96 bg-gray-800 rounded-xl w-full mb-8 flex items-center justify-center text-gray-500">
                            Feature Image Placeholder
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p className="lead text-xl text-white mb-6">
                            Building muscle is a journey that requires dedication, consistency, and the right knowledge. In this guide, we'll break down everything you need to know.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Progressive Overload</h2>
                        <p className="mb-4">
                            The most important principle of hypertrophy is progressive overload. This means gradually increasing the stress placed on the body during exercise training.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Nutrition is Key</h2>
                        <p className="mb-4">
                            You can't out-train a bad diet. Ensure you are consuming enough protein (1.6-2.2g per kg of body weight) and a slight caloric surplus.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Rest and Recovery</h2>
                        <p className="mb-4">
                            Muscles grow when you rest, not when you train. Aim for 7-9 hours of sleep per night and take rest days seriously.
                        </p>

                        <blockquote className="border-l-4 border-red-600 pl-4 italic my-8 text-gray-400">
                            "Consistency is what transforms average into excellence."
                        </blockquote>

                        <p>
                            Start implementing these tips today and watch your progress skyrocket. Remember, it's a marathon, not a sprint.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
