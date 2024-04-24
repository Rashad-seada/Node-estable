import { clientsRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";
import { useQuery } from "react-query";

 
export function useGetClients({
    pagination,
    onSuccess,
    onError
}:QueryReqParameters):any {
    const queryOptions:any = {
        queryKey:["clients"],
        queryFn:async () => httpGetServices(`${clientsRoute}${Boolean(pagination)? pagination : ''}`),
    }
    Boolean(onSuccess) ? queryOptions.onSuccess = onSuccess : null
    Boolean(onError) ? queryOptions.onError = onError : null

    const {data:response,isSuccess,refetch} = useQuery(queryOptions)
    return {response,isSuccess,refetch}
}

