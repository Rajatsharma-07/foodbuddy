import { AlignLeftOutlined, DashboardOutlined, InfoCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
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
    {
        key: '3',
        icon: React.createElement(MenuOutlined),
        label: 'Menu',
        url: PATHS.menus.list
    },
    {
        key: '4',
        icon: React.createElement(AlignLeftOutlined),
        label: 'Menu Category',
        url: PATHS.menu_categories.list
    },
    {
        key: '5',
        icon: React.createElement(InfoCircleOutlined),
        label: 'Menu Items',
        url: PATHS.menu_items.list
    }
]