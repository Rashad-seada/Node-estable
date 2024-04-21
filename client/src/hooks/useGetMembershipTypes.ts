import { memberShipTypesRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { useQuery } from "react-query"

export function useGetMembershipTypes() {
    const {isSuccess,data:response} = useQuery({
        queryFn:async() => httpGetServices(memberShipTypesRoute),
        queryKey:["memberShipTypes"]
    })
    
    return isSuccess ? response.data : []
}

