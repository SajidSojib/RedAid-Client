import React from 'react';
import CountUp from 'react-countup';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { FaTint } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
const Stats = ({role, data2: stats}) => {
    console.log(stats);
    if(role === "donor"){
        return
    }
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-base-100 p-4 rounded-xl shadow text-secondary-content">
            <FaTint className="text-3xl mb-2 mx-auto" color="red" />
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">
              <CountUp end={stats?.totalUsers || 0} duration={1.5} />
            </p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl shadow text-accent-content">
            <BiSolidDonateBlood
              className="text-3xl mb-2 mx-auto"
              color="blue"
            />
            <h3 className="text-lg font-semibold">Total Donation Requests</h3>
            <p className="text-xl font-bold">
              <CountUp end={stats?.totalRequests || 0} duration={1.5} />
            </p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl shadow text-base-content">
            <RiMoneyDollarCircleFill
              className="text-3xl mb-2 mx-auto"
              color="green"
            />
            <h3 className="text-lg font-semibold">Total Fund Amount</h3>
            <p className="text-xl font-bold">
              $<CountUp end={stats?.totalFundAmount || 0} duration={1.5} />
            </p>
          </div>
        </div>
      </div>
    );
};

export default Stats;