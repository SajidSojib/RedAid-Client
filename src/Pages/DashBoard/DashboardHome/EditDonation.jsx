import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLocation } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // Load division, district, upazila
  useEffect(() => {
    const loadLocations = async () => {
      const divisionData = await fetch("/division.json").then((res) =>
        res.json()
      );
      const districtData = await fetch("/district.json").then((res) =>
        res.json()
      );
      const upazilaData = await fetch("/upazila.json").then((res) =>
        res.json()
      );
      setDivisions(divisionData);
      setDistricts(districtData);
      setUpazilas(upazilaData);
    };
    loadLocations();
  }, []);

  const filteredDistricts = districts.filter(
    (d) => d.division_id === selectedDivision
  );
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  // Fetch donation data by ID
  const { data: donation, isLoading: donationLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch user status
  const { data: userData } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isBlocked = userData?.status?.toLowerCase() === "blocked";

  // Set default values once donation data is fetched
  useEffect(() => {
    if (donation) {
      for (const [key, value] of Object.entries(donation)) {
        setValue(key, value);
      }
      setLoading(false);
    }
  }, [donation, setValue]);

  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    setProcessing(true);
    if (isBlocked) {
      setProcessing(false);
      return Swal.fire(
        "Blocked",
        "You are blocked from editing requests.",
        "error"
      );
    }

    const divisionName =
      divisions.find((d) => d.id === data.division)?.name || data.division;
    const districtName =
      districts.find((d) => d.id === data.district)?.name || data.district;

    const updatedData = {
      ...data,
      division: divisionName,
      district: districtName,
      updatedAt: new Date(),
    };
    const {_id, ...rest} = updatedData

    try {
      const res = await axiosSecure.patch(
        `/donation-requests/${id}`,
        rest
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Updated!",
          "Donation request updated successfully.",
          "success"
        );
        setProcessing(false);
        navigate(-1); // change if route differs
      }
    } catch (err) {
      setProcessing(false);
      Swal.fire("Error", "Could not update donation request.", "error");
    }
  };

  if (loading || donationLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" m-6 p-4 bg-base-100 shadow-xl rounded-xl border border-base-300">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Edit Donation Request
      </h2>

      {isBlocked && (
        <div className="alert alert-error mb-4 text-white">
          You are blocked and cannot submit donation requests.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Requester Name */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Requester Name</span>
          </label>
          <input
            readOnly
            // defaultValue={user?.displayName}
            {...register("requesterName", { required: true })}
            className="input input-primary border-base-300 w-full"
            placeholder="Requester Name"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Requester Email</span>
          </label>
          <input
            readOnly
            // defaultValue={user?.email}
            {...register("requesterEmail", { required: true })}
            className="input input-primary border-base-300 w-full"
            placeholder="Requester Email"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Recipient Name</span>
          </label>
          <input
            {...register("recipientName", { required: true })}
            className="input input-primary border-base-300 w-full"
            placeholder="Recipient Name"
          />
        </div>

        {/* Division */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Division</span>
          </label>
          <select
            {...register("division", { required: true })}
            className="select select-primary border-base-300 w-full"
          >
            <option value={donation?.division}>{donation?.division}</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">
            <span className="label-text text-xs">District</span>
          </label>
          <select
            {...register("district", { required: true })}
            className="select select-primary border-base-300 w-full"
          >
            <option value={donation?.district}>{donation?.district}</option>
            {filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Upazila</span>
          </label>
          <select
            {...register("upazila", { required: true })}
            className="select select-primary border-base-300 w-full"
          >
            <option value={donation?.upazila}>{donation?.upazila}</option>
            {filteredUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Hospital Name</span>
          </label>
          <input
            {...register("hospitalName", { required: true })}
            className="input input-primary border-base-300 w-full"
            placeholder="Hospital Name"
          />
        </div>

        {/* Address */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Full Address</span>
          </label>
          <input
            {...register("address", { required: true })}
            className="input input-primary border-base-300 w-full"
            placeholder="Full Address"
          />
        </div>

        {/* Blood Group, Date, Time */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text text-xs">Blood Group</span>
            </label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-primary border-base-300 w-full"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-xs">Donation Date</span>
            </label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input input-primary border-base-300 w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-xs">Donation Time</span>
            </label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input input-primary border-base-300 w-full"
            />
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text text-xs">Why do you need blood?</span>
          </label>
          <textarea
            {...register("message", { required: true })}
            className="textarea textarea-primary border-base-300 w-full"
            placeholder="Why do you need blood?"
            rows={4}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-primary text-white hover:bg-red-700 sm:col-span-2"
          disabled={isBlocked}
        >
          {processing ? (
            <span><span className="loading loading-spinner"></span><span>Updating</span></span>
          )
            : (
              <span>Update Request</span>
            )}
        </button>
      </form>
    </div>
  );
};

export default EditDonation;
