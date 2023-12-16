import {UserId} from "./userTypes";

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
    salary: number;
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
    insuranceCodeId: number;
    userId: number;
    jobPositionId: number;
    deductibleCostId: number
}

export type CreateContract = Contract;

export type ContractDto = Contract & Id;

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