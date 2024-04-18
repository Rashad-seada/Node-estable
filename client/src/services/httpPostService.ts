import { BASE_URL } from "@/constants/api"
import { getToken } from "./authServices";

export const httpPostService = async (url:string,body:any) => {
    
    const token = getToken() as string
    
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            method: "POST",
            body
        });

        if (!response.ok) {
            const res = await response.json();
            console.log(res);
            
            return {status:"failed",data:null,error:res.error}
        }

        return await response.json();

    }catch (error) {
        return {status:"error",error:error,data:null}

    }
}