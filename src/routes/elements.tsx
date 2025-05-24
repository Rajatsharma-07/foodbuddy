import { Spin } from 'antd';
import { ElementType, Suspense, lazy } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={
      <Spin size='large' style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
  }>
    <Component {...props} />
  </Suspense>
);

// --------------------------Admin Auth Routes---------------------------

export const AdminLogin = Loadable(lazy(() => import('../pages/users/auth/AdminLogin')));
export const Login = Loadable(lazy(() => import('../pages/users/auth/Login')));

// ----------------------------------------------------------------------

export const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

// User pages for superuser user
export const AdminUserList = Loadable(lazy(() => import('../pages/users/list/admin-user-list')));
export const AdminAddNewUser = Loadable(lazy(() => import('../pages/users/add/admin-add-new-user')));
export const AdminUserDetail = Loadable(lazy(() => import('../pages/users/detail/admin-user-detail')));
export const AdminUserEdit = Loadable(lazy(() => import('../pages/users/edit/admin-user-edit')));


// Restaurant Pages for superuser user
export const RestaurantList = Loadable(lazy(() => import('../pages/restaurants/list/restaurant-list')));
export const AddNewRestaurant = Loadable(lazy(() => import('../pages/restaurants/add/add-new-restaurant')));
export const RestaurantDetail = Loadable(lazy(() => import('../pages/restaurants/detail/restaurant-detail')));
export const RestaurantEdit = Loadable(lazy(() => import('../pages/restaurants/edit/restaurant-edit')));


//User pages for restaurant user
export const UserList = Loadable(lazy(() => import('../pages/users/list/user-list')));
export const AddNewUser = Loadable(lazy(() => import('../pages/users/add/add-new-user')));
export const UserDetail = Loadable(lazy(() => import('../pages/users/detail/user-detail')));
export const UserEdit = Loadable(lazy(() => import('../pages/users/edit/user-edit')));

// Menu Pages for restaurant user
export const MenuList = Loadable(lazy(() => import('../pages/menus/list/menu-list')));
export const AddNewMenu = Loadable(lazy(() => import('../pages/menus/add/add-new-menu')));
export const MenuDetail = Loadable(lazy(() => import('../pages/menus/detail/menu-detail')));
export const MenuEdit = Loadable(lazy(() => import('../pages/menus/edit/menu-edit')));

// Menu Category Pages for restaurant user
export const MenuCategoryList = Loadable(lazy(() => import('../pages/menu-categories/list/menu-category-list')));
export const AddnewMenuCategory = Loadable(lazy(() => import('../pages/menu-categories/add/add-new-menu-category')));
export const MenuCategoryDetail = Loadable(lazy(() => import('../pages/menu-categories/detail/menu-category-detail')));
export const MenuCategoryEdit = Loadable(lazy(() => import('../pages/menu-categories/edit/menu-category-edit')));

// Menu Items Pages for restaurant user
export const MenuItemsList = Loadable(lazy(() => import('../pages/menu-items/list/menu-item-list')));
export const AddNewMenuItem = Loadable(lazy(() => import('../pages/menu-items/add/add-new-menu-item')));
export const MenuItemDetail = Loadable(lazy(() => import('../pages/menu-items/detail/menu-item-detail')));
export const MenuItemEdit = Loadable(lazy(() => import('../pages/menu-items/edit/menu-item-edit')));

// Table Category Pages for restaurant user
export const TableCategoryList = Loadable(lazy(() => import('../pages/table-categories/list/table-category-list')));
export const AddNewTableCategory = Loadable(lazy(() => import('../pages/table-categories/add/add-new-table-category')));
export const TableCategoryDetail = Loadable(lazy(() => import('../pages/table-categories/detail/table-category-detail')));
export const TableCategoryEdit = Loadable(lazy(() => import('../pages/table-categories/edit/table-category-edit')));

// Table Pages for restaurant user
export const TableList = Loadable(lazy(() => import('../pages/tables/list/table-list')));
export const AddNewTable = Loadable(lazy(() => import('../pages/tables/add/add-new-table')));
export const TableDetail = Loadable(lazy(() => import('../pages/tables/detail/table-detail')));
export const TableEdit = Loadable(lazy(() => import('../pages/tables/edit/table-edit')));

