import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { genders } from '@/constants/genders'
import React from 'react'


type EditInstructorPageContentProps = { 
    name:string,
    setName:(state:string)=>void,
    age:string,
    setAge:(state:string)=>void,
    gender:NameAndId,
    setGender:(state:NameAndId)=>void,
    isInputsValid:boolean,
    handleUpdateInstructor:()=>void,
    email:string,
    setEmail:(state:string)=>void,
    phone:string,
    setPhone:(state:string)=>void,
}
function EditInstructorPageContent({
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    isInputsValid,
    handleUpdateInstructor,
    email,
    setEmail,
    phone,
    setPhone,
}:EditInstructorPageContentProps) {
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
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> {isInputsValid && handleUpdateInstructor()}} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    save instructor 
                </button>
            </div>

    
        </PageContent>
    )
}

export default EditInstructorPageContent