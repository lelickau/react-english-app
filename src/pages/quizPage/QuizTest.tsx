import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { finishTest, updateProgress } from 'store/slices/userSlice'
import { deleteTestData } from 'store/slices/gameSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { useCloseGame } from 'hooks/closeGame'
import { useProgressBar } from 'hooks/useProgressBar'
import { useProgressWords } from 'hooks/useProgressWords'
import { IQuizData } from 'models/IWordsData'
import GameFooter from 'components/gameFooter/GameFooter'
import GameHeader from 'components/gameHeader/GameHeader'
import Quiz from 'components/quiz/Quiz'
import FinishTest from 'components/finishTest/FinishTest'

const QuizTest: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { quizTestData } = useAppSelector(state => state.game)
    const { words, points } = useAppSelector(state => state.user)

    const progressBar = useProgressBar(quizTestData.length)

    //progress words
    const wordsProgress = useProgressWords(words)
    const setProgressWord = (pointProgress: number, question: IQuizData) => {
        wordsProgress.setProgressWord(pointProgress, question)
    }

    // check answer
    const checkAnswer = (correct: boolean) => {
        progressBar.checkAnswer(correct, slide)
    }

    // points
    const [pointsTest, setPointsTest] = useState(0)
    const increasePoints = (answerPoint: number) => {
        setPointsTest(pointsTest + answerPoint)
    }

    // finish
    const [isFinish, setFinish] = useState(false)
    const finishQuizTest = () => {
        dispatch(finishTest(pointsTest))
        dispatch(updateProgress({
            points: points + pointsTest,
            words: wordsProgress.wordsProgressData
        }))
        dispatch(deleteTestData())
        navigate('../quiz')
    }

    // next
    const [slide, setSlide] = useState(0)
    const nextSlide = () => {
        if (quizTestData.length -1 > slide) {
            setSlide(slide + 1)
        } else {
            setFinish(true)
        }
    }

    // close
    const closeConstructorGame = useCloseGame('../quiz')
    const closeGame = () => closeConstructorGame.closeGame()

    // !! ??
    if (!quizTestData.length) navigate('../quiz')

    return (
        <>
            <GameHeader
                points={pointsTest}
                pointBar={progressBar.pointBar}
                activeNum={slide}
                closeGame={closeGame}
            />
            {
                quizTestData.length ?
                <>
                    {
                        isFinish
                        ? <FinishTest
                            points={pointsTest}
                            testName='quiz'
                            finishTest={finishQuizTest}
                        />
                        : <Quiz
                            question={quizTestData[slide]}
                            key={quizTestData[slide].id}
                            increasePoints={increasePoints}
                            nextQuestion={nextSlide}
                            checkAnswer={checkAnswer}
                            setProgressWord={setProgressWord}
                        />
                    }
                </> : ''
            }
            <GameFooter/>
        </>
    )
}

export default QuizTest