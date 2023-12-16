import {useMutation} from "react-query";
import {contractorService} from "../../api/services/contractorService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";

const useCreateContractor = () => useMutation(contractorService.create, {
    onSuccess: () => {
        successToast("Dodano kontrahenta");
    },
    onError: () => {
        errorToast("Nie udalo sie dodac kontrahenta");
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["contractors"]})
});

export default useCreateContractor;