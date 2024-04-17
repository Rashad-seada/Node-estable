"use client"
import ClientsPageContent from '@/components/content/resources/clients/ClientsPageContent'
import ClientsPageHeader from '@/components/content/resources/clients/ClientsPageHeader'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function ClientsPage() {

    const clientsRoute = "/client?page=1"
    const [listValue,setListValue] = useState<NameAndId>(null)

    const {data:response,isSuccess} = useQuery({
        queryKey:["clients"],
        queryFn:async () => httpGetServices(clientsRoute)
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
                isDataHere={isDataHere} 
                response={response}
            />
        </>
    )
}

export default ClientsPage