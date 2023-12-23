import { useQuery } from "react-query";
import employeeService from "../../api/services/employeeService";

export const useGetEmployees = () => useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await employeeService.getAll()).data.users,
    cacheTime: 0,
});
