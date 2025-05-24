import { Spin } from "antd";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AdminAuthGuard from "../guards/admin-auth-guard";
import AdminGuestGuard from "../guards/admin-guest-guard";
import AuthGuard from "../guards/auth-guard";
import GuestGuard from "../guards/guest-guard";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import AdminLayout from "../layout/AdminLayout";
import ResLayout from "../layout/Layout";
import {
  AddNewMenu,
  AddnewMenuCategory,
  AddNewMenuItem,
  AddNewRestaurant,
  AddNewTable,
  AddNewTableCategory,
  AddNewUser,
  AdminAddNewUser,
  AdminLogin,
  AdminUserDetail,
  AdminUserEdit,
  AdminUserList,
  Dashboard,
  Login,
  MenuCategoryDetail,
  MenuCategoryEdit,
  MenuCategoryList,
  MenuDetail,
  MenuEdit,
  MenuItemDetail,
  MenuItemEdit,
  MenuItemsList,
  MenuList,
  RestaurantDetail,
  RestaurantEdit,
  RestaurantList,
  TableCategoryDetail,
  TableCategoryEdit,
  TableCategoryList,
  TableDetail,
  TableEdit,
  TableList,
  UserDetail,
  UserEdit,
  UserList,
} from "./elements";

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
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <UserList /> },
                { path: "new", element: <AddNewUser /> },
                { path: ":id", element: <UserDetail /> },
                { path: ":id/edit", element: <UserEdit /> },
              ],
            },
            {
              path: "tables",
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <TableList /> },
                { path: "new", element: <AddNewTable /> },
                { path: ":id", element: <TableDetail /> },
                { path: ":id/edit", element: <TableEdit /> },
              ],
            },
            {
              path: "table_categories",
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <TableCategoryList /> },
                { path: "new", element: <AddNewTableCategory /> },
                { path: ":id", element: <TableCategoryDetail /> },
                { path: ":id/edit", element: <TableCategoryEdit /> },
              ],
            },
            {
              path: "menus",
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <MenuList /> },
                { path: "new", element: <AddNewMenu /> },
                { path: ":id", element: <MenuDetail /> },
                { path: ":id/edit", element: <MenuEdit /> },
              ],
            },
            {
              path: "menu_categories",
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <MenuCategoryList /> },
                { path: "new", element: <AddnewMenuCategory /> },
                { path: ":id", element: <MenuCategoryDetail /> },
                { path: ":id/edit", element: <MenuCategoryEdit /> },
              ],
            },
            {
              path: "menu_items",
              children: [
                { path: "", element: <Navigate to="list" replace /> },
                { path: "list", element: <MenuItemsList /> },
                { path: "new", element: <AddNewMenuItem /> },
                { path: ":id", element: <MenuItemDetail /> },
                { path: ":id/edit", element: <MenuItemEdit /> },
              ],
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
                    { path: "new", element: <AdminAddNewUser /> },
                    { path: ":id", element: <AdminUserDetail /> },
                    { path: ":id/edit", element: <AdminUserEdit /> },
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
