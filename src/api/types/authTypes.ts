export type Login = {
    email: string;
    password: string;
};

export type Register = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type DecodedToken = {
    permissions: number[];
    userId: number;
}

export type ChangePasswordRequest = {
    userId: number;
    currentPassword: string;
    newPassword: string;
}