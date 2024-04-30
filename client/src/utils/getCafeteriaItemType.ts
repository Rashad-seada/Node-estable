import { cafeteriaItemsTypes } from "@/constants/cafeteriaItemsTypes"

export const getCafeteriaItemType = (type:string) => {
    return cafeteriaItemsTypes
    .filter((item:NameAndId) => item?.name.toLowerCase() === type.toLowerCase())[0]

    
}