import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About AI Smart Restaurant</h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Where cutting-edge technology meets culinary excellence to create the future of dining
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded in 2024, AI Smart Restaurant represents a revolutionary approach to dining. 
                                We combine artificial intelligence with traditional culinary arts to create an 
                                unprecedented dining experience that adapts to each guest's preferences.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Our journey began with a simple vision: to eliminate the friction between great food 
                                and great service while maintaining the warmth and hospitality that makes dining special.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we're proud to serve thousands of satisfied customers who experience the perfect 
                                blend of technology and taste in every visit.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 sm:p-8 order-1 lg:order-2">
                            <div className="text-center">
                                <span className="text-6xl mb-4 block">🤖</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Dining</h3>
                                <p className="text-gray-600">
                                    Experience personalized recommendations, smart ordering, and seamless service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">🎯</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To revolutionize the dining experience by seamlessly integrating artificial intelligence 
                                    with exceptional culinary craftsmanship, creating personalized and memorable moments 
                                    for every guest.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">👁️</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To become the global leader in AI-enhanced dining, setting new standards for 
                                    restaurant innovation while preserving the human touch that makes every meal special.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔬</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h4>
                            <p className="text-gray-600">
                                Constantly pushing boundaries to enhance the dining experience
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">⭐</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Quality</h4>
                            <p className="text-gray-600">
                                Never compromising on the quality of food, service, or technology
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">❤️</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Hospitality</h4>
                            <p className="text-gray-600">
                                Maintaining the human warmth that makes dining truly memorable
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">10K+</div>
                            <div className="text-gray-300 text-sm sm:text-base">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">50+</div>
                            <div className="text-gray-300 text-sm sm:text-base">Menu Items</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">99%</div>
                            <div className="text-gray-300 text-sm sm:text-base">Order Accuracy</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">24/7</div>
                            <div className="text-gray-300 text-sm sm:text-base">AI Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;