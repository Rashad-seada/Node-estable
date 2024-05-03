"use client"

import AddNewClientPageContent from '@/components/content/resources/clients/add-new/AddNewClientPageContent'
import PageHeader from '@/components/layout/PageHeader'
import { clientsRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPostService } from '@/services/httpPostService'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function AddNewClientPage() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [membershipStatus,setMembershipStatus] = useState<NameAndId>(null)
    const [membershipType,setMembershipType] = useState<NameAndId>(null)
    
    const isInputsValid = Boolean(name && email && phone && age && gender && membershipStatus)


    const body = {
        username:name,
        email,
        gender:gender?.name,
        membershipStatus:membershipStatus?.name,
        membershipType:membershipType?.name,
        phone,
        age,
    }
    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(clientsRoute,JSON.stringify(body)),
        mutationKey:["addNewClient"],
        onSuccess:async(res)=> {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"client updated successfully",
                    popUpTitle:"client updated ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/resources/clients")
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
        onError:()=> {
            popUp({
                popUpMessage:"failed to add client",
                popUpTitle:"failed",
                popUpIcon:<MdErrorOutline />,
                showPopUp:true,
                popUpType:"alert"
            })
        }
    })
    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's clients /
                        <span className='text-primary'>add new client</span>
                    </span>
                )}
                showBackButton={true}
            />
            <AddNewClientPageContent
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                membershipStatus={membershipStatus}
                setMembershipStatus={setMembershipStatus}
                membershipType={membershipType}
                setMembershipType={setMembershipType}
                isInputsValid={isInputsValid}
                handleAddNewClient={mutate}
            />
        </>
    )
}

export default AddNewClientPage