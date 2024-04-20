"use client"
import ClientsPageContent from '@/components/content/resources/clients/ClientsPageContent'
import ClientsPageHeader from '@/components/content/resources/clients/ClientsPageHeader'
import { clientsRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function ClientsPage() {

    const clientsRoutePagination = `${clientsRoute}?page=1`
    const [listValue,setListValue] = useState<NameAndId>(null)

    const {data:response,isSuccess,refetch} = useQuery({
        queryKey:["clients"],
        queryFn:async () => httpGetServices(clientsRoutePagination)
    })

    const isDataHere = Boolean(response?.data?.client) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response.data.client,"username","_id"): []
    
    return (
        <>
            <ClientsPageHeader 
                dropDownListValue={listValue} 
                setDropDownListValue={setListValue} 
                dropDownListOptions={listOptions}
            />
            <ClientsPageContent 
                refetch={refetch}
                isDataHere={isDataHere} 
                response={response}
            />
        </>
    )
}

export default ClientsPage