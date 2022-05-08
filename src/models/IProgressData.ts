export interface IWords {
    example: string;
    id: string;
    level: number;
    translate: string;
    thema: string;
}

export interface IProgressData {
    id?: string;
    points: number;
    userId: string;
    words: IWords[]
}