"use client"

import AddNewPackagePageContent from "@/components/content/sales/packages/AddNewPackagePageContent"
import PageHeader from "@/components/layout/PageHeader"
import { packagesRoute } from "@/constants/api"
import { useGetClients } from "@/hooks/useGetClients"
import { usePopUp } from "@/hooks/usePopUp"
import { httpPostService } from "@/services/httpPostService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function AddNewPackagePage() {
    const [startDate,setStartDate] = useState<string>("")
    const [endDate,setEndDate] = useState<string>("")
    const [lessons,setLessons] = useState<string>("")

    const [status,setStatus] = useState<NameAndId>(null)
    const [category,setCategory] = useState<NameAndId>(null)

    const [client,setClient] = useState<NameAndId>(null)
    const [clients , setClients] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean(category && startDate && endDate && status && status && lessons)

    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(packagesRoute,JSON.stringify({
            category:category?.name||"no-category",
            lessons,
            startDate,
            endDate,
            status:status?.name,
            clientId:client?.id
        })),
        onSuccess:(res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"item added successfully",
                    popUpTitle:"added successfully ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/sales/packages")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            }
        },
        onError: () => {
            popUp({
                popUpMessage:"error occur ,please try again",
                popUpTitle:"error occur",
                popUpIcon:<MdErrorOutline />,
                popUpType:"alert",
                showPopUp:true,
            })
        }
    })

    useGetClients({
        onSuccess:(res)=>{
            const clients = toNameAndId(res?.data?.client,"username","_id")            
            setClients(clients)
        }
    })

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's packages /
                        <span className='text-primary'>add new item</span>
                    </span>
                )}
                showBackButton={true}
            />
            <AddNewPackagePageContent
                category={category}
                setCategory={setCategory}
                clients={clients}
                setClient={setClient}
                client={client}
                setEndDate={setEndDate}
                setLessons={setLessons}
                setStartDate={setStartDate}
                setStatus={setStatus}
                startDate={startDate}
                status={status}
                endDate={endDate}
                handleAddPackageItem={mutate}
                isInputsValid={isInputsValid}
                lessons={lessons}
            />
        </>
    )
}

export default AddNewPackagePage