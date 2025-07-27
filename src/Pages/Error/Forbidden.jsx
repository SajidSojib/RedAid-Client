import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl">This Page is Forbidden</h1>
      <p className="text-3xl mt-3">You can't access this page</p>

      <Link to="/dashboard/home">
        <button className="btn btn-primary mt-5 text-black">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
