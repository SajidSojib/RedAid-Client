import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  FiMail,
  FiUser,
  FiImage,
  FiDroplet,
  FiMapPin,
  FiEdit2,
  FiSave,
} from "react-icons/fi";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdCancel } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const fetchJSON = (url) => fetch(url).then((res) => res.json());

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // Load user data
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => reset(data),
  });

  // Load locations
  const { data: divisions = [] } = useQuery({
    queryKey: ["divisions"],
    queryFn: () => fetchJSON("/division.json"),
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () => fetchJSON("/district.json"),
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: () => fetchJSON("/upazila.json"),
  });

  const filteredDistricts = districts.filter(
    (d) => d.division_id === selectedDivision
  );
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  // Profile Update
  const mutation = useMutation({
    mutationFn: async (formData) => {
      let imageUrl = formData.avatar;

      if (formData.avatar instanceof FileList && formData.avatar.length > 0) {
        const imageFile = formData.avatar[0];
        const formImage = new FormData();
        formImage.append("image", imageFile);
        const imageBBKey = import.meta.env.VITE_IMAGEBB_KEY;
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;
        const res = await axios.post(imageUploadUrl, formImage);
        imageUrl = res.data.data.display_url;
      }

      const updatedData = {
        ...formData,
        avatar: imageUrl,
      };
      delete updatedData._id;
      console.log(updatedData);

      const res = await axiosSecure.put(`/users/${user.email}`, updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        setIsEditable(false);
        queryClient.invalidateQueries(["userProfile", user?.email]);
      } else {
        toast.info("No changes made");
      }
    },
    onError: () => toast.error("Update failed"),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (userLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (userError || !userData) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Failed to load user data
      </div>
    );
  }

  return (
    <div className="pt-28">
      <div className="max-w-xl mx-auto p-6 bg-base-100 rounded shadow relative">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email (readonly) */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiMail />
            <input
              type="email"
              {...register("email")}
              value={userData.email}
              readOnly
              className="grow bg-transparent"
            />
          </label>

          {/* Name */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiUser />
            <input
              type="text"
              {...register("name", { required: true })}
              defaultValue={userData.name}
              readOnly={!isEditable}
              className="grow bg-transparent"
            />
          </label>

          {/* Avatar */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiImage />
            {!isEditable ? (
              <input
                type="text"
                {...register("avatar", { required: true })}
                value={userData.avatar}
                readOnly
                className="grow bg-transparent"
              />
            ) : (
              <input
                type="file"
                {...register("avatar", { required: true })}
                className="file-input grow"
                required
              />
            )}
          </label>

          {/* Blood Group */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiDroplet />
            <select
              {...register("bloodGroup", { required: true })}
              disabled={!isEditable}
              className="grow bg-transparent"
            >
              <option value={userData.bloodGroup}>{userData.bloodGroup}</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </label>

          {/* last Donated */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FaRegCalendarAlt /> Last Donated on
            <input
              type="date"
              {...register("lastDonated", { required: true })}
              defaultValue={userData.lastDonated}
              readOnly={!isEditable}
              className="grow bg-transparent"
            />
          </label>

          {/* Division */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiMapPin />
            <select
              {...register("division", { required: true })}
              disabled={!isEditable}
              className="grow bg-transparent"
            >
              <option value={userData.division}>{userData.division}</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          {/* District */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiMapPin />
            <select
              {...register("district", { required: true })}
              disabled={!isEditable}
              className="grow bg-transparent"
            >
              <option value={userData.district}>{userData.district}</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          {/* Upazila */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiMapPin />
            <select
              {...register("upazila", { required: true })}
              disabled={!isEditable}
              className="grow bg-transparent"
            >
              <option value={userData.upazila}>{userData.upazila}</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end">
            {!isEditable ? (
              <button
                type="button"
                className="btn btn-secondary absolute top-4 right-4"
                onClick={() => setIsEditable(true)}
              >
                <FiEdit2 className="mr-2" /> Edit
              </button>
            ) : (
              <div>
                <button type="submit" className="btn btn-primary">
                  <FiSave className="mr-2" /> Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditable(false)}
                  className="btn ml-6 btn-accent"
                >
                  <MdCancel className="mr-2" /> Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
