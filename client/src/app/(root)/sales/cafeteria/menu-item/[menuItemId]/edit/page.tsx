"use client"

import EditMenuItemPageContent from "@/components/content/sales/menu-item/EditMenuItemPageContent"
import Avatar from "@/components/shared/all/Avatar"
import BackButton from "@/components/shared/all/BackButton"
import PageHeader from "@/components/shared/all/PageHeader"
import { cafeteriaMenuItemRoute } from "@/constants/api"
import { usePopUp } from "@/hooks/usePopUp"
import { httpGetServices } from "@/services/httpGetService"
import { httpPatchService } from "@/services/httpPatchService"
import { getCafeteriaItemType } from "@/utils/getCafeteriaItemType"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function MenuItemEditPage() {
    
    const {menuItemId} = useParams()
    const menuItemIdRoute = `${cafeteriaMenuItemRoute}/${menuItemId}`
    
    const [itemName,setItemName] = useState<string>("")
    const [quantity,setQuantity] = useState<string>("")
    const [type,setType] = useState<NameAndId>(null)
    const [price,setPrice] = useState<string>("")
    const [date,setDate] = useState<string>("")
    const isInputsValid = Boolean(itemName && quantity && type && price && date)

    const popUp = usePopUp()
    const router = useRouter()

    useEffect(() => {
        const fetchMenuItem = async () => {
            const {data} = await httpGetServices(menuItemIdRoute)
            
            if (Boolean(data)) {
                setItemName(data.menuItemName)
                setType(getCafeteriaItemType(data.type))
                setDate(data.date)
                setPrice(data.price)
                setQuantity(data.quantity)
            }
        }
        fetchMenuItem()
    },[])

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(menuItemIdRoute,JSON.stringify({
            menuItemName:itemName,
            quantity,
            type:type?.name,
            price,
            date
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
                router.push("/sales/cafeteria/menu-item")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed",
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
                            <span className='text-primary'>edit client</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <EditMenuItemPageContent
                itemName={itemName}
                setItemName={setItemName}
                quantity={quantity}
                setQuantity={setQuantity}
                type={type}
                setType={setType}
                price={price}
                setPrice={setPrice}
                date={date}
                setDate={setDate}
                isInputsValid={isInputsValid}
                handleUpdateMenuItem={mutate}
            />
        </>
    )
}

export default MenuItemEditPage