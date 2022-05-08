import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer';
import Header from './header/Header';

import './layout.scss'

interface LayoutProps {
    isAuth: boolean;
    logout: () => any;
}

const Layout: FC<LayoutProps> = ({isAuth, logout}) => {

    return (
        <div className="wrapper">
            <Header isAuth={isAuth} logout={logout} />
            <main className="main">
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout