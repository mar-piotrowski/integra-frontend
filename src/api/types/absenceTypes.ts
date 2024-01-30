import { AbsenceType } from "../../constants/enums"

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