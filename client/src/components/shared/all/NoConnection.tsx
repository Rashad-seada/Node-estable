import React from 'react'

function NoConnection() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            
            <div className='w-[650px] flex flex-col items-center justify-between'>
                <img src="/svgs/noConnection.svg" alt="no connection img"  className='w-[250px] aspect-square'/>
            </div>
        
        </div>
    )
}

export default NoConnection