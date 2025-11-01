export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface Settings {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
}