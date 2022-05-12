import React, { FC, InputHTMLAttributes } from 'react'

import './inputElem.scss'

type InputElemProps =  InputHTMLAttributes<HTMLInputElement>

const InputElem: FC<InputElemProps> = ({...rest}) => {
    return (
        <input className="main-input" {...rest} />
    );
};

export default InputElem;