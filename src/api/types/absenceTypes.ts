import {AbsenceStatus, AbsenceType} from "../../constants/enums"
import {UserDto} from "./userTypes";

export type CreateAbsence = {
    type: AbsenceType;
    startDate: string;
    endDate: string;
    diseaseCode: string | null;
    series: string | null;
    number: string | null;
    description: string | null;
    userId: number;
}

export type UpdateAbsence = {
    absenceId: number;
    type: AbsenceType;
    startDate: string;
    endDate: string;
    diseaseCode: string | null;
    series: string | null;
    number: string | null;
    description: string | null;
    userId: number;
}

export type AbsenceDto = {
    id: number;
    type: AbsenceType;
    status: AbsenceStatus;
    startDate: string;
    endDate: string;
    diseaseCode: string | null;
    series: string | null;
    number: string | null;
    description: string | null;
    user: UserDto;
}

export type AbsencesResponse = {
    absences: AbsenceDto[];
}