import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInUser(data.email, data.password);
      if (userCredential.user?.email) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      }
    } catch (err) {
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
      toast.error(
        err.message.split("/")[1].split(")")[0] +
          ` : "please provide valid email and password"`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-base-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <label className="input w-full input-bordered flex items-center gap-2">
          <FiMail />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="grow"
          />
        </label>
        {errors.email && (
          <p className="text-error text-sm ml-1">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <label className="input w-full input-bordered flex items-center gap-2 relative">
          <FiLock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
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
          <p className="text-error text-sm ml-1">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
