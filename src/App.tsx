import React, { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useAppDispatch } from 'hooks/reduxHooks'
import { getUserProgress, removeUser, setError, setUser } from 'store/slices/userSlice'
import Layout from 'components/layout/Layout'
import HomePage from 'pages/homePage/HomePage'
import AuthPage from 'pages/authPage/AuthPage'
import Preloader from 'components/preloader/Preloader'
import QuizPage from 'pages/quizPage/QuizPage'
import QuizTest from 'pages/quizPage/QuizTest'

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

    if (loading) {
        return (
            <Preloader/>
        )
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout isAuth={isAuth} logout={logout}/>} >
                    <Route index element={isAuth ? <HomePage/> : <AuthPage/>} />
                    <Route path="auth" element={<AuthPage/>} />
                    <Route path="quiz" element={<QuizPage/>} />
                    <Route path="quiz-test" element={<QuizTest/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App