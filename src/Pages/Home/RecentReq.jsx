import React from "react";
import { useNavigate } from "react-router";
import { FaTint, FaCalendarAlt, FaBriefcaseMedical } from "react-icons/fa";

const RecentReq = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold leading-none tracking-tight text-base-content lg:text-4xl md:mx-auto">
          Recent <span className="text-primary">Donation</span> Requests
        </h2>
        <p className="text-base text-base-content/70 md:text-lg">
          Explore the latest blood donation requests and support those in need.
          Your donation can make a difference.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((request) => (
          <div key={request._id} className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-1">
              <h2 className="text-xl font-bold mb-2 text-red-500">
                <FaTint className="inline mr-1 text-red-600" />
                {request.recipientName} needs {request.bloodGroup} blood
              </h2>
              <p className="flex items-center gap-2 text-sm">
                <FaBriefcaseMedical className="text-red-500" />
                Quantity: {request.bags} Bags
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaCalendarAlt className="text-orange-500" />
                Requsted On: {request.createdAt.slice(0, 10)} at{" "}
                {request.createdAt.slice(11, 16)}
              </p>
              {/* <p className="flex items-center gap-2 text-sm">
                                  <FaClock className="text-purple-500" />
                                  Deadline Time: {request.donationTime}
                                </p> */}

              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/donation-request/${request._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReq;
