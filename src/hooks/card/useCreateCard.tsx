import {useMutation, useQueryClient} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";
import {cardService} from "../../api/services/cardService";

const useCreateCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cardService.create,
        onSuccess: () => {
            successToast("Dodano kartę");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries(["cards"]);
            queryClient.invalidateQueries([`cards_user_id_${variables.userId}`]);
        }
    });
};

export default useCreateCard;