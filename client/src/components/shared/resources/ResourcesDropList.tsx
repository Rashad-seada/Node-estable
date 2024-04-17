import React from 'react'
import DropDownList from '../all/DropDownList'

type ResourcesDropListProps = {
    listValue: NameAndId,
    setListValue: (newValue: NameAndId) => void,
    label:string,
    placeholder:string,
    options:NameAndId[]
}

function ResourcesDropList({listValue,setListValue,label,options,placeholder}:ResourcesDropListProps) {
    return (
        <div className='flex w-full gap-5 items-center justify-between'>
        <div className='w-[200px] text-2xl font-semibold flex justify-between items-center'>
            <span>{label}</span>
            <span>:</span>
        </div>
        <div className='w-[380px] h-[40px]'>
            <DropDownList
                listValue={listValue}
                setListValue={setListValue}
                placeholder={placeholder}
                options={options}
                placeholderClassName='border border-solid text-dark-grey border-dark-grey border-opacity-40 rounded-lg text-xl h-[40px] bg-transparent p-3'
            />
        </div>
        
    </div>
    )
}

export default ResourcesDropList