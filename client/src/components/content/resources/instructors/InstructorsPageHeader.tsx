import Avatar from '@/components/shared/all/Avatar'
import DropDownList from '@/components/shared/all/DropDownList'
import PageHeader from '@/components/shared/all/PageHeader'
import React from 'react'
import { GrAdd } from 'react-icons/gr'
import Link from 'next/link'

type HorsesPageHeaderProps = {
    dropDownListOptions:NameAndId[],
    dropDownListValue:NameAndId,
    setDropDownListValue: (value:NameAndId) => void,
}
function InstructorsPageHeader({dropDownListOptions,dropDownListValue,setDropDownListValue}:HorsesPageHeaderProps) {
    return (
        <PageHeader>
            <div className='w-full flex justify-between items-center'>
                <h4 className='text-smokey-white text-2xl'>stable's instructor</h4>
                <div className='flex h-[35px] gap-5'>
                    
                    <div className='h-[35px]'>
                        <DropDownList
                            listValue={dropDownListValue} 
                            setListValue={setDropDownListValue} 
                            placeholder='instructor name' 
                            options={dropDownListOptions}
                            placeholderClassName='text-smokey-white border-primary border rounded-lg p-4'
                        />
                    </div>

                    <div className='w-[150px] cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                        <Link
                            className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' 
                            href='/resources/instructors/add-new' 
                        >
                            <GrAdd />
                            <span>add instructor</span>
                        </Link>
                    </div>
                    
                    <Avatar/>
                </div>
            </div>
        </PageHeader>
    )
}

export default InstructorsPageHeader