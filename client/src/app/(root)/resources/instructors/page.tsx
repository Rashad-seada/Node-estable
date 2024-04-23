"use client"

import InstructorsPageContent from '@/components/content/resources/instructors/InstructorsPageContent'
import InstructorsPageHeader from '@/components/content/resources/instructors/InstructorsPageHeader'
import { instructorsRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function InstructorsPage() {


    const instructorsRoutePagination = `${instructorsRoute}?page=1`
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,isSuccess,refetch} = useQuery({
        queryKey:["instructors"],
        queryFn:async () => httpGetServices(instructorsRoutePagination)
    })

    const isDataHere = Boolean(response?.data) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response.data.horse,"instractorName","_id"): []

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
                refetch={refetch}
            />
        </>
    )
}
export default InstructorsPage