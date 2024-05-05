"use client"

import AddNewMedicalMedicinePageContent from "@/components/content/sales/medical/medicine/AddNewMedicalMedicinePageContent"
import PageHeader from "@/components/layout/PageHeader"
import { medicineMedicalRoute } from "@/constants/api"
import { usePopUp } from "@/hooks/usePopUp"
import { httpPostService } from "@/services/httpPostService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function AddNewMedicalMedicinePage() {
    const [itemName,setItemName] = useState<string>('')
    const [quantity,setQuantity] = useState<string>('')
    const [price,setPrice] = useState<string>('')
    const [dosage,setDosage] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const [type,setType] = useState<NameAndId>(null)

    const isInputsValid : boolean = Boolean(dosage && itemName && price && quantity && description && type)
    
    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(medicineMedicalRoute,JSON.stringify({
            name:itemName,
            quantity,
            type:type?.name,
            price,
            dosage,
            discription:description,
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
                router.push("/sales/medical/medicine")
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
                        stable's medical /
                        <span className="text-primary">add medicine</span>
                    </span>
                )}
                showBackButton={true}
            />
            <AddNewMedicalMedicinePageContent
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                description={description}
                setDescription={setDescription}
                type={type}
                setType={setType}
                dosage={dosage}
                setDosage={setDosage}
                handleAddMedicalMedicine={mutate}
                isInputsValid={isInputsValid}
            
            />
        </>
    )
}

export default AddNewMedicalMedicinePage