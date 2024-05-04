"use client"

import AddConsumedItemPageContent from "@/components/content/sales/cafeteria/consumed-item/AddConsumedItemPageContent"
import PageHeader from "@/components/layout/PageHeader"
import { cafeteriaConsumedItemRoute } from "@/constants/api"
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

function AddNewConsumedItemPage() {
    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [price,setPrice] = useState<string>("")
    const [payment,setPayment] = useState<NameAndId>(null)
    const [client,setClient] = useState<NameAndId>(null)
    const [date,setDate] = useState<string>("")
    const [clients,setClients] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean(itemName && quantity && price && date)

    const popUp = usePopUp()
    const router = useRouter()

    useGetClients({
        onSuccess:async (res) => {
            const resData = await res
            const data = resData.data.client
            if (Boolean(data)) {
                const clients = toNameAndId(data,"username","_id")
                setClients(clients)
            }
        }
    })

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(cafeteriaConsumedItemRoute,JSON.stringify({
            consumedItemName:itemName,
            consumedQuantity:quantity,
            consumedPrice:price,
            date,
            type:"not-type",
            clientId:client?.id,
            consumedPayment:payment?.name
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
                router.push("/sales/cafeteria/consumed-item")
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

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's cafeteria / 
                        <span className="text-primary"> add consumed item</span> 
                    </span>
                )}
                showBackButton={true}
            />
            <AddConsumedItemPageContent
                handleAddNewConsumedItem={mutate}
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                date={date}
                setDate={setDate}
                isInputsValid={isInputsValid} 
                client={client}
                setClient={setClient}
                payment={payment}
                setPayment={setPayment}     
                clients={clients}
            />
        </>
    )
}

export default AddNewConsumedItemPage