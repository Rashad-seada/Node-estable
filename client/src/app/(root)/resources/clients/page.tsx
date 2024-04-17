"use client"

import Avatar from '@/components/shared/all/Avatar'
import DropDownList from '@/components/shared/all/DropDownList'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import RoutingLink from '@/components/shared/all/RoutingLink'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import { httpGetServices } from '@/services/httpGetService'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useQuery } from 'react-query'

function ClientsPage() {


    const clientsRoute = "/client?page=1"
    const [listValue,setListValue] = useState<any>(null)

    const {data:response,isSuccess} = useQuery({
        queryKey:["clients"],
        queryFn:async () => httpGetServices(clientsRoute)
    })

    console.log(response);

    const isDataHere = Boolean(response?.data?.client) && isSuccess

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

            <PageContent className='grid p-10 gap-10 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]'>
                {
                    isDataHere ? (
                        
                        response?.data.client.map((client:any,idx:number) => (
                            <ResourcesCard
                                key={idx}
                                titles={{
                                    age:client.age,
                                    gender:client.gender
                                }}
                                title={client.username}
                                _id={client._id}
                                imgUrl=''
                            />
                        ))
                        
                    ) : (<></>)
                }
            </PageContent>
        </>
    )
}

export default ClientsPage