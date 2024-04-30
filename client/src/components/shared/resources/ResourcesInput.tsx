import React from 'react'
import Input from '../all/Input'

type ResourcesInputProps = {
    value: string,
    setValue: (newValue: string) => void,
    label:string,
    placeholder:string,
    type:"password"|"text"|"number"|"datetime-local"
}
function ResourcesInput({value,type,setValue,label,placeholder}:ResourcesInputProps) {


    return (
        <div className='flex w-full gap-5 items-center justify-between'>
            <div className='w-[200px] text-xl font-semibold flex justify-between items-center'>
                <div className='flex items-center'>
                    <span>{label}</span>
                    <span className='text-red-500 ml-2 text-4xl'>*</span>
                </div>
                <span>:</span>
            </div>
            <Input
                value={value} 
                type={type}
                className='border border-solid placeholder:text-dark-grey placeholder:text-opacity-45 w-[380px] border-dark-grey border-opacity-40 rounded-lg text-xl h-[40px] bg-transparent p-3'
                placeholder={placeholder} 
                setValue={setValue}
            />
        </div>
    )
}

export default ResourcesInput