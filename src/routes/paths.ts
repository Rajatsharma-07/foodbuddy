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
    }
}