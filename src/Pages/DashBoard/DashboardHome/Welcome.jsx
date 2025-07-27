import React from "react";
import CountUp from "react-countup";
import { FaTint, FaClock, FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Welcome = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const displayName = user?.displayName || "Valued User";
  const userRole = role || "donor";

  const stats = {
    donations: 5,
    lastDonation: "June 30, 2025",
    bloodGroup: "O+",
  };

  const roleColor = {
    admin: "badge-error",
    moderator: "badge-warning",
    donor: "badge-success",
  };

  return (
    <div className="bg-base-300 p-6 rounded-2xl">
      {/* Top Row: Avatar + Welcome Message */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6">
        <div className="bg-accent ring-2 ring-primary rounded-full p-1 text-accent-content shadow-inner">
          <img className="w-18 h-18 rounded-full" src={user?.photoURL} alt="" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-base-content">
            Welcome back,{" "}
            <span className="text-primary">{displayName}</span>!
          </h2>
          <p className="text-md text-secondary-content mt-1">
            Thank you for your contribution to saving lives.
          </p>
          <div
            className={`badge mt-2 ${roleColor[userRole]} text-white capitalize`}
          >
            {userRole}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-base-100 p-4 rounded-xl shadow text-secondary-content">
          <FaTint className="text-3xl mb-2 mx-auto" color="red" />
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-2xl font-bold">
            <CountUp end={stats.donations} duration={1.5} />
          </p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-accent-content">
          <FaClock className="text-3xl mb-2 mx-auto" color="blue"/>
          <h3 className="text-lg font-semibold">Last Donation</h3>
          <p className="text-xl font-bold">{stats.lastDonation}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-base-content">
          <FaTint className="text-3xl mb-2 mx-auto rotate-45" color="red"/>
          <h3 className="text-lg font-semibold">Blood Group</h3>
          <p className="text-2xl font-bold">{stats.bloodGroup}</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
