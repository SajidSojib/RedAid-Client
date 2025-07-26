import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    const navigation = useNavigation();
    const loading = navigation.state === "loading";

    return (
      <div className="bg-base-300 overflow-x-hidden xl:overflow-visible min-h-screen">
        <header className="fixed w-full z-50 top-5">
          <Navbar></Navbar>
        </header>

        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : (
          <div className="min-h-[calc(100vh-375px)]">
            <Outlet></Outlet>
          </div>
        )}

        <Footer></Footer>
      </div>
    );
};

export default MainLayout;