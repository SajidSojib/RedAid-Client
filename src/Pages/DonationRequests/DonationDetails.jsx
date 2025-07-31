import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaUser,
  FaTint,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  // Get all pending donation requests
  const { data: request = [], isLoading } = useQuery({
    queryKey: ["donationRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  // Mutation to update request status to inprogress
  const mutation = useMutation({
    mutationFn: async ({ requestId, donorName, donorEmail }) => {
      const res = await axiosSecure.patch(`/donation-requests/${requestId}`, {
        status: "inprogress",
        donorName,
        donorEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Thank you!", "You have confirmed the donation.", "success");
      queryClient.invalidateQueries(["donationRequests"]);
      setSelectedRequest(null);
    },
  });

  const handleConfirm = () => {
    if (!user) {
      Swal.fire({
        title: "Please login to confirm donation",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    if (selectedRequest.requesterEmail === user.email) {
      return Swal.fire({
        title: "You can't confirm your own request",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
    }
    if (!selectedRequest) return;
    mutation.mutate({
      requestId: selectedRequest._id,
      donorName: user?.displayName,
      donorEmail: user?.email,
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="pt-24">
      <Helmet>
        <title>Donation Details | RedAid</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center"></h1>
        <p className="text-center text-gray-500 mb-6"></p>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Blood Donation Request Details
          </h2>

          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-base-300">
            <div className="flex items-center gap-2 text-lg">
              <FaUser className="text-primary" />
              <span>
                <strong>Recipient:</strong> {request.recipientName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaTint className="text-red-600" />
              <span>
                <strong>Blood Group:</strong> {request.bloodGroup}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>
                <strong>Location:</strong> {request.upazila}, {request.district}
                , {request.division}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaHospital className="text-green-500" />
              <span>
                <strong>Hospital:</strong> {request.hospitalName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaMapMarkerAlt className="text-gray-600" />
              <span>
                <strong>Address:</strong> {request.address}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaCalendarAlt className="text-orange-500" />
              <span>
                <strong>Date:</strong> {request.donationDate}
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaClock className="text-purple-500" />
              <span>
                <strong>Time:</strong> {request.donationTime}
              </span>
            </div>

            <div className="text-lg">
              <strong>Message:</strong> {request.message}
            </div>

            <div className="flex items-center gap-2 text-lg">
              <FaEnvelope className="text-gray-500" />
              <span>
                <strong>Requested By:</strong> {request.requesterName} (
                {request.requesterEmail})
              </span>
            </div>

            <div className="text-lg">
              <strong>Status:</strong>{" "}
              <span className="capitalize badge badge-info">
                {request.status}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setSelectedRequest(request)}
              className="btn btn-primary px-8"
            >
              Donate
            </button>
          </div>
        </div>

        {/* Confirm Modal */}
        {selectedRequest && !loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
              <h3 className="text-xl font-semibold mb-4">Confirm Donation</h3>
              <div className="space-y-4">
                <div>
                  <label className="label-text text-sm">Donor Name</label>
                  <input
                    readOnly
                    value={user?.displayName || ""}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label-text text-sm">Donor Email</label>
                  <input
                    readOnly
                    value={user?.email || ""}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-outline"
                    onClick={() => setSelectedRequest(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirm}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
