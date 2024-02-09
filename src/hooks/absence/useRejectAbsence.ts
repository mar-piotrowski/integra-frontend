import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useRejectAbsence = () => {
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
        onSettled: () => queryClient.invalidateQueries(["absences"])
    });
};

export default useRejectAbsence;