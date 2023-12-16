import {useMutation} from "react-query";
import {holidayLimitService} from "../../api/services/holidayLimitService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import { ErrorResponse } from "../../api/types/dto";

const useCreateHolidayLimit = () => useMutation(holidayLimitService.create, {
    onSuccess: () => {
        successToast("Dodanie limit urlopowy");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["holidayLimits"]})
});

export default useCreateHolidayLimit;