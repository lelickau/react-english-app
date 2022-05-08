import { getRandomInt } from "./getRandomInt"

/**
 *
 * @param numOfQuestionInTest количество вопросов в тесте
 * @param lengthData всего в массиве слов
 * @returns
 */
export const cteateIndexData = (numOfQuestionInTest: number, lengthData: number) => {
    const randomIdx:number[] = []
    for (let i = 0; i < numOfQuestionInTest; i++) {
        let int = getRandomInt(0, lengthData -1)
        if (randomIdx.includes(int)) {
            int = getRandomInt(0, lengthData -1)
        }
        randomIdx.push(int)
    }
    return randomIdx
}