import { cteateIndexData } from "../../helpers/createRandomIdxData"
import { getRandomInt } from "../../helpers/getRandomInt"
import { IQuizData } from "../../models/IWordsData"
import foods from 'data/foods-a1.json'
import adjectives from 'data/adjectives-a1.json'

export const createTestQuiz = () => {
    const dataWords: any[] = [...foods, ...adjectives]
    let testWords: IQuizData[] = []
    const lengthData = dataWords.length

    const randomWordsIdx = cteateIndexData(10, lengthData)

    randomWordsIdx.map(idx => testWords.push(dataWords[idx]))

    const getAllAnswersForWord = (thema: string, correctTranslate: string) => {
        const dataAnswers: string[] = []
        dataWords.filter((wordItem: IQuizData) => {
            if (wordItem.thema === thema && correctTranslate !== wordItem.translate) {
                dataAnswers.push(wordItem.translate)
            }
        })
        return dataAnswers
    }

    const getThreeNotCorrectAnswers = (answersData: string[]) => {
        const notCorrectAnswers: string[] = []
        for (let j = 0; j < 3; j++) {
            let randomNum = getRandomInt(0, answersData.length - 1)
            while (notCorrectAnswers.includes(answersData[randomNum])) {
                randomNum = getRandomInt(0, answersData.length - 1)
            }
            notCorrectAnswers.push(answersData[randomNum])
        }
        return notCorrectAnswers
    }

    return testWords.map(wordItem => {
        const answersData = getAllAnswersForWord(wordItem.thema, wordItem.translate)
        const correctAnswer = wordItem.translate
        const notCorrectAnswers: string[] = getThreeNotCorrectAnswers(answersData)

        return {...wordItem, answers: [correctAnswer, ...notCorrectAnswers].sort()}
    })
}