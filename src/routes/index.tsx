import React, { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import {
  AddNewRestaurant,
  AddNewUser,
  AdminLogin,
  AdminUserList,
  Dashboard,
  Login,
  RestaurantDetail,
  RestaurantEdit,
  RestaurantList,
  UserDetail,
  UserEdit,
  UserList,
} from "./elements";
import AdminLayout from "../layout/AdminLayout";
import { Spin } from "antd";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import AdminGuestGuard from "../guards/admin-guest-guard";
import AdminAuthGuard from "../guards/admin-auth-guard";
import GuestGuard from "../guards/guest-guard";
import AuthGuard from "../guards/auth-guard";
import ResLayout from "../layout/Layout";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "", element: <Navigate to="/login" replace /> },
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "",
          element: (
            <AuthGuard>
              <ResLayout>
                <Suspense fallback={<Spin />}>
                  <Outlet />
                </Suspense>
              </ResLayout>
            </AuthGuard>
          ),
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "users",
              element: <UserList />,
            },
          ],
        },
        {
          path: "/admin",
          children: [
            {
              path: "login",
              element: (
                <AdminGuestGuard>
                  <AdminAuthLayout>
                    <AdminLogin />
                  </AdminAuthLayout>
                </AdminGuestGuard>
              ),
            },
            {
              path: "",
              element: (
                <AdminAuthGuard>
                  <AdminLayout>
                    <Suspense fallback={<Spin />}>
                      <Outlet />
                    </Suspense>
                  </AdminLayout>
                </AdminAuthGuard>
              ),
              children: [
                { path: "", element: <Navigate to="dashboard" replace /> }, // Redirect /admin → /admin/dashboard
                { path: "dashboard", element: <Dashboard /> },
                {
                  path: "restaurants",
                  children: [
                    { path: "", element: <Navigate to="list" replace /> },
                    { path: "list", element: <RestaurantList /> },
                    { path: "new", element: <AddNewRestaurant /> },
                    { path: ":id", element: <RestaurantDetail /> },
                    { path: ":id/edit", element: <RestaurantEdit /> },
                  ],
                },
                {
                  path: "users",
                  children: [
                    { path: "", element: <Navigate to="list" replace /> },
                    { path: "list", element: <AdminUserList /> },
                    { path: "new", element: <AddNewUser /> },
                    { path: ":id", element: <UserDetail /> },
                    { path: ":id/edit", element: <UserEdit /> },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { path: "/", element: <Navigate to="/admin/dashboard" replace /> }, // Redirect / → /admin/dashboard
  ]);
}
