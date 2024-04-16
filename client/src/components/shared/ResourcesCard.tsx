import React from 'react'

export type ResoucesCardProps = {
    imgUrl: string,
    title:string,
    titles:any,
    updatePageHref:string,
    seeMorePageHref:string
}
function ResourcesCard({imgUrl,title,updatePageHref,seeMorePageHref,titles}:ResoucesCardProps) {
    
    const titlesKeys = Object.keys(titles)
    
    return (
        <div className='h-[350px] text-center items-center justify-between w-full flex flex-col p-4 rounded-md'>
            <img src={imgUrl} className='w-full h-[180px] object-cover' alt="horse image" />
            <p className='my-3 truncate'>{title}</p>

            <div>
                {
                    titlesKeys.map((key,idx)=> (
                        <p className='truncate' key={idx}>
                            <span>{key} :</span>
                            <span>{titles[key]}</span>
                        </p>
                    ))
                }
            </div>

            <div></div>
        </div>
    )
}

export default ResourcesCard