import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import RoutingLink from './RoutingLink'

type BackButtonProps = {
    href: string,
}

function BackButton({href}:BackButtonProps) {

    return (
        <RoutingLink notShowHightLight={true} href={href}>
            <div
                className='w-[35px] text-2xl bg-opacity-60 text-dark-grey bg-zinc-300 rounded-full flex justify-center items-center aspect-square'>
                <IoIosArrowBack />
            </div>
        </RoutingLink>
    )
}

export default BackButton