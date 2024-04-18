"use client"

import Avatar from '@/components/shared/all/Avatar'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import { httpGetServices } from '@/services/httpGetService'
import React from 'react'
import { useQuery } from 'react-query'

function SettingsPage() {
    const adminRoute = "/user"

    const {isSuccess,data:response} = useQuery({
        queryKey:["settings"],
        queryFn:async () => httpGetServices(adminRoute)
    }) 
    console.log(response);
    

    return (
        <>
            <PageHeader>
                <div className='flex w-full justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>settings</h4>
                    <Avatar/>
                </div>
            </PageHeader>
            <PageContent>
                <div className='h-full'>
                    <div className='h-[350px] w-full flex justify-center items-center'>



                    </div>

                </div>
            </PageContent>
        </>
    )
}

export default SettingsPage