import React from 'react'
import { BiSolidImageAlt } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'

export type ResoucesCardProps = {
    imgUrl: string,
    title:string,
    titles:any,
    _id:string,
    //resource:string
}
function ResourcesCard({imgUrl,title,titles,_id,}:ResoucesCardProps) {
    
    const titlesKeys = Object.keys(titles)
    
    return (
        <div className='h-[350px] border-opacity-40 border border-dark-grey text-center items-center justify-between w-full flex flex-col p-4 rounded-3xl'>


            <div className='h-[175px]'>
                {
                    !imgUrl ? (<BiSolidImageAlt className='w-full h-full text-dark-grey opacity-30' />) :(
                        <img src={imgUrl} 
                            className='w-full rounded-2xl h-[180px] object-cover' 
                            alt="horse image"
                        />)
                }
            </div>

            <div className='h-[110px]'>
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

            <div className='relative w-full flex justify-between items-center h-[50px]'>
                <span className='absolute top-0 bg-dark-grey w-[calc(100%+2em)] left-1/2 -translate-x-1/2 opacity-40  h-[1px] '/>
            
                <div className='w-[60px] flex text-2xl items-center text-dark-grey h-[20px] justify-between'>
                    <FaTrash />
                    <RiPencilFill />

                </div>
            </div>
        </div>
    )
}

export default ResourcesCard