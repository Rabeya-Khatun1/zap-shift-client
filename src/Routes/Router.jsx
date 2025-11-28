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
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import RiderDetails from "../Pages/Dashboard/ApproveRiders/RiderDetails";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoutes from "./AdminRoutes";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliverys from "../Pages/Dashboard/AssignedDeliverys/AssignedDeliverys";

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
        loader: () => fetch("/ServiceCenter.json"),
        element: <PrivateRoutes><Rider></Rider></PrivateRoutes>,
      },
      {
        path: '/send-parcel',
        loader: () => fetch("/ServiceCenter.json"),
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
      },{
  path: '/riders/:id',
  Component: RiderDetails,
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
,
{
  path: 'payment-success',
  Component: PaymentSuccess,
}
,
{
  path: 'payment-cancelled',
  Component: PaymentCancelled,
},
{
  path: 'payment-history',
  Component: PaymentHistory,
},

// rider only routes

{
  path: 'assigned-deliverys',
  Component: AssignedDeliverys,
},
// admin only routes
{
  path: 'approve-riders',
  element: <AdminRoutes><ApproveRiders></ApproveRiders></AdminRoutes>
},
{
  path: 'users-management',
  element: <AdminRoutes><UsersManagement></UsersManagement></AdminRoutes>
},
{
  path: 'assign-riders',
  element: <AdminRoutes><AssignRiders></AssignRiders></AdminRoutes>
},


    ]
  }
]);
