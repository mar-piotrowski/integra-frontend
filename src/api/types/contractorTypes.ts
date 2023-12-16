import {BankDetails} from "./bankDetailsTypes";
import {Location} from "./locationTypes";

export type CreateContractorRequest = {
    fullName: string;
    shortName: string;
    representative: string;
    location: Location;
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
    location: Location;
    nip: string;
    phone: string;
    email: string;
    bankDetails: BankDetails;
}
