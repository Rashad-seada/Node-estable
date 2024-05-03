import { packageStatuses } from "@/constants/packageStatuses"

export const getPackageStatus = (status:string) => {
    return packageStatuses
    .filter((currStatus:NameAndId)=> currStatus?.name.toLowerCase() === status.toLowerCase())[0]
}