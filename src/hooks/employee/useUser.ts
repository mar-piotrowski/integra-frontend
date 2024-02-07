import { useQuery } from "react-query";
import employeeService from "../../api/services/employeeService";
import {UserDto} from "../../api/types/userTypes";

const useUser = (employeeId: number) => useQuery<UserDto>({
    queryKey: [`employee_id_${employeeId}`],
    queryFn: async () => (await employeeService.get(employeeId)).data,
    refetchOnWindowFocus: false
});

export default useUser;