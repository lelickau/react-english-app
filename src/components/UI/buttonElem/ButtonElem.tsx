import React, { ButtonHTMLAttributes, FC } from 'react'

import './buttonElem.scss'

type ButtonElemPropsAttr = ButtonHTMLAttributes<HTMLButtonElement>

const ButtonElem: FC<ButtonElemPropsAttr> = ({children, ...rest}) => {
    return (
        <button className="default-btn" {...rest} >{children}</button>
    )
}

export default ButtonElem