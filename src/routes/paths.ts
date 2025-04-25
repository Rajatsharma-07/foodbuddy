export default function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}
const ADMIN_PATH = '/admin';
  
  // ----------------------------------------------------------------------
  
export const PATH_AUTH = {
    adminLogin: '/admin/login',
    login: '/retailer/login',
    register: '/retailer/register',
    loginWithOtp: '/retailer/login-with-otp',
    adminLoginWithOtp: '/admin/login-with-otp',
    adminForgotPassword: '/admin/forgot-password',
    adminAddForgotPassword: (token: string) => `/admin/forgotpassword/${token}`,
    adminVerifyOtpLoginCode: (phone_number: string) => `/admin/verify-code/${phone_number}`
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
    },
}