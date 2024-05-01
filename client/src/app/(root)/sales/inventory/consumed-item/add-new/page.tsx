"use client"

import AddNewInvConsumedItemPageContent from '@/components/content/sales/inventory/consumed-item/AddNewInvConsumedItemPageContent'
import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageHeader from '@/components/shared/all/PageHeader'
import { inventoryConsumedItemsRoute } from '@/constants/api'
import { useGetHorses } from '@/hooks/useGetHorses'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPostService } from '@/services/httpPostService'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { toNameAndId } from '@/utils/toNameAndId'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function AddNewConsumedItemPage() {
    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [price,setPrice] = useState<string>("")
    //const [date,setDate] = useState<string>("no-date")
    const [measure,setMeasure] = useState<string>("")
    const [horse,setHorse] = useState<NameAndId>(null)
    const [horses , setHorses] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean(itemName && quantity && price && measure && horse)

    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(inventoryConsumedItemsRoute,JSON.stringify({
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
                    popUpMessage:"item added successfully",
                    popUpTitle:"added successfully ",
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

    useGetHorses({
        onSuccess:(res)=>{
            const horses = toNameAndId(res?.data?.hourse,"hourseName","_id")
            setHorses(horses)
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
                            <span className='text-primary'> add new consumed item</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <AddNewInvConsumedItemPageContent
                handleAddNewConsumedInventoryItem={mutate}
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

export default AddNewConsumedItemPage