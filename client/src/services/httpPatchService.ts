import { BASE_URL } from "@/constants/api"
import { getToken } from "./authServices";

export const httpPatchService = async (url:string,body:any) => {
    
    const token = getToken() as string
    
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            method: "PATCH",
            body
        });

        return await response.json();

    }catch (error) {
        return {status:"error",error:error,data:null}

    }
}