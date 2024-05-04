import React from 'react'

function NoDataFound({message}:{message:string}) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[400px] h-[200px] flex flex-col justify-between items-center'>
                <img className='w-[100px] aspect-square' src="/svgs/notFound.svg" alt="not found icon" />
                <p className='text-dark-grey text-xl font-semibold'>No Data Found</p>
                <p className='text-md text-light-grey text-center'>{message}</p>
            </div>
        </div>
    )
}

export default NoDataFound