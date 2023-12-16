import {useQuery} from "react-query";
import {contractorService} from "../../api/services/contractorService";

const useGetContractors = () => useQuery("contractors", async () => await contractorService.getAll());

export default useGetContractors;