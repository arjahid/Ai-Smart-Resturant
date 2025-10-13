import React from 'react';
import { NavLink } from 'react-router-dom';
import image1 from '../../assets/images/Gemini_Generated_Image_g6t45ng6t45ng6t4.png'

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "The Future of AI in Restaurant Industry",
            excerpt: "Discover how artificial intelligence is revolutionizing the way restaurants operate, from predictive analytics to personalized dining experiences.",
            author: "Sarah Johnson",
            date: "March 15, 2024",
            readTime: "5 min read",
            category: "Technology",
            image: image1,
            featured: true
        },
        {
            id: 2,
            title: "Smart Menu Recommendations: How AI Knows What You Want",
            excerpt: "Learn about the algorithms behind our AI menu recommendations and how machine learning helps us predict your perfect meal.",
            author: "Michael Chen",
            date: "March 12, 2024",
            readTime: "4 min read",
            category: "AI Innovation",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop"
        },
        {
            id: 3,
            title: "Sustainable Dining: How Technology Reduces Food Waste",
            excerpt: "Explore how our AI-powered inventory management and demand prediction systems help minimize food waste and promote sustainability.",
            author: "Emma Rodriguez",
            date: "March 10, 2024",
            readTime: "6 min read",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop"
        },
        {
            id: 4,
            title: "Voice Ordering: The Next Level of Customer Experience",
            excerpt: "Discover how voice-activated ordering systems are making dining more accessible and convenient for all customers.",
            author: "David Park",
            date: "March 8, 2024",
            readTime: "3 min read",
            category: "User Experience",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
        },
        {
            id: 5,
            title: "Behind the Scenes: Our Kitchen Analytics System",
            excerpt: "Take a look at how real-time analytics help our kitchen staff optimize preparation times and maintain quality standards.",
            author: "Lisa Wang",
            date: "March 5, 2024",
            readTime: "7 min read",
            category: "Operations",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop"
        },
        {
            id: 6,
            title: "Customer Personalization: Creating Unique Dining Experiences",
            excerpt: "Learn how we use customer data and preferences to create personalized dining experiences that keep guests coming back.",
            author: "Robert Kim",
            date: "March 3, 2024",
            readTime: "5 min read",
            category: "Customer Experience",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop"
        }
    ];

    const categories = ["All", "Technology", "AI Innovation", "Sustainability", "User Experience", "Operations", "Customer Experience"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16 relative">
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <NavLink 
                        to="/"
                        className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-slate-600 hover:border-orange-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </NavLink>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">AI Smart Restaurant Blog</h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Insights, innovations, and stories from the future of dining
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white shadow-sm py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Post */}
            {blogPosts.filter(post => post.featured).map((post) => (
                <div key={post.id} className="py-8 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8 flex flex-col justify-center">
                                    <div className="mb-4">
                                        <span className="text-orange-600 text-sm font-semibold uppercase tracking-wide">
                                            {post.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>By {post.author}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <button className="text-orange-600 hover:text-orange-700 font-semibold">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Blog Posts Grid */}
            <div className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {blogPosts.filter(post => !post.featured).map((post) => (
                            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>By {post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{post.date}</span>
                                        <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Subscribe to our newsletter for the latest insights on AI in the restaurant industry
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;