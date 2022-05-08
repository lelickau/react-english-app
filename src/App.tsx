import React, { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getUserProgress, removeUser, setError, setUser } from 'store/slices/userSlice'
import Layout from 'components/layout/Layout'
import HomePage from 'pages/homePage/HomePage'
import { useAppDispatch } from 'hooks/reduxHooks'

import AuthPage from 'pages/authPage/AuthPage'

const App:FC = () => {
    const dispatch = useAppDispatch()
    const [isAuth, setIsAuth] = useState(false)

    const auth = getAuth()
    const [, loading] = useAuthState(auth)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    email: user.email,
                    username: user.displayName ? user.displayName : 'Незнакомец',
                    id: user.uid,
                }))
                dispatch(getUserProgress(user.uid))
                setIsAuth(true)
            } else {
                dispatch(setError('Возникла ошибка, повторите позже'))
                dispatch(setUser({}))
                setIsAuth(false)
            }
        })

    }, [auth, dispatch])

    const logout = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            dispatch(setError('Возникла ошибка, повторите позже'))
        })
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout isAuth={isAuth} logout={logout}/>} >
                    <Route index element={isAuth ? <HomePage/> : <AuthPage/>} />
                    <Route path="auth" element={<AuthPage/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App