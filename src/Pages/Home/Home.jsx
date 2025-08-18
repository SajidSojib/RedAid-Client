import React, { use, useEffect, useState } from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Contact from './Contact';
import { Helmet } from "@dr.pogodin/react-helmet";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import RecentReq from './RecentReq';
import Partners from './Partners';

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/all-donation?status=pending&page=1&limit=8&sort2=newest")
      .then((res) => setData(res.data.donations))
      .catch((err) => console.log(err));

    fetch('/partner.json').then(res => res.json())
      .then(data => setPartnerData(data))
      setLoading(false);
  }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      );
    }
    return (
      <div>
        <Helmet>
          <title>Home | RedAid</title>
        </Helmet>
        <Banner></Banner>
        <RecentReq data={data}></RecentReq>
        <Feature></Feature>
        <Partners partnerData={partnerData}></Partners>
        <Contact></Contact>
      </div>
    );
};

export default Home;