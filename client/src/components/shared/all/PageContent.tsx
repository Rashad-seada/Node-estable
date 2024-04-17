import React from 'react'

type PageContentProps = {
    className?: string
} & Children
function PageContent({children,className}:PageContentProps) {
    return (
        <div className={`w-full overflow-auto bg-smokey-white rounded-3xl h-[calc(100%-80px)] ${className}`}>
            {children}
        </div>
    )
}

export default PageContent