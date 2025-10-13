import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import { CiShoppingCart } from "react-icons/ci";
import { AuthContext } from './provider/AuthProvider';
import useRole from '../Hooks/useRole';


const NavBar = () => {
  const {cart,refetch}=useCart();
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const {role,loading}=useRole();
 
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-orange-600 loading-lg"></span>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      console.log('User signed out successfully');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg text-white fixed top-0 z-50 w-11/12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-60 p-2 shadow-xl border border-slate-600"
          >
            
            {role === 'customer' && (
              <>
                <li><NavLink to="/" className="text-white hover:bg-slate-700 hover:text-orange-400">🏠 Home</NavLink></li>
                <li><NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</NavLink></li>
                <li><NavLink to="/orders" className="text-white hover:bg-slate-700 hover:text-orange-400">📋 Orders</NavLink></li>
                <li><NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink></li>
              </>
            )}

            {role === 'chef' && (
              <>
                <li><NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink></li>
                <li><NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400">➕ Add Menu</NavLink></li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li><NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400">➕ Add Menu</NavLink></li>
                <li><NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">👥 Menu</NavLink></li>
                <li><NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink></li>
              </>
            )}

            {!role && (
              <>
                <li>
                  <NavLink to="/" className="block w-full text-white px-3 py-2 rounded hover:bg-slate-700 hover:text-orange-400">
                    🏠 Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/menu" className="block w-full text-white px-3 py-2 rounded hover:bg-slate-700 hover:text-orange-400">
                    🍽️ Menu
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <NavLink to="/" className="btn btn-ghost text-2xl font-bold text-white hover:text-orange-400 normal-case mr-8">
          <span className="text-orange-400">🤖</span> AI Smart Restaurant
        </NavLink>
        <div className="hidden lg:flex gap-2">
           {/* <li><NavLink to="/" className="text-white hover:bg-slate-700 hover:text-orange-400">🏠 Home</NavLink></li>
                <li><NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</NavLink></li> */}
                
          {
            role === 'customer' && (
              <>
                <NavLink to="/" className="text-white hover:bg-slate-700 hover:text-orange-400">🏠 Home</NavLink>
            <NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</NavLink>
            <NavLink to="/orders" className="text-white hover:bg-slate-700 hover:text-orange-400">📋 Orders</NavLink>
              <NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink>
              </>
            )
          }
          {
            role ==='chef'&& (
              <>
                <li><NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink></li>
               <NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400">➕ Add Menu</NavLink>
              </>
            )
          }
          {
            role === 'admin' &&(
              <>
    <NavLink to="/addmenu" className="text-white hover:bg-slate-700 hover:text-orange-400">➕ Add Menu</NavLink>
              <NavLink to="/menu" className="text-white hover:bg-slate-700 hover:text-orange-400">🍽️ Menu</NavLink>
              <NavLink to="/dashboard" className="text-white hover:bg-slate-700 hover:text-orange-400">⚙️ Dashboard</NavLink>
              </>
            )
          }
           {!role && (
              <>
                <li>
                  <NavLink to="/" className="block w-full text-white px-3 py-2 rounded hover:bg-slate-700 hover:text-orange-400">
                    🏠 Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/menu" className="block w-full text-white px-3 py-2 rounded hover:bg-slate-700 hover:text-orange-400">
                    🍽️ Menu
                  </NavLink>
                </li>
              </>
            )}
        </div>
      </div>

      {/* search form on next line */}
     <div className="w-full flex justify-center mt-2">
       <form
         onSubmit={(e) => {
           e.preventDefault();
           const q = e.target.search?.value?.trim() || '';
           navigate(`/menu${q ? `?search=${encodeURIComponent(q)}` : ''}`);
         }}
         className="w-full max-w-xl px-4"
       >
         <div className="relative">
           <input
             name="search"
             type="text"
             placeholder="Search menu items..."
             className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-700 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
           />
           <button
             type="submit"
             aria-label="Search"
             className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </button>
         </div>
       </form>
     </div>

      <div className="navbar-end space-x-2">
       

        {/* cart */}
        {
          role==='customer' && ( <NavLink to='/cart' className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Cart" aria-label="View cart">
          <div className="indicator">
            <CiShoppingCart className="w-6 h-6" aria-hidden="true" />
            <span className="badge badge-sm badge-warning indicator-item text-slate-900 font-semibold">{cart?.length || 0}</span>
          </div>
        </NavLink>)
        }
       

        {/* notifications */}
        {
          (role === 'chef' || role ==='admin') && <>
           <button className="btn btn-ghost btn-circle text-white hover:bg-slate-700 hover:text-orange-400 tooltip tooltip-bottom" data-tip="Notifications" aria-label="Notifications">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
            </svg>
            <span className="badge badge-xs badge-error indicator-item">0</span>
          </div>
        </button>
          </>
        }
       

        {/* Auth-aware avatar / actions */}
        {user ? (
          <div className="relative">
            <div className="dropdown dropdown-end">
              <button aria-haspopup="true" className="flex items-center gap-3 px-2 py-1 rounded hover:bg-slate-700 transition" tabIndex={0}>
                <div className="w-10 h-10 rounded-full border-2 border-orange-400 overflow-hidden shadow-sm flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || user.email} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white text-lg">
                      {String(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left truncate">
                  <span className="text-sm font-medium leading-4">{user.displayName || user.email}</span>
                  <span className="text-xs text-slate-300">{user.email}</span>
                </div>
                <svg className="w-3 h-3 text-white ml-1 hidden md:block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.12 1l-4.25 4.65a.75.75 0 01-1.12 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-lg bg-slate-800 rounded-lg w-56 text-white z-50">
                <li className="px-3 py-2 border-b border-slate-700">
                  <div className="text-sm font-semibold truncate">{user.displayName || user.email}</div>
                  <div className="text-xs text-slate-400 truncate">{user.email}</div>
                </li>
                <li>
                  <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-sm">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5" /></svg>
                    <span className="text-sm">Dashboard</span>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                    <span className="text-sm">Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <NavLink to="/login" className="px-3 py-1 rounded hover:bg-slate-700 transition">Sign in</NavLink>
            <NavLink to="/register" className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600 transition">Register</NavLink>
          </div>
        )}
      </div>
      
     </div>
     
   )
 }
 
 export default NavBar