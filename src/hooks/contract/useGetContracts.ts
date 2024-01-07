import { useQuery } from "react-query";
import { contractService } from "../../api/services/contractsService";

const useGetContracts = (userId?: number) => useQuery({
    queryKey: ["contracts"],
    queryFn: async () => (await contractService.getAll(userId)).data.contracts,
    cacheTime: 0
});

export default useGetContracts;
