import React, {FC, useState, MouseEvent, ChangeEvent, FocusEvent} from 'react';
import { useInput } from 'hooks/useInput'

import showEye from 'resource/eye-show.svg'
import hideEye from 'resource/eye-hide.svg'
import './authForm.scss'
import InputElem from 'components/UI/inputElem/InputElem';
import ValidateMessage from 'components/validateMessage/ValidateMessage';
import ButtonElem from 'components/UI/buttonElem/ButtonElem';

interface FormItemsProps {
    title: string;
    handleClick: (user:{email: string, password: string}) => void;
    isLoginForm: boolean;
}

const AuthForm: FC<FormItemsProps> = ({title, handleClick, isLoginForm}) => {
    const [show, setShow] = useState(false)
    const showPassword = (e: MouseEvent<HTMLDivElement>) => {
        setShow(!show)
    }
    // email
    const email = useInput('', {isEmpty: true, minLength: 7, isEmail: false})

    const changeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        email.onChange(e)
    }

    const blurHandlerEmail = (e: FocusEvent<HTMLInputElement>) => {
        email.onBlur(e)
    }
    // pass
    const password = useInput('', {isEmpty: true, minLength: 6})

    const changeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        password.onChange(e)
    }

    const blurHandlerPassword = (e: FocusEvent<HTMLInputElement>) => {
        password.onBlur(e)
    }

    // send
    const sendForm = () => {
        handleClick({email: email.value, password: password.value})
    }
    return (
    <>
        <h1 className="form__title">{!isLoginForm ? 'Создать аккаунт' : 'Авторизоваться'}</h1>
        <div className="form__input-box">
            {(email.isDirty && email.isEmpty) && <ValidateMessage message='*Введи Email'/>}
            {(email.emailErr && !email.isEmpty)&& <ValidateMessage message='*Некорректный Email'/>}
            <InputElem
                placeholder="Email"
                name="email"
                type="email"
                onChange={changeHandlerEmail}
                value={email.value}
                onBlur={blurHandlerEmail}
            />
        </div>
        <div className="form__input-box">
        {(password.isDirty && password.isEmpty) && <ValidateMessage message='*Введи пароль'/>}
        {(password.minLengthErr && !password.isEmpty && password.isDirty) && <ValidateMessage message='*Введи пароль (минимум 6 символов)'/>}
            <InputElem
                placeholder="Пароль"
                name="password"
                type={show ? 'text' : "password"}
                onChange={changeHandlerPassword}
                value={password.value}
                onBlur={blurHandlerPassword}
            />
                {
                    show ?
                    <div className="form__show-pass" onClick={showPassword}>
                        <img className="form__show-ico" src={showEye} alt="show"/>
                    </div>
                    :
                    <div className="form__show-pass" onClick={showPassword}>
                        <img className="form__hide-ico" src={hideEye} alt="hide"/>
                    </div>
                }
        </div>
        <div className="form__btn-box">
            <ButtonElem onClick={sendForm}>{title}</ButtonElem>
        </div>
    </>
    )
}

export default AuthForm