import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home/Home';
import AuthProvider from './Firebase/AuthProvider';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import PrivateRoute from './Routes/PrivateRoute';
import DashboardLayout from './Layouts/DashboardLayout';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import DashboardHome from './Pages/DashBoard/DashboardHome/DashboardHome';
import CreateDonReq from './Pages/DashBoard/CreateDonReq/CreateDonReq';
import EditDonation from './Pages/DashBoard/DashboardHome/EditDonation';
import MyRequests from './Pages/DashBoard/MyRequests/MyRequests';
import Forbidden from './Pages/Error/Forbidden';
import AdminRoute from './Routes/AdminRoute';
import AllUsers from './Pages/DashBoard/AllUsers/AllUsers';
import AllRequests from './Pages/DashBoard/AllRequests/AllRequests';
import ContentManagement from './Pages/DashBoard/ContentManagement/ContentManagement';
import AddBlog from './Pages/DashBoard/ContentManagement/AddBlog';
import Profile from './Pages/DashBoard/Profile/Profile';
import Search from './Pages/Search/Search';
import DonationRequests from './Pages/DonationRequests/DonationRequests';
import Blogs from './Pages/Blogs/Blogs';
import BlogDetails from './Pages/Blogs/BlogDetails';
import Funding from './Pages/Funding/Funding';
import Error from './Pages/Error/Error';
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import DonationDetails from './Pages/DonationRequests/DonationDetails';

AOS.init();
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: 'search-donor',
        Component: Search
      },
      {
        path: 'donation-request',
        element: <DonationRequests></DonationRequests>
      },
      {
        path: 'donation-request/:id',
        element:<PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
      },
      {
        path: 'blogs',
        Component:Blogs
      },
      {
        path: 'blogs/:id',
        element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
      },
      {
        path: 'funding',
        element:<PrivateRoute><Funding></Funding></PrivateRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        Component: DashboardHome,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonReq></CreateDonReq>,
      },
      {
        path: "edit-donation/:id",
        element: <EditDonation></EditDonation>,
      },
      {
        path: "my-donation-requests",
        element: <MyRequests></MyRequests>,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllRequests></AllRequests>
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: <AdminRoute><ContentManagement></ContentManagement></AdminRoute>
      },
      {
        path: "content-management/add-blog",
        element: <AdminRoute><AddBlog></AddBlog></AdminRoute>
      }
    ],
  },
  {
    path: "*",
    Component: Error
  }
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
