import React from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'

function Avatar() {
    return (
        <div className='flex items-center gap-2'>
            <button className='w-[35px] bg-zinc-400 aspect-square rounded-full '>
            </button>
            <TiArrowSortedDown className='text-2xl text-primary' />

        </div>
    )
}

export default Avatar