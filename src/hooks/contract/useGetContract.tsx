import { useQuery } from "react-query";
import { contractService } from "../../api/services/contractsService";

const useGetContract = (contractId: number) => useQuery({
    queryKey: ["contract"],
    queryFn: async () => (await contractService.get(contractId)).data,
    cacheTime: 0,
    refetchOnWindowFocus: false,
});

export default useGetContract;