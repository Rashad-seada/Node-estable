"use client"

import Loader from '@/components/shared/all/Loader'
import NavigationTabs from '@/components/shared/all/NavigationTabs'
import PageContent from '@/components/shared/all/PageContent'
import PaginationButtons from '@/components/shared/all/PaginationButtons'
import Table from '@/components/shared/all/Table'
import CafeteriaHeader from '@/components/shared/cafeteria/CafeteriaHeader'
import { cafeteriaConsumedItemRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useQuery } from "react-query";

function CafeteriaConsumedItems() {

    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${cafeteriaConsumedItemRoute}?page=${pageNumber}`),
        queryKey:["cafeteria","consumedItems",'page',pageNumber]
    })
    
    const isDataHere = Boolean(response?.caveteriaItems?.data) && isSuccess


    const tableHeadCells = [
        "item name",
        "client",
        "quantity",
        "price",
        "payment",
        "date"
    ]

    const tableBodyItemCellKeys = [
        "menuItemName",
        "client",
        "consumedQuantity",
        "consumedPrice",
        "consumedPayment",
        "date"
    ]
    const navigationTabs = [
        {
            href:"consumed-item",
            label:"consumed items"
        },
        {
            href:"menu-item",
            label:"menu items"
        },
    ]
    return (
        <>
            <CafeteriaHeader/>
            <div className='h-[calc(100%-80px)] w-full'>
                <PageContent className='overflow-y-hidden pt-10'>
                    <NavigationTabs
                        tabs={navigationTabs}
                    />
                    <Loader size={300} isLoading={!isDataHere}>
                        <Table 
                            tableBodyItemCellKeys={tableBodyItemCellKeys} 
                            tableBodyItems={response?.caveteriaItems?.data} 
                            tableHeadCells={tableHeadCells} 
                            isCrud={true}
                            refetch={refetch}
                            route={cafeteriaConsumedItemRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.caveteriaItems.max_pages}
                            currentPage={response.caveteriaItems.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default CafeteriaConsumedItems