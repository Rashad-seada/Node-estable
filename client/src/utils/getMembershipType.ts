import { memberShipTypes } from "@/constants/memberShipTypes"

export const getMembershipType = (type:string) :NameAndId => {
    if (Boolean(type))
    return memberShipTypes.filter((currType:NameAndId) =>
        currType?.name.toLowerCase() === type.toLowerCase())[0]
    return null
}