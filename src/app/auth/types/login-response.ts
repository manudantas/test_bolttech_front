export interface User {
    email: string;
    name: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}