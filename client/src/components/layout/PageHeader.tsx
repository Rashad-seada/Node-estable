"use client"
import React from 'react'
import Avatar from '../shared/all/Avatar'
import Link from 'next/link'
import { GrAdd } from 'react-icons/gr'
import DropDownList from '../shared/all/DropDownList'
import BackButton from '../shared/all/BackButton'
import { usePathname } from 'next/navigation'


type PageHeaderProps = {
    dropDown?:{
        listValue:NameAndId,
        setListValue:(newValue:NameAndId) => void,
        options:NameAndId[]|[],
        placeholder:string,
        placeholderClassName?:string,
    },
    addNewButtonLabel?:string,
    title:any,
    showBackButton?:boolean
}
function PageHeader({dropDown,addNewButtonLabel,title,showBackButton}:PageHeaderProps) {

    const pathname = usePathname()
    return (
        <div className='w-full flex items-center h-[80px]'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    {
                        showBackButton ? (<BackButton/>) : <></>
                    }
                    <h4 className='text-smokey-white text-2xl'>{title}</h4>
                </div>

                <div className='flex h-[35px] gap-5'>
                    
                    {
                        Boolean(dropDown) ? (
                            <div className='h-[35px] border-primary rounded-lg border'>
                                <DropDownList
                                    listValue={dropDown?.listValue||null} 
                                    setListValue={dropDown?.setListValue || function(){}} 
                                    placeholder={dropDown?.placeholder||""}
                                    options={dropDown?.options||[]}
                                    placeholderClassName={`${dropDown?.placeholderClassName} min-w-[130px] px-4 py-2 text-smokey-white`}
                                />
                            </div>
                        ) :<></>
                    }

                    {
                        Boolean(addNewButtonLabel) ? (
                            <div className='w-fit p-4 cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                                <Link
                                    className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' 
                                    href={`${pathname}/add-new`} 
                                >
                                    <GrAdd />
                                    <span>{addNewButtonLabel}</span>
                                </Link>
                            </div>
                        ) :<></>
                    }
                    
                    <Avatar/>
                </div>
            </div>
        </div>
    )
}

export default PageHeader