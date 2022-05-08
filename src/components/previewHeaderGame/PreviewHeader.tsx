import React, { FC, ReactNode } from 'react'

import './previewHeader.scss'

interface PreviewHeaderProps {
    title: string;
    children: ReactNode;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({title, children}) => {
    return (
        <div className="preview-header">
            <div className="preview-header__logo">
                {children}
                <h1 className="preview-header__title title">{title}</h1>
            </div>
        </div>
    )
}

export default PreviewHeader