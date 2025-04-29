import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import React from "react";
import { PATHS } from "../../../routes/paths";

export const navigationItems = [
    {
        key: '1',
        icon: React.createElement(DashboardOutlined),
        label: 'Dashboard',
        url: PATHS.dashboard
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: 'Users',
        url: PATHS.users.list
    },
]