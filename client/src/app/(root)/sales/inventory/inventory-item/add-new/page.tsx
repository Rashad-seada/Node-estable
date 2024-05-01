"use client"
import AddNewInvItemPageContent from '@/components/content/sales/inventory/inventory-item/AddNewInvItemPageContent'
import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageHeader from '@/components/shared/all/PageHeader'
import { inventoryItemsRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPostService } from '@/services/httpPostService'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function AddNewInventoryItemPage() {
    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [type,setType] = useState<NameAndId>(null)
    const [price,setPrice] = useState<string>("")
    //const [date,setDate] = useState<string>("no-date")
    const [description,setDescription] = useState<string>("")
    const [measure,setMeasure] = useState<string>("")

    const isInputsValid = Boolean(itemName && quantity && type && price && measure && description && description)

    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(inventoryItemsRoute,JSON.stringify({
            itemName,
            quantity,
            type:type?.name,
            price,
            date:"no-date",
            measure,
            itemDescription:description
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
                router.push("/sales/inventory/inventory-item")
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
                            <span>stable's inventory / </span>
                            <span className='text-primary'> add new item</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <AddNewInvItemPageContent
                handleAddNewInventoryItem={mutate}
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                type={type}
                setType={setType}
                isInputsValid={isInputsValid}  
                measure={measure}
                setMeasure={setMeasure}
                description={description}
                setDescription={setDescription}          
            />
        </>
    )
}

export default AddNewInventoryItemPage