import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AllUsers = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState(""); // 'all', 'active', 'blocked'
  const [page, setPage] = useState(1);
  const limit = 5;

  // Fetch users
  const { data: { users = [], totalPages = 1 } = {}, isLoading } = useQuery({
    queryKey: ["allUsers", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?status=${statusFilter}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  // Mutation to update user role/status
  const updateUser = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axiosSecure.patch(`/users/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const handleUpdate = (id, payload) => {
    updateUser.mutate({ id, payload });
  };

  const confirmAndUpdate = (id, payload, actionText) => {
    Swal.fire({
      title: `Are you sure to ${actionText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate(id, payload);
      }
    });
  };

  if(isLoading){
    return <div className='flex items-center justify-center h-screen'><span className='loading loading-dots loading-xl'></span></div>
  }
  return (
    <div className="p-4 m-6 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">All Users</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`btn btn-sm ${
              statusFilter === status ? "btn-primary" : "btn-outline"
            }`}
          >
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto pb-20">
        <table className="table">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td className="capitalize">{user.role}</td>
                <td
                  className={`capitalize font-medium ${
                    user.status === "blocked" ? "text-error" : "text-success"
                  }`}
                >
                  {user.status}
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-sm btn-ghost">
                      <FaEllipsisV />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-44"
                    >
                      {user.status === "active" && (
                        <li>
                          <button
                            onClick={() =>
                              confirmAndUpdate(
                                user._id,
                                { status: "blocked" },
                                "block this user"
                              )
                            }
                          >
                            Block
                          </button>
                        </li>
                      )}
                      {user.status === "blocked" && (
                        <li>
                          <button
                            onClick={() =>
                              confirmAndUpdate(
                                user._id,
                                { status: "active" },
                                "unblock this user"
                              )
                            }
                          >
                            Unblock
                          </button>
                        </li>
                      )}
                      {user.role !== "doner" && (
                        <li>
                          <button
                            onClick={() =>
                              confirmAndUpdate(
                                user._id,
                                { role: "donor" },
                                "make Donor"
                              )
                            }
                          >
                            Make Donor
                          </button>
                        </li>
                      )}
                      {user.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() =>
                              confirmAndUpdate(
                                user._id,
                                { role: "volunteer" },
                                "make Volunteer"
                              )
                            }
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}
                      {user.role !== "admin" && (
                        <li>
                          <button
                            onClick={() =>
                              confirmAndUpdate(
                                user._id,
                                { role: "admin" },
                                "make Admin"
                              )
                            }
                          >
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

export default AllUsers;
