import React from "react";
import {
  FiSearch,
  FiUserCheck,
  FiShield,
  FiMapPin,
  FiGrid,
  FiSmartphone,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    title: "Instant Donor Matching",
    subtitle:
      "Quickly connect with compatible blood donors near your location in real-time.",
    icon: <FiSearch className="w-10 h-10 text-primary" />,
  },
  {
    id: 2,
    title: "Verified Donor Profiles",
    subtitle:
      "All donors are email-verified with up-to-date donation status and history.",
    icon: <FiUserCheck className="w-10 h-10 text-primary" />,
  },
  {
    id: 3,
    title: "Secure Blood Requests",
    subtitle:
      "Your privacy is our priority. Send and manage blood requests securely.",
    icon: <FiShield className="w-10 h-10 text-primary" />,
  },
  {
    id: 4,
    title: "Live Donor Tracker",
    subtitle: "Track your request's progress and donor responses in real-time.",
    icon: <FiMapPin className="w-10 h-10 text-primary" />,
  },
  {
    id: 5,
    title: "Personal Donor Dashboard",
    subtitle:
      "Manage your donations, profile, and requests from a centralized dashboard.",
    icon: <FiGrid className="w-10 h-10 text-primary" />,
  },
  {
    id: 6,
    title: "Mobile Friendly",
    subtitle: "RedAid works smoothly on all devices—anytime, anywhere.",
    icon: <FiSmartphone className="w-10 h-10 text-primary" />,
  },
];

export const Feature = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold leading-none tracking-tight text-base-content lg:text-4xl md:mx-auto">
          Why Choose <span className="text-primary">RedAid</span>?
        </h2>
        <p className="text-base text-base-content/70 md:text-lg">
          Discover the key features that make RedAid a reliable and powerful
          platform for blood donation and emergency support.
        </p>
      </div>
      <div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.id} className="sm:text-center border-2 border-base-300 hover:border-primary hover:shadow-lg hover:scale-105 p-2 rounded-xl transition transform">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent sm:mx-auto sm:w-20 sm:h-20">
              {feature.icon}
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-base-content">
              {feature.title}
            </h6>
            <p className="max-w-md mb-3 text-sm text-base-content/70 sm:mx-auto">
              {feature.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
