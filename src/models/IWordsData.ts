export interface IWordsData {
    definitions: string;
    example: string;
    id: string;
    mp3: string;
    partOfSpeech: string;
    thema: string;
    translate: string;
}

export interface IQuizData {
    answers: string[];
    definitions: string;
    example: string;
    id: string;
    mp3: string;
    partOfSpeech: string;
    thema: string;
    translate: string;
}

export interface IConstructorData {
    answer: string[];
    construct: string[];
    id: string;
    translate: string;
    example: string;
    thema: string;
}