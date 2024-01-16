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
            queryClient.setQueryData<Partial<JobPosition>[] | undefined>(["jobPositions"], (data) => {
                if (data != undefined)
                    return [...data, { title: variable.title }]
            });
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries(["jobPosition"])
    })
}

export default useCreateJobPosition;