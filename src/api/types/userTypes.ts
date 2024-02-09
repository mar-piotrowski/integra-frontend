import { BankDetails } from "../../constants/models";
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
    createAccount: boolean;
    locations: LocationDto[];
    bankDetails: BankDetails;
};

export type UserDto = {
    id: number;
    firstname: string;
    lastname: string;
    secondName: string;
    email: string;
    phone: string;
    identityNumber: string;
    jobPosition?: string;
    locations: LocationDto[];
    permissions: Permission[];
}

export type UsersResponse = {
    users: UserDto[]
};