import axios from "../axios";
import endpoint from "../endpoint";
import {CreateContractorRequest} from "../types/contractorTypes";

export type UpdateContractorVariables = {
    contractorId: number;
    contractor: CreateContractorRequest;
}

export const contractorService = {
    getAll: async () => await axios.get(endpoint.contractors),
    get: async (contractorId: number) => await axios.get(`/${endpoint.contractors}/${contractorId}`),
    create: async (contractor: CreateContractorRequest) => await axios.post(endpoint.contractors, contractor),
    update: async (updateVariables: UpdateContractorVariables) =>
        await axios.put(`/${endpoint.contractors}/${updateVariables.contractorId}`, updateVariables.contractor),
    remove: async (contractorId: number) => await axios.delete(`/${endpoint.contractors}/${contractorId}`)
};