import { horseCategoriesRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";

export async function  getHorseCategoryById(horseCategoryId:string) {
    let category = await httpGetServices(`${horseCategoriesRoute}/${horseCategoryId}`)
    category = category.data
    
    return category    
}

