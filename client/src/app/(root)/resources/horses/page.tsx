"use client"

import HorsesPageContent from '@/components/content/resources/horses/HorsesPageContent'
import HorsesPageHeader from '@/components/content/resources/horses/HorsesPageHeader'
import { horsesRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function HorsesPage() {

    const horsesRoutePagination = `${horsesRoute}`
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,isSuccess,refetch} = useQuery({
        queryKey:["horses"],
        queryFn:async () => httpGetServices(horsesRoutePagination)
    })
    
    const isDataHere = Boolean(response?.data?.hourse) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response.data.hourse,"hourseName","_id"): []
    
    return (
        <>
            <HorsesPageHeader 
                setDropDownListValue={setListValue} 
                dropDownListValue={listValue} 
                dropDownListOptions={listOptions}
            />

            <HorsesPageContent 
                isDataHere={isDataHere} 
                response={response}
                refetch={refetch}
            />
        </>
    )
}

export default HorsesPage