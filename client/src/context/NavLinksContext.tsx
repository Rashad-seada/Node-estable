"use client"

import { createContext, useContext, useState } from "react";

export type NavLinksProviderData = {
    currentPath: string,
    changeCurrentPath:(newPath:string) => void
} | undefined

const Context = createContext<NavLinksProviderData>(undefined)


function NavLinksProvider({children}:Children) {

    
    const path = location.pathname
    const [currentPath,setCurrentPath] = useState<string>(path)

    const changeCurrentPath = (newPath:string) :void => {
        setCurrentPath(_ => newPath)
    }
    
    const contextData:NavLinksProviderData = {
        changeCurrentPath,
        currentPath
    }

    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

export default NavLinksProvider


export const useNavLinksProvider = () => useContext(Context);