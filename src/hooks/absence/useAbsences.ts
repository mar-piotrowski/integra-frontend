import {useQuery} from "react-query"
import absenceService from "../../api/services/absenceService";
import {AbsenceDto} from "../../api/types/absenceTypes";

const useAbsences = (userId?: number) => useQuery<AbsenceDto[]>({
    queryKey: [(userId != null ? `absences_user_id_${userId}` : "absences")],
    queryFn: async () => (await absenceService.getAll(userId)).data.absences,
    refetchOnWindowFocus: false
});

export default useAbsences;