import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const axiosSecure=useAxiosSecure();
    const {user, loading: authLoading} = useAuth();

    const {
      data: role = "user",
      isLoading: roleLoading,
      refetch,
    } = useQuery({
      queryKey: ["userRole", user?.email],
      enabled: !!user?.email && !authLoading,
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        console.log(res.data);
        return res.data.role;
      },
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useRole;