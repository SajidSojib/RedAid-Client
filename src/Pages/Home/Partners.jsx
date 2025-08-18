import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";
const Partners = ({ partnerData }) => {
  return (
    // <div className="py-16">
    <div className="pt-16 lg:pt-24">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold leading-none tracking-tight text-base-content lg:text-4xl md:mx-auto">
          Meet Our <span className="text-primary">Partners</span>
        </h2>
        <p className="text-base text-base-content/70 md:text-lg">
          Discover a diverse network of organizations and individuals who share a
          common passion for blood donation and emergency support.
        </p>
      </div>

      <div>
        <Marquee
          play={1}
          speed={70}
          className="pt-8 py-5"
          pauseOnHover={false}
          loop={0}
        >
          {/* rounded 2xl */}
          {partnerData?.map((partner) => (
            <div className="bg-base-100 mr-10 shadow-lg hover:scale-105 duration-300 w-96  rounded-lg overflow-hidden hover:shadow-xl transition p-6 group h-auto flex flex-col justify-between">
              <div>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 mx-auto mb-4 duration-300"
                />
                <h3 className="text-xl text-center text-base-content font-semibold mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-center text-base-content/80 mb-4">
                  {partner.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="px-3 py-1 bg-primary text-white text-xs rounded-full">
                  {partner.category}
                </p>
                <Link
                  to={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary hover:underline font-medium"
                >
                  Visit Website →
                </Link>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Partners;
