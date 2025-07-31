import React from 'react';
import Welcome from './Welcome';
import RecentDonations from './RecentDonations';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Stats from './Stats';
import useRole from '../../../Hooks/useRole';
import { Helmet } from 'react-helmet-async';

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {role, roleLoading} = useRole();
  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  })

    const { data: data2, isLoading2 } = useQuery({
      queryKey: ["stats"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/stats`);
        console.log(res.data);
        return res.data;
      },
      enabled: !roleLoading && !!role && role !== "donor",
    });
  if (isLoading || roleLoading || isLoading2) {
    return <div className='flex items-center justify-center h-screen'><span className='loading loading-dots loading-xl'></span></div>
  }
    return (
      <div>
        <Helmet>
          <title>Dashboard | RedAid</title>
        </Helmet>
        <Welcome user={data}></Welcome>
        <RecentDonations></RecentDonations>
        <Stats role={role} data2={data2}></Stats>
      </div>
    );
};

export default DashboardHome;