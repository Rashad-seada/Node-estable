"use client"

import Avatar from '@/components/shared/Avatar';
import BackButton from '@/components/shared/BackButton';
import PageContent from '@/components/shared/PageContent';
import PageHeader from '@/components/shared/PageHeader';
import { httpGetServices } from '@/services/httpGetService';
import { useParams } from 'next/navigation';
import React from 'react'
import { useQuery } from 'react-query';

function ClientEditPage() {
    const {clientId} = useParams()
    const clientRoute = `/client/${clientId}`
    const {status,data} = useQuery({
        queryFn:async() => httpGetServices(clientRoute),
        queryKey:["clients",clientId]
    })
    console.log(data);
    

    return (
        <>
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton href='/resources/clients'/>
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's client / </span>
                            <span className='text-primary'> Edit client information</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <PageContent>
                
                <div></div>
                
            </PageContent>
        </>
    )
}

export default ClientEditPage