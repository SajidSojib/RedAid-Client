import React from "react";
import CountUp from "react-countup";
import { FaTint } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const Welcome = ({ user}) => {


  const displayName = user?.name || "Valued User";
  const userRole = user?.role || "donor";
  const stats = {
    donations: 5,
    lastDonation: "June 30, 2025",
    bloodGroup: "O+",
  };

  const roleColor = {
    admin: "badge-error",
    volunteer: "badge-warning",
    donor: "badge-success",
  };

  return (
    <div className="bg-base-300 p-6 rounded-2xl mt-4 mb-12">
      {/* Top Row: Avatar + Welcome Message */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6">
        <div className="bg-accent ring-2 ring-primary rounded-full p-1 text-accent-content shadow-inner">
          <img className="w-44 rounded-full" src={user?.avatar} alt="" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-base-content">
            Welcome back, <span className="text-primary">{displayName}</span>!
          </h2>
          {userRole === "admin" && (
            <p className="text-md text-secondary-content text-justify mt-1 w-2/3">
              Your role as an admin is vital in ensuring this life-saving
              ecosystem runs smoothly. From overseeing donations to empowering
              volunteers, your leadership shapes the impact we make every day.
              Let’s continue driving change, one decision at a time.
            </p>
          )}
          {userRole === "volunteer" && (
            <p className="text-md text-secondary-content text-justify mt-1 w-2/3">
              Your role as a volunteer is a testament to your commitment to
              making a difference. As a volunteer, you play a pivotal role in
              making a positive impact on the lives of those in need. Your
              dedication and compassion are truly inspiring.
            </p>
          )}
          {userRole === "donor" && (
            <p className="text-md text-secondary-content text-justify mt-1 w-2/3">
            We're honored to have you here again. Donating blood may take only a
            few minutes of your time, but its impact can last a lifetime. Your
            selflessness helps mothers in labor, accident victims, cancer
            patients, and countless others. Thank you for making saving lives a
            part of your journey.
          </p>
          )}
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
            <CountUp end={user?.donations || 0} duration={1.5} />
          </p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-accent-content">
          <BiSolidDonateBlood className="text-3xl mb-2 mx-auto" color="blue" />
          <h3 className="text-lg font-semibold">My Donation Requests</h3>
          <p className="text-xl font-bold">
            <CountUp end={user?.donationRequest || 0} duration={1.5} />
          </p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-base-content">
          <FaTint className="text-3xl mb-2 mx-auto rotate-45" color="red" />
          <h3 className="text-lg font-semibold">Blood Group</h3>
          <p className="text-2xl font-bold">{stats.bloodGroup}</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
