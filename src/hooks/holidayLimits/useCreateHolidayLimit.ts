import { useMutation, useQueryClient } from "react-query";
import { holidayLimitService } from "../../api/services/holidayLimitService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateHolidayLimit = () => {
    const clientQuery = useQueryClient();

    return useMutation({
        mutationFn: holidayLimitService.create,
        onSuccess: () => {
            successToast("Dodanie limit urlopowy");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => clientQuery.invalidateQueries({ queryKey: ["holidayLimits"], exact: true, refetchActive: true })
    })
}


export default useCreateHolidayLimit;