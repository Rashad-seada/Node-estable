import React from 'react'
import { BiSolidImageAlt } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { HiMiniArrowLongRight } from 'react-icons/hi2'
import { RiPencilFill } from 'react-icons/ri'
import RoutingLink from '../all/RoutingLink'
import { RoutingProviderData, useRoutingProvider } from '@/context/RoutingContext'

export type ResoucesCardProps = {
    imgUrl: string,
    title:string,
    titles:any,
    _id:string,
    //resource:string
}
function ResourcesCard({imgUrl,title,titles,_id,}:ResoucesCardProps) {
    
    const titlesKeys = Object.keys(titles)
    
    const RoutingData : RoutingProviderData = useRoutingProvider()
    

    return (
        <div className='h-fit border-opacity-40 border border-dark-grey text-center items-center justify-between w-full flex flex-col  rounded-3xl'>


            <div className='h-[175px] w-full p-4'>
                {
                    !imgUrl ? (<BiSolidImageAlt className='w-full text-4xl h-full text-dark-grey opacity-30' />) :(
                        <img src={imgUrl} 
                            className='w-full rounded-2xl h-[180px] object-cover' 
                            alt="horse image"
                        />)
                }
            </div>

            <div className=' p-4'>
                <div>
                    <p className='my-3 truncate text-xl text-dark-grey font-semibold'>{title}</p>
                </div>

                <div className='text-xl'>
                    {
                        titlesKeys.map((key,idx)=> (
                            <p className='truncate' key={idx}>
                                <span className='text-zinc-400'>{key} : </span>
                                <span className='text-dark-grey'>{titles[key]}</span>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div className='relative border-t p-4 border-dark-grey border-opacity-40 w-full flex justify-between items-center'>
            
                <div className='w-[70px] flex text-2xl items-center text-dark-grey h-[20px] justify-between'>
                    {/* <RoutingLink href={`${RoutingData?.currentPath}/${_id}/edit`}>
                    <RiPencilFill />
                    </RoutingLink> */}
                    <span className='h-[35px] w-[1.5px] bg-dark-grey opacity-40'/>
                    <FaTrash />
                </div>

                <button className='flex h-[35px] w-[130px] justify-center gap-2 capitalize items-center p-2 rounded-lg border text-primary border-primary duration-300 hover:bg-primary hover:text-smokey-white'>
                    <span>see more</span>
                    <HiMiniArrowLongRight className='text-2xl'/>

                </button>
            </div>
        </div>
    )
}

export default ResourcesCard