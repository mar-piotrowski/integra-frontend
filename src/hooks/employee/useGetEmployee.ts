import {useQuery} from "react-query";
import employeeService from "../../api/services/employeeService";

const useGetEmployee = (employeeId: number) => useQuery("employees", () => employeeService.get(employeeId), {
    cacheTime: 0
});

export default useGetEmployee;