import {ContractType} from "../../constants/enums";
import { UserDto, UserId } from "./userTypes";
import { MutationRequest } from "./apiTypes";
import {Contractor, PaymentMethod} from "../../constants/models";
import {ContractorDto} from "./contractorTypes";

export enum ContractStatusType {
    None = 0,
    Active = 1,
    Pending = 2,
    NotActive = 3
}

export enum DocumentType {
    Unknown,
    Invoice,
    Wz,
    Pz,
    Rw,
    Pw,
}

export type Id = {
    id: number;
}

export type SchoolHistory = {
    schoolName: string;
    degree: number;
    specialization: string;
    title: string;
    startDate: string;
    endDate: string;
};

export type UpdateSchoolHistory = {
    schoolHistoryId: number;
    schoolHistory: SchoolHistory
}

export type CreateSchoolHistory = SchoolHistory & UserId;

export type JobHistory = {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
};

export type UpdateJobHistory = {
    jobHistoryId: number;
    jobHistory: JobHistory;
}

export type CreateJobHistory = JobHistory & UserId;

export type JobHistoryDto = JobHistory & Id;

export type SchoolHistoryDto = SchoolHistory & Id;

export type Contract = {
    salaryWithTax: number;
    salaryWithoutTax: number;
    workingHours1: number;
    workingHours2: number;
    signedOnDate: string | null;
    startDate?: string;
    endDate?: string | null;
    jobFound: boolean;
    fgsp: boolean;
    pitExemption: boolean;
    taxRelief: boolean;
    contractType: number;
    voluntaryContribution: boolean;
    pensionFund: boolean;
    profitableFund: boolean;
    insuranceCodeId: number;
    userId: number;
    jobPosition: string;
    deductibleCostId: number;
}

export type ContractDto = {
    id: number;
    salaryWithTax: number;
    salaryWithoutTax: number;
    workingHours1: number;
    workingHours2: number;
    signedOnDate?: string | null;
    startDate: string;
    endDate?: string | null;
    jobFund: boolean;
    fgsp: boolean;
    pitExemption: boolean;
    taxRelief: boolean;
    contractType: number;
    voluntaryContribution: boolean;
    pensionFund: boolean;
    profitableFund: boolean;
    insuranceCodeId: number;
    user: UserDto;
    jobPositionName: string;
    deductibleCost: number;
    status: ContractStatusType;
}

export type CreateContract = Contract;

export type HolidayLimit = {
    id: number;
    current: string;
    startDate: string;
    endDate: string;
    availableDays: number;
    usedDays: number;
    mergedDays?: number;
    description?: number;
}

export type CreateHolidayLimit = {
    userId: number;
    current: string;
    startDate: string;
    endDate: string;
    description: string;
}

export type ContractTerminate = {
    contractId: number;
    terminateType: ContractType;
    terminateDate: Date;
}

export type ContractChange = Omit<Contract, "startDate" | "endDate">

export type CreateContractChangeRequest = { contractId: number } & MutationRequest<ContractChange>;

export interface DocumentDetails {
    type: DocumentType;
    number: string;
    issueDate: string;
    admissionDate?: string;
    receptionDate?: string;
    paymentDate?: string;
    paymentMethod: PaymentMethod;
    contractor?: ContractorDto | null;
    discount: number;
    totalAmountWithTax: number;
    totalAmountWithoutTax: number;
    paid: boolean;
    locked: boolean;
    articles: DocumentArticleDto[];
    sourceStockId: number;
    targetStockId: number;
}

export interface CreateDocumentRequest {
    type: DocumentType;
    number: string;
    issueDate: string;
    receptionDate: string;
    paymentDate: string;
    contractorId: number;
    discount: number;
    totalAmountWithTax: number;
    totalAmountWithoutTax: number;
    paid: boolean;
    articles: CreateDocumentArticleDto[];
}

export interface CreateDocumentArticleDto {
    articleId: number;
    amount: number;
}

export interface DocumentArticleDto {
    id: number;
    name: string;
    code?: string;
    gtin?: string;
    measureUnit: string;
    amount: number;
    sellPriceWithTax: number;
    sellPriceWithoutTax: number;
    pkwiu: string;
    tax: number
    description?: string;
}
