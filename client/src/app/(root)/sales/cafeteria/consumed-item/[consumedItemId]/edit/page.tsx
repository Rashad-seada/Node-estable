"use client"

import EditConsumedItemPageContent from "@/components/content/sales/consumed-item/EditConsumedItemPageContent"
import Avatar from "@/components/shared/all/Avatar"
import BackButton from "@/components/shared/all/BackButton"
import PageHeader from "@/components/shared/all/PageHeader"
import { cafeteriaConsumedItemRoute } from "@/constants/api"
import { useGetClients } from "@/hooks/useGetClients"
import { usePopUp } from "@/hooks/usePopUp"
import { httpGetServices } from "@/services/httpGetService"
import { httpPatchService } from "@/services/httpPatchService"
import { getCafeteriaItemType } from "@/utils/getCafeteriaItemType"
import { getCafeteriaPayment } from "@/utils/getCafeteriaPayment"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function EditMenuItemPage() {


    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [type,setType] = useState<NameAndId>(null)
    const [price,setPrice] = useState<string>("")
    const [payment,setPayment] = useState<NameAndId>(null)
    const [client,setClient] = useState<NameAndId>(null)
    const [date,setDate] = useState<string>("")
    const [clients,setClients] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean(itemName && quantity && type && price && date)

    const popUp = usePopUp()
    const router = useRouter()
    const {consumedItemId} = useParams()
    const consumedItemIdRoute = `${cafeteriaConsumedItemRoute}/${consumedItemId}`

    useEffect(() => {
        const fetchConsumedItem = async () => {
            const res = await httpGetServices(consumedItemIdRoute)
            if (Boolean(res.data)) {
                const itemData = res.data
                setItemName(itemData.consumedItemName)
                setQuantity(itemData.consumedQuantity)
                setPayment(getCafeteriaPayment(itemData.consumedPayment))
                setType(getCafeteriaItemType(itemData.type))
                setPrice(itemData.consumedPrice)
                setClient({
                    name:itemData.clientId.username,
                    id:itemData.clientId._id
                })
            }
            
        }
        fetchConsumedItem()
    },[])
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
        mutationFn:async () => httpPatchService(consumedItemIdRoute,JSON.stringify({
            consumedItemName:itemName,
            consumedQuantity:quantity,
            type:type?.name,
            consumedPrice:price,
            date,
            clientId:client?.id,
            consumedPayment:payment?.name
        })),
        onSuccess:(res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"item updated successfully",
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
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton />
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's client / </span>
                            <span className='text-primary'>edit consumed item</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <EditConsumedItemPageContent
                handleUpdateConsumedItem={mutate}
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                date={date}
                setDate={setDate}
                type={type}
                setType={setType}
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

export default EditMenuItemPage