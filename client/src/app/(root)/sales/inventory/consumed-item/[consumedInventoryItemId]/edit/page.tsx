"use client"

import EditInvConsumedItemPageContent from "@/components/content/sales/inventory/consumed-item/EditInvConsumedItemPageContent"
import PageHeader from "@/components/layout/PageHeader"
import Avatar from "@/components/shared/all/Avatar"
import BackButton from "@/components/shared/all/BackButton"
import { inventoryConsumedItemsRoute } from "@/constants/api"
import { useGetHorses } from "@/hooks/useGetHorses"
import { usePopUp } from "@/hooks/usePopUp"
import { httpGetServices } from "@/services/httpGetService"
import { httpPatchService } from "@/services/httpPatchService"
import { getHorseById } from "@/utils/getHorseById"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function EditInvConsumedItemPage() {
    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [price,setPrice] = useState<string>("")
    //const [date,setDate] = useState<string>("no-date")
    const [measure,setMeasure] = useState<string>("")
    const [horse,setHorse] = useState<NameAndId>(null)
    const [horses , setHorses] = useState<NameAndId[]|[]>([])
    const {consumedInventoryItemId} = useParams()
    const inventoryConsumedItemIdRoute = `${inventoryConsumedItemsRoute}/${consumedInventoryItemId}`

    const isInputsValid = Boolean(itemName && quantity && price && measure && horse)

    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(inventoryConsumedItemIdRoute,JSON.stringify({
            invConsumedItemName:itemName,
            invConsumedQuantity:quantity,
            invConsumedPrice:price,
            date:"no-date",
            invConsumedMeasure:measure,
            hourseId:horse?.id
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
                router.push("/sales/inventory/consumed-item")
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

    useEffect(()=>{
        const fetchInvConsumedItemData =async () => {
            const consumedItemData = await httpGetServices(inventoryConsumedItemIdRoute)
            if (Boolean(consumedItemData.data)) {
                const itemData = consumedItemData.data
                setItemName(itemData.invConsumedItemName)
                setQuantity(itemData.invConsumedQuantity)
                setPrice(itemData.invConsumedPrice)
                setMeasure(itemData.invConsumedMeasure)
                setHorse({
                    name:itemData.hourseId.hourseName,
                    id:itemData.hourseId._id
                })
                
            }
        }
        fetchInvConsumedItemData()
    },[])

    useGetHorses({
        onSuccess:(res)=>{
            const horses = toNameAndId(res?.data?.hourse,"hourseName","_id")
            setHorses(horses)
        }
    })

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's inventory /
                        <span className='text-primary'>edit item</span>
                    </span>
                )}
                showBackButton={true}
            />
            <EditInvConsumedItemPageContent
                handleUpdateConsumedInventoryItem={mutate}
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                isInputsValid={isInputsValid}  
                measure={measure}
                setMeasure={setMeasure}
                horse={horse}
                setHorse={setHorse}
                horses={horses}          
            />
        </>
    )
}

export default EditInvConsumedItemPage