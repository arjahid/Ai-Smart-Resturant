import React from 'react';
import images from '../assets/images/Restaurant-Food-PNG.png'
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div
      className="hero min-h-screen relative"
      style={{
        backgroundImage: `url(${images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center relative z-10">
        <div className="max-w-3xl">
          <div className="mb-8">
            <span className="text-orange-400 text-lg font-semibold tracking-wide uppercase">Welcome to the Future</span>
          </div>
          <h1 className="mb-6 text-6xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent leading-tight">
            AI Smart Restaurant
          </h1>
          <p className="mb-8 text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Experience culinary excellence with our AI-powered dining experience. Smart ordering, 
            personalized recommendations, and seamless service that adapts to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to='/menu' className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none shadow-lg transform hover:scale-105 transition-all duration-300">
              🍽️ Order Now
            </NavLink>
            <button className="btn btn-outline btn-lg px-8 py-3 text-lg font-semibold text-white border-white hover:bg-white hover:text-black shadow-lg transform hover:scale-105 transition-all duration-300">
              📋 View Menu
            </button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>AI Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Quick Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Fresh Ingredients</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}

export default Hero