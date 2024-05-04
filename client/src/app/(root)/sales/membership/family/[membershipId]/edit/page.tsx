"use client"

import EditFamilyMembershipPageContent from "@/components/content/sales/membership/family/EditFamilyMembershipPageContent"
import PageHeader from "@/components/layout/PageHeader"
import { familyMembershipRoute } from "@/constants/api"
import { useGetClients } from "@/hooks/useGetClients"
import { usePopUp } from "@/hooks/usePopUp"
import { httpPatchService } from "@/services/httpPatchService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function EditFamilyMembershipPage() {
    const [client,setClient] = useState<NameAndId>(null)
    const [clients,setClients] = useState<NameAndId[]|[]>([])
    const [startDate,setStartDate] = useState<string>("")
    const [endDate,setEndDate] = useState<string>("")
    const [familyName,setFamilyName] = useState<string>("")

    const [status,setStatus] = useState<NameAndId>(null)
    const [membershipType,setMembershipType] = useState<NameAndId>(null)

    const isInputsValid = Boolean(client && startDate && endDate && status && membershipType)
    const popUp = usePopUp()
    const router = useRouter()
    const {membershipId} = useParams()
    const familyMembershipIdRoute = `${familyMembershipRoute}/${membershipId}`

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(familyMembershipIdRoute,JSON.stringify({
            // clientId:client?.id,
            // membershipType:membershipType?.name,
            // status:status?.name,
            // startDate,
            // endDate

            //STILL NOT FINiSHED YET
           
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
    return (
        <>
            <PageHeader
                showBackButton={true}
                title={(
                    <span>
                        stable's membership /
                        <span className='text-primary'>edit family membership</span>
                    </span>
                )}
            />
            <EditFamilyMembershipPageContent
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
                handleAddIndividualMembershipItem={mutate}
                isInputsValid={isInputsValid}
                familyName={familyName}
                setFamilyName={setFamilyName}

            />
        </>
    )
}

export default EditFamilyMembershipPage