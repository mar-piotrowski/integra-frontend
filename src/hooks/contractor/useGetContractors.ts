import {useQuery} from "react-query";
import {contractorService} from "../../api/services/contractorService";
import {ContractorDto} from "../../api/types/contractorTypes";
import {ErrorResponse} from "../../api/types/dto";

const useGetContractors = () => useQuery<ContractorDto[], ErrorResponse>({
    queryKey: ["contractors"],
    queryFn: async () => (await contractorService.getAll()).data.contractors
});

export default useGetContractors;