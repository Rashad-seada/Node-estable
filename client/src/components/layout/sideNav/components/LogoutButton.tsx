"use client"

import { useLogout } from '@/hooks/useLogout'
import React from 'react'
import { BiSolidDoorOpen } from 'react-icons/bi'

function LogoutButton() {

    const logout = useLogout()

    return (
        <button onClick={logout} className='border-primary duration-300 hover:bg-primary hover:text-smokey-white py-2 w-5/6 border-solid border-2 flex justify-center items-center rounded-2xl text-primary text-2xl'>
            <BiSolidDoorOpen />
            <span>log out</span>
        </button>
    )
}

export default LogoutButton