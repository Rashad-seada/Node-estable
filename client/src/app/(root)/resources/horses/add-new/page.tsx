"use client"

import AddNewHorsePageContent from "@/components/content/resources/horses/add-new/AddNewHorsePageContent"
import PageHeader from "@/components/layout/PageHeader"
import { horsesRoute, horseCategoriesRoute } from "@/constants/api"
import { useGetClients } from "@/hooks/useGetClients"
import { useGetHorses } from "@/hooks/useGetHorses"
import { usePopUp } from "@/hooks/usePopUp"
import { httpGetServices } from "@/services/httpGetService"
import { httpPostService } from "@/services/httpPostService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { toNameAndId } from "@/utils/toNameAndId"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation, useQuery } from "react-query"

function AddNewHorsePage() {
    
    const [name,setName] = useState<string>('')
    const [note,setNote] = useState<string>('')
    const [client,setClient] = useState<NameAndId>(null)
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [groom,setGroom] = useState<NameAndId>(null)
    const [clients,setClients] = useState<NameAndId[]|[]>([])
    const [horses,setHorses] = useState<NameAndId[]|[]>([])
    const [horseCategory,setHorseCategory] = useState<NameAndId>(null)
    const [horseCategories,setHorseCategories] = useState<NameAndId[]|[]>([])

    const isInputsValid = Boolean(name && note && client && age && gender )
    const popUp = usePopUp()
    const router = useRouter()

    const {mutate}= useMutation({
        mutationFn:async () => httpPostService(horsesRoute,JSON.stringify({
            hourseName:name,
            note,
            clientId:client?.id,
            age,
            gender:gender?.name,
            groom:groom?.id,
            catigoryId:horseCategory?.id,
        })),
        mutationKey:["addNewHorse"],
        onSuccess:async (res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"horse added successfully",
                    popUpTitle:"added successfully ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/resources/horses")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed ",
                    popUpIcon:<MdErrorOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            }
        }
    })

    useGetClients({
        onSuccess:(data) => {
            const clientsOptions = toNameAndId(data.data.client,"username","_id")            
            setClients(clientsOptions)
        },
    })

    
    useGetHorses({
        onSuccess(data) {
            const horsesOptions = toNameAndId(data.data.hourse,"hourseName","_id") 
                                   
            setHorses(horsesOptions)
        },
    })

    useQuery({
        queryKey:["allHorseCategories"],
        queryFn:async () => httpGetServices(horseCategoriesRoute),
        onSuccess(data) {
            const horseCategoriesOptions = toNameAndId(data.data,"displayName","_id")                                    
            setHorseCategories(horseCategoriesOptions)
        },
    })
    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's horses / 
                        <span className="text-primary">add new horse</span>
                    </span>
                )}
                showBackButton={true}
            />
            <AddNewHorsePageContent
                isInputsValid={isInputsValid}
                name={name}
                setName={setName}
                client={client}
                setClient={setClient}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                groom={groom}
                setGroom={setGroom}
                note={note}
                setNote={setNote}
                handleAddNewHorse={mutate}
                clients={clients}
                horses={horses}
                horseCategory={horseCategory}
                setHorseCategory={setHorseCategory}
                horseCategories={horseCategories}
            />
        </>
    )
}

export default AddNewHorsePage