import React, { FC, useState } from 'react'
import LetterBtn from 'components/letterBtn/LetterBtn'
import { IConstructorData } from 'models/IWordsData'

import './constructor.scss'

interface ConstructorProps {
    question: IConstructorData;
    increasePoints: (point: number) => any;
    nextQuestion: () => any;
    checkAnswer: (correct: boolean) => any;
    setProgressWord: (pointsProgress: number, question: IConstructorData) => any;
}

const Constructor: FC<ConstructorProps> = ({question, increasePoints, nextQuestion, checkAnswer, setProgressWord}) => {
    const answer = question.answer
    const [correctWord, setCorrectWord] = useState<string[]>([])
    const [index, setIndex] = useState<number>(0)
    const [correct, setCorrect] = useState(true)

    const addLetter = (letter: string) => {
        if (answer[index] === letter) {
            setCorrectWord([...correctWord, letter])
            setIndex(index + 1)
            increasePoints(25)
            if (answer.join('') === correctWord.join('')+letter) {
                const pointsProgress = correct ? 1 : -1
                checkAnswer(correct)
                setProgressWord(pointsProgress, question)
                nextQuestion()
            }
        } else {
            // error
            increasePoints(-5)
            setCorrect(false)
            return false
        }
        return true
    }

    return (
    <article className="constructor">
        <div className="constructor__header">
            <div className="constructor__console">
                <div className="constructor__word">{question.translate}</div>
            </div>
            <div className="constructor__answar">
                {
                    correctWord.map((letter, idx) =>
                        <div
                            className="constructor__answer-word"
                            key={idx+letter}
                        >{letter}</div>)
                }
            </div>
        </div>
        <div className="constructor__options">
        {
            question.construct.map((letter, idx) => <LetterBtn key={letter+idx} letter={letter} checkAnswer={addLetter} />)
        }
        </div>
    </article>
    )
}

export default Constructor