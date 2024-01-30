import { useMutation, useQueryClient } from "react-query"
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: absenceService.create,
        onSuccess(data, variables, context) {
            successToast("Nieobecność została utworzona")
        },
        onError(error: ErrorResponse, variables, context) {
            errorToast(error.response.data.message);
        },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["absences", "holidayLimits"])
        },
    });
};

export default useCreateAbsence;