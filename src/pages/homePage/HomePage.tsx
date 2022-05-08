import { getAuth, updateProfile } from "firebase/auth";
import { setUserRank } from 'helpers/setUserRank';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import React, {ChangeEvent, FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './homePage.scss'
import penIco from 'resource/pen.svg'
import { setError, setUsername } from "store/slices/userSlice";
import { useInput } from "hooks/useInput";
import ErrorModal from "components/errorModal/ErrorModal";
import PenIco from "components/UI/penIco/PenIco";

const HomePage: FC = () => {
    const dispatch = useAppDispatch()
    const {id, username, points, words, error} = useAppSelector(state => state.user)
    const navigate = useNavigate()

    if (!id) {
        navigate('/auth')
    }

    const getNumberOfWordsLearned = () => {
        return words.filter(word => word.level === 4).length
    }
    const getNumberOfWordsInProcess = () => {
        return words.filter(word => word.level < 4).length
    }

    const totalWords = words.length
    const wordsLearned = getNumberOfWordsLearned()
    const wordsInProcess = getNumberOfWordsInProcess()

    const level = Math.trunc(points / 1000)
    const widthProgress = (points % 1000) / 10

    const rank = setUserRank(points)


    const displayName = useInput(username!, {isEmpty: true, minLength: 2})

    const changeHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        displayName.onChange(e)
    }
    const [changeName, setChangeName] = useState(false)
    const updateUsername  = () => {
        if (!displayName.minLengthErr) {
            const auth = getAuth()
            updateProfile(auth.currentUser!, { displayName: displayName.value })
            .then(() => {
                dispatch(setUsername(displayName.value))
                setChangeName(false)
            }).catch((error) => {
                console.log(error)
                dispatch(setError('Что-то пошло не так. Попробуйте позже.'))
            })
        } else {
            dispatch(setError('Имя должно состоять из минимум 2-х букв.'))
            setTimeout(() => {
                dispatch(setError(''))
            }, 5000)
        }
    }

    const chengeUsername = () => {
        setChangeName(true)
    }

    return (
        <section className="home">
            {
                error
                ? <ErrorModal message={error}/>
                : ''
            }
            <article className="home__item-content">
                <div className="home__username">
                    {
                        changeName
                        ? ""
                        : <h1 className="home__login">{username}</h1>
                    }
                    <input
                        className="home__username-input"
                        name="displayName"
                        onChange={changeHandler}
                        value={displayName.value}
                        type={changeName ? "text" : "hidden"}
                        placeholder="Введите имя..."
                    />
                    {
                        changeName
                        ? <button className="home__username-save" onClick={updateUsername}></button>
                        : <button className="home__username-edit" onClick={chengeUsername}>
                            <PenIco/>
                        </button>
                    }
                </div>
                <h2 className="home__quality">{rank}</h2>
                <div className="home__words home__all-words">Словарь:
                    <span className="home__points">{totalWords}</span>
                </div>
                <div className="home__words home__learned-words">Выучено слов:
                    <span className="home__points">{wordsLearned}</span>
                </div>
                <div className="home__words home__process-words">Слова в процессе:
                    <span className="home__points">{wordsInProcess}</span>
                </div>
                <div className="home__words home__all-points">Всего очков опыта:
                    <span className="home__points">{points}</span>
                </div>
            </article>
            <article className="home__item-scale">
                <div className="home__level">
                    <div className="home__level-points">{level}</div>
                </div>
                <div className="home__scale">
                    <div className="home__line" style={{width: `${widthProgress}%`}}></div>
                </div>
            </article>
        </section>
    )
}

export default HomePage