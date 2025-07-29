import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "https://redaid-server.vercel.app",
  // baseURL: "http://localhost:9000",
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { user, logOutUser } = useAuth();

    axiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
        //   await logOutUser();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
    return axiosSecure;
};

export default useAxiosSecure;