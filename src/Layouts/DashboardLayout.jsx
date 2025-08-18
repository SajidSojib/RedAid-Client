import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaUsers,
  FaTint,
  FaEdit,
  FaUserCircle,
  FaChartPie,
} from "react-icons/fa";
import CompanyLogo from "../Components/CompanyLogo";
import useRole from "../Hooks/useRole";
import CompanyLogo2 from "../Components/CompanyLogo2";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const navigation = useNavigation();
  const [theme, setTheme] = useState(() => {
      return localStorage.getItem("theme") || "dark";
    });
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full flex-row-reverse justify-between mt-3 flex items-center lg:hidden px-4 border-3 border-primary rounded-4xl py-2 mx-auto bg-base-100">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 text-primary stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2">
              <CompanyLogo2></CompanyLogo2>
            </div>
          </div>
          {/* Page content here */}
          <div className="">
            {navigation.state === "loading" ? (
              <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            ) : (
              <Outlet></Outlet>
            )}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-secondary-content text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <div className="border-b-4 border-primary mb-5 mt-5 text-4xl">
              <CompanyLogo></CompanyLogo>
            </div>
            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded text-base ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-200 hover:text-primary"
                  }`
                }
              >
                <FaHome />
                Dashboard Home
              </NavLink>
            </li>
            {!roleLoading && role === "donor" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/create-donation-request"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaPlusCircle />
                    Create Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-donation-requests"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaListAlt />
                    My Donation Requests
                  </NavLink>
                </li>
              </>
            )}

            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/all-users"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/overview"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaChartPie />
                    Overview
                  </NavLink>
                </li>
              </>
            )}

            {!roleLoading && (role === "admin" || role === "volunteer") && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/all-blood-donation-request"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaTint />
                    All Blood Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/content-management"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-base ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <FaEdit />
                    Content Management
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded text-base ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-200 hover:text-primary"
                  }`
                }
              >
                <FaUserCircle />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
