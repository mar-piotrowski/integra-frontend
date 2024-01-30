import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useDeleteAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["absences"],
        mutationFn: absenceService.delete,
        onSuccess(data, variables, context) {
            successToast("Usunięto nieobecność")
        },
        onError(error: ErrorResponse, variables, context) {
            errorToast(error.response.data.message);
        },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["absences"])
        },

    });
};

export default useDeleteAbsence;