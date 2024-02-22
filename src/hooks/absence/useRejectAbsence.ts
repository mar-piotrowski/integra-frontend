import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useRejectAbsence = (userId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["absences"],
        mutationFn: absenceService.reject,
        onSuccess() {
            successToast("Odrzucono nieobecność");
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["absences"])
            queryClient.invalidateQueries([`absences_user_id_${userId}`]);
            queryClient.invalidateQueries([`holidayLimits_user_id_${userId}`])
        }
    });
};

export default useRejectAbsence;