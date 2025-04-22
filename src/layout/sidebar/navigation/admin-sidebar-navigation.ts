import React from "react";
import { UserOutlined, DashboardOutlined, CoffeeOutlined, DollarOutlined,  } from '@ant-design/icons';
import { PATH_ADMIN } from "../../../routes/paths";

export const navigationItems = [
    {
        key: '1',
        icon: React.createElement(DashboardOutlined),
        label: 'Dashboard',
        url: PATH_ADMIN.dashboard
    },
    {
        key: '2',
        icon: React.createElement(CoffeeOutlined),
        label: 'Restaurants',
        url: PATH_ADMIN.restaurants.list
    },
    {
        key: '3',
        icon: React.createElement(UserOutlined),
        label: 'Users',
        url: PATH_ADMIN.users.list
    },
]