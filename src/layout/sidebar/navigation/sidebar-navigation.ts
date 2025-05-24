import { AlignLeftOutlined, AppstoreAddOutlined, DashboardOutlined, InfoCircleOutlined, MenuOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
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
        icon: React.createElement(TableOutlined),
        label: 'Tables',
        url: PATHS.tables.list,
    },
    {
        key: '4',
        icon: React.createElement(AppstoreAddOutlined),
        label: 'Table Categories',
        url: PATHS.table_categories.list,
    },
    {
        key: '5',
        icon: React.createElement(MenuOutlined),
        label: 'Menus',
        url: PATHS.menus.list
    },
    {
        key: '6',
        icon: React.createElement(AlignLeftOutlined),
        label: 'Menu Categories',
        url: PATHS.menu_categories.list
    },
    {
        key: '7',
        icon: React.createElement(InfoCircleOutlined),
        label: 'Menu Items',
        url: PATHS.menu_items.list
    }
]