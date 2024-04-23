import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { genders } from '@/constants/genders'
import { memberShipStatuses } from '@/constants/memberShipStatuses'
import { memberShipTypes } from '@/constants/memberShipTypes'
import React from 'react'



type EditClientPageContentProps = {
    isDataHere: boolean,
    name:string,
    setName:(newState:string) => void,
    email:string,
    setEmail:(newState:string) => void,
    age:string,
    setAge:(newState:string) => void,
    phone:string,
    setPhone:(newState:string) => void,
    gender:NameAndId,
    setGender:(newState:NameAndId) => void,
    membershipStatus:NameAndId,
    setMembershipStatus:(newState:NameAndId) => void,
    membershipType:NameAndId,
    setMembershipType:(newState:NameAndId) => void,
    handleClientUpdate:()=>void,
    isInputsValid:boolean
}
function EditClientPageContent({
    isDataHere,
    name,
    setName,
    email,
    setEmail,
    age,
    setAge,
    phone,
    setPhone,
    gender,
    setGender,
    membershipStatus,
    setMembershipStatus,
    membershipType,
    setMembershipType,
    handleClientUpdate,
    isInputsValid
}:EditClientPageContentProps) {
    return (
        <PageContent className='overflow-hidden'>   
            {
                isDataHere ? (
                    <>
                    
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
                            <ResourcesDropList
                                listValue={membershipType}
                                setListValue={setMembershipType}
                                options={memberShipTypes}
                                placeholder='select client membership status'
                                label='membership'
                                
                            />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button onClick={handleClientUpdate} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                                save client 
                            </button>
                        </div>
                    
                    </>
                ) : <div/>
            }

   
        </PageContent>
    )
}

export default EditClientPageContent