import React, { FC } from 'react'

import './progressBar.scss'

interface ProgressBarProps {
    className: string;
    isActive: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({className, isActive}) => {
    return (
        <span className={`${className} ${isActive ? 'progress--active' : ''}`}></span>
    )
};

export default ProgressBar;