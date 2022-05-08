import React, { FC, MouseEvent, useState } from 'react'
import { IQuizData } from 'models/IWordsData'
import QuizBtn from 'components/quizBtn/QuizBtn'
import QuestionIco from 'components/UI/questionIco/QuestionIco'
import AudioIco from 'components/UI/audioIco/AudioIco'

import './quiz.scss'

interface QuizProps {
    question: IQuizData;
    increasePoints: (point: number) => any;
    nextQuestion: () => any;
    checkAnswer: (correct: boolean) => any;
    setProgressWord: (pointProgress: number, question: IQuizData) => any;
}

const Quiz: FC<QuizProps> = ({question, increasePoints, nextQuestion, checkAnswer, setProgressWord}) => {

    const [openTip, setOpenTip] = useState(false)

    const giveAnswer = (answer: string) => {
        if (question.translate === answer) {
            increasePoints(100)
            checkAnswer(true)
            setProgressWord(1, question)
        } else{
            checkAnswer(false)
            setProgressWord(-1, question)
        }
        nextQuestion()
    }

    const playAudio = (e: MouseEvent<HTMLDivElement>) => {
        console.log(question.mp3)
        const audio = new Audio()
        audio.src = `${question.mp3}`
        audio.autoplay = true
    }

    const clickOpenTip = () => {
        setOpenTip(true)
    }

    return (
        <article className="quiz">
            <div className="quiz__header-wrap">
                <div className="quiz__header">
                    <div className="quiz__tips" onClick={clickOpenTip}>
                        <QuestionIco/>
                    </div>
                    <div className="quiz__word">{question.id}</div>
                    <div className="quiz__audio" onClick={playAudio}>
                        {
                            question.mp3
                            ? <AudioIco/>
                            : ""
                        }
                    </div>
                </div>
            </div>
            <div className="quiz__answers">
                {
                    question.answers.map((btn, idx) => <QuizBtn key={btn+idx} title={btn} giveAnswer={giveAnswer}/>)
                }
            </div>
            <div className={`quiz__tips-text ${openTip ? 'quiz__tips--active' : ''}`}>{question.definitions}</div>
        </article>
    )
}

export default Quiz