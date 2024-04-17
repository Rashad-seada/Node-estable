"use client"

import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { genders } from '@/constants/genders'
import { memberShipStatuses } from '@/constants/memberShipStatuses'
import React, { useState } from 'react'

function AddNewClientPage() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [membershipStatus,setMembershipStatus] = useState<NameAndId>(null)

    const isInputsValid = name && email && phone && age && gender && membershipStatus

    return (
        <>
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton href='/resources/clients'/>
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's client / </span>
                            <span className='text-primary'> add new client</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
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
                        options={memberShipStatuses}
                        placeholder='select client membership status'
                        label='membership'
                        
                    />
                </div>
                <div className='w-full flex justify-center'>
                    <button disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                        add new client 
                    </button>
                </div>

           
            </PageContent>
        </>
    )
}

export default AddNewClientPage