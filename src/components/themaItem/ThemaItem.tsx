import React, { FC } from 'react'

import './themaItem.scss'

interface ThemaItemProps {
    filterWords: (thema: string) => any;
    thema: string;
}

const ThemaItem: FC<ThemaItemProps> = ({filterWords, thema}) => {

    const clickHandler = () => {
        filterWords(thema)
    }

    return (
        <span onClick={clickHandler} className="thema-item">{thema}</span>
    )
}

export default ThemaItem