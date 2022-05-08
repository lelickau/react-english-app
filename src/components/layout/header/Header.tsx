import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import './header.scss'

interface HeaderProps {
    isAuth: boolean;
    logout: () => any;
}

const setActive = ({isActive}: {isActive:boolean}) =>
        isActive ? 'header__link-item header__link-item--active' : 'header__link-item'

const Header: FC<HeaderProps> = ({isAuth, logout}) => {

    const [openMenu, setOpenMenu] = useState(false)

    const clickOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const mainLinks = [
        {to: '/', title: 'Главная'},
        {to: '/quiz', title: 'Викторина'},
        {to: '/constructor', title: 'Конструктор'},
    ]

    const classMenuLink = `header__link ${openMenu ? 'header__link--open' : ''}`

    return (
    <header className="header">
        <div className="container">
            <div onClick={clickOpenMenu} className="mobile-menu">
                <div
                    className={`
                        mobile-menu__item
                        ${openMenu ? 'mobile-menu__hidden' : ''}
                    `}
                ></div>
                <div
                    className={`
                        mobile-menu__item
                        ${openMenu ? 'mobile-menu__close-btn' : ''}
                    `}
                ></div>
                <div
                    className={`
                        mobile-menu__item
                        ${openMenu ? 'mobile-menu__hidden' : ''}
                    `}
                ></div>
            </div>
            <nav className={`header__menu ${openMenu ? 'header__link--open' : ''}`}>
                <ul className="header__list">
                    {
                        mainLinks.map(link =>
                            <li className={classMenuLink}>
                                <NavLink
                                    to={link.to}
                                    className={setActive}
                                >{link.title}</NavLink>
                            </li>
                        )
                    }
                    {
                        isAuth
                        ? <>
                            <li className={classMenuLink}>
                                <NavLink
                                    to="/dictionary"
                                    className={setActive}
                                >Словарь</NavLink>
                            </li>
                            <li className={classMenuLink}>
                                <button
                                    onClick={logout}
                                    className="header__link-item"
                                >Выйти</button>
                            </li>
                        </>
                        : <li className={classMenuLink}>
                            <NavLink
                                to="/auth"
                                className={setActive}
                            >Войти</NavLink>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header