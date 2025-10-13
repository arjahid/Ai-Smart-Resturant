import React from 'react';

const FeaturedCard = () => {
    return (
        <div className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Why Choose AI Smart Restaurant?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                        Experience the future of dining with our AI-powered restaurant management system that revolutionizes your culinary journey
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                    <div className="group bg-white p-6 sm:p-7 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-orange-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl text-white">🧠</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Smart Menu</h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            AI-curated menu recommendations based on your preferences, dietary restrictions, and trending flavors
                        </p>
                        <div className="mt-6 text-center">
                            <span className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300">
                                Learn More 
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="group bg-white p-6 sm:p-7 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 sm:col-span-2 lg:col-span-1">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl text-white">⚡</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Quick Orders</h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Lightning-fast ordering system with voice commands, QR codes, and intuitive mobile interface
                        </p>
                        <div className="mt-6 text-center">
                            <span className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                                Learn More 
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="group bg-white p-6 sm:p-7 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200 sm:col-start-1 sm:col-end-3 lg:col-start-auto lg:col-end-auto">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl text-white">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">Real-time Updates</h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Live order tracking, kitchen notifications, and instant updates on preparation and delivery status
                        </p>
                        <div className="mt-6 text-center">
                            <span className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                                Learn More 
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;