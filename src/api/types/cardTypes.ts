export type CardDto = {
    number: string;
    assignmentDate: string;
    active: boolean;
}

export type CardsResponse = {
    cards: CardDto[];
}

export type CreateCardRequest = {
    number: string;
    userId: number;
    active: boolean;
}