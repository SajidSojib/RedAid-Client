import React from 'react';
import Welcome from './Welcome';
import RecentDonations from './RecentDonations';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  })

  if (isLoading) {
    return <progress className="progress w-56"></progress>
  }
    return (
      <div>
        <Welcome user={data}></Welcome>
        <RecentDonations></RecentDonations>
      </div>
    );
};

export default DashboardHome;