import React from 'react'

function PageHeader({children}:Children) {
    return (
        <div className='w-full flex items-center h-[80px]'>
            {children}
        </div>
    )
}

export default PageHeader