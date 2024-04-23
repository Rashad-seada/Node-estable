import { genders } from "@/constants/genders";

export function getGender(gender:string) {
    return genders
    .filter((currGender:NameAndId) =>
         currGender?.name.toLowerCase() === gender.toLowerCase())[0]
}

