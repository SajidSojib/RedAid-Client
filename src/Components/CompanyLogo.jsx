import React from 'react';
import logo1 from '../assets/logo1.png'
import { Link } from 'react-router';
const CompanyLogo = () => {
    return (
      <Link to="/" className="cursor-pointer inline-flex items-center">
        <img className='w-9 -mt-1' src={logo1} alt="" />
        <h2 className="-ml-1 font-bold tracking-wide">Red<span className='text-primary'>Aid</span></h2>
      </Link>
    );
};

export default CompanyLogo;