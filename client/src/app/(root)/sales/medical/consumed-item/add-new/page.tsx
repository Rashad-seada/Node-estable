"use client"

import AddConsumedMedicalItemPageContent from "@/components/content/sales/medical/consumed-item/AddConsumedMedicalItemPageContent"
import PageHeader from "@/components/layout/PageHeader"
import { consumedMedicalRoute } from "@/constants/api"
import { useGetHorses } from "@/hooks/useGetHorses"
import { usePopUp } from "@/hooks/usePopUp"
import { httpPostService } from "@/services/httpPostService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function AddConsumedMedicalItemPage() {
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

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(consumedMedicalRoute,JSON.stringify({
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
                    popUpMessage:"item added successfully",
                    popUpTitle:"added successfully ",
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

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's medical /
                        <span className="text-primary">add consumed</span>
                    </span>
                )}
                showBackButton={true}
            />
            <AddConsumedMedicalItemPageContent
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
                handleAddConsumedMedicalItem={mutate}
                isInputsValid={isInputsValid}
            
            />
        </>
    )
}

export default AddConsumedMedicalItemPage