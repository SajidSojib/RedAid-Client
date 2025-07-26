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
import DashHome from './Pages/DashBoard/DashHome';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

AOS.init();
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashHome
      }
    ]
  }
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
