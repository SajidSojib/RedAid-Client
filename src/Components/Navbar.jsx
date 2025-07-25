/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import CompanyLogo from "./CompanyLogo";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
const Navbar = () => {
  const { user, logOutUser, setLoading, loading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "Your are logged out successfully.",
              icon: "success",
            });
            setLoading(false);
            localStorage.setItem("login", "false");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const links = (
    <>
      <li
        data-aos="fade-down"
        data-aos-duration="200"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <NavLink
          to={"/"}
          aria-label="Home"
          title="Home"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 btn btn-primary"
              : "flex btn btn-ghost hover:border-primary hover:border-2 hover:bg-base-100 hover:text-primary items-center gap-1"
          }
        >
          Home
        </NavLink>
      </li>
      <li
        data-aos="fade-down"
        data-aos-duration="400"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <NavLink
          to={"/donation-request"}
          aria-label="Donation Request"
          title="Donation Requests"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 btn btn-primary"
              : "flex btn btn-ghost hover:border-primary hover:border-2 hover:bg-base-100 hover:text-primary items-center gap-1"
          }
        >
          Donation Request
        </NavLink>
      </li>
      <li
        data-aos="fade-down"
        data-aos-duration="600"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <NavLink
          to={"/blogs"}
          aria-label="blogs"
          title="blogs"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 btn btn-primary"
              : "flex btn btn-ghost hover:border-primary hover:border-2 hover:bg-base-100 hover:text-primary items-center gap-1"
          }
        >
          Blogs
        </NavLink>
      </li>

      {user && (
        <>
          <li
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <NavLink
              to="/funding"
              aria-label="Funding"
              title="Funding"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 btn btn-primary"
                  : "flex btn btn-ghost hover:border-primary hover:border-2 hover:bg-base-100 hover:text-primary items-center gap-1"
              }
            >
              Funding
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const link2 = (
    <>
      {/* theme btn */}
      <li className="hidden text-primary lg:block">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            onChange={toggleTheme}
            checked={theme === "dark" ? true : false}
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />

          {/* sun icon */}
          <svg
            className={`swap-off h-10 w-10 fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className={`swap-on h-10 w-10 fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </li>

      {/* login btn */}
      {user ? (
        <>
          {/* User Avatar */}
          <li>
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-primary dark:ring-primary"
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              alt="User avatar"
            />
          </li>

          {/* Dropdown Toggle Button */}
          <li className="relative">
            <details className="dropdown dropdown-end">
              <summary
                onClick={() => setIsMenuOpen2(!isMenuOpen2)}
                className="btn btn-ghost btn-primary btn-sm rounded-full text-primary hover:text-white p-1"
              >
                {isMenuOpen2 ? (
                  <IoIosArrowDropupCircle size={25} />
                ) : (
                  <IoIosArrowDropdownCircle size={25} />
                )}
              </summary>
              <motion.ul initial={{ opacity: 0, y: -50 }} animate={isMenuOpen2 ? { opacity: 1, y: 0 } : { y: -50, opacity: 0 }} className="p-3 space-y-2 mt-2 shadow menu dropdown-content bg-base-100 border-2 border-primary rounded-box w-40 z-50">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-1 btn btn-primary"
                        : "flex btn btn-ghost hover:border-primary hover:border-2 hover:bg-base-100 hover:text-primary items-center gap-1"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button className="flex items-center gap-1 btn btn-primary" onClick={handleLogOut}>Logout</button>
                </li>
              </motion.ul>
            </details>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/login"
              className="hidden lg:flex  btn btn-outline btn-primary text-primary border-3 hover:text-white"
            >
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hidden lg:flex btn btn-primary">
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-base-100">
      <div className="relative flex items-center justify-between">
        <div data-aos="fade-right">
          <CompanyLogo></CompanyLogo>
        </div>
        <ul className="items-center hidden space-x-3 lg:flex">
          {loading ? (
            <div className="flex  mx-auto items-center justify-center text-center">
              <div className="mx-auto text-center w-fit">
                {/* <BarLoader /> */}
              </div>
            </div>
          ) : (
            links
          )}
        </ul>
        <ul data-aos="fade-left" className="items-center hidden space-x-3 lg:flex">{link2}</ul>

        {/* phone */}
        <div className="relative lg:hidden">
          <div className="flex items-center">
            <div className="text-primary">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  onChange={toggleTheme}
                  checked={theme === "dark" ? true : false}
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className={`swap-off h-8 w-8 fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className={`swap-on h-8 w-8 fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              size={25}
              color="red"
            ></Hamburger>
          </div>

          {isMenuOpen && (
            <motion.div
              animate={{
                x: [100, 0],
                transition: { duration: 0.3 },
                opacity: 1,
              }}
              initial={{ opacity: 0 }}
              className="absolute right-0 z-40 overflow-y-visible top-10"
            >
              <div className="h-full p-3 space-y-2 w-60 bg-accent rounded-md">
                <div className="flex items-center p-2 space-x-4">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                    {user?.photoURL ? (
                      <img
                        className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        src={user?.photoURL}
                        alt="Bordered avatar"
                      />
                    ) : (
                      <Link to="/login">
                        <svg
                          className="absolute w-12 h-12  text-primary -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {user?.displayName}
                    </h2>
                    <span className="flex items-center space-x-1">
                      <p className="text-xs hover:underline text-gray-500">
                        {user?.email}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="divide-y dark:divide-gray-300">
                  <ul className="pt-2 pb-4 space-y-1 text-sm ">{links}</ul>
                  <ul className="pt-4 pb-2 space-y-1 text-sm">
                    {user ? (
                      <li onClick={handleLogOut}>
                        <button className="flex btn btn-primary w-full">
                          Log Out
                        </button>
                      </li>
                    ) : (
                      <div className="flex items-center justify-around">
                        <li>
                          <Link
                            to={"/login"}
                            aria-label="Login"
                            title="Login"
                            className="flex btn btn-outline text-base border-primary"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/register"}
                            aria-label="Register"
                            title="Register"
                            className="flex btn btn-primary"
                          >
                            Register
                          </Link>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
