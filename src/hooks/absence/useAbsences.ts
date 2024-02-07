import {useQuery} from "react-query"
import absenceService from "../../api/services/absenceService";
import {AbsenceDto} from "../../api/types/absenceTypes";

const useAbsences = (userId?: number) => useQuery<AbsenceDto[]>({
    queryKey: ["absences"],
    queryFn: async () => (await absenceService.getAll(userId)).data.absences,
    retry: false,
    cacheTime: 0
});

export default useAbsences;