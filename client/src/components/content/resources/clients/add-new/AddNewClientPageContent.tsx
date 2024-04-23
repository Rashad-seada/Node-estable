"use client"

import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { clientsRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPostService } from '@/services/httpPostService'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

type setInputState = (newState:string) => void

type AddNewClientPageContentProps = {
    name:string,
    setName:setInputState,
    email:string,
    setEmail:setInputState,
    phone:string,
    setPhone:setInputState,
    age:string,
    setAge:setInputState,
    gender:NameAndId,
    setGender:(state:NameAndId)=> void,
    membershipStatus:NameAndId,
    setMembershipStatus:(state:NameAndId)=> void,
    genders:NameAndId[],
    types:NameAndId[],
    statuses:NameAndId[],
    isInputsValid:boolean,
    membershipType:NameAndId,
    setMembershipType:(state:NameAndId)=> void,
}

function AddNewClientPageContent({
    name,
    setAge,
    setEmail,
    setGender,
    setMembershipStatus,
    setName,
    setPhone,
    email,
    gender,
    phone,
    membershipStatus,
    genders,
    types,
    statuses,
    age,
    membershipType,
    setMembershipType,
    isInputsValid,
    
}:AddNewClientPageContentProps) {

    const body = {
        username:name,
        email,
        gender:gender?.name,
        //membershipStatus:membershipStatus?.name,
        //membershipType:membershipType?.name,
        phone,
        age,
        //courses:[]
    }
    const popUp = usePopUp()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn:async () => httpPostService(clientsRoute,JSON.stringify(body)),
        mutationKey:["addNewClient"],
        onSuccess:()=> {
            popUp({
                popUpMessage:"client added successfully",
                popUpTitle:"client added ",
                popUpIcon:<IoMdCheckmarkCircleOutline />,
                showPopUp:true,
                popUpType:"alert"
            })
            router.push("/resources/clients")
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
        <PageContent className='overflow-hidden'>   
                <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>
                    <ResourcesInput
                        value={name} 
                        setValue={setName}
                        placeholder="Enter Client Name"
                        label='name'
                        type='text'
                    />

                    <ResourcesInput
                        value={email} 
                        setValue={setEmail}
                        placeholder="Enter Client Email"
                        label='email'
                        type='text'
                    />

                    <ResourcesInput
                        value={phone} 
                        setValue={setPhone}
                        placeholder="Enter Client Phone"
                        label='phone'
                        type='number'
                    />

                    <ResourcesInput
                        value={age} 
                        setValue={setAge}
                        placeholder="Enter Client Age"
                        label='age'
                        type='number'
                    />
                    <ResourcesDropList
                        listValue={gender}
                        setListValue={setGender}
                        options={genders}
                        placeholder='select client gender'
                        label='gender'
                        
                    />

                    <ResourcesDropList
                        listValue={membershipStatus}
                        setListValue={setMembershipStatus}
                        options={statuses}
                        placeholder='select client membership status'
                        label='membership status'
                        
                    />
                    
                    <ResourcesDropList
                        listValue={membershipType}
                        setListValue={setMembershipType}
                        options={types}
                        placeholder='select client membership type'
                        label='membership type'
                    />
                </div>
                <div className='w-full flex justify-center'>
                    <button onClick={()=> {isInputsValid && mutate()}} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                        add new client 
                    </button>
                </div>

           
            </PageContent>
    )
}

export default AddNewClientPageContent