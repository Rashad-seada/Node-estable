'use client'

import PopUp from "@/components/shared/contexts/PopUp"
import { createContext, useContext, useState } from "react"

export type PopUpProviderData = {
    popUp:PopUp,
    setPopUp:(state:PopUp) => void,
} | undefined

type PopUp = {
    isPopUpOpen: boolean,
    popUpType: "alert" | "confirm",
    resolveFunc:(()=>void)|undefined,
    message:string|null,
    icon:any,
    title:string
}




const Context = createContext<PopUpProviderData>(undefined)

function PopUpProvider({children}:Children) {

    const [popUp,setPopUp] = useState<PopUp>({
        isPopUpOpen:false,
        popUpType:"alert",
        resolveFunc:undefined,
        message:"",
        icon:null,
        title:""
    })
    const contextData:PopUpProviderData = {popUp,setPopUp}

    return (
        <>
            <Context.Provider value={contextData}>
                {children}
                <PopUp />
            </Context.Provider>
        </>
    )
}

export default PopUpProvider

export const usePopUpProvider = () => useContext(Context)