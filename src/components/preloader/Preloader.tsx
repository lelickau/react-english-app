import React from 'react'

import './preloader.scss'

const Preloader = () => {
    return (
        <div className="loader">
            <div className="loader__item loader__bright-1"></div>
            <div className="loader__item loader__bright-2"></div>
            <div className="loader__item loader__bright-3"></div>
            <div className="loader__item loader__bright-4"></div>
        </div>
    )
}

export default Preloader