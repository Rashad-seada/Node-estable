import React from 'react'

type PageContentProps = {
    className?: string
} & Children
function PageContent({children,className}:PageContentProps) {
    return (
        <div className={`w-full overflow-hidden bg-smokey-white rounded-3xl h-[calc(100%-80px)]`}>
            <div className='overflow-auto w-full h-full'>
                <div className={` ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageContent