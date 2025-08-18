import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaTint,  
  FaCalendarAlt,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // states for pagination & sorting
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // asc | desc
  const [created, setCreated] = useState("newest");

  // Fetch donation requests with pagination & sorting
  const { data, isLoading } = useQuery({
    queryKey: ["donationRequests", page, sortOrder, created],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/all-donation?status=pending&page=${page}&limit=12&sort=${sortOrder}&sort2=${created}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  const { donations = [], pages = 1, total = 0 } = data || {};

  return (
    <div className="pt-20 ">
      <Helmet>
        <title>Donation Requests | RedAid</title>
      </Helmet>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-8 ">
        <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold leading-none tracking-tight text-primary lg:text-4xl md:mx-auto text-center">
          Blood Donation Requests
        </h1>
        <p className="text-base mb-6 text-center max-w-xl lg:max-w-2xl mx-auto text-base-content/70 md:text-lg">
          Find and help someone in need of blood today.
        </p>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-base-content/70">
            Showing {donations.length} of {total} requests
          </p>
          <div className="flex gap-2">
            <div>
              <label className="label text-sm" htmlFor="sort">
                Filter by Blood Bags
              </label>
              <select
                name="sort"
                id="sort"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered select-sm"
              >
                <option value="">Default</option>
                <option value="desc">Blood Bags: High → Low</option>
                <option value="asc">Blood Bags: Low → High</option>
              </select>
            </div>

            <div>
              <label className="label text-sm" htmlFor="created">
                Filter by Deadline
              </label>
              <select
                name="created"
                id="created"
                value={created}
                onChange={(e) => {
                  setCreated(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered select-sm"
              >
                <option value="newest">Requests: New → Old</option>
                <option value="oldest">Requests: Old → New</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donations.map((request) => (
            <div
              key={request._id}
              className="card bg-base-100 shadow-md border"
            >
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

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          {/* <button
            className="btn btn-outline btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button> */}
          {[...Array(pages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-outline btn-primary"
              }`}
            >
              {i + 1}
            </button>
          ))}
          {/* <button
            className="btn btn-outline btn-sm"
            disabled={page === pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
