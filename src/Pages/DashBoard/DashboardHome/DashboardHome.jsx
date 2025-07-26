import React from 'react';
import Welcome from './Welcome';
import RecentDonations from './RecentDonations';

const DashboardHome = () => {

    return (
      <div>
        <Welcome></Welcome>
        <RecentDonations></RecentDonations>
      </div>
    );
};

export default DashboardHome;