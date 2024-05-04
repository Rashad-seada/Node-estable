import { inventoryTypes } from "@/constants/inventoryTypes"

export const getInventoryType = (type:string):NameAndId => {
    return inventoryTypes.filter((currType:NameAndId)=> currType?.name.toLowerCase() === type.toLowerCase())[0]
}