import React, { FC } from 'react';

import './errorModal.scss'

interface ErrorModalProps {
    message: string;
}

const ErrorModal: FC<ErrorModalProps> = ({message}) => {
    return (
        <div className="error-modal">{message}</div>
    );
};

export default ErrorModal;