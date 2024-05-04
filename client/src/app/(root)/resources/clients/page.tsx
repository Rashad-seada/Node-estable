"use client"
import ClientsPageContent from '@/components/content/resources/clients/ClientsPageContent'
import PageHeader from '@/components/layout/PageHeader'
import PaginationButtons from '@/components/shared/all/PaginationButtons'
import { useGetClients } from '@/hooks/useGetClients'
import { toNameAndId } from '@/utils/toNameAndId'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function ClientsPage() {

    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    
    const [listValue,setListValue] = useState<NameAndId>(null)

    const {response,isSuccess,refetch}:any = useGetClients({
        pagination:`?page=${pageNumber}`,
        queryKey:['page',pageNumber]

    })
    

    const isDataHere = Boolean(response?.data?.client) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response?.data?.client,"username","_id"): []
    
    
    return (
        <>
            <div className='w-full h-[calc(100%-80px)]'>
                <PageHeader
                    title={"stable's clients"}
                    dropDown={{
                        options: listOptions,
                        setListValue,
                        listValue,
                        placeholder:"select client"
                    }}
                    addNewButtonLabel='add new client'
                />
                <ClientsPageContent 
                    refetch={refetch}
                    isDataHere={isDataHere} 
                    response={response}
                />
            </div>
            {
                isDataHere ? (
                    <PaginationButtons
                        maxPages={response.data.max_pages}
                        currentPage={response.data.current_page}

                    />
                ): <></>
            }
        </>
    )
}

export default ClientsPage