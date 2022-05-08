import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTestData } from 'store/slices/gameSlice'
import { finishTest, updateProgress } from 'store/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { useCloseGame } from 'hooks/closeGame'
import { useProgressBar } from 'hooks/useProgressBar'
import { useProgressWords } from 'hooks/useProgressWords'
import { IConstructorData } from 'models/IWordsData'
import GameFooter from 'components/gameFooter/GameFooter'
import GameHeader from 'components/gameHeader/GameHeader'
import Constructor from 'components/constructor/Constructor'
import FinishTest from 'components/finishTest/FinishTest'

const ConstructorTest: FC = () => {
    const navigate = useNavigate()
    const { constructorTestData } = useAppSelector(state => state.game)
    const { words, points } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    if (!constructorTestData.length) navigate('../constructor')

    const progressBar = useProgressBar(constructorTestData.length)

    //progress words
    const wordsProgress = useProgressWords(words)
    const setProgressWord = (pointProgress: number, question: IConstructorData) => {
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
        navigate('../constructor')
    }

    // next
    const [slide, setSlide] = useState(0)
    const nextSlide = () => {
        if (constructorTestData.length -1 > slide) {
            setSlide(slide + 1)
        } else {
            setFinish(true)
        }
    }

    // close
    const closeConstructorGame = useCloseGame('../constructor')
    const closeGame = () => closeConstructorGame.closeGame()


    return (
        <>
            <GameHeader
                points={pointsTest}
                pointBar={progressBar.pointBar}
                activeNum={slide}
                closeGame={closeGame}
            />
            {
                constructorTestData.length ?
                <>
                    {
                        isFinish
                        ? <FinishTest
                            points={pointsTest}
                            testName='constructor'
                            finishTest={finishQuizTest}
                        />
                        : <Constructor
                                question={constructorTestData[slide]}
                                increasePoints={increasePoints}
                                key={constructorTestData[slide].id}
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

export default ConstructorTest