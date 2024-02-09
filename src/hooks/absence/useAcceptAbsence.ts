import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useAcceptAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["absences"],
        mutationFn: absenceService.accept,
        onSuccess() {
            successToast("Zaakceptowano nieobecność")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries(["absences"])
    });
};

export default useAcceptAbsence;