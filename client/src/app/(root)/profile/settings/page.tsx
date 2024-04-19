"use client"

import Avatar from '@/components/shared/all/Avatar'
import Loader from '@/components/shared/all/Loader'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import { httpGetServices } from '@/services/httpGetService'
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useQuery } from 'react-query'

function SettingsPage() {
    const adminRoute = "/auth/get-admin"


    const {isSuccess,data:response} = useQuery({
        queryKey:["settings"],
        queryFn:async () => httpGetServices(adminRoute),
    }) 
    
    const data = response?.data
    const isDataHere = Boolean(data) && isSuccess

    return (
        <>
            <PageHeader>
                <div className='flex w-full justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>settings</h4>
                    <Avatar/>
                </div>
            </PageHeader>
            <PageContent>
                <Loader size={300} isLoading={!isDataHere}>
                    <div className='h-full my-[70px] flex flex-col w-full'>
                        
                        <div className='h-[350px] flex-col gap-5 w-full flex justify-center items-center'>
                            
                            <div className='border-primary border-2 aspect-square rounded-full w-[120px]'>
                                {
                                    data?.avatar ? 
                                    (<img src={data.avatar}/>) :
                                    (<FaUserCircle className='w-full text-light-grey h-full'/>)
                                }
                            </div>
                            <p className='font-bold text-dark-grey text-2xl'>{data?.fullName}</p>
                        </div>

                        <div className='w-full p-16 gap-x-20 gap-y-7 grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] flex-1'>
                            <SettingsInput
                                value={data?.fullName} 
                                placeholder="Edit Full Name"
                                type='text'
                                label='full name :'
                            />
                            <SettingsInput
                                value={data?.email} 
                                placeholder="Edit email"
                                type='text'
                                label='email :'
                            />
                            <SettingsInput
                                value={data?.address} 
                                placeholder="Edit address"
                                type='text'
                                label='address :'
                            />
                            <SettingsInput
                                value={data?.mobile} 
                                placeholder="Edit mobile"
                                type='number'
                                label='mobile :'
                            />
                        </div>
                    </div>
                </Loader>
            </PageContent>
        </>
    )
}


type SettingsInputProps = {
    value: string,
    label:string,
    placeholder:string,
    type:"password"|"text"|"number"
}

const SettingsInput = ({value,type,placeholder,label}:SettingsInputProps) => {
    return (
        <div className='w-full gap-5 flex flex-col'>
            <label htmlFor="" className='text-2xl text-dark-grey font-semibold'>
                {label}
            </label>
            <input
                defaultValue={value} 
                placeholder={placeholder}
                type={type}
                className='border w-full border-solid placeholder:text-dark-grey placeholder:text-opacity-45 border-dark-grey border-opacity-40 rounded-lg text-xl h-[40px] bg-transparent p-3'
            />
        </div>
    )
}

export default SettingsPage