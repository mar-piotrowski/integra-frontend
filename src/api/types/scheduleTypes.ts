import { Day } from "../../constants/enums";

export type CreateSchedule = {
    name: string;
    startDate: string;
    endDate?: string | null;
    days: ScheduleDay[];
}

export type EditSchedule = {
    id: number;
    name: string;
    startDate: string;
    endDate?: string | null;
    days: ScheduleDay[];
}

export type ScheduleDay = {
    day: Day,
    startDate: string;
    endDate: string;
}

export type ScheduleDto = {
    id: number;
    name: string;
    startDate: string;
    endDate?: string | null;
    totalHours: number;
    days: ScheduleDay[];
}

export type AddUserSchedule = {
    userId: number;
    scheduleSchemaId: number;
}

export type GetUserSchedule = {
    year: number;
    month: number;
}