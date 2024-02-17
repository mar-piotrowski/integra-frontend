
import {cardService} from "../../api/services/cardService";
import {useQuery} from "react-query";
import {CardDto} from "../../api/types/cardTypes";

const useCards = (userId?: number) => {
    return useQuery<CardDto[]>({
        queryKey: [`${userId != null ? `cards_user_id_${userId}` : "cards"}`],
        queryFn: async () => (await cardService.getAll(userId)).data.cards,
        refetchOnWindowFocus: false,
        retry: false
    });
};

export default useCards;