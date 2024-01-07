import { useMutation } from "react-query";
import { contractService } from "../../api/services/contractsService";
import { ContractTerminate } from "../../api/types/documentTypes";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useTerminateContract = () => useMutation({
    mutationFn: async (contract: ContractTerminate) => await contractService.terminate(contract),
    onSuccess: () => {
        successToast("Rozwiązano umowę!");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
});

export default useTerminateContract;