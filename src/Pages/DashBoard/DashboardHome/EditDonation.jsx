import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  const onSubmit = async (data) => {
    if (isBlocked) {
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
        navigate("/dashboard/my-requests"); // change if route differs
      }
    } catch (err) {
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl border border-base-300">
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
        <input
          readOnly
          defaultValue={user?.displayName}
          className="input input-primary border-base-300 w-full"
          placeholder="Requester Name"
        />

        <input
          readOnly
          defaultValue={user?.email}
          className="input input-primary border-base-300 w-full"
          placeholder="Requester Email"
        />

        <input
          {...register("recipientName", { required: true })}
          className="input input-primary border-base-300 w-full"
          placeholder="Recipient Name"
        />

        {/* Division */}
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

        {/* District */}
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

        {/* Upazila */}
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

        <input
          {...register("hospitalName", { required: true })}
          className="input input-primary border-base-300 w-full"
          placeholder="Hospital Name"
        />

        <input
          {...register("address", { required: true })}
          className="input input-primary border-base-300 w-full"
          placeholder="Full Address"
        />

        <div className="flex flex-col md:col-span-2 gap-4 md:flex-row justify-between items-center">
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

          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-primary border-base-300 w-full"
          />

          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-primary border-base-300 w-full"
          />
        </div>

        <textarea
          {...register("message", { required: true })}
          className="textarea textarea-primary border-base-300 w-full md:col-span-2"
          placeholder="Why do you need blood?"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="btn bg-primary text-white hover:bg-red-700 sm:col-span-2"
          disabled={isBlocked}
        >
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditDonation;
