import React from 'react';
import { NavLink } from 'react-router-dom';

const SpecialOffer = () => {
    const specialOffers = [
        {
            id: 1,
            title: "AI Lunch Special",
            description: "Let our AI recommend the perfect lunch combination based on your preferences and dietary needs.",
            originalPrice: 1800,
            discountPrice: 1200,
            discount: "30%",
            validUntil: "March 31, 2026",
            category: "Lunch",
            features: ["AI-curated menu", "Personalized nutrition", "Quick service"],
            bgColor: "from-orange-400 to-red-500",
            icon: "🤖"
        },
        {
            id: 2,
            title: "Family Smart Feast",
            description: "Perfect for families! Our AI creates personalized meals for each family member while optimizing for sharing dishes.",
            originalPrice: 6500,
            discountPrice: 5200,
            discount: "20%",
            validUntil: "April 15, 2026",
            category: "Family",
            features: ["Serves 4-6 people", "Kid-friendly options", "Dietary accommodations"],
            bgColor: "from-blue-400 to-indigo-500",
            icon: "👨‍👩‍👧‍👦"
        },
        {
            id: 3,
            title: "Weekend Brunch Bot",
            description: "Exclusive weekend brunch with AI-powered fresh juice combinations and smart breakfast pairings.",
            originalPrice: 2400,
            discountPrice: 1800,
            discount: "25%",
            validUntil: "Every Weekend 2026",
            category: "Brunch",
            features: ["Weekend only", "Fresh juice bar", "Unlimited coffee"],
            bgColor: "from-green-400 to-emerald-500",
            icon: "🥞"
        },
        {
            id: 4,
            title: "Date Night Deluxe",
            description: "Romantic evening with AI-curated wine pairings and ambiance settings tailored for couples.",
            originalPrice: 8500,
            discountPrice: 6800,
            discount: "20%",
            validUntil: "March 30, 2026",
            category: "Romance",
            features: ["Wine pairing", "Ambient lighting", "Private table"],
            bgColor: "from-pink-400 to-rose-500",
            icon: "💕"
        },
        {
            id: 5,
            title: "Business Lunch Pro",
            description: "Professional dining experience with quick service AI optimization and meeting-friendly environment.",
            originalPrice: 3200,
            discountPrice: 2500,
            discount: "22%",
            validUntil: "April 30, 2026",
            category: "Business",
            features: ["Express service", "Quiet environment", "WiFi & charging"],
            bgColor: "from-gray-400 to-slate-500",
            icon: "💼"
        },
        {
            id: 6,
            title: "Healthy AI Bowl",
            description: "Nutritionally optimized bowl created by our AI nutritionist based on your health goals and preferences.",
            originalPrice: 1500,
            discountPrice: 1125,
            discount: "25%",
            validUntil: "Ongoing 2026",
            category: "Health",
            features: ["Macro tracking", "Allergen-free options", "Organic ingredients"],
            bgColor: "from-lime-400 to-green-500",
            icon: "🥗"
        }
    ];

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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Special Offers</h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Exclusive AI-powered dining experiences at unbeatable prices
                    </p>
                </div>
            </div>

            {/* Offers Grid */}
            <div className="py-8 sm:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {specialOffers.map((offer) => (
                            <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                                {/* Header with gradient */}
                                <div className={`bg-gradient-to-r ${offer.bgColor} p-4 sm:p-6 text-white relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <span className="text-2xl sm:text-3xl">{offer.icon}</span>
                                            <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                                                {offer.discount} OFF
                                            </span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold mb-2">{offer.title}</h3>
                                        <p className="text-white/90 text-xs sm:text-sm">{offer.description}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                    {/* Price Section */}
                                    <div className="mb-4 sm:mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <span className="text-xl sm:text-2xl font-bold text-gray-900">৳{offer.discountPrice}</span>
                                                <span className="text-base sm:text-lg text-gray-500 line-through">৳{offer.originalPrice}</span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                Save ৳{(offer.originalPrice - offer.discountPrice).toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600">Valid until: {offer.validUntil}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-4 sm:mb-6 flex-grow">
                                        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What's Included:</h4>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {offer.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base mt-auto">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Limited Time Banner */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">⏰ Limited Time Offers!</h2>
                    <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6 px-4">
                        Don't miss out on these exclusive AI-powered dining experiences
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <button className="w-full sm:w-auto bg-white text-red-500 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base">
                            View All Offers
                        </button>
                        <button className="w-full sm:w-auto border-2 border-white text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm sm:text-base">
                            Subscribe for Updates
                        </button>
                    </div>
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-gray-100 py-6 sm:py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Terms & Conditions</h3>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                        <p>• Offers valid for dine-in and takeout orders</p>
                        <p>• Cannot be combined with other promotions</p>
                        <p>• AI recommendations based on available ingredients and dietary preferences</p>
                        <p>• Advance reservations recommended for special dining experiences</p>
                        <p>• Prices subject to local taxes and service charges</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;