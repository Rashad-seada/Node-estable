"use client"

import AddNewClientPageContent from '@/components/content/resources/clients/add-new/AddNewClientPageContent'
import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageHeader from '@/components/shared/all/PageHeader'
import { genders } from '@/constants/genders'



import { toNameAndId } from '@/utils/toNameAndId'
import React, { useState } from 'react'

function AddNewClientPage() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [membershipStatus,setMembershipStatus] = useState<NameAndId>(null)
    const [membershipType,setMembershipType] = useState<NameAndId>(null)

    
    const isInputsValid = Boolean(name && email && phone && age && gender && membershipStatus)


    
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
                genders={genders}
                
            />
        </>
    )
}

export default AddNewClientPage