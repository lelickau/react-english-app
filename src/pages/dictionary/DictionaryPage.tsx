import React, { FC, useEffect, useState } from 'react'
import {useAppSelector} from 'hooks/reduxHooks'
import WordItem from 'components/wordItem/WordItem'
import ThemaItem from 'components/themaItem/ThemaItem'
import { IWords } from 'models/IProgressData'

import './dictionaryPage.scss'

const DictionaryPage: FC = () => {
    const {words} = useAppSelector(state => state.user)

    const [dictionary, setDictionarydictionary] = useState<IWords[]>([])
    const [themes, setThemes] = useState<string[]>(['все'])

    useEffect(() => {
        const getThemes = () => {
            words.forEach(word => {
                if (!themes.includes(word.thema)) {
                    setThemes([...themes, word.thema])
                }
            })
        }
        getThemes()

        if (words.length) {
            setDictionarydictionary(words)
        }
    }, [words, themes])

    const filterWords = (thema: string) => {
        if (thema === 'все') {
            setDictionarydictionary(words)
        } else {
            const filterWordsData = words.filter(word => word.thema === thema)
            setDictionarydictionary(filterWordsData)
        }
    }

    return (
        <section className="dictionary">
            <article className="dictionary__item">
                <div className="dictionary__filters">
                    {
                        themes.map(thema => <ThemaItem thema={thema} key={thema} filterWords={filterWords} />)
                    }
                </div>
                <div className="dictionary__content">
                    {
                        dictionary.length
                        ? dictionary.map(word => <WordItem word={word} key={word.id} />)
                        : ""
                    }
                </div>
            </article>
        </section>
    )
}

export default DictionaryPage