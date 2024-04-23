import { horsesRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";
import { useQuery } from "react-query";

export function useGetHorses({
    pagination,
    onSuccess,
    onError
}:QueryReqParameters) {
    let queryOptions:any = {
        queryKey:["horses"],
        queryFn:async () => httpGetServices(`${horsesRoute}${pagination? pagination : ''}`)
    }
    Boolean(onSuccess) ? queryOptions.onSuccess = onSuccess : null
    Boolean(onError) ? queryOptions.onError = onError : null

    const {data:response,isSuccess,refetch} = useQuery(queryOptions)
    return {response,isSuccess,refetch}
}

