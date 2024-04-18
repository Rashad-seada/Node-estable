'use client'

import PopUp from "@/components/shared/all/PopUp"
import { createContext, useState } from "react"


export type PopUpProviderData = {
    isPopUpOpen: boolean,
    setIsPopUpOpen:(state:boolean) => void,
    popUpType: string,
    setPopUpType:(state:string) => void
}|undefined

const Context = createContext<PopUpProviderData>(undefined)




function PopUpProvider({children}:Children) {

    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false)
    const [popUpType, setPopUpType] = useState<string>("confirm")



    return (
        <>
            <Context.Provider value={contextData}>
                {children}
                <PopUp
                    isPopUpOpen={isPopUpOpen}
                    setIsPopUpOpen={setIsPopUpOpen}
                />
            </Context.Provider>
        </>
    )
}

export default PopUpProvider

