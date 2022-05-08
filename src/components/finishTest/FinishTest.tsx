import React, { FC } from 'react'
import { useAuth } from 'hooks/useAuth'
import { getResult } from 'helpers/getResult'
import ButtonElem from 'components/UI/buttonElem/ButtonElem'

import './finishTest.scss'


interface FinishTestProps {
    points: number;
    finishTest: () => any;
    testName: string;
}

interface IResult {
    text: string;
    color: string[];
    test: string;
    min: number;
    max: number;
}

const FinishTest: FC<FinishTestProps> = ({points, testName, finishTest}) => {
    const {isAuth} = useAuth()
    const result: IResult[]  = getResult(testName, points)
    return (
        <article className="finish">
            <div className="finish__results">
                <div className="finish__points">{points}</div>
                <p className="finish__text">{result[0].text}</p>
            </div>
            {
                isAuth
                ? <ButtonElem onClick={finishTest} >Завершить</ButtonElem>
                : ""
            }
        </article>
    )
}

export default FinishTest