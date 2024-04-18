import Avatar from '@/components/shared/all/Avatar'
import DropDownList from '@/components/shared/all/DropDownList'
import PageHeader from '@/components/shared/all/PageHeader'
import Link from 'next/link'
import React from 'react'
import { GrAdd } from 'react-icons/gr'

type HorsesPageHeaderProps = {
    dropDownListOptions:NameAndId[],
    dropDownListValue:NameAndId,
    setDropDownListValue: (value:NameAndId) => void,
}
function HorsesPageHeader({dropDownListOptions,dropDownListValue,setDropDownListValue}:HorsesPageHeaderProps) {
    return (
        <PageHeader>
            <div className='w-full flex justify-between items-center'>
                <h4 className='text-smokey-white text-2xl'>stable's horse</h4>
                <div className='flex h-[35px] gap-5'>
                    
                    <div className=' h-[35px]'>
                        <DropDownList
                            listValue={dropDownListValue} 
                            setListValue={setDropDownListValue} 
                            placeholder='horse name' 
                            options={dropDownListOptions}
                            placeholderClassName='text-smokey-white border-primary border rounded-lg p-4'
                        />
                    </div>

                    <div className='w-[150px] cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                        <Link className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' href='/resources/horses/add-new'>
                            <GrAdd />
                            <span>add horse</span>
                        </Link>
                    </div>
                    
                    <Avatar/>
                </div>
            </div>
        </PageHeader>
    )
}

export default HorsesPageHeader