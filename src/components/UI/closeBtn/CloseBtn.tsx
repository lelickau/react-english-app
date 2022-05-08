import React, { ButtonHTMLAttributes, FC } from 'react'

import './closeBtn.scss'

type ButtonElemProps = ButtonHTMLAttributes<HTMLButtonElement>

interface CloseBtnProps {
    closeGame: () => any;
}

const CloseBtn: FC<ButtonElemProps & CloseBtnProps> = ({closeGame, children, ...rest}) => {
    return (
        <button
                className="close-btn"
                onClick={closeGame}
                {...rest}
        >{children}</button>
    )
}

export default CloseBtn