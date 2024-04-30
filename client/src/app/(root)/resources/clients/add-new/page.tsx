"use client"

import AddNewClientPageContent from '@/components/content/resources/clients/add-new/AddNewClientPageContent'
import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageHeader from '@/components/shared/all/PageHeader'
import { clientsRoute } from '@/constants/api'
import { genders } from '@/constants/genders'
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
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton />
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's client / </span>
                            <span className='text-primary'> add new client</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
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