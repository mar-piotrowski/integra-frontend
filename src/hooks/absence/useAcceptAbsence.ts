import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useAcceptAbsence = (userId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: absenceService.accept,
        onSuccess() {
            successToast("Zaakceptowano nieobecność")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["absences"])
            queryClient.invalidateQueries(["holidayLimits"])
            queryClient.invalidateQueries([`absences_user_id_${userId}`]);
        }
    });
};

export default useAcceptAbsence;