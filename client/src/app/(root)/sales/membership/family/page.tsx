"use client"

import PageHeader from "@/components/layout/PageHeader"
import Loader from "@/components/shared/all/Loader"
import NavigationTabs from "@/components/shared/all/NavigationTabs"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { familyMembershipRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function FamilyMembershipPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${familyMembershipRoute}?page=${pageNumber}`),
        queryKey:["inventory","consumedItems",'page',pageNumber]
    })
        console.log(response);
        
    const isDataHere = Boolean(response?.familyMembership?.data) && isSuccess


    const tableHeadCells = [
        "family name",
        "members",
        "membership type",
        "start date",
        "end date",
        "status"
        // THIS IS NOT THE REAL KEYS
    ]

    const tableBodyItemCellKeys = [
        "famillyName",
        "members",
        "membershipTtpe",
        "startDate",
        "endDate",
        "status"
                // THIS IS NOT THE REAL KEYS

    ]

    const tableBodyItems = response?.familyMembership?.data.map((item:any) => ({
        ...item,
        status:(<span className={item.status.toLowerCase() === "active" ? "text-green-500" : "text-red-500"}>
            {item.status}
        </span>)
    }))
    
    
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
                addNewButtonLabel="add family membership"
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
                            route={familyMembershipRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.familyMembership.max_pages}
                            currentPage={response.familyMembership.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default FamilyMembershipPage