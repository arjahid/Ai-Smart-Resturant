import React from 'react';

const NavBar = () => {
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
            <li><a className="text-white hover:bg-slate-700 hover:text-orange-400">🏠 Home</a></li>
            <li><a className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</a></li>
            <li><a className="text-white hover:bg-slate-700 hover:text-orange-400">📋 Orders</a></li>
            <li><a className="text-white hover:bg-slate-700 hover:text-orange-400">📊 Analytics</a></li>
            <li><a className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Settings</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl font-bold text-white hover:text-orange-400 normal-case">
          <span className="text-orange-400">🤖</span> AI Smart Restaurant
        </a>
      </div>
      <div className="navbar-end space-x-2">
        <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Search Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> 
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Orders">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" /> 
            </svg>
            <span className="badge badge-sm badge-warning indicator-item text-slate-900 font-semibold">3</span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Notifications">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
            </svg>
            <span className="badge badge-xs badge-error indicator-item"></span>
          </div>
        </button>
        <div className="avatar online">
          <div className="w-10 rounded-full border-2 border-orange-400">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Admin" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar