import React, { use, useEffect, useState } from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Contact from './Contact';
import { Helmet } from "@dr.pogodin/react-helmet";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import RecentReq from './RecentReq';
import Partners from './Partners';
import Faq from './Faq';
import RecentBlogs from './RecentBlogs';
import axios from 'axios';

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/all-donation?status=pending&page=1&limit=8&sort2=newest")
      .then((res) => setData(res.data.donations))
      .catch((err) => console.log(err));

    fetch('/partner.json').then(res => res.json())
      .then(data => setPartnerData(data))
      setLoading(false);

    fetch('/faq.json').then(res => res.json())
      .then(data => setQuestions(data))

    axiosPublic
      .get("/blogs?status=published&page=1&limit=3")
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.log(err));
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
        <RecentBlogs blogs={blogs}></RecentBlogs>
        <Feature></Feature>
        <Partners partnerData={partnerData}></Partners>
        <Faq questions={questions}></Faq>
        <Contact></Contact>
      </div>
    );
};

export default Home;