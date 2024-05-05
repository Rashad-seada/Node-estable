"use client"

import PageHeader from '@/components/layout/PageHeader'
import Loader from '@/components/shared/all/Loader'
import NavigationTabs from '@/components/shared/all/NavigationTabs'
import PageContent from '@/components/shared/all/PageContent'
import PaginationButtons from '@/components/shared/all/PaginationButtons'
import Table from '@/components/shared/all/Table'
import { consumedMedicalRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { priceFormatter } from '@/utils/priceFormatter'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

function ConsumedMedicalItemsPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${consumedMedicalRoute}?page=${pageNumber}`),
        queryKey:["medical","consumed",'page',pageNumber]
    })
        
    const isDataHere = Boolean(response?.data?.consumed_medicine) && isSuccess
    
    const tableHeadCells = [
        "horse name",
        "item name",
        "quantity",
        "price",
        "dosage"
    ]

    const tableBodyItemCellKeys = [
        "hourseId",
        "medicineName",
        "quantity",
        "price",
        "dosage"
    ]
    const tableBodyItems = response?.data?.consumed_medicine.map((item:any)=> ({
        ...item,
        price:(<span className="w-full block text-right">
            {priceFormatter(String(item.price))}
        </span>),
        hourseId:item?.hourseId?.hourseName || "no-horse"
    }))
    
    const navigationTabs = [
        {
            href:`medicine`,
            label:"medicine"
        },
        {
            href:`consumed-item`,
            label:"consumed items"
        },
    ]
    return (
        <>
            <PageHeader
                title={"stable's medicine"}
                addNewButtonLabel='add new item'
            />
            <div className='h-[calc(100%-80px)] w-full'>
                <PageContent className='overflow-y-hidden pt-10'>
                    <NavigationTabs
                        tabs={navigationTabs}
                    />
                    <Loader size={300} isLoading={!isDataHere}>
                        <Table 
                            tableBodyItemCellKeys={tableBodyItemCellKeys} 
                            tableBodyItems={tableBodyItems} 
                            tableHeadCells={tableHeadCells} 
                            isCrud={true}
                            refetch={refetch}
                            route={consumedMedicalRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.data.max_pages}
                            currentPage={response.data.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default ConsumedMedicalItemsPage