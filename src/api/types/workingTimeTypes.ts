import {UserShortDto} from "./userTypes";

export type WorkingTimeDto = {
    id: number;
    startDate: string;
    endDate: string;
    totalSeconds: number;
    status: WorkingTimeTypeStatus;
    user: UserShortDto;
}

export type EditWorkingTimeDto = {
    id: number;
    startDate: string;
    endDate?: string | null;
}

export type WorkingTimesResponse = {
    workingTimes: WorkingTimeDto[];
}

export enum WorkingTimeTypeStatus {
    None = 0,
    Start,
    End
}

export type UserWorkingTimeStatsRequest = {
    userId: number;
    year: number;
    month: number;
}

export type UserWorkingTimeStatResponse = {
    monthWorkingHours: number;
    totalUserWorkedSeconds: number;
    overUserWorkedHours: number;
}