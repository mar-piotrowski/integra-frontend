import {useMutation, useQueryClient} from "react-query";
import workingTimeService from "../../api/services/workingTimeService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useDeleteWorkingTime = (userId?: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: workingTimeService.delete,
        onSuccess: () => {
            successToast("Usunieto czas pracy");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["workingTimes"])
            queryClient.invalidateQueries([`workingTimes_user_id_${userId}`])
        }
    })
};

export default useDeleteWorkingTime;