export const updateClassProgressBar = (classAnswer: string, idxQuestion: number, pointsArray: string[]) => {
    return [...pointsArray.slice(0, idxQuestion), classAnswer, ...pointsArray.slice(idxQuestion + 1)]
}