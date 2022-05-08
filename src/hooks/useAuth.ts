import { useAppSelector } from "./reduxHooks"

export const useAuth = () => {
    const {email, username, id} = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        username,
        id
    }
}