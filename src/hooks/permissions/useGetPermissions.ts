import { useQuery } from "react-query";
import permissionService from "../../api/services/permissionService";

const useGetPermissions = () => useQuery(
    "permissions",
    async () => (await permissionService.getAll()).data.permissions,
    { cacheTime: 0 }
);

export default useGetPermissions;