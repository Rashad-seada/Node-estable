import { medicalTypes } from "@/constants/medicalTypes"

export const getMedicalType = (type:string) => {
    return medicalTypes
    .filter((currType:NameAndId) => currType?.name.toLowerCase() === type.toLowerCase())[0]
}