import React, { FC } from 'react'
    import ButtonElem from 'components/UI/buttonElem/ButtonElem'

import './quizBtn.scss'

interface QuizBtnProps {
    title: string;
    giveAnswer: (answer: string) => any;
}

const QuizBtn: FC<QuizBtnProps> = ({title, giveAnswer}) => {

    const clickHandler = () => {
        giveAnswer(title)
    }

    return (
        <ButtonElem onClick={clickHandler}>{title}</ButtonElem>
    )
}

export default QuizBtn