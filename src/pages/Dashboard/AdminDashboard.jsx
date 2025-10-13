import React from "react";
import NavBar from "../../components/NavBar";
import AllUser from "../../Hooks/AllUser";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { users } = AllUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top navigation */}
      <NavBar />

      {/* main container */}
      <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
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
            </div>
          </aside>

          {/* Content area */}
          <main className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-lg shadow p-6 min-h-[60vh]">
              {/* optional header inside content */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Overview
                </h3>
                {/* placeholder for actions if needed */}
              </div>

              {/* nested routes render here */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
