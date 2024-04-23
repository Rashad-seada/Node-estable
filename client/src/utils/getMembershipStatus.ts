import { memberShipStatuses } from "@/constants/memberShipStatuses"

export const getMembershipStatus = (status:string) => {
    if (Boolean(status))
    return memberShipStatuses.filter((currStatus:NameAndId) =>
        currStatus?.name?.toLowerCase() === status?.toLowerCase())[0]
    return null
}