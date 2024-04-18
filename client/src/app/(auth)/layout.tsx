'use client'

import { AuthProviderData, useAuthProvider } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function AuthLayout({children}:Children) {
    

    const auth :AuthProviderData = useAuthProvider()

    useEffect(()=>{
        if (auth?.isAuth) {
            const currentPath = localStorage.getItem('currentPath') || '/'
            return redirect(currentPath)
        }
    },[auth?.isAuth])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout