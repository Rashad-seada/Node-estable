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
    }

    useEffect(()=>{
        setCurrentPath(location.pathname)
    },[])



    const contextData:RoutingProviderData = {
        changeCurrentPath,
        currentPath
    }

    console.log(currentPath);

    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

export default RoutingProvider


export const useRoutingProvider = () => useContext(Context);