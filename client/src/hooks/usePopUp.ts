import { PopUpProviderData, usePopUpProvider } from "@/context/PopUpContext";


type usePopUpParams = {
    showPopUp: boolean,
    popUpType: "alert"|"confirm",
    popUpMessage: string,
    popUpIcon?: any,
    popUpResolveFunc?: (() => void) | undefined,
}

export function usePopUp () {
    const popUpData:PopUpProviderData = usePopUpProvider()
    return function ({
        popUpIcon,
        popUpMessage,
        popUpResolveFunc,
        popUpType,
        showPopUp
    }:usePopUpParams) {
        popUpData?.setPopUp({
            isPopUpOpen: showPopUp,
            popUpType,
            resolveFunc: popUpResolveFunc,
            message: popUpMessage,
            icon: popUpIcon,
        })
    }

}