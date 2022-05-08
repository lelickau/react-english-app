import { createClassNamesProgressBarData } from "helpers/createClassNamesProgressBarData"
import { updateClassProgressBar } from "helpers/updateClassProgressBar"
import { useEffect, useState } from "react"


export const useProgressBar = (numOfQuestions: number) => {
    const [pointBar, setPointBar] = useState<string[]>([])

    useEffect(() => {
        createProgressBar()
    }, [numOfQuestions])

    const createProgressBar = () => {
        const barData: string[] = createClassNamesProgressBarData(numOfQuestions)
        setPointBar(barData)
    }

    const checkAnswer = (correct: boolean, slide: number) => {
        const classAnswer = pointBar[slide]
        let updateClass;
        if (correct) {
            updateClass = updateClassProgressBar(
                `${classAnswer} progress--correct`,
                slide,
                pointBar
            )
        } else {
            updateClass = updateClassProgressBar(
                `${classAnswer} progress--error`,
                slide,
                pointBar
            )
        }
        setPointBar(updateClass)
    }

    return {
        createProgressBar,
        pointBar,
        checkAnswer,
    }
}