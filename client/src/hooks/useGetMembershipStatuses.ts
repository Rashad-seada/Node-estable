import { memberShipStatusesRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";
import { useQuery } from "react-query";

export function useGetMembershipStatuses() {
    const {isSuccess,data:response} = useQuery({
        queryFn:async() => httpGetServices(memberShipStatusesRoute),
        queryKey:["memberShipStatuses"]
    })
    
    return isSuccess ? response.data : []
}

