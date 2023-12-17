import axios from "../axios";
import endpoint from "../endpoint";

const jobPositionService = {
    getAll: async () => await axios.get(`${endpoint.jobPositions}`),
    create: async (jobPosition: JobPositionForm) => await axios.post(`${endpoint.jobPositions}`, jobPosition),
    edit: async (jobPosition: JobPosition) => await axios.put(`${endpoint.jobPositions}/${jobPosition.id}`, jobPosition)
};

export default jobPositionService;
