import React, { FC, useState } from 'react'

import './letterBtn.scss'

interface LetterBtnProps {
    letter: string;
    checkAnswer: (letter: string) => boolean;
}

const LetterBtn: FC<LetterBtnProps> = ({letter, checkAnswer}) => {

    const [hidden, setHidden] = useState('')

    const clickHandler = () => {
        const isCorrect = checkAnswer(letter)
        if (isCorrect) {
            setHidden('hidden')
        } else {
            setHidden('error')
            setTimeout(() => {
                setHidden('')
            }, 300)
        }
    }

    return (
        <button
            key={letter}
            className={`letter-btn ${hidden}`}
            onClick={clickHandler}
        >{letter}</button>
    );
};

export default LetterBtn;