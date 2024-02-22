import { useMutation, useQueryClient } from "react-query"
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: absenceService.create,
        onSuccess() {
            successToast("Nieobecność została utworzona")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries([`absences_user_id_${variables.userId}`]);
            queryClient.invalidateQueries([`holidayLimits_user_id_${variables.userId}`])
        }
    });
};

export default useCreateAbsence;