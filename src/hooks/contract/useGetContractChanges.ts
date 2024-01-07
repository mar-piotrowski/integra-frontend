import { useQuery } from "react-query";
import { contractService } from "../../api/services/contractsService";

const useGetContractChanges = (contractId: number) => useQuery({
    queryKey: ["contractChanges"],
    queryFn: async () => (await contractService.changes(contractId)).data.changes,
    cacheTime: 0
});

export default useGetContractChanges;