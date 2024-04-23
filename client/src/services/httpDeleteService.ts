import { BASE_URL } from "@/constants/api"
import { getToken } from "./authServices";


export const httpDeleteService = async (url:string) => {

    const token = getToken() as string
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            method: "DELETE"
        });
        
        return await response.json();
    } catch (error) {
        return {status:"error",error:error,data:null}
    }
}