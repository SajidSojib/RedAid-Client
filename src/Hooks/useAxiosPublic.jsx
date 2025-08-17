import axios from "axios";
import React from "react";

const axiosPub = axios.create({
  // baseURL: "https://redaid-server.vercel.app",
  baseURL: "http://localhost:9000",
});
const useAxiosPublic = () => {
  return axiosPub;
};

export default useAxiosPublic;
