"use client"

import EditIndividualMembershipPageContent from '@/components/content/sales/membership/individual/EditIndividualMembershipPageContent'
import PageHeader from '@/components/layout/PageHeader'
import { individualMembershipRoute } from '@/constants/api'
import { useGetClients } from '@/hooks/useGetClients'
import { usePopUp } from '@/hooks/usePopUp'
import { httpGetServices } from '@/services/httpGetService'
import { httpPatchService } from '@/services/httpPatchService'
import { getIsoDate } from '@/utils/getIsoDate'
import { getMembershipStatus } from '@/utils/getMembershipStatus'
import { getMembershipType } from '@/utils/getMembershipType'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { toNameAndId } from '@/utils/toNameAndId'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function EditIndividualMembershipPage() {
    const [client,setClient] = useState<NameAndId>(null)
    const [clients,setClients] = useState<NameAndId[]|[]>([])
    const [startDate,setStartDate] = useState<string>("")
    const [endDate,setEndDate] = useState<string>("")
    const [status,setStatus] = useState<NameAndId>(null)
    const [membershipType,setMembershipType] = useState<NameAndId>(null)
    const {membershipId} = useParams()
    const individualMembershipIdRoute = `${individualMembershipRoute}/${membershipId}`

    const isInputsValid = Boolean(client && startDate && endDate && status && membershipType)
    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(individualMembershipIdRoute,JSON.stringify({
            clientId:client?.id,
            membershipType:membershipType?.name,
            status:status?.name,
            startDate,
            endDate
           
        })),
        onSuccess:(res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"item updated successfully",
                    popUpTitle:"updated successfully ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/sales/membership/individual")
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
        const fetchMembershipData = async () => {
            const membership = await httpGetServices(individualMembershipIdRoute)
            const data = membership.data
            
            if (Boolean(data)) {
                const client = Boolean(data.clientId) ? ({
                    name:data.clientId.username,
                    id:data.clientId._id
                }) : null
                setClient(client)
                setStartDate(getIsoDate(data.startDate))
                setEndDate(getIsoDate(data.endDate))
                setStatus(getMembershipStatus(data.status))
                setMembershipType(getMembershipType(data.membershipType))
            }
            
        }
        fetchMembershipData()
    },[])
    return (
        <>
            <PageHeader
                showBackButton={true}
                title={(
                    <span>
                        stable's membership /
                        <span className='text-primary'>edit individual membership</span>
                    </span>
                )}
            />
            <EditIndividualMembershipPageContent
                client={client}
                setClient={setClient}
                clients={clients}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                status={status}
                setStatus={setStatus}
                membershipType={membershipType}
                setMembershipType={setMembershipType}
                handleUpdateIndividualMembershipItem={mutate}
                isInputsValid={isInputsValid}

            />
        </>
    )
}

export default EditIndividualMembershipPage