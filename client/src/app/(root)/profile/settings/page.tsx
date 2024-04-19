"use client"

import Avatar from '@/components/shared/all/Avatar'
import Input from '@/components/shared/all/Input'
import Loader from '@/components/shared/all/Loader'
import PageContent from '@/components/shared/all/PageContent'
import PageHeader from '@/components/shared/all/PageHeader'
import { usePopUp } from '@/hooks/usePopUp'
import { httpGetServices } from '@/services/httpGetService'
import { httpPatchService } from '@/services/httpPatchService'
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

function SettingsPage() {
    const getUserRoute = "/auth/get-admin"
    const updateUserRoute = "/auth/update-admin"

    const [fullName,setFullName] = useState<string>('')
    const [mobile,setMobile] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [avatar,setAvatar] = useState<string>('')
    const [address,setAddress] = useState<string>('')
    const popUp = usePopUp()


    useEffect(()=>{

        const fetchData = async () => {
            const {data} = await httpGetServices(getUserRoute)
            setFullName(data.fullName)
            setEmail(data.email)
            setMobile(data.mobile)
            setAddress(data.address)
            setAvatar(data.avatar)
        }
        fetchData()

    },[])

    const handleUserUpdate =(e:any) => {
        const btn = e.target as HTMLButtonElement
        btn.disabled = true
        
        const updateUserData = async() => {
            const res = await httpPatchService(updateUserRoute,JSON.stringify({
                fullName,
                mobile,
                avatar,
                address,
                email
            }))
            const data = res.data
            popUp({
                showPopUp:true,
                popUpType:"alert",
                popUpMessage:"data updated successfully",
            })
            setFullName(data.fullName)
            setEmail(data.email)
            setMobile(data.mobile)
            setAddress(data.address)
            setAvatar(data.avatar)
            
            btn.disabled = false

        }
        updateUserData()
    }

    return (
        <>
            <PageHeader>
                <div className='flex w-full justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>settings</h4>
                    <Avatar/>
                </div>
            </PageHeader>
            <PageContent>
                <Loader size={300} isLoading={false}>
                    <div className=' flex flex-col w-full'>
                        
                        <div className='h-[350px] flex-col gap-5 w-full flex justify-center items-center'>
                            
                            <div className='border-primary border-2 aspect-square rounded-full w-[120px]'>
                                {
                                    avatar ? 
                                    (<img src={avatar}/>) :
                                    (<FaUserCircle className='w-full text-light-grey h-full'/>)
                                }
                            </div>
                            <p className='font-bold text-dark-grey text-2xl'>{fullName}</p>
                        </div>

                        <div className='w-full p-16 gap-x-20 gap-y-7 grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] flex-1'>
                            <SettingsInput
                                value={fullName} 
                                placeholder="Edit Full Name"
                                type='text'
                                label='full name :'
                                setValue={setFullName}
                            />
                            <SettingsInput
                                value={email} 
                                placeholder="Edit email"
                                type='text'
                                label='email :'
                                setValue={setEmail}
                            />
                            <SettingsInput
                                value={address} 
                                placeholder="Edit address"
                                type='text'
                                label='address :'
                                setValue={setAddress}
                            />
                            <SettingsInput
                                value={mobile} 
                                placeholder="Edit mobile"
                                type='number'
                                label='mobile :'
                                setValue={setMobile}
                                
                            />
                        </div>

                        <button
                            className='w-[350px] mx-auto mb-[70px] text-2xl rounded-2xl duration-300 hover:text-smokey-white hover:bg-primary h-[60px] border capitalize border-primary text-primary font-semibold'
                            onClick={handleUserUpdate}
                        >
                            save
                        </button>
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
    type:"password"|"text"|"number",
    setValue:(newVal:string)=>void
}

const SettingsInput = ({value,type,placeholder,label,setValue}:SettingsInputProps) => {
    return (
        <div className='w-full gap-5 flex flex-col'>
            <Input
                value={value} 
                placeholder={placeholder}
                type={type}
                setValue={setValue}
                label={label}
                labelClassName='text-2xl text-dark-grey font-semibold'
                className='border w-full border-solid placeholder:text-dark-grey placeholder:text-opacity-45 border-dark-grey border-opacity-40 rounded-lg text-xl h-[40px] bg-transparent p-3'
            />
        </div>
    )
}

export default SettingsPage