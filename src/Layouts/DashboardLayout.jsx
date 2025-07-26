import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBox,
  FaListAlt,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
  FaUserPlus,
  FaMotorcycle,
} from "react-icons/fa";
import { FaCheckCircle, FaClock, FaUserShield } from "react-icons/fa";
import CompanyLogo from "../Components/CompanyLogo";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full  mt-3 flex items-center lg:hidden px-4 border-3 border-primary rounded-4xl py-2 mx-auto bg-base-100">
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
              <CompanyLogo></CompanyLogo>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <CompanyLogo></CompanyLogo>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sendParcel"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaBox />
                Send a Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myParcels"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaListAlt />
                My Parcels
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaHistory />
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/trackParcel"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaSearchLocation />
                Track Parcel
              </NavLink>
            </li>
            {!roleLoading && role === "admin" && (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/dashboard/activeRiders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded ${
                        isActive ? "bg-primary text-black" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FaCheckCircle />
                    Active Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pendingRiders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded ${
                        isActive ? "bg-primary text-black" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FaClock />
                    Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/assignRider"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded ${
                        isActive ? "bg-primary text-black" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FaMotorcycle className="inline mr-2" />
                    Assign Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/adminControl"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded ${
                        isActive ? "bg-primary text-black" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FaUserShield />
                    Admin Control
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/dashboard/updateProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded ${
                    isActive ? "bg-primary text-black" : "hover:bg-base-200"
                  }`
                }
              >
                <FaUserEdit />
                Update Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
