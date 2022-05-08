import React, {FC, useState, FormEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/reduxHooks'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setInitialProgress, setUser } from 'store/slices/userSlice'
import AuthForm from 'components/authForm/AuthForm'
import ErrorIco from 'components/UI/errorIco/ErrorIco'

import './authPage.scss'

interface IUser {
    email: string;
    password: string;
}

const AuthPage: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [isLogin, setLogin] = useState(true)
    const [formText, setFormText] = useState({
        question: 'Новый пользователь?',
        btnTitle: 'Создать аккаунт'
    })

    const preventDefForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const clickHandler = (user:IUser) => {
        if (isLogin) {
            clickHandlerLogin(user.email, user.password)
        } else {
            clickHandlerSignup(user.email, user.password)
        }
    }

    const clickHandlerLogin = (email: string, password: string) => {
        setError('')
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                username: user.displayName ? user.displayName : 'Незнакомец'
            }))
            navigate('/')
        })
        .catch((e) => {
            console.log(e)
            setError('Некорректный email или пароль.')
        })
    }

    const clickHandlerSignup = (email: string, password: string) => {
        setError('')
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                username: user.displayName ? user.displayName : 'Незнакомец'
            }))
            dispatch(setInitialProgress({
                points: 0,
                words: [],
                userId: user.uid,
            }))
            navigate('/')
        })
        .catch((e) => {
            console.log(e)
            setError('Что-то пошло не так. Попробуй позже.')
        })
    }

    const changeForm = () => {
        setError('')
        setLogin(!isLogin)
        if (isLogin) {
            setFormText({
                question: 'Уже имеется аккаунт?',
                btnTitle: 'Войти'
            })
        } else {
            setFormText({
                question: 'Новый пользователь?',
                btnTitle: 'Создать аккаунт'
            })
        }
    }

    return (
        <article className="auth">
            <div className="auth__box">
                <form
                    className="auth__form"
                    onSubmit={preventDefForm}
                >
                    { error &&
                        <div className="auth__form-error">
                            <ErrorIco/>
                            <span className="auth__form-error-text">{error}</span>
                        </div>
                    }
                    <AuthForm
                        title={isLogin ? 'Войти' : 'Создать'}
                        handleClick={clickHandler}
                        isLoginForm={isLogin}
                    />
                </form>
                <div className="auth__change-auth">
                    <span className="auth__new-user">{formText.question}
                        <button
                            className="auth__create-btn"
                            onClick={changeForm}
                        >{formText.btnTitle}</button>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default AuthPage