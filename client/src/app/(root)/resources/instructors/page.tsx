"use client"

import InstructorsPageContent from '@/components/content/resources/instructors/InstructorsPageContent'
import InstructorsPageHeader from '@/components/content/resources/instructors/InstructorsPageHeader'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function InstructorsPage() {


    const instructorsRoute = "/instructor?page=1"
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,isSuccess} = useQuery({
        queryKey:["instructors"],
        queryFn:async () => httpGetServices(instructorsRoute)
    })

    console.log(response);

    const isDataHere = Boolean(response?.data?.horse) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response.data.horse,"hourseName","_id"): []

    return (
        <>
            <InstructorsPageHeader 
                setDropDownListValue={setListValue} 
                dropDownListValue={listValue} 
                dropDownListOptions={listOptions}
            />
            
            <InstructorsPageContent
                isDataHere={isDataHere} 
                response={response}
            />
        </>
    )
}
export default InstructorsPage