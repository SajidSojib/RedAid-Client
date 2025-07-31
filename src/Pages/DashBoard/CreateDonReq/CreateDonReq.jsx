import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonReq = () => {
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

  //   const [filteredDistricts, setFilteredDistricts] = useState([]);
  //   const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      setLoading(true);

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
      setLoading(false);
    };
    loadLocations();
  }, []);

  const filteredDistricts = districts.filter(
    (d) => d.division_id === selectedDivision
  );

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );
  // Get user status
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isBlocked = userData?.status.toLowerCase() === "blocked";

  const onSubmit = async (data) => {
    if (isBlocked) {
      return Swal.fire(
        "Blocked",
        "You are blocked from making requests.",
        "error"
      );
    }

    const divisionName = divisions.find((d) => d.id === data.division).name;
    const districtName = districts.find((d) => d.id === data.district)?.name;

    const requestData = {
      ...data,
      division: divisionName,
      district: districtName,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      status: "pending",
      createdAt: new Date(),
    };
    try {
      const res = await axiosSecure.post("/donation-requests", requestData);
      if (res.data.insertedId) {
        Swal.fire(
          "Request Created!",
          "Your blood donation request is submitted.",
          "success"
        );
        reset();
      }
    } catch (err) {
      Swal.fire(
        "Error",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl border border-base-300">
      <Helmet>
        <title>Create Donation Request | RedAid</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Create Donation Request
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
          <option value="">Select Division</option>
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
          <option value="">Select District</option>
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
          <option value="">Select Upazila</option>
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
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonReq;
