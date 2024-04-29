"use client"

import Avatar from '@/components/shared/all/Avatar'
import PageHeader from '@/components/shared/all/PageHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GrAdd } from 'react-icons/gr'

function CafeteriaLayout({children}:Children) {
    const pathname = usePathname()

    return (
        <div className='w-full h-full'>
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
            <div className='w-full h-[calc(100%-80px)]'>
                {children}
            </div>
        </div>
    )
}

export default CafeteriaLayout