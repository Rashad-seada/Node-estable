"use client"

import Avatar from '@/components/shared/Avatar'
import DropDownList from '@/components/shared/DropDownList'
import PageContent from '@/components/shared/PageContent'
import PageHeader from '@/components/shared/PageHeader'
import RoutingLink from '@/components/shared/RoutingLink'
import { httpGetServices } from '@/services/httpGetService'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useQuery } from 'react-query'

function ClientsPage() {


    const clientsRoute = "/client?page=1"
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,status} = useQuery({
        queryKey:["clients"],
        queryFn:async () => httpGetServices(clientsRoute)
    })

    console.log(response);

    return (
        <>
            <PageHeader>
                <div className='w-full flex justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>stable's client</h4>
                    <div className='flex h-[35px] gap-5'>
                        
                        <div className=' h-[35px]'>
                            <DropDownList
                                listValue={listValue} 
                                setListValue={setListValue} 
                                placeholder='client name' 
                                options={[]}
                                placeholderClassName='text-smokey-white border-primary border rounded-lg p-4'
                            />
                        </div>

                        <div className='w-[150px] cursor-pointer bg-primary rounded-lg flex justify-center items-center '>
                            <RoutingLink 
                                className='flex w-full gap-2 text-smokey-white text-lg h-full items-center justify-center' 
                                href='/resources/clients/add-new' 
                                notShowHightLight={true}
                            >
                                <GrAdd />
                                <span>add client</span>
                            </RoutingLink>
                        </div>
                        
                        <Avatar/>
                    </div>
                </div>
            </PageHeader>

            <PageContent>
                <div></div>
            </PageContent>
        </>
    )
}

export default ClientsPage