import { cteateIndexData } from "helpers/createRandomIdxData"
import foods from 'data/foods-a1.json'
import adjectives from 'data/adjectives-a1.json'

export const createConstructorTest = () => {
    const wordsData: any[] = [...foods, ...adjectives]
    const dataTest:any[] = []
    const randomIdx: number[] = cteateIndexData(10, wordsData.length)

    randomIdx.forEach(idx => {
        const construct = [...wordsData[idx].id].sort()
        const data = {
            id: wordsData[idx].id,
            example: wordsData[idx].example,
            thema: wordsData[idx].thema,
            answer: [...wordsData[idx].id],
            translate: wordsData[idx].translate,
            construct
        }

        return dataTest.push(data)
    })

    return dataTest
}