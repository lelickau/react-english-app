import React, { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTestQuiz } from 'games/quiz/createQuizTest'
import { useAppDispatch } from 'hooks/reduxHooks'
import { createQuizGameTest } from 'store/slices/gameSlice'
import PreviewHeader from 'components/previewHeaderGame/PreviewHeader'
import QuizLogo from 'components/logotypes/QuizLogo'
import GameFooter from 'components/gameFooter/GameFooter'
import ButtonElem from 'components/UI/buttonElem/ButtonElem'
import PreviewBodyGame from 'components/previewBodyGame/PreviewBodyGame'

import './quizPage.scss'

const QuizPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // start create
    const startQuiz = (e: MouseEvent<HTMLButtonElement>) => {
        const testData = createTestQuiz()
        console.log(testData)
        dispatch(createQuizGameTest(testData))
        navigate('/quiz-test')
    }

    return (
        <section className="quiz-page">
            <PreviewHeader title='Викторина'>
                <QuizLogo/>
            </PreviewHeader>
            <article className="quiz-page__description">
                <PreviewBodyGame description={'Выбери правельный перевод слова из четырех вариантов ответов'} />
                <ButtonElem onClick={startQuiz}>Начать</ButtonElem>
            </article>
            <GameFooter/>
        </section>
    )
}

export default QuizPage