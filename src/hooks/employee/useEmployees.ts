import { useQuery } from "react-query";
import employeeService from "../../api/services/employeeService";
import {UserDto} from "../../api/types/userTypes";
import {ErrorResponse} from "../../api/types/dto";

export const useEmployees = () => useQuery<UserDto[], ErrorResponse>({
    queryKey: ["employees"],
    queryFn: async () => (await employeeService.getAll()).data.users,
    cacheTime: 0,
});
