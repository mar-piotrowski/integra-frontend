import {useMutation, useQueryClient} from "react-query";
import stockService from "../../api/services/stockService";
import {errorToast, successToast} from "../../utils/toastUtil";

const useCreateStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: stockService.create,
        onSuccess: () => {
            successToast("Dodano magazyn");
        },
        onError: () => {
            errorToast("Nie udało się dodać magazynu!");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["stocks"]})
    })
};

export default useCreateStock;