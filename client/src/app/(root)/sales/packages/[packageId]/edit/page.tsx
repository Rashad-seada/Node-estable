"use client"

import EditPackagePageContent from '@/components/content/sales/packages/EditPackagePageContent'
import PageHeader from '@/components/layout/PageHeader'
import { packagesRoute } from '@/constants/api'
import { useGetClients } from '@/hooks/useGetClients'
import { usePopUp } from '@/hooks/usePopUp'
import { httpGetServices } from '@/services/httpGetService'
import { httpPatchService } from '@/services/httpPatchService'
import { getIsoDate } from '@/utils/getIsoDate'
import { getPackageCategory } from '@/utils/getPackageCategory'
import { getPackageStatus } from '@/utils/getPackageStatus'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { toNameAndId } from '@/utils/toNameAndId'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function PackageEditPage() {
    const [startDate,setStartDate] = useState<string>("")
    const [endDate,setEndDate] = useState<string>("")
    const [lessons,setLessons] = useState<string>("")

    const [status,setStatus] = useState<NameAndId>(null)
    const [category,setCategory] = useState<NameAndId>(null)

    const [client,setClient] = useState<NameAndId>(null)
    const [clients , setClients] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean( startDate && endDate && status && status && lessons)

    const popUp = usePopUp()
    const router = useRouter()
    const {packageId} = useParams()
    const packageIdRoute = `${packagesRoute}/${packageId}`

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(packageIdRoute,JSON.stringify({
            category:category?.name||"no-category",
            lessons,
            startDate,
            endDate,
            status:status?.name,
            clientName:client?.name,
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

    useEffect(()=>{
        const fetchPackageItem = async () => {
            const res = await httpGetServices(packageIdRoute)
            
            const itemData = res?.Packages?.data
            console.log(itemData);
            
            if (Boolean(itemData)) {
                setCategory(getPackageCategory(itemData.category))
                setStatus(getPackageStatus(itemData.status))
                
                setClient({
                    name:itemData.clientId.username,
                    id:itemData.clientId._id
                })
                setStartDate(getIsoDate(itemData.startDate))
                setEndDate(getIsoDate(itemData.endDate))
                setLessons(itemData.lessons)
            }
        }
        fetchPackageItem()
    },[])


    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's packages /
                        <span className='text-primary'>edit package</span>
                    </span>
                )}
                showBackButton={true}
            />
            <EditPackagePageContent
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
                handleUpdatePackageItem={mutate}
                isInputsValid={isInputsValid}
                lessons={lessons}
            />
        </>
    )
}

export default PackageEditPage