import { useMutation, useQueryClient } from "react-query";
import absenceService from "../../api/services/absenceService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useDeleteAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["absences"],
        mutationFn: absenceService.delete,
        onSuccess() {
            successToast("Usunięto nieobecność")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries(["absences"])
    });
};

export default useDeleteAbsence;