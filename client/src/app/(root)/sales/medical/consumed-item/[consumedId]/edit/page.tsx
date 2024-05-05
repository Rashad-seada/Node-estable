"use client"

import EditConsumedMedicalItemPageContent from "@/components/content/sales/medical/consumed-item/EditConsumedMedicalItemPageContent"
import PageHeader from "@/components/layout/PageHeader"
import { consumedMedicalRoute } from "@/constants/api"
import { useGetHorses } from "@/hooks/useGetHorses"
import { usePopUp } from "@/hooks/usePopUp"
import { httpGetServices } from "@/services/httpGetService"
import { httpPatchService } from "@/services/httpPatchService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function EditConsumedMedicalItem() {
    const [itemName,setItemName] = useState<string>('')
    const [horse,setHorse] = useState<NameAndId>(null)
    const [price,setPrice] = useState<string>('')
    const [quantity,setQuantity] = useState<string>('')
    const [dosage,setDosage] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    
    const [horses,setHorses] = useState<NameAndId[]|[]>([])

    const isInputsValid : boolean = Boolean(dosage && itemName && price && horse && description)
    
    const popUp = usePopUp()
    const router = useRouter()
    const {consumedId} = useParams()
    const consumedMedicalItemRoute = `${consumedMedicalRoute}/${consumedId}`

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(consumedMedicalItemRoute,JSON.stringify({
            hourseId:horse?.id,
            quantity,
            price,
            dosage,
            discription:description,
            medicineName:itemName
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
                router.push("/sales/medical/consumed-item")
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
    useGetHorses({
        onSuccess:async (res) => {
            let horses = res?.data?.hourse
            horses = toNameAndId(horses,"hourseName","_id")
            setHorses(horses)
        }
    })
    useEffect(()=>{
        const fetchConsumedMedicalItemData = async () => {
            const res = await httpGetServices(consumedMedicalItemRoute)
            
            const itemData = res?.data
            if (Boolean(itemData)) {
                setItemName(itemData.medicineName)
                const horse = itemData.hourseId ? (
                    {
                        name:itemData.hourseId.hourseName,
                        id:itemData.hourseId._id
                    }
                ) : null
                setHorse(horse)
                setPrice(itemData.price)
                setQuantity(itemData.quantity)
                setDescription(itemData.discription)
                setDosage(itemData.dosage)
            }
        }
        fetchConsumedMedicalItemData()
    },[])

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's medical /
                        <span className="text-primary">edit consumed</span>
                    </span>
                )}
                showBackButton={true}
            />
            <EditConsumedMedicalItemPageContent
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                description={description}
                horse={horse}
                setHorse={setHorse}
                horses={horses}
                setDescription={setDescription}
                dosage={dosage}
                setDosage={setDosage}
                handleUpdateConsumedMedicalItem={mutate}
                isInputsValid={isInputsValid}
            
            />
        </>
    )
}

export default EditConsumedMedicalItem