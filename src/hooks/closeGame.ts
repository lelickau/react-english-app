import { useAppDispatch } from "hooks/reduxHooks"
import { useNavigate } from "react-router-dom"
import { deleteTestData } from "store/slices/gameSlice"


export const useCloseGame = (path: string) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const closeGame = () => {
        dispatch(deleteTestData())
        navigate(path)
    }

    return {
        closeGame
    }
}
