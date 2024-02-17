import {useMutation, useQueryClient} from "react-query";
import {cardService} from "../../api/services/cardService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useActiveCard = (userId?: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cardService.active,
        onSuccess: () => {
            successToast("Aktywowano kartę");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cards"]);
            queryClient.invalidateQueries([`cards_user_id_${userId}`]);
        }
    });
}

export default useActiveCard;