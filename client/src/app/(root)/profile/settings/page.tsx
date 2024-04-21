"use client"

import SettingsPageContent from '@/components/content/profile/settings/SettingsPageContent'
import Avatar from '@/components/shared/all/Avatar'
import PageHeader from '@/components/shared/all/PageHeader'
import { getAdminRoute } from '@/constants/api'
import { httpGetServices } from '@/services/httpGetService'
import React, { useEffect, useState } from 'react'


function SettingsPage() {

    const [fullName,setFullName] = useState<string>('')
    const [mobile,setMobile] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [avatar,setAvatar] = useState<string>('')
    const [address,setAddress] = useState<string>('')


    useEffect(()=>{

        const fetchData = async () => {
            const {data} = await httpGetServices(getAdminRoute)
            setFullName(data.fullName)
            setEmail(data.email)
            setMobile(data.mobile)
            setAddress(data.address)
            setAvatar(data.avatar)
        }
        fetchData()
    },[])



    return (
        <>
            <PageHeader>
                <div className='flex w-full justify-between items-center'>
                    <h4 className='text-smokey-white text-2xl'>settings</h4>
                    <Avatar/>
                </div>
            </PageHeader>
            <SettingsPageContent
                fullName={fullName}
                setAddress={setAddress}
                setAvatar={setAvatar}
                setEmail={setEmail}
                setMobile={setMobile}
                setFullName={setFullName}
                address={address}
                avatar={avatar}
                email={email}
                mobile={mobile}
            
            />
        </>
    )
}




export default SettingsPage