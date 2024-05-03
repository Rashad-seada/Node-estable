"use client"
import EditHorsePageContent from '@/components/content/resources/horses/edit/EditHorsePageContent'
import PageHeader from '@/components/layout/PageHeader'
import { horseCategoriesRoute, horsesRoute } from '@/constants/api'
import { useGetClients } from '@/hooks/useGetClients'
import { useGetHorses } from '@/hooks/useGetHorses'
import { usePopUp } from '@/hooks/usePopUp'
import { httpGetServices } from '@/services/httpGetService'
import { httpPatchService } from '@/services/httpPatchService'
import { getClientById } from '@/utils/getClientById'
import { getGender } from '@/utils/getGender'
import { getHorseById } from '@/utils/getHorseById'
import { getHorseCategoryById } from '@/utils/getHorseCategoryById'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { toNameAndId } from '@/utils/toNameAndId'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useMutation, useQuery } from 'react-query'

function HorseEditPage() {

    const {horseId} = useParams()
    const horseIdRoute = `${horsesRoute}/${horseId}`

    
        
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
    const router = useRouter()
    const popUp = usePopUp()

    useEffect(()=>{
        const fetchClient = async () => {
            const res = await httpGetServices(horseIdRoute)
            if (statusCodeIndicator(res.statusCode) === "success") {

                const data = res.data
                if (data) {
                    setName(data.hourseName)
                    setNote(data.note)
                    let category = await getHorseCategoryById(data.catigoryId[0])
                    category = Boolean(category) ? ({
                        name:category.displayName,
                        id:category._id
                    }) : null
                    setHorseCategory(category)
                    
                    let client = await getClientById(data.clientId)
                    client = client ? ({
                        name:client.username,
                        id:client._id
                    }) : null
                    
                    setClient(client)
                    
                    let horse = await getHorseById(data.groom)
                    horse = horse ?( {
                        name:horse?.hourseName,
                        id:horse?._id
                    }) : null 
                    setGroom(horse)
                    setAge(data.age)
                    setGender(getGender(data?.gender))
                    setNote(data.note)
                }
               
            }
            
        }
        fetchClient()
    },[])

    const {mutate}= useMutation({
        mutationFn:async () => httpPatchService(horseIdRoute,JSON.stringify({
            hourseName:name,
            note,
            clientId:client?.id,
            age,
            gender:gender?.name,
            groom:groom?.id,
            catigoryId:horseCategory?.id,
        })),
        onSuccess:async (res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"horse updated successfully",
                    popUpTitle:"updated successfully ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/resources/horses")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
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
            let horsesOptions = toNameAndId(data.data.hourse,"hourseName","_id") 
            
            horsesOptions = horsesOptions.filter((option:any) => option.id !== horseId)
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
                        <span className="text-primary">edit horse</span>
                    </span>
                )}
                showBackButton={true}
            />
            <EditHorsePageContent
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
                handleEditHorse={mutate}
                clients={clients}
                horses={horses}
                horseCategory={horseCategory}
                setHorseCategory={setHorseCategory}
                horseCategories={horseCategories}
            />
        </>
    )
}

export default HorseEditPage