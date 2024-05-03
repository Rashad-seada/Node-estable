"use client"

import Input from '@/components/shared/all/Input'
import Loader from '@/components/shared/all/Loader'
import PageContent from '@/components/shared/all/PageContent'
import { updateAdminRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPatchService } from '@/services/httpPatchService'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

type setInputState = (newState:string) => void

type SettingsPageContentProps = {
    avatar:string,
    setAvatar:setInputState,
    email:string,
    setEmail:setInputState,
    fullName:string,
    setAddress:setInputState,
    address:string,
    setFullName:setInputState,
    mobile:string,
    setMobile:setInputState
}


type InputType = {
    value:string,
    placeholder:string,
    type:"number" | "text" | "password" | "datetime-local",
    label:string,
    setValue:(newState:string) => void,
}
function SettingsPageContent({
    avatar,
    setAvatar,
    email,
    setEmail,
    fullName,
    setAddress,
    address,
    setFullName,
    mobile,
    setMobile
}:SettingsPageContentProps) {
    const popUp = usePopUp()

    const handleAdminUpdate =(e:any) => {
        const btn = e.target as HTMLButtonElement
        btn.disabled = true
        
        const updateAdminData = async() => {
            const res = await httpPatchService(updateAdminRoute,JSON.stringify({
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
                popUpMessage:"you can continue",
                popUpTitle:"data updated successfully",
                popUpIcon:<IoMdCheckmarkCircleOutline />,
            })
            setFullName(data.fullName)
            setEmail(data.email)
            setMobile(data.mobile)
            setAddress(data.address)
            setAvatar(data.avatar)
            
            btn.disabled = false

        }
        updateAdminData()
    }

    const inputs:InputType[] = [
        {
            value:fullName,
            placeholder:"edit full name",
            type:"text",
            label:"full name   :",
            setValue:setFullName,
        },
        {
            value:email,
            placeholder:"edit email",
            type:"text",
            label:"email           :",
            setValue:setEmail,
        },
        {
            value:address,
            placeholder:"edit address",
            type:"text",
            label:"address      :",
            setValue:setAddress,
        },
        {
            value:mobile,
            placeholder:"edit mobile",
            type:"number",
            label:"mobile         :",
            setValue:setMobile,
        },
    ]

    return (
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

                    <div className='w-full p-16 gap-x-20 gap-y-7 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] flex-1'>
                        

                        {
                            inputs.map((input,idx:number) => (
                                <div key={idx}>
                                    <Input
                                        value={input.value} 
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        label={input.label}
                                        setValue={input.setValue}
                                        labelClassName='text-2xl text-dark-grey font-semibold'
                                        className='border w-full border-solid placeholder:text-dark-grey placeholder:text-opacity-45 border-dark-grey border-opacity-40 rounded-lg text-xl h-[40px] bg-transparent p-3'
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <button
                        className='w-[350px] mx-auto mb-[70px] text-2xl rounded-2xl duration-300 hover:text-smokey-white hover:bg-primary h-[60px] border capitalize border-primary text-primary font-semibold'
                        onClick={handleAdminUpdate}
                    >
                        save
                    </button>
                </div>
            </Loader>
        </PageContent>
    )
}

export default SettingsPageContent


