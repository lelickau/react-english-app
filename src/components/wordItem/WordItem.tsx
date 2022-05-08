import React, { FC } from 'react'
import { IWords } from 'models/IProgressData'

import './wordItem.scss'

interface WordItemProps {
    word: IWords;
}

const WordItem: FC<WordItemProps> = ({word}) => {

    return (
        <div className="word-item__word">
            <div className="word-item__title">{word.id} - {word.translate}</div>
            <div className="word-item__progress">
                <div
                    style={{background: `conic-gradient(#BF8FFD ${word.level * 25}%, transparent 0)`}}
                    className="word-item__progress-inside"></div>
            </div>
        </div>
    )
}

export default WordItem