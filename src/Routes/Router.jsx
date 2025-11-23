import { createBrowserRouter } from "react-router";

import Home from '../Pages/Home/Home'
import Coverage from "../Pages/Coverage/Coverage";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Rider from "../Pages/Rider/Rider";
import PrivateRoutes from './PrivateRoutes'
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("/bannerDocs.json"),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/ServiceCenter.json"),
      },
      {
        path: '/rider',
        element: <PrivateRoutes><Rider></Rider></PrivateRoutes>,
      },
      {
        path: '/send-parcel',
        loader: () => fetch("/ServiceCenter.json"),
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",   
        Component: Login,
      },
      {
        path: "register", 
        Component: Register,
      },
    ],
  },
  {
    path:'dashboard',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
{
  index:true,

  Component:MyParcels,
},
{

  path: 'my-parcels'
  ,Component:MyParcels,
},{
  path: 'payment/:parcelId',
  Component: Payment,
}
    ]
  }
]);
