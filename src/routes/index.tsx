import React, { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AddNewUser, AdminLogin, Dashboard, RestaurantList, UserDetail, UserEdit, UserList } from "./elements";
import AdminLayout from "../layout/AdminLayout";
import { Spin } from "antd";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import AdminGuestGuard from "../guards/admin-guest-guard";
import AdminAuthGuard from "../guards/admin-auth-guard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "", element: <Navigate to="/admin" replace /> },
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
                    { path: "new", element: <RestaurantList /> },
                  ],
                },
                {
                  path: "users",
                  children: [
                    { path: "", element: <Navigate to="list" replace /> },
                    { path: "list", element: <UserList /> },
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
