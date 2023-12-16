import {useMutation} from "react-query";
import {contractorService} from "../../api/services/contractorService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";

const useUpdateContractor = () => useMutation(contractorService.update, {
    onSuccess: () => {
        successToast("Edytowano kontrahenta");
    },
    onError: () => {
        errorToast("Nie udalo sie edytowac kontrahenta");
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["contractors"]})
});

export default useUpdateContractor;