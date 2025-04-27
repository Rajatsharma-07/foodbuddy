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

export const AdminLogin = Loadable(lazy(() => import('../pages/users/auth/Login')));

// ----------------------------------------------------------------------

export const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

export const UserList = Loadable(lazy(() => import('../pages/users/list/user-list')));
export const AddNewUser = Loadable(lazy(() => import('../pages/users/add/add-new-user')));
export const UserDetail = Loadable(lazy(() => import('../pages/users/detail/user-detail')));
export const UserEdit = Loadable(lazy(() => import('../pages/users/edit/user-edit')));


export const RestaurantList = Loadable(lazy(() => import('../pages/restaurants/list/restaurant-list')));
export const AddNewRestaurant = Loadable(lazy(() => import('../pages/restaurants/add/add-new-restaurant')));
export const RestaurantDetail = Loadable(lazy(() => import('../pages/restaurants/detail/restaurant-detail')));
export const RestaurantEdit = Loadable(lazy(() => import('../pages/restaurants/edit/restaurant-edit')));