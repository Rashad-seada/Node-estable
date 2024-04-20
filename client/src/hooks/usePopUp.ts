import { PopUpProviderData, usePopUpProvider } from "@/context/PopUpContext";


type PopUpParams = {
    showPopUp: boolean,
    popUpType: "alert"|"confirm",
    popUpMessage: string,
    popUpIcon?: any,
    popUpResolveFunc?: (() => void) | undefined,
    popUpTitle: string
}

export function usePopUp () {
    const popUpData:PopUpProviderData = usePopUpProvider()
    return function ({
        popUpIcon,
        popUpMessage,
        popUpResolveFunc,
        popUpType,
        showPopUp,
        popUpTitle
    }:PopUpParams) {
        popUpData?.setPopUp({
            isPopUpOpen: showPopUp,
            popUpType,
            resolveFunc: popUpResolveFunc,
            message: popUpMessage,
            icon: popUpIcon,
            title: popUpTitle
        })
    }

}