import { useQuery } from "react-query";
import employeeService from "../../api/services/employeeService";

const useGetEmployee = (employeeId: number) => useQuery({
    queryKey: ["employee"],
    queryFn: async () => (await employeeService.get(employeeId)).data,
    cacheTime: 0
});

export default useGetEmployee;