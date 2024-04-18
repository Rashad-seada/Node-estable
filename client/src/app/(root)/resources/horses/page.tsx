"use client"

import HorsesPageContent from '@/components/content/resources/horses/HorsesPageContent'
import HorsesPageHeader from '@/components/content/resources/horses/HorsesPageHeader'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function HorsesPage() {

    const horsesRoute = "/hourse"
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,isSuccess} = useQuery({
        queryKey:["horses"],
        queryFn:async () => httpGetServices(horsesRoute)
    })

    console.log(response);
    
    const isDataHere = Boolean(response?.data?.horse) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response.data.horse,"hourseName","_id"): []
    
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
            />
        </>
    )
}

export default HorsesPage