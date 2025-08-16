import React from "react";
import banner1 from "../../assets/bloodIcon2.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-black/90   overflow-hidden">
      <div className="gap-2 md:gap-36 flex flex-col md:flex-row items-center justify-between min-h-screen mt-10 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative z-10 flex items-center justify-start h-full ">
          <div className="max-w-2xl text-white">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider leading-tight mb-3 md:mb-6">
              Be the Lifeline
            </h1>
            <p className="text-base xl:text-md max-w-xl text-gray-200 tracking-wide mb-8">
              Every drop of blood can be a second chance at life.{" "}
              <br className="hidden md:block" /> At{" "}
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
          className="absolute   inset-0 bg-center hidden md:block z-1"
          style={{
            backgroundImage: `url(${banner1})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "300px auto",
            objectFit: "cover",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="w-1/2 md:hidden">
          <img src={banner1} alt="" />
        </div>
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,100,100,0.6), rgba(255,50,50,0.4), rgba(180,0,0,0.6))",
          }}
        ></div> */}

        {/* Black Transparent Overlay */}
        <div className="absolute z-10 inset-0 bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-start h-full text-end">
          <div className="max-w-2xl text-white">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider leading-tight mb-3 md:mb-6">
              Need Blood?
            </h1>
            <p className="text-base xl:text-md max-w-xl text-gray-200 tracking-wide mb-8">
              We connects you instantly with verified blood donors in your area
              at <span className="text-[#FF1A1A] font-semibold">RedAid</span>.
              Our fast and reliable system helps you find the right match—when
              it matters most.
            </p>
            <div className="space-x-4">
              <Link
                to="/search-donor"
                className="btn btn-primary btn-wide text-white"
              >
                Search Donors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
