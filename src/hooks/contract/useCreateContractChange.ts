import { useMutation, useQueryClient } from "react-query"
import { contractService } from "../../api/services/contractsService";
import { successToast } from "../../utils/toastUtil";

const useCreateContractChange = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: contractService.createChange,
        onSuccess: (data, variables) => {
            successToast("Dodano aneks");
        },
        onError: () => {

        },
        onSettled() {
        },
    })
};

export default useCreateContractChange;