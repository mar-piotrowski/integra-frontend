import axios from "../axios";
import endpoint from "../endpoint";
import {CreateContract} from "../types/documentTypes";

export const contractService = {
    getAll: async (userId?: number) => await axios.get(`/${endpoint.contracts}${createGetAllParams(userId)}`),
    get: async (contractId: number) => await axios.get(`/${endpoint.contracts}/${contractId}`),
    create: async (createContract: CreateContract) => await axios.post(`/${endpoint.contracts}`, createContract),
    // update: async (updateJobHistory: UpdateJobHistory) =>
    //     await axios.put(`/${endpoint.contracts}/${updateJobHistory.contractId}`, updateJobHistory.jobHistory),
    delete: async (contractId: number) => await axios.delete(`/${endpoint.contracts}/${contractId}`),
}

const createGetAllParams = (userId?: number) => {
    let params = "";
    if (userId != null)
        params += `?userId=${userId}`;
    return params;
}
