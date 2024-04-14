import { useAuthProvider } from "@/context/AuthContext"
import { removeToken, removeUser } from "@/services/authServices"

export const useLogout = () => {
    const auth = useAuthProvider()
    const logoutFunc = () => {
        removeToken()
        removeUser()
        auth?.setIsAuth(false)
    }
    return logoutFunc
}