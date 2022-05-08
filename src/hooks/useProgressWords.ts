import { IWords } from './../models/IProgressData';
import { useState } from "react"


const setNewWordsProgressData = (wordsProgressData: IWords[], pointProgress: number, question: any) => {
    const newWordsProgressData = wordsProgressData.map(word => {
        let level = word.level + pointProgress
        if (level < 0 ) level = 0
        if (level > 4 ) level = 4

        if (word.id === question.id) {
            return {
                ...word,
                level
            }
        } else {
            return word
        }
    })

    return newWordsProgressData
}


export const useProgressWords = (words: IWords[]) => {
    const [wordsProgressData, setWordsProgressData] = useState<IWords[]>(words)

    const setProgressWord = (pointProgress: number, question: any) => {
        const progressData = {
            id: question.id,
            translate: question.translate,
            thema: question.thema,
            example: question.example
        }

        if (wordsProgressData.length) {
            const idx = wordsProgressData.findIndex(word => word.id === question.id)

            if (idx !== -1) {
                const newWordsProgressData = setNewWordsProgressData(
                    wordsProgressData,
                    pointProgress,
                    question
                )

                setWordsProgressData(newWordsProgressData)

            } else {
                setWordsProgressData([
                    ...wordsProgressData,
                    {...progressData, level: pointProgress < 0 ? 0 : 1}
                ])
            }
        } else {
            setWordsProgressData([
                ...wordsProgressData,
                {...progressData, level: pointProgress < 0 ? 0 : 1}
            ])
        }
    }

    return {
        setProgressWord,
        wordsProgressData,
    }

}