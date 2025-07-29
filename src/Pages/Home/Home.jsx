import React from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Contact from './Contact';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
      <div>
        <Helmet>
          <title>Home | RedAid</title>
        </Helmet>
        <Banner></Banner>
        <Feature></Feature>
        <Contact></Contact>
      </div>
    );
};

export default Home;