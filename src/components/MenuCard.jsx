import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import useAxiosPublic from "../Hooks/AxiousPublic";
import useCart from "../Hooks/useCart";

const MenuCard = () => {
    const {refetch}=useCart();
  const axiosPublic = useAxiosPublic();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/menu")
      .then((res) => res.data)
      .then((data) => {
        setMenuData(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu items");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }
  const handleCart = (item) => {
    axiosPublic.post('/menucard', { itemId: item })
    .then((res) => {
        refetch();
      console.log("Added to cart:", res.data);
    })
    .catch((err) => {
      console.error("Error adding to cart:", err);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16 relative">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <NavLink
            to="/"
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-slate-600 hover:border-orange-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </NavLink>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Smart Menu
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Welcome to our menu page - Discover delicious meals crafted with AI
            precision
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mx-4 mt-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Menu Items Section */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {menuData.length === 0 && !loading && !error ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No menu items available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {menuData.map((item) => {
                const discount = Number(item.discount) || 0;
                const original = Number(item.price) || 0;
                const discounted = original - (original * discount) / 100;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image placeholder or actual image */}
                    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">🍽️</span>
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                            -{discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>
                      )}
                      {item.category && (
                        <div className="mb-4">
                          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide bg-orange-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        {original > 0 && discount > 0 ? (
                          <div className="flex items-baseline space-x-3">
                            <span className="text-base text-gray-500 line-through">
                              ৳{original.toFixed(2)}
                            </span>
                            <span className="text-2xl font-bold text-orange-600">
                              ৳{discounted.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-orange-600">
                            ৳{original.toFixed(2)}
                          </span>
                        )}
                        <button onClick={()=>handleCart(item._id)} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
