import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/reduxHooks'
import { createConstructorGameTest } from 'store/slices/gameSlice'
import { createConstructorTest } from 'games/constructor/createConstructorTest'
import GameFooter from 'components/gameFooter/GameFooter'
import PreviewBodyGame from 'components/previewBodyGame/PreviewBodyGame'
import PreviewHeader from 'components/previewHeaderGame/PreviewHeader'
import ButtonElem from 'components/UI/buttonElem/ButtonElem'
import ConstructorLogo from 'components/logotypes/ConstructorLogo'

import './constructorPage.scss'

const ConstructorPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const startQuiz = () => {
        const dataTest = createConstructorTest()
        dispatch(createConstructorGameTest(dataTest))
        navigate('/constructor-test')
        console.log(dataTest)
    }

    return (
        <section className="constructor-page">
            <PreviewHeader title="Конструктор">
                <ConstructorLogo/>
            </PreviewHeader>
            <article className="constructor-page__description">
                <PreviewBodyGame description='Собери слово из букв' />
                <ButtonElem onClick={startQuiz}>Начать</ButtonElem>
            </article>
            <GameFooter/>
        </section>
    )
}

export default ConstructorPage