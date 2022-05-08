import React, { FC } from 'react'
import QuestionIco from 'components/UI/questionIco/QuestionIco'

import './previewBodyGame.scss'

interface PreviewBodyGameProps {
    description: string;
}

const PreviewBodyGame: FC<PreviewBodyGameProps> = ({description}) => {
    return (
        <div className="preview-body">
            <QuestionIco/>
            <div className="preview-body__about">
                <h2 className="preview-body__title">Как играть?</h2>
                <p className="preview-body__text">{description}</p>
            </div>
        </div>
    )
}

export default PreviewBodyGame