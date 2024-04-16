'use client'

import { createContext, useContext, useEffect, useState } from "react";

export type RoutingProviderData = {
    currentPath: string,
    changeCurrentPath:(newPath:string) => void
} | undefined

const Context = createContext<RoutingProviderData>(undefined)


function RoutingProvider({children}:Children) {

    const [currentPath,setCurrentPath] = useState<string>("/")

    const changeCurrentPath = (newPath:string) :void => {
        setCurrentPath(_ => newPath)
        localStorage.setItem("currentPath",newPath)
    }

    useEffect(()=>{
        const initialPath = localStorage.getItem("currentPath") || "/"

        setCurrentPath(initialPath)
    },[])



    const contextData:RoutingProviderData = {
        changeCurrentPath,
        currentPath
    }


    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

export default RoutingProvider


export const useRoutingProvider = () => useContext(Context);