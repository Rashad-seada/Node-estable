"use client"
import Avatar from '@/components/shared/Avatar'
import BackButton from '@/components/shared/BackButton'
import PageContent from '@/components/shared/PageContent'
import PageHeader from '@/components/shared/PageHeader'
import { BASE_URL } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import { useParams } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

function HorseEditPage() {

    const {horseId} = useParams()
    const horseRoute = `/hourse/${horseId}`
    const {status,data} = useQuery({
        queryFn:async() => httpGetServices(horseRoute),
        queryKey:["horses",horseId]
    })
    console.log(data);
    

    return (
        <>
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton href='/resources/horses'/>
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's horse / </span>
                            <span className='text-primary'> Edit Horse information</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <PageContent>
                

                
            </PageContent>
        </>
    )
}

export default HorseEditPage