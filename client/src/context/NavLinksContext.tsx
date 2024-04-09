"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type NavLinksProviderData = {
    currentPath: string,
    changeCurrentPath:(newPath:string) => void
} | undefined

const Context = createContext<NavLinksProviderData>(undefined)


function NavLinksProvider({children}:Children) {

    

    const [currentPath,setCurrentPath] = useState<string>('/')

    const changeCurrentPath = (newPath:string) :void => {
        setCurrentPath(_ => newPath)
    }
    
    const contextData:NavLinksProviderData = {
        changeCurrentPath,
        currentPath
    }

    useEffect(()=>{
        setCurrentPath(window.location.pathname)
    },[])

    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

export default NavLinksProvider


export const useNavLinksProvider = () => useContext(Context);