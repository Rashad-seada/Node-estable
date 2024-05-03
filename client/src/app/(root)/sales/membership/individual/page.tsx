"use client"

import PageHeader from "@/components/layout/PageHeader"
import Loader from "@/components/shared/all/Loader"
import NavigationTabs from "@/components/shared/all/NavigationTabs"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { individualMembershipRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { usePathname, useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function IndividualMembershipPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"
    const pathname = usePathname()

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${individualMembershipRoute}?page=${pageNumber}`),
        queryKey:["inventory","consumedItems",'page',pageNumber]
    })
        
    const isDataHere = Boolean(response?.invConsumeItems?.data) && isSuccess


    const tableHeadCells = [
        "horse name",
        "item name",
        "quantity",
        "price",
        "measure"
        // THIS IS NOT THE REAL KEYS
    ]

    const tableBodyItemCellKeys = [
        "hourseId",
        "invConsumedItemName",
        "invConsumedQuantity",
        "invConsumedPrice",
        "invConsumedMeasure"
                // THIS IS NOT THE REAL KEYS

    ]
    // STILL YA BRO
    const tableBodyItems = response?.invConsumeItems?.data//.map((item:any) => ({
    //     ...item,
    //     hourseId:item.hourseId?.hourseName || "no-horse"
    // }))
    
    
    const navigationTabs = [
        {
            href:`individual`,
            label:"individual"
        },
        {
            href:`family`,
            label:"family"
        },
    ]

    return (
        <>
            <PageHeader
                title={"stable's membership"}
                addNewButtonLabel="add individual membership"
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
                            route={individualMembershipRoute}
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

export default IndividualMembershipPage