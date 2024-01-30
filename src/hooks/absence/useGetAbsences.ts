import { useQuery, useQueryClient } from "react-query"
import absenceService from "../../api/services/absenceService";

const useGetAbsences = (userId?: number) => {
    return useQuery({
        queryKey: ["absences"],
        queryFn: async () => (await absenceService.getAll(userId)).data.absences,
        retry: false,
        cacheTime: 0
    });
};

export default useGetAbsences;