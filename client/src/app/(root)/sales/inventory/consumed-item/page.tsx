"use client"

import InventoryHeader from "@/components/content/sales/inventory/InventoryHeader"
import Loader from "@/components/shared/all/Loader"
import NavigationTabs from "@/components/shared/all/NavigationTabs"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { inventoryConsumedItemsRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { usePathname, useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function ConsumedItemsInventoryPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    const pathname = usePathname()

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${inventoryConsumedItemsRoute}?page=${pageNumber}`),
        queryKey:["inventory","consumedItems",'page',pageNumber]
    })
        
    const isDataHere = Boolean(response?.invConsumeItems?.data) && isSuccess


    const tableHeadCells = [
        "horse name",
        "item name",
        "quantity",
        "price",
        "measure"
    ]

    const tableBodyItemCellKeys = [
        "hourseId",
        "invConsumedItemName",
        "invConsumedQuantity",
        "invConsumedPrice",
        "invConsumedMeasure"
    ]
    const tableBodyItems = response?.invConsumeItems?.data.map((item:any) => ({
        ...item,
        hourseId:item.hourseId?.hourseName || "no-horse"
    }))
    
    
    const navigationTabs = [
        {
            href:`inventory-item`,
            label:"items"
        },
        {
            href:`consumed-item`,
            label:"consumed items"
        },
    ]

    return (
        <>
            <InventoryHeader/>
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
                            route={inventoryConsumedItemsRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.invConsumeItems.max_pages}
                            currentPage={response.invConsumeItems.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default ConsumedItemsInventoryPage