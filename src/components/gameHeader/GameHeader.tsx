import React, { FC } from 'react'
import ProgressBar from 'components/progressBar/ProgressBar'
import CloseBtn from 'components/UI/closeBtn/CloseBtn'

import './gameHeader.scss'

interface GameHeaderProps {
    points: number;
    pointBar: string[];
    activeNum: number;
    closeGame: () => any;
}

const GameHeader: FC<GameHeaderProps> = ({points, pointBar, activeNum, closeGame}) => {

    return (
        <div className="game-header">
            <div className="game-header__progress">
                <div className="game-header__points">{points}</div>
                <div className="game-header__navigate">
                    {
                        pointBar.map((i, idx) =>
                            <ProgressBar
                                className={i}
                                isActive={idx === activeNum ? true : false}
                                key={idx+i}
                            />
                        )
                    }
                </div>
            </div>
            <CloseBtn closeGame={closeGame}/>
        </div>
    )
}

export default GameHeader