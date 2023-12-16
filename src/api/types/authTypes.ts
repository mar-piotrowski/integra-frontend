import {Roles} from "../../constants/roles";

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
    userId: number;
    roles: Roles[],
    modules: Roles[]
}