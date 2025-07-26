import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FiMail,
  FiUser,
  FiImage,
  FiDroplet,
  FiLock,
  FiMapPin,
} from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserData } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    // eslint-disable-next-line no-unused-vars
    clearErrors,
    formState: { errors },
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedDistrict = watch("district");
  const passwordValue = watch("password");
  // eslint-disable-next-line no-unused-vars
  const confirmPasswordValue = watch("confirm_password");

  // Load district and upazila data
  useEffect(() => {
    const loadLocations = async () => {
      const districtData = await fetch("/district.json").then((res) =>
        res.json()
      );
      const upazilaData = await fetch("/upazila.json").then((res) =>
        res.json()
      );
      setDistricts(districtData);
      setUpazilas(upazilaData);
    };
    loadLocations();
    setLoading(false);
  }, []);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  const onSubmit = async (data) => {
    // 1. Validate password match
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    // 2. Upload avatar to imageBB
    const imageFile = data.avatar[0];
    const formImage = new FormData();
    formImage.append("image", imageFile);
    const imageBBKey = import.meta.env.VITE_IMAGEBB_KEY;
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

    let imageUrl = "";
    try {
      const res = await axios.post(imageUploadUrl, formImage);
      imageUrl = res.data.data.display_url;
    } catch (error) {
      toast.error("Image upload failed!", error);
      return;
    }

    // 3. Create Firebase user
    try {
      const user = await createUser(data.email, data.password);
      if (user) {
        await updateUserData(data.name, imageUrl);
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use! Please use another email or login.");
      } else {
        const reason =
          err.message.split("[")[1]?.split("]")[0] || "Unknown error";
        toast.error(`Missing password requirements: ${reason}`);
      }
      return;
    }

    // 4. Construct donor data
    const donorData = {
      name: data.name,
      email: data.email,
      avatar: imageUrl,
      bloodGroup: data.bloodGroup,
      district: data.district,
      upazila: data.upazila,
      status: "active",
      role: "donor",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    // 5. Save to database
    try {
      const res = await axiosPublic.post("/users", donorData);
      console.log("Saved to DB:", res.data);
    } catch (err) {
      toast.error("Failed to save donor data to DB.");
      console.error(err);
      return;
    }

    // 6. Final success message + redirect
    Swal.fire({
      icon: "success",
      title: "Donor Registered Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    reset();
    navigate(location?.state || "/");
  };
  

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <div className="max-w-xl mx-auto p-6 bg-base-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register as Donor
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiMail />
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="grow"
            />
          </label>
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}

          {/* Name */}
          <label className="input input-bordered w-full flex items-center gap-2">
            <FiUser />
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Full Name"
              className="grow"
            />
          </label>
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}

          {/* Avatar */}
          <label className="input w-full input-bordered flex items-center gap-2">
            <FiImage />
            <input
              {...register("avatar", { required: "Avatar is required" })}
              type="file"
              accept="image/*"
              className="file-input grow"
            />
          </label>
          {errors.avatar && (
            <p className="text-error text-sm">{errors.avatar.message}</p>
          )}

          {/* Blood Group */}
          <label className="input w-full input-bordered flex items-center gap-2">
            <FiDroplet />
            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="grow bg-transparent"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </label>
          {errors.bloodGroup && (
            <p className="text-error text-sm">{errors.bloodGroup.message}</p>
          )}

          {/* District */}
          <label className="input w-full input-bordered flex items-center gap-2">
            <FiMapPin />
            <select
              {...register("district", { required: "District is required" })}
              className="grow bg-transparent"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </label>
          {errors.district && (
            <p className="text-error text-sm">{errors.district.message}</p>
          )}

          {/* Upazila */}
          <label className="input w-full input-bordered flex items-center gap-2">
            <FiMapPin />
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="grow bg-transparent"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </label>
          {errors.upazila && (
            <p className="text-error text-sm">{errors.upazila.message}</p>
          )}

          {/* Password */}
          <label className="input w-full input-bordered flex items-center gap-2 relative">
            <FiLock />
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Password must contain at least 6 characters, one uppercase, and one lowercase letter",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="grow pr-8"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <label className="input w-full input-bordered flex items-center gap-2 relative">
            <FiLock />
            <input
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="grow pr-8"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          {errors.confirm_password && (
            <p className="text-error text-sm">
              {errors.confirm_password.message}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
