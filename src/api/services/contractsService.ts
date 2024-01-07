import axios from "../axios";
import endpoint from "../endpoint";
import { ContractTerminate, CreateContract } from "../types/documentTypes";

export const contractService = {
    getAll: async (userId?: number) => await axios.get(`/${endpoint.contracts}${createGetAllParams(userId)}`),
    get: async (contractId: number) => await axios.get(`/${endpoint.contracts}/${contractId}`),
    changes: async (contractId: number) => await axios.get(`/${endpoint.contracts}/${contractId}/changes`),
    create: async (createContract: CreateContract) => await axios.post(`/${endpoint.contracts}`, createContract),
    active: async (contractId: number) => await axios.post(`/${endpoint.contracts}/${contractId}/active`),
    reject: async (contractId: number) => await axios.post(`/${endpoint.contracts}/${contractId}/reject`),
    terminate: async (contractTermiante: ContractTerminate) =>
        await axios.post(`/${endpoint.contracts}/${contractTermiante.contractId}/terminate`, contractTermiante),
}

const createGetAllParams = (userId?: number) => {
    let params = "";
    if (userId != null)
        params += `?userId=${userId}`;
    return params;
}
