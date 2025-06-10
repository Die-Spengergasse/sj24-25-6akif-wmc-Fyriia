
export type Answer = {
    guid: string;
    text: string;
};

export type Question = {
    guid: string;
    number: number;
    text: string;
    points: number;
    imageUrl: string | null;
    moduleGuid: string;
    topicGuid: string;
    answers: Answer[];
};
