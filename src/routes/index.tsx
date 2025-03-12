import React, { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Dashboard, RestaurantList, UserList } from "./elements";
import AdminLayout from "../layout/Layout";
import { Spin } from "antd";

export default function Router() {
    return useRoutes([
        {
            path: '/',
            children: [
                {path: "", element: <Navigate to="/admin" replace />},
                {
                    path: '/admin',
                    element: <AdminLayout>
                        <Suspense fallback={<Spin />}>
                            <Outlet />
                        </Suspense>
                    </AdminLayout>,
                    children: [
                        { path: "", element: <Navigate to="dashboard" replace /> }, // Redirect /admin → /admin/dashboard
                        {path: 'dashboard', element: <Dashboard />},
                        {
                            path: 'restaurants', 
                            children: [
                                { path: "", element: <Navigate to="list" replace /> },
                                {path: 'list', element: <RestaurantList />},
                            ]
                        },
                        {
                            path: 'users', 
                            element: <UserList />,
                            children: [
                                { path: "", element: <Navigate to="list" replace /> },
                                {path: 'list', element: <UserList />},
                            ]
                        },
                    ]
                }
            ]
            
        },
        { path: "/", element: <Navigate to="/admin/dashboard" replace /> }, // Redirect / → /admin/dashboard
    ])
}