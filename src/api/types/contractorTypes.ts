import { BankDetails as BankAccount } from "./bankDetailsTypes";
import { LocationDto as LocationDto } from "./locationTypes";

export type CreateContractorRequest = {
    fullName: string;
    shortName: string;
    representative: string;
    location: LocationDto;
    nip: string;
    phone: string;
    email: string;
    bankAccount: BankAccount;
}

export type ContractorDto = {
    id: number;
    fullName: string;
    shortName: string;
    representative: string;
    location: LocationDto;
    nip: string;
    phone: string;
    email: string;
    bankAccount: BankAccount;
}