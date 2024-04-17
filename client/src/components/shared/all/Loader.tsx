import React from 'react'

type SpinnerProps = {
    size:number
}
function Spinner({size}: SpinnerProps) {
    return (
        <div className='w-full h-full gap-6 flex-col flex justify-center items-center'>
            <div style={{width:size}} className={`rounded-full aspect-square border-[6px] border-y-transparent animate-spin border-x-primary`}/>
            <p className='text-2xl text-primary'>loading for getting data ...</p>
        </div>
    )
}

export default Spinner