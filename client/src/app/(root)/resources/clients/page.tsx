"use client"
import ClientsPageContent from '@/components/content/resources/clients/ClientsPageContent'
import ClientsPageHeader from '@/components/content/resources/clients/ClientsPageHeader'
import { useGetClients } from '@/hooks/useGetClients'
import { toNameAndId } from '@/utils/toNameAndId'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function ClientsPage() {

    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    
    const [listValue,setListValue] = useState<NameAndId>(null)

    const {response,isSuccess,refetch}:any = useGetClients({
        pagination:`?page=${pageNumber}`
    })

    const isDataHere = Boolean(response?.data?.client) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response?.data?.client,"username","_id"): []
    
    
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