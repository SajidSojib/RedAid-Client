import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["myDonations", user?.email, statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests`, {
        params: {
          email: user?.email,
          status: statusFilter,
          page,
          limit,
        },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "myDonations",
        user?.email,
        statusFilter,
        page,
      ]);
    },
  });

  const deleteRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "myDonations",
        user?.email,
        statusFilter,
        page,
      ]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest.mutate(id);
        Swal.fire("Deleted!", "Your request has been deleted.", "success");
      }
    });
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="p-4 m-6 bg-base-100 rounded-xl shadow-md">
      <Helmet>
        <title>My Donation Requests | RedAid</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4 text-error">
        My All Donation Requests
      </h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["", "pending", "inprogress", "done", "canceled"].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${
              statusFilter === s ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => {
              setStatusFilter(s);
              setPage(1);
            }}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data?.donations?.length ? (
              data.donations.map((donation) => (
                <tr key={donation._id} className="hover">
                  <td>{donation.recipientName}</td>
                  <td>
                    {donation.district}, {donation.upazila}
                  </td>
                  <td>{donation.donationDate}</td>
                  <td>{donation.donationTime}</td>
                  <td>{donation.bloodGroup}</td>
                  <td
                    className={`capitalize font-medium ${
                      donation.status === "done"
                        ? "text-success"
                        : donation.status === "inprogress"
                        ? "text-info"
                        : donation.status === "canceled"
                        ? "text-error"
                        : "text-warning"
                    }`}
                  >
                    {donation.status}
                  </td>
                  <td>
                    {donation.status.toLowerCase() === "inprogress" &&
                    donation.donorName ? (
                      <>
                        <p>{donation.donorName}</p>
                        <p className="text-sm text-neutral-content">
                          {donation.donorEmail}
                        </p>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="space-x-1">
                    {donation.status.toLowerCase() === "inprogress" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            updateStatus.mutate({
                              id: donation._id,
                              status: "done",
                            })
                          }
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() =>
                            updateStatus.mutate({
                              id: donation._id,
                              status: "canceled",
                            })
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-xs btn-info"
                      // need to be changed
                      onClick={() =>
                        navigate(`/donation-request/${donation._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() =>
                        navigate(`/dashboard/edit-donation/${donation._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs bg-red-500 text-black"
                      onClick={() => handleDelete(donation._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                i + 1 === page ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
