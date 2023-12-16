import {BankDetails} from "../../constants/models";
import {Location} from "./locationTypes";

export type UserId = {
    userId: number
};

export type CreateUser = {
    firstname: string;
    lastname: string;
    secondName: string;
    mothername: string;
    fathername: string;
    motherLastname: string;
    fatherLastname: string;
    dateOfBirth: string;
    placeOfBirth: string;
    pesel: string;
    jobPositionId: number;
    sex: string;
    email: string;
    identityNumber: string;
    phone: string;
    citizenship: string;
    nip: string;
    isStudent: boolean;
    locations: Location[];
    bankDetails: BankDetails;
};

export type UserDto = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    jobPosition?: string;
    locations: Location[];
}