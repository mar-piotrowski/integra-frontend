import {useQuery} from "react-query";
import {contractService} from "../../api/services/contractsService";

const useGetContracts = (userId?: number) => useQuery(
    "contracts",
    () => contractService.getAll(userId),
    {
        cacheTime: 0
    }
);

export default useGetContracts;
