import { useMutation } from "react-query";
import { contractService } from "../../api/services/contractsService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useCancelContract = () => useMutation({
    mutationFn: async (contractId: number) => await contractService.reject(contractId),
    onSuccess: () => {
        successToast("Rozwiązano umowę!");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
});

export default useCancelContract;
