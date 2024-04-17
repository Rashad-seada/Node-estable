"use client"

import Avatar from '@/components/shared/all/Avatar'
import DropDownList from '@/components/shared/all/DropDownList'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import RoutingLink from '@/components/shared/all/RoutingLink'
import { httpGetServices } from '@/services/httpGetService'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useQuery } from 'react-query'

function HorsesPage() {

    const horsesRoute = "/hourse"
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,status} = useQuery({
        queryKey:["horses"],
        queryFn:async () => httpGetServices(horsesRoute)
    })

    console.log(response);
    
    
    return (
        <>
            <PageHeader>
                <div className='w-full flex justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>stable's horse</h4>
                    <div className='flex h-[35px] gap-5'>
                        
                        <div className=' h-[35px]'>
                            <DropDownList 
                                listValue={listValue} 
                                setListValue={setListValue} 
                                placeholder='horse name' 
                                options={[]}
                                placeholderClassName='text-smokey-white border-primary border rounded-lg p-4'
                            />
                        </div>

                        <div className='w-[150px] cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                            <RoutingLink className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' href='/resources/horses/add-new' notShowHightLight={true}>
                                <GrAdd />
                                <span>add horse</span>
                            </RoutingLink>
                        </div>
                        
                        <Avatar/>
                    </div>
                </div>
            </PageHeader>

            <PageContent className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]'>
                <div></div>
            </PageContent>
        </>
    )
}

export default HorsesPage