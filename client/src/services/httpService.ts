import { BASE_URL } from "@/constants/api"



export const httpServices = async (url:string,options:any) => {
    const response = await fetch(`${BASE_URL}${url}`, options)
    
    console.log( response);
    return await response.json()
}