"use client"

import PageHeader from "@/components/layout/PageHeader"
import Loader from "@/components/shared/all/Loader"
import PageContent from "@/components/shared/all/PageContent"
import PaginationButtons from "@/components/shared/all/PaginationButtons"
import Table from "@/components/shared/all/Table"
import { packagesRoute } from "@/constants/api"
import { httpGetServices } from "@/services/httpGetService"
import { getReadableDate } from "@/utils/getReadableDate"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"

function PackagesPage() {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("page") || "1"

    const {data:response,isSuccess,refetch}:any = useQuery({
        queryFn:async () => httpGetServices(`${packagesRoute}?page=${pageNumber}`),
        queryKey:["inventory","consumedItems",'page',pageNumber]
    })
        console.log(response);
        
    const isDataHere = Boolean(response?.Packages?.data) && isSuccess


    const tableHeadCells = [
        "client name",
        "category",
        "lessons",
        "start date",
        "end date",
        "status"
    ]

    const tableBodyItemCellKeys = [
        "clientId",
        "category",
        "lessons",
        "startDate",
        "endDate",
        "status"
    ]

    const tableBodyItems = response?.Packages?.data.map((item:any) => ({
        ...item,
        clientId:item.clientId?.username || "no-client",
        startDate:getReadableDate(item.startDate),
        endDate:getReadableDate(item.endDate),
    }))
    
    
   

    return (
        <>
            <PageHeader
                title={"stable's package"}
                addNewButtonLabel="add package"
            />
            <div className='h-[calc(100%-80px)] w-full'>
                <PageContent className='overflow-y-hidden pt-5'>
                    <Loader size={300} isLoading={!isDataHere}>
                        <Table 
                            tableBodyItemCellKeys={tableBodyItemCellKeys} 
                            tableBodyItems={tableBodyItems} 
                            tableHeadCells={tableHeadCells} 
                            isCrud={true}
                            refetch={refetch}
                            route={packagesRoute}
                        />
                    </Loader>
                </PageContent>
                {
                    isDataHere ? (
                        <PaginationButtons
                            maxPages={response.Packages.max_pages}
                            currentPage={response.Packages.current_page}

                        />
                    ): <></>
                }
            </div>
        </>
    )
}

export default PackagesPage