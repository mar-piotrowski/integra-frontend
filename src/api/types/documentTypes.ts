import { ContractType } from "../../constants/enums";
import { UserDto, UserId } from "./userTypes";

export enum ContractStatusType {
    None = 0,
    Active = 1,
    Pending = 2,
    NotActive = 3
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
    signedOnDate?: string | null;
    startDate: string;
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
    jobPositionId: number;
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