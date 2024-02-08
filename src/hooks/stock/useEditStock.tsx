import {useMutation, useQueryClient} from "react-query";
import stockService from "../../api/services/stockService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useEditStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: stockService.edit,
        onSuccess: () => {
            successToast("Edytowano magazyn");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["stocks"]})
    })
};

export default useEditStock;
