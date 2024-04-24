"use client"

import HorsesPageContent from '@/components/content/resources/horses/HorsesPageContent'
import HorsesPageHeader from '@/components/content/resources/horses/HorsesPageHeader'
import { useGetHorses } from '@/hooks/useGetHorses'
import { toNameAndId } from '@/utils/toNameAndId'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function HorsesPage() {

    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const [listValue,setListValue] = useState<any>(null)

    const {response,isSuccess,refetch}:any = useGetHorses({
        pagination:`?page=${pageNumber}`
    })
    const isDataHere = Boolean(response?.data?.hourse) && isSuccess

    let listOptions = isDataHere ? toNameAndId(response?.data?.hourse,"hourseName","_id"): []
    
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