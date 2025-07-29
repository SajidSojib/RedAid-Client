import React from "react";
import errorJson from "../../assets/404-error.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl relative">
        <Lottie className="" animationData={errorJson} />
        <div className="flex absolute top-7/9 left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-2">
          <p className="text-sm sm:text-lg lg:text-2xl text-center font-semibold text-primary">
            Click the button below to go back to the home page
          </p>
          <Link to={"/"}>
            <button className="btn btn-primary">Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
