import { useMutation } from "react-query";
import jobPositionService from "../../api/services/jobPositionService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateJobPosition = () => useMutation({
    mutationFn: async (jobPosition: JobPositionForm) => await jobPositionService.create(jobPosition),
    onSuccess: () => {
        successToast("Dodano stanowisko")
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    }
})

export default useCreateJobPosition;