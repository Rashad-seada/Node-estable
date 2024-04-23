"use client"

import { usePopUp } from '@/hooks/usePopUp'
import { httpDeleteService } from '@/services/httpDeleteService'
import Link from 'next/link'
import {  usePathname } from 'next/navigation'
import React from 'react'
import { BiSolidImageAlt } from 'react-icons/bi'
import { BsQuestionCircle } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { HiMiniArrowLongRight } from 'react-icons/hi2'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { RiPencilFill } from 'react-icons/ri'
import { useMutation } from 'react-query'

export type ResourcesCardProps = {
    imgUrl: string,
    title:string,
    titles:any,
    _id:string,
    route:string,
    refetch: () => void
}
function ResourcesCard({imgUrl,title,titles,_id,route,refetch}:ResourcesCardProps) {
    
    const titlesKeys = Object.keys(titles)    
    const pathName = usePathname()
    const popUp = usePopUp()

    

    const {mutate} = useMutation({
        mutationFn: async () => httpDeleteService(`${route}/${_id}`),
        mutationKey:["delete","resourceItem",_id],
        onSuccess:async () => {
            refetch()
            popUp({
                popUpIcon:<IoMdCheckmarkCircleOutline/>,
                popUpMessage:"item deleted successfully",
                popUpType:"alert",
                showPopUp:true,
                popUpTitle:"item deleted",
            })
        },
        onError:async () => {
            popUp({
                popUpIcon:<MdErrorOutline />,
                popUpMessage:"error on deleting item, please try again",
                popUpType:"alert",
                showPopUp:true,
                popUpTitle:"error on item deleting",
            })
        }
    })

  

    const handleDelete = () => {
        popUp({
            popUpIcon:<BsQuestionCircle />,
            popUpMessage:"are you sure about deleting this item ?",
            popUpResolveFunc:mutate,
            popUpType:"confirm",
            showPopUp:true,
            popUpTitle:"delete item",
        })
    }

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
                    <Link href={`${pathName}/${_id}/edit`}>
                        <RiPencilFill />
                    </Link>
                    <span className='h-[35px] w-[1.5px] bg-dark-grey opacity-40'/>
                    <button onClick={handleDelete}>
                        <FaTrash/>
                    </button>
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