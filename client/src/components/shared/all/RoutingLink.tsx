"use client"

import { RoutingProviderData, useRoutingProvider } from '@/context/RoutingContext'
import Link from 'next/link'
import React from 'react'

type RoutingLinkProps = {
    href: string
    children: any,
    className?: string,
    notShowHightLight?:boolean
}

function RoutingLink({href,children,className,notShowHightLight}:RoutingLinkProps) {  

    const RoutingData : RoutingProviderData = useRoutingProvider()
    const isLinkActive :boolean = RoutingData?.currentPath === href
    
    return (
        <div style={{
            background:isLinkActive && !notShowHightLight ? 'linear-gradient(to right,var(--primary) 40%,transparent)' : "transparent",
            color: isLinkActive ? "var(--smokey-white)" : "var(--light-grey)"
        }}>
            <Link
                href={href}
                className={`${className || ""}`}
                onClick={()=> RoutingData?.changeCurrentPath(href)}
            >
                {children}
            </Link>
        </div>
   
    )
}

export default RoutingLink