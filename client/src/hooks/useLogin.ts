import { BASE_URL } from "@/constants/api";
import { AuthProviderData, useAuthProvider } from "@/context/AuthContext";
import { setToken, setUser } from "@/services/authServices";
import { useMutation } from "react-query";


const authRoute = `/api/auth/login`

const login = async (email:string,password:string) => {
    const options = {
        method: "POST",
        body:JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const response = await fetch(`${BASE_URL}${authRoute}`,options)
    const loginData = await response.json()
    
    return loginData;
}
function useLogin(email: string, password: string) {

    const auth:AuthProviderData = useAuthProvider()    

    const {mutate} = useMutation({
        mutationFn:async()=>login(email,password),
        onSuccess:async(response)=> {
            if (response.data) {
                const {data:{user}} = response
                setToken(user.token)
                setUser(user)
                auth?.setIsAuth(true)
            }
        },
        onError:()=> {
            console.log("authentication went wrong");
        }
    })

    return mutate
}
export default useLogin