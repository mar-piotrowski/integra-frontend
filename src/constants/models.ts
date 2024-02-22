import { UserDto } from "../api/types/userTypes";
import { AbsenceStatus, AbsenceType } from "./enums";

export interface UserAbsence {
    id: number;
    user: UserDto;
    type: AbsenceType,
    startDate: string;
    endDate: string;
    diseaseCode: string | null;
    series: string | null;
    number: string | null;
    description: string | null;
    status: AbsenceStatus;
}

export interface BankAccount {
    name: string;
    number: string;
}

export enum ContractorType {
    RECEIVER,
    RECIPIENT,
}

export interface Contractor {
    id: number;
    fullName: string;
    shortName: string;
    location: Location;
    nip: string;
    phone: string;
    email: string;
    type: ContractorType,
    bankDetails: BankAccount;
}

export enum InvoiceType {
    Sell,
}

export enum PaymentMethod {
    Unknown,
    Cash,
    CreditCard,
    OnlineBanking,
}

export interface Invoice {
    number: string;
    invoiceType: InvoiceType;
    issueDate: Date
    sellDate: Date;
    discount: number;
    paymentType: PaymentMethod;
    paymentDate: Date;
    contractor: Contractor;
    stockId: number;
    bankDetails: BankAccount;
    paid: boolean;
}