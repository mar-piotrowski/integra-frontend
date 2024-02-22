import { useMutation, useQueryClient } from "react-query";
import jobPositionService from "../../api/services/jobPositionService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateJobPosition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (jobPosition: JobPositionForm) => await jobPositionService.create(jobPosition),
        onSuccess: (data, variable) => {
            successToast("Dodano stanowisko");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries(["jobPositions"])
    })
}

export default useCreateJobPosition;