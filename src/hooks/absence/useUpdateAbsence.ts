import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useUpdateAbsence = () => {
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
        onSettled: () => queryClient.invalidateQueries(["absences"])
    });
};

export default useUpdateAbsence;