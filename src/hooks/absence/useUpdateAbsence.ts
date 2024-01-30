import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useUpdateAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["userAbsence"],
        mutationFn: absenceService.update,
        onSuccess(data, variables, context) {
            successToast("Edytowano nieobecność")
        },
        onError(error: ErrorResponse, variables, context) {
            errorToast(error.response.data.message);
        },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["absences"])
        },
    });
};

export default useUpdateAbsence;