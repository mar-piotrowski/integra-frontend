import {useQuery} from "react-query";
import employeeService from "../../api/services/employeeService";
import {UserDto} from "../../api/types/userTypes";
import {ErrorResponse} from "../../api/types/dto";

export const useUsers = () => useQuery<UserDto[], ErrorResponse>({
    queryKey: ["users"],
    queryFn: async () => (await employeeService.getAll()).data.users,
    refetchOnWindowFocus: false
});
