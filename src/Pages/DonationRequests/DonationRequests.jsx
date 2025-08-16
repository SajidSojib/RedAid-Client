import { useQuery } from "@tanstack/react-query";
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaCommentDots,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Get all pending donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-donation?status=pending");
      return res.data.donations;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="pt-20 ">
      <Helmet>
        <title>Donation Requests | RedAid</title>
      </Helmet>
      <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-8 ">
        <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold leading-none tracking-tight text-primary lg:text-4xl md:mx-auto text-center">
          Blood Donation Requests
        </h1>
        <p className="text-base mb-14 text-center max-w-xl lg:max-w-2xl mx-auto text-base-content/70 md:text-lg">
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
                  <FaEnvelope className="text-red-500" />
                  {request.requesterEmail}
                </p>

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

        {/* Confirm Modal */}
        {/* {(selectedRequest && !loading) && (
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
        )} */}
      </div>
    </div>
  );
};

export default DonationRequests;
