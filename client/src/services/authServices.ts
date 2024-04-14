

const TOKEN_KEY :string = "saifi_stable_token"
const USER_KEY :string = "saifi_stable_user"

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || null
}


export const setToken = (newToken:string) => {
    localStorage.setItem(TOKEN_KEY,newToken)
}

export const getUser = () => {
    return localStorage.getItem(USER_KEY) || null
}

export const setUser = (newUser:any) => {
    localStorage.setItem(USER_KEY,JSON.stringify(newUser))
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const removeUser = () => {
    localStorage.removeItem(USER_KEY)
}