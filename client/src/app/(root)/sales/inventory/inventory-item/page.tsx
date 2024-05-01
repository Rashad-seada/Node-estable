"use client"

import InventoryHeader from "@/components/content/sales/inventory/InventoryHeader";
import Loader from "@/components/shared/all/Loader";
import NavigationTabs from "@/components/shared/all/NavigationTabs";
import PageContent from "@/components/shared/all/PageContent";
import PaginationButtons from "@/components/shared/all/PaginationButtons";
import Table from "@/components/shared/all/Table";
import { inventoryConsumedItemsRoute, inventoryItemsRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

function InventoryItemsPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    const pathname = usePathname()

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${inventoryItemsRoute}?page=${pageNumber}`),
        queryKey:["inventory","items",'page',pageNumber]
    })
        
    const isDataHere = Boolean(response?.inventoryItems?.data) && isSuccess


    const tableHeadCells = [
        "item name",
        "quantity",
        "item description",
        "type",
        "price",
        "measure"
    ]

    const tableBodyItemCellKeys = [
        "itemName",
        "quantity",
        "itemDescription",
        "type",
        "price",
        "measure"
    ]
    const tableBodyItems = response?.inventoryItems?.data
    
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
                            route={inventoryItemsRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.inventoryItems.max_pages}
                            currentPage={response.inventoryItems.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default InventoryItemsPage