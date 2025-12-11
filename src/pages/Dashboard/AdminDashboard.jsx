import React from "react";
import NavBar from "../../components/NavBar";
import AllUser from "../../Hooks/AllUser";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { users = [] } = AllUser();

  // derived stats (UI only)
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u?.active).length || 0;
  const admins = users.filter((u) => u?.role === "admin").length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top navigation */}
      <NavBar />

      {/* main container */}
      <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              </div>

              {/* quick search/filter */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">
                  Search users
                </label>
                <input
                  type="search"
                  placeholder="Search by name or email"
                  className="w-full px-3 py-2 rounded border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <nav>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded ${
                          isActive
                            ? "bg-slate-100 font-semibold"
                            : "hover:bg-slate-50"
                        }`
                      }
                    >
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/orders"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded ${
                          isActive
                            ? "bg-slate-100 font-semibold"
                            : "hover:bg-slate-50"
                        }`
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/reports"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded ${
                          isActive
                            ? "bg-slate-100 font-semibold"
                            : "hover:bg-slate-50"
                        }`
                      }
                    >
                      Reports
                    </NavLink>
                  </li>
                </ul>
              </nav>

              {/* quick actions */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h3 className="text-xs text-gray-500 mb-2">Quick Actions</h3>
                <div className="flex flex-col gap-2">
                  <NavLink
                    to="/admin/users"
                    className="w-full text-center px-3 py-2 rounded bg-orange-500 text-white text-sm hover:bg-orange-600"
                  >
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/admin/orders"
                    className="w-full text-center px-3 py-2 rounded border border-slate-200 text-sm hover:bg-slate-50"
                  >
                    Manage Orders
                  </NavLink>
                </div>
              </div>
            </div>
          </aside>

          {/* Content area */}
          <main className="flex-1">
            {/* top KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Total Users</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {totalUsers}
                  </div>
                </div>
                <div className="text-3xl text-slate-400">👥</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Active</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {activeUsers}
                  </div>
                </div>
                <div className="text-3xl text-slate-400">✅</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Admins</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {admins}
                  </div>
                </div>
                <div className="text-3xl text-slate-400">🛠️</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Overview</div>
                  <div className="text-2xl font-bold text-gray-900">—</div>
                </div>
                <div className="text-3xl text-slate-400">📊</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 min-h-[60vh]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Overview</h3>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-2 bg-white border border-slate-200 rounded text-sm hover:shadow">
                    Export
                  </button>
                  <button className="px-3 py-2 bg-white border border-slate-200 rounded text-sm hover:shadow">
                    Settings
                  </button>
                </div>
              </div>

              {/* nested routes render here */}
              <div className="space-y-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
