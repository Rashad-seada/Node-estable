import { packageCategories } from "@/constants/packageCategories"

export const getPackageCategory = (category:string) => {
    return packageCategories
    .filter((currCategory:NameAndId) => currCategory?.name.toLowerCase() === category.toLowerCase())[0]
}