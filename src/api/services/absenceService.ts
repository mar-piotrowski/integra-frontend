import axios from "../axios";
import endpoint from "../endpoint";
import {AbsenceDto, AbsencesResponse, CreateAbsence, UpdateAbsence} from "../types/absenceTypes";

const absenceService = {
    getAll: async (userId?: number | null) =>
        await axios.get<AbsencesResponse>(`${endpoint.absences}${userId != null ? `?userId=${userId}` : ""}`),
    get: async (absenceId: number) =>
        await axios.get<AbsenceDto>(`${endpoint.absences}/${absenceId}`),
    create: async (absence: CreateAbsence) => await axios.post(`${endpoint.absences}`, absence),
    update: async (absence: UpdateAbsence) => await axios.put(`${endpoint.absences}/${absence.absenceId}`, absence),
    delete: async (absenceId: number) => await axios.delete(`${endpoint.absences}/${absenceId}`),
    accept: async (absenceId: number) => await axios.post(`${endpoint.absences}/${absenceId}/accept`),
    reject: async (absenceId: number) => await axios.post(`${endpoint.absences}/${absenceId}/reject`),
};

export default absenceService;