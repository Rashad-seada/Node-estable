"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'


function BackButton() {

    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <button onClick={handleGoBack}>
            <div
                className='w-[35px] text-2xl bg-opacity-60 text-dark-grey bg-zinc-300 rounded-full flex justify-center items-center aspect-square'>
                <IoIosArrowBack />
            </div>
        </button>
    )
}

export default BackButton