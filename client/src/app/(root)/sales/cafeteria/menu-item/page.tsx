"use client"

import Loader from '@/components/shared/all/Loader';
import NavigationTabs from '@/components/shared/all/NavigationTabs';
import PageContent from '@/components/shared/all/PageContent';
import PaginationButtons from '@/components/shared/all/PaginationButtons';
import Table from '@/components/shared/all/Table';
import { cafeteriaMenuItemRoute } from '@/constants/api';
import { httpGetServices } from '@/services/httpGetService';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useQuery } from 'react-query';

function CafeteriaMenuItems() {
    
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${cafeteriaMenuItemRoute}?page=${pageNumber}`),
        queryKey:["cafeteria","menuItem",'page',pageNumber]
    })
    
    const isDataHere = Boolean(response?.caveteriaItems?.data) && isSuccess


    const tableHeadCells = [
        "menu item name",
        "client",
        "price",
        "quantity",
        "date"
    ]

    const tableBodyItemCellKeys = [
        "menuItemName",
        "type",
        "price",
        "quantity",
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
            <PageContent  className='overflow-y-hidden pt-10'>

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
                        route={cafeteriaMenuItemRoute}
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
        </>
    )
}

export default CafeteriaMenuItems