import {useMutation, useQueryClient} from "react-query";
import stockService from "../../api/services/stockService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useCreateStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: stockService.delete,
        onSuccess: () => {
            successToast("Usunięto magazyn");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["stocks"]})
    })
};

export default useCreateStock;
