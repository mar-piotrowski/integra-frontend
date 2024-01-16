import { useMutation, useQueryClient } from "react-query";
import { contractService } from "../../api/services/contractsService";
import { ContractDto, ContractStatusType, ContractTerminate } from "../../api/types/documentTypes";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useTerminateContract = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (contract: ContractTerminate) => await contractService.terminate(contract),
        onSuccess: (data, variable) => {
            successToast("Rozwiązano umowę!");
            queryClient.setQueryData<Partial<ContractDto>[] | undefined>(["contracts"], (data) => {
                return data?.map(contract => {
                    if (contract.id == variable.contractId)
                        contract.status = ContractStatusType.NotActive;
                    return contract;
                })
            });
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries(["contracts"])
    });
}

export default useTerminateContract;