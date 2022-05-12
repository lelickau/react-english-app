import React, { FC } from 'react'

import './validateMessage.scss'

interface ValidateMessageProps {
    message: string;
}

const ValidateMessage: FC<ValidateMessageProps> = ({message}) => {
    return (
        <span className="not-valid">{message}</span>
    );
};

export default ValidateMessage;