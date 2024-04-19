"use client"

import Avatar from "@/components/shared/all/Avatar"
import BackButton from "@/components/shared/all/BackButton"
import PageContent from "@/components/shared/all/PageContent"
import PageHeader from "@/components/shared/all/PageHeader"
import ResourcesDropList from "@/components/shared/resources/ResourcesDropList"
import ResourcesInput from "@/components/shared/resources/ResourcesInput"
import { genders } from "@/constants/genders"
import { useState } from "react"

function AddNewHorsePage() {
    
    const [name,setName] = useState<string>('')
    const [note,setNote] = useState<string>('')
    const [client,setClient] = useState<NameAndId>(null)
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [groom,setGroom] = useState<NameAndId>(null)

    const isInputsValid = name && note && client && age && gender && groom

    return (
        <>
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton />
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's horse / </span>
                            <span className='text-primary'> add new horse</span>
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
                        label='horse name'
                        type='text'
                    />
                    <ResourcesInput
                        value={note} 
                        setValue={setNote}
                        placeholder="Enter Note"
                        label='Note'
                        type='text'
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
                        placeholder='Select Client Gender'
                        label='gender'
                        
                    />
                    <ResourcesDropList
                        listValue={groom}
                        setListValue={setGroom}
                        options={genders}
                        placeholder='Select Groom'
                        label='groom'
                        
                    />
                    <ResourcesDropList
                        listValue={client}
                        setListValue={setClient}
                        options={[]}
                        placeholder='Select Client '
                        label='client'
                        
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

export default AddNewHorsePage