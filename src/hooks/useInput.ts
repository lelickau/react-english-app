import { ChangeEvent, FocusEvent, useEffect, useState } from "react"

interface IValidation {
    minLength: number;
    isEmpty: boolean;
    isEmail?: boolean;
}

const useValidationForm = (value: any, validations: IValidation) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthErr, setMinLengthErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    useEffect(() => {

        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthErr(true) : setMinLengthErr(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) ? setEmailErr(false) : setEmailErr(true)
                    break;
            }
        }

    }, [value])

    return {
        isEmpty,
        minLengthErr,
        emailErr
    }
}

export const useInput = (initialValue: string, validations: IValidation) => {
    const [isDirty, setDirty] = useState(false)
    const [value, setValue] = useState(initialValue)
    const valid = useValidationForm(value, validations)

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setDirty(true)
    }
    const resetValue = () => {
        setValue(initialValue)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        resetValue,
        ...valid
    }
}