import axios from "../axios";
import endpoint from "../endpoint";

const permissionService = {
    getAll: async () => await axios.get(`${endpoint.permissions}`),
    get: async (permissionCode: number) => await axios.get(`${endpoint.permissions}/${permissionCode}`),
};

export default permissionService;