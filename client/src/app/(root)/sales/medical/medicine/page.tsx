"use client"

import PageHeader from "@/components/layout/PageHeader"
import Loader from "@/components/shared/all/Loader"
import NavigationTabs from "@/components/shared/all/NavigationTabs"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { medicineMedicalRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { priceFormatter } from "@/utils/priceFormatter"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function MedicineMedicalPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${medicineMedicalRoute}?page=${pageNumber}`),
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
    const tableBodyItems = response?.inventoryItems?.data.map((item:any)=> ({
        ...item,
        price:(<span className="w-full block text-right">
            {priceFormatter(String(item.price))}
        </span>)
    }))
    
    const navigationTabs = [
        {
            href:`medical`,
            label:"medical"
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
                            route={medicineMedicalRoute}
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

export default MedicineMedicalPage