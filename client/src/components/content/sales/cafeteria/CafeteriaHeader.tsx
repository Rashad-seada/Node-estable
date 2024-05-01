"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import PageHeader from '../../../shared/all/PageHeader'
import Link from 'next/link'
import Avatar from '../../../shared/all/Avatar'
import { GrAdd } from 'react-icons/gr'

function CafeteriaHeader() {
    const pathname = usePathname()

    return (
        <PageHeader>
            <div className='w-full flex justify-between items-center'>
                <h4 className='text-smokey-white text-2xl'>stable's cafeteria</h4>
                <div className='flex h-[35px] gap-5'>

                    <div className='w-fit p-4 cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                        <Link className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' href={`${pathname}/add-new`}>
                            <GrAdd />
                            <span>add item</span>
                        </Link>
                    </div>
                    
                    <Avatar/>
                </div>
            </div>
        </PageHeader>
      
    )
    
}

export default CafeteriaHeader