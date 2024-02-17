import { BankAccount } from "../../constants/models";
import { LocationDto } from "./locationTypes";
import { Permission } from "./permissionTypes";

export type UserId = {
    userId: number
};

export type CreateUserRequest = {
    id: number;
    firstname: string;
    lastname: string;
    secondName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    pesel: string;
    sex: number;
    email: string;
    identityNumber: string;
    phone: string;
    citizenship: string;
    nip: string;
    isStudent: boolean;
    employeeAnyWherePassword: string;
    locations: LocationDto[];
    bankAccount: BankAccount;
};

export type UserShortDto = {
    id: number;
    firstname: string;
    lastname: string;
}

export type UserDto = {
    id: number;
    firstname: string;
    lastname: string;
    secondName: string;
    email: string;
    phone: string;
    identityNumber: string;
    nip?: string;
    citizenship?: string;
    jobPosition?: string;
    locations: LocationDto[];
    permissions: Permission[];
}

export type UsersResponse = {
    users: UserDto[]
};