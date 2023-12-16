import {useMutation} from "react-query";
import {contractService} from "../../api/services/contractsService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {AxiosResponse} from "axios";

const useCreateContract = () => useMutation(contractService.create, {
    onSuccess: () => {
        successToast("Dodano pracownika");
    },
    onError: (response: AxiosResponse) => {
        errorToast(response.data.message);
    },
});

export default useCreateContract;
