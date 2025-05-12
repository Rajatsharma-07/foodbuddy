export default function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}
const ADMIN_PATH = '/admin';
const PATH = '/';
  
  // ----------------------------------------------------------------------
  
export const PATH_AUTH = {
    adminLogin: '/admin/login',
    login: '/login',
    register: '/retailer/register',
};
  
export const PATH_ADMIN = {
    root: ADMIN_PATH,
    dashboard: path(ADMIN_PATH, '/dashboard'),
    users: {
        list: path(ADMIN_PATH, '/users'),
        new: path(ADMIN_PATH, '/users/new'),
        detail: (id: number) => path(ADMIN_PATH, `/users/${id}`),
        edit: (id: number) => path(ADMIN_PATH, `/users/${id}/edit`),
    },
    restaurants: {
        list: path(ADMIN_PATH, '/restaurants'),
        new: path(ADMIN_PATH, `/restaurants/new`),
        detail: (id: number) => path(ADMIN_PATH, `/restaurants/${id}`),
        edit: (id: number) => path(ADMIN_PATH, `/restaurants/${id}/edit`),
    },
}

export const PATHS = {
    root: PATH,
    dashboard: path(PATH, 'dashboard'),
    users: {
        list: path(PATH, 'users'),
        new: path(PATH, 'users/new'),
        detail: (id: number) => path(PATH, `users/${id}`),
        edit: (id: number) => path(PATH, `users/${id}/edit`),
    },
    menus: {
        list: path(PATH, 'menus'),
        new: path(PATH, 'menus/new'),
        detail: (id: number) => path(PATH, `menus/${id}`),
        edit: (id: number) => path(PATH, `menus/${id}/edit`),
    },
    menu_categories: {
        list: path(PATH, 'menu_categories'),
        new: path(PATH, 'menu_categories/new'),
        detail: (id: number) => path(PATH, `menu_categories/${id}`),
        edit: (id: number) => path(PATH, `menu_categories/${id}/edit`),
    },
    menu_items: {
        list: path(PATH, 'menu_items'),
        new: path(PATH, 'menu_items/new'),
        detail: (id: number) => path(PATH, `menu_items/${id}`),
        edit: (id: number) => path(PATH, `menu_items/${id}/edit`),
    }
}