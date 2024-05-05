"use client"

import PageHeader from "@/components/layout/PageHeader"
import Loader from "@/components/shared/all/Loader"
import NavigationTabs from "@/components/shared/all/NavigationTabs"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { individualMembershipRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { getReadableDate } from "@/utils/getReadableDate"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function IndividualMembershipPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${individualMembershipRoute}?page=${pageNumber}`),
        queryKey:["membership","individual",'page',pageNumber]
    })
        
    const isDataHere = Boolean(response?.InvMembership?.data) && isSuccess


    const tableHeadCells = [
        "client name",
        "membership type",
        "start date",
        "end date",
        "status"
    ]

    const tableBodyItemCellKeys = [
        "clientId",
        "membershipType",
        "startDate",
        "endDate",
        "status"

    ]
    const tableBodyItems = response?.InvMembership?.data.map((item:any) => ({
        ...item,
        clientId:item.clientId?.username || "no-client",
        status:(<span className={item.status.toLowerCase() === "active" ? "text-green-500" : "text-red-500"}>
            {item.status}
        </span>),
        startDate:getReadableDate(item.startDate),
        endDate:getReadableDate(item.endDate)
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
                            maxPages={response.InvMembership.max_pages}
                            currentPage={response.InvMembership.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default IndividualMembershipPage