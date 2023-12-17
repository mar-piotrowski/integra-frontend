import { useMutation } from "react-query";
import jobPositionService from "../../api/services/jobPositionService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useEditJobPosition = () => useMutation({
    mutationFn: async (jobPosition: JobPosition) => await jobPositionService.edit(jobPosition),
    onSuccess: () => {
        successToast("Zmodyfikowano stanowisko")
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    }
})

export default useEditJobPosition;