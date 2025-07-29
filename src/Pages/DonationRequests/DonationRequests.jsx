import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaCommentDots,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Get all pending donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests?status=pending");
      return res.data.donations;
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
    if (!selectedRequest) return;
    mutation.mutate({
      requestId: selectedRequest._id,
      donorName: user?.displayName,
      donorEmail: user?.email,
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">
          Blood Donation Requests
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Find and help someone in need of blood today.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {requests.map((request) => (
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
                  <FaMapMarkerAlt className="text-blue-500" />
                  {request.upazila}, {request.district}, {request.division}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaHospital className="text-green-500" />
                  {request.hospitalName}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-orange-500" />
                  {request.donationDate}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaClock className="text-purple-500" />
                  {request.donationTime}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaCommentDots className="text-gray-600" />
                  {request.message}
                </p>
                <p className="text-sm text-gray-600">
                  Requested by: {request.requesterName}
                </p>

                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedRequest(request)}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Modal */}
        {selectedRequest && (
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

export default DonationRequests;
