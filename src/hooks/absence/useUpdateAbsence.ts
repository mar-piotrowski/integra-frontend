import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useUpdateAbsence = (userId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["userAbsence"],
        mutationFn: absenceService.update,
        onSuccess() {
            successToast("Edytowano nieobecność")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries([`absences_user_id_${userId}`]);
            queryClient.invalidateQueries([`holidayLimits_user_id_${userId}`])
        }
    });
};

export default useUpdateAbsence;