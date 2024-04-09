import { redirect } from 'next/navigation'
import React from 'react'

function AuthLayout({children}:Children) {
    

    const isAuthenticated :boolean = false

    if (isAuthenticated) {
        return redirect("/")
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout