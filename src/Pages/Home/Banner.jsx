import React from "react";
import banner1 from "../../assets/bloodIcon2.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative min-h-screen pt-32 md:pt-0 pb-18 md:pb-0 w-full gap-12 md:gap-0 flex flex-col md:flex-row items-center overflow-hidden">
      <div className="relative z-10 flex items-center justify-start h-full px-6 md:px-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider leading-tight mb-3 md:mb-6">
            Be the Lifeline <br /> Someone Needs Today
          </h1>
          <p className="text-base xl:text-lg text-gray-200 tracking-wide mb-8">
            Every drop of blood can be a second chance at life. At{" "}
            <span className="text-[#FF1A1A] font-semibold">RedAid</span>, we
            connect generous donors with those in urgent need—quickly, safely,
            and reliably.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="btn btn-wide btn-outline btn-primary bg-white hover:bg-primary hover:text-white transition"
            >
              Join as a Donor
            </Link>
          </div>
        </div>
      </div>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center z-1 top-1/3 md:top-1/4 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${banner1})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Black Transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative text-right z-10 flex items-center justify-start h-full px-6 md:px-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider leading-tight mb-3 md:mb-6">
            Need Blood? <br /> Find a Donor in Seconds{" "}
          </h1>
          <p className="text-base xl:text-lg text-gray-200 tracking-wide mb-8">
            We connects you instantly with verified blood donors in your area at{" "}
            <span className="text-[#FF1A1A] font-semibold">RedAid</span>.
            Whether it's an emergency or a planned donation, our fast and
            reliable system helps you find the right match—when it matters most.
          </p>
          <div className="space-x-4">
           
            <Link to="/search" className="btn btn-primary btn-wide text-white">
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
