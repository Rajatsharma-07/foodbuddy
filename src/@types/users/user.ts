export type LoginApiBodyPayload = {
    email: string;
    password: string;
    remember: boolean;
    admin: boolean;
}