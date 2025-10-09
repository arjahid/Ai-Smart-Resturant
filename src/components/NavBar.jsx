import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import { CiShoppingCart } from "react-icons/ci";
import AllUser from '../Hooks/AllUser';
import AuthProvider, { AuthContext } from './provider/AuthProvider';

const NavBar = () => {
  const {cart,refetch}=useCart();
  const {users}=AllUser();
  const navigate=useNavigate();
  const {signOut}=useContext(AuthContext);
 const handleSignOut=()=>{
  signOut();
  // navigate('/login');
 }
  return (
    <div className="navbar bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-60 p-2 shadow-xl border border-slate-600">
            <NavLink to="/" className="text-white hover:bg-slate-700 hover:text-orange-400">🏠 Home</NavLink>
            <NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</NavLink>
            <NavLink to="/orders" className="text-white hover:bg-slate-700 hover:text-orange-400">📋 Orders</NavLink>
            <NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400">➕ Add Menu</NavLink>
            <NavLink to="/settings" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Settings</NavLink>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <NavLink to="/" className="btn btn-ghost text-2xl font-bold text-white hover:text-orange-400 normal-case mr-8">
          <span className="text-orange-400">🤖</span> AI Smart Restaurant
        </NavLink>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li><NavLink to="/" className="text-white hover:bg-slate-700 hover:text-orange-400 rounded-lg px-3 py-2">🏠 Home</NavLink></li>
            <li><NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400 rounded-lg px-3 py-2">🍽️ Menu</NavLink></li>
            <li><NavLink to="/orders" className="text-white hover:bg-slate-700 hover:text-orange-400 rounded-lg px-3 py-2">📋 Orders</NavLink></li>
            <li><NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400 rounded-lg px-3 py-2">➕ Add Menu</NavLink></li>
            <li><NavLink to="/login" className="text-white hover:bg-slate-700 hover:text-orange-400 rounded-lg px-3 py-2">⚙️ Settings</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="navbar-end space-x-2">
        <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Search Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> 
          </svg>
        </button>
        <NavLink to='/cart' className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Orders" aria-label="View cart">
          <div className="indicator">
            <CiShoppingCart className="w-6 h-6" aria-hidden="true" />
            <span className="badge badge-sm badge-warning indicator-item text-slate-900 font-semibold">{cart?.length || 0}</span>
          </div>
        </NavLink>
        <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Notifications">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
            </svg>
            <span className="badge badge-xs badge-error indicator-item">0</span>
          </div>
        </button>

        {/* User avatar dropdown (supports users object or array) */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
            <div className="w-10 rounded-full border-2 border-orange-400 overflow-hidden">
              {(() => {
                const u = Array.isArray(users) ? users[0] : users;
                const photo = u?.avatar || u?.photoURL || u?.image;
                const name = u?.name || u?.displayName || u?.email;
                if (photo) {
                  return <img src={photo} alt={name || 'User'} />;
                }
                const initial = name ? String(name).charAt(0).toUpperCase() : 'U';
                return <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white text-lg">{initial}</div>;
              })()}
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-800 rounded-box w-52 text-white">
            <li className="px-2 py-1">
              <div className="text-sm font-semibold">
                {(() => {
                  const u = Array.isArray(users) ? users[0] : users;
                  return u?.name || u?.displayName || u?.email || 'User';
                })()}
              </div>
            </li>
            <li><NavLink to="/profile" className="text-white">Profile</NavLink></li>
            <li><NavLink to="/orders" className="text-white">Orders</NavLink></li>
            <li><NavLink to="/login" onClick={handleSignOut} className="text-white">Sign Out</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar