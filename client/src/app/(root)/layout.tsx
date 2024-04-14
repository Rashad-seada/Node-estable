'use client'

import SideNav from '@/components/layout/sideNav/SideNav'
import { AuthProviderData, useAuthProvider } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

function DashboardLayout({children}:Children) {

    const auth :AuthProviderData = useAuthProvider()
  
    useEffect(()=>{
        if (!auth?.isAuth) {
            return redirect("/login")
        }
    },[auth?.isAuth])

    return (
        <main className='w-full h-screen overflow-hidden flex items-center justify-center '>
            
            <div className='w-[95%] h-[95%] flex items-center justify-center gap-5'>
                <SideNav/>
                <div className='h-full overflow-auto flex-1'>
                    {
                        children
                    }
                </div>
            </div>
        
        </main>
    )
}

export default DashboardLayout