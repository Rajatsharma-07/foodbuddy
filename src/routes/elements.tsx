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
export const UserList = Loadable(lazy(() => import('../pages/users')));
export const RestaurantList = Loadable(lazy(() => import('../pages/restaurants')));