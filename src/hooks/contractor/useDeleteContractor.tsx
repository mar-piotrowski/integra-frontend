import {useMutation, useQueryClient} from "react-query";
import {contractorService} from "../../api/services/contractorService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useDeleteContractor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: contractorService.delete,
        onSuccess: () => {
            successToast("Usunięto kontrahenta");
        },
        onError: (error: ErrorResponse) => {
            errorToast(error.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["contractors"]})
    })
}

export default useDeleteContractor;