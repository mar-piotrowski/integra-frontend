import { ContractTerminateType } from "../../constants/enums";
import { BankDetails } from "./bankDetailsTypes";
import { LocationDto as LocationDto } from "./locationTypes";

export type CreateContractorRequest = {
    fullName: string;
    shortName: string;
    representative: string;
    location: LocationDto;
    nip: string;
    phone: string;
    email: string;
    bankDetails: BankDetails;
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
    bankDetails: BankDetails;
}

export type ContractTerminate = {
    contractId: number;
    terminateType: ContractTerminateType;
    date: Date;
}