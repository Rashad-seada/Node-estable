'use client'

import { AuthProviderData, useAuthProvider } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function AuthLayout({children}:Children) {
    

    const auth :AuthProviderData = useAuthProvider()

    useEffect(()=>{
        if (auth?.isAuth) {
            return redirect("/")
        }
    },[auth?.isAuth])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout